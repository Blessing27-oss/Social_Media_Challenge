
const express = require('express');
const Joi = require('joi');
const fs = require ('fs');
const app = express();
const cors = require ('cors');
const helmet = require ('helmet');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Add Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

const dataFilePath = 'data/dali_social_media.json';

//Load the lab members from the JSON file
let labMembers = [];

try {
    const data = fs.readFileSync (dataFilePath, 'utf8');
    labMembers = JSON.parse(data);
} catch (err) {
        console.error('Error reading the lab members data:', err);
    
}
//console.log(labMembers);

const labMemberSchema = new Schema({
    name: { type: String, required: true },
    year: { type: String },
    dev: { type: Boolean },
    des: { type: Boolean },
    pm: { type: Boolean },
    core: { type: Boolean },
    mentor: { type: Boolean },
    major: { type: String },
    minor: { type: String },
    birthday: { type: String },
    home: { type: String },
    quote: { type: String },
    'favorite thing 1': { type: String },
    'favorite thing 2': { type: String },
    'favorite thing 3': { type: String },
    'favorite dartmouth tradition': { type: String },
    'fun fact': { type: String },
    picture: { type: String }
});

// Validation schema for lab members
function validateMember(member) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        year: Joi.number().integer().min(1).required(),
        dev: Joi.boolean().required()
    });
    return schema.validate(member);
}


// GET all lab members
app.get('/lab-members', (req, res) => {
    res.json(labMembers);
});

// GET a specific lab member by name
app.get('/lab-members/:name', (req, res) => {
    const member = labMembers.find(m => m.name.toLowerCase() === req.params.name.toLowerCase());
    if (!member) return res.status(404).send('Lab member not found');
    res.json(member);
});

//create new lab memeber
app.post('/lab-members', (req, res) => {
    const { error } = validateMember(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        
    const newMember = {
        name: req.body.name,
        year: req.body.year,
        dev: req.body.dev,
        des: req.body.des,
        pm: req.body.pm,
        core: req.body.core,
        mentor: req.body.mentor,
        major: req.body.major,
        minor: req.body.minor,
        birthday: req.body.birthday,
        home: req.body.home,
        quote: req.body.quote,
        'favorite thing 1': { type: String },
        'favorite thing 2': { type: String },
        'favorite thing 3': { type: String },
        'favorite dartmouth tradition': { type: String },
        'fun fact': { type: String },
        picture: { type: String },
    };
    labMembers.push(newMember);
    fs.writeFileSync(dataFilePath, JSON.stringify(labMembers, null, 2));  // Save updated data
    res.status(200).send(newMember);
});


//Upadte an existing lab member by name
app.put('/lab-members/:name', (req, res) => {
    //look up member
    const member = labMembers.find(m => m.name.toLowerCase().trim() === req.params.name.toLowerCase().trim());
    if (!member) return res.status(404).send('Lab member not found');

    //Validate
    //If invalid, return 400 - Bad request
    const { error } = validateMember(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    //update member
    member.name = req.body.name;
    member.year = req.body.year;
    member.dev = req.body.dev;
    member.des = req.body.des;
    member.pm = req.body.pm;
    member.core = req.body.core;
    member.mentor = req.body.mentor;
    member.major = req.body.major;
    member.minor = req.body.minor;
    member.birthday = req.body.birthday;
    member.home = req.body.home;
    member.quote = req.body.quote;
    member.picture = { type: String },

    fs.writeFileSync(dataFilePath, JSON.stringify(labMembers, null, 2));  // Save updated data
    //Return the updated member
    res.send(member);
});

// GET /lab-members/years - Get count of lab members by graduation year
app.get('/lab-members/years', async (req, res) => {
    try {
      const members = await LabMember.find(); // Get all lab members
  
      const yearsSet = new Set(); // Create a Set to store unique years
      const yearsCount = {}; // This object will store counts of each year
  
      // Loop through each member to process their year
      for (let i = 0; i < members.length; i++) {
        const year = members[i].year;
        yearsSet.add(year); // Add year to Set (automatically removes duplicates)
      }
  
      // Now, count occurrences of each unique year
      for (let year of yearsSet) {
        yearsCount[year] = members.filter(m => m.year === year).length;
      }
  
      res.json(yearsCount);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching year data' });
    }
  });
  


// GET /lab-members/majors - Get count of lab members by major
app.get('/lab-members/majors', async (req, res) => {
    try {
      const members = await LabMember.find(); // Get all lab members
  
      const majorsSet = new Set(); // Set to store unique majors
      const majorsCount = {}; // Object to store count of majors
  
      // Loop through each member to process their major
      for (let i = 0; i < members.length; i++) {
        const major = members[i].major;
        majorsSet.add(major); // Add major to Set (removes duplicates)
      }
  
      // Count occurrences of each unique major
      for (let major of majorsSet) {
        majorsCount[major] = members.filter(m => m.major === major).length;
      }
  
      res.json(majorsCount);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching major data' });
    }
  });
  

// GET /lab-members/favorite-things - Aggregate favorite things data
app.get('/lab-members/favorite-things', async (req, res) => {
    try {
      const members = await LabMember.find(); // Get all lab members
  
      const favoriteThingsSet = new Set(); // Set to store unique favorite things
      const favoriteThingsCount = {}; // Object to store count of each favorite thing
  
      // Loop through each member to process their favorite things
      for (let i = 0; i < members.length; i++) {
        const fav1 = members[i]['favorite thing 1'];
        const fav2 = members[i]['favorite thing 2'];
        const fav3 = members[i]['favorite thing 3'];
  
        favoriteThingsSet.add(fav1); // Add each favorite thing to the Set
        favoriteThingsSet.add(fav2);
        favoriteThingsSet.add(fav3);
      }
  
      // Count occurrences of each unique favorite thing
      for (let fav of favoriteThingsSet) {
        favoriteThingsCount[fav] = members.filter(m => {
          return m['favorite thing 1'] === fav || 
                 m['favorite thing 2'] === fav || 
                 m['favorite thing 3'] === fav;
        }).length;
      }
  
      res.json(favoriteThingsCount);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching favorite things data' });
    }
});

// GET /lab-members/mentor-status - Get the count of lab members by mentor status
app.get('/lab-members/mentor-status', async (req, res) => {
    try {
      const members = await LabMember.find(); // Fetch all lab members
  
      // Initialize counters for mentors and non-mentors
      const mentorStatusCount = {
        mentors: 0,
        nonMentors: 0
      };
  
      // Loop through each member to count mentors and non-mentors
      for (let i = 0; i < members.length; i++) {
        const isMentor = members[i].mentor; // Check if the member is a mentor
        if (isMentor) {
          mentorStatusCount.mentors++;
        } else {
          mentorStatusCount.nonMentors++;
        }
      }
  
      // Send the count of mentors and non-mentors
      res.json(mentorStatusCount);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching mentor status data' });
    }
});
  

// GET /lab-members/age-distribution - Get age distribution of lab members
app.get('/lab-members/age-distribution', async (req, res) => {
    try {
      const members = await LabMember.find(); // Fetch all lab members
  
      const ageDistribution = {
        "18-25": 0,
        "26-30": 0,
        "31-35": 0,
        "36-40": 0,
        "40+": 0
      };
  
      // Get current year to calculate age
      const currentYear = new Date().getFullYear();
  
      // Loop through each member to calculate their age and update the age group
      for (let i = 0; i < members.length; i++) {
        const birthday = new Date(members[i].birthday); // Assume birthday is in MM-DD format
        const age = currentYear - birthday.getFullYear(); // Calculate age
  
        // Group members based on their age
        if (age >= 18 && age <= 25) {
          ageDistribution["18-25"]++;
        } else if (age >= 26 && age <= 30) {
          ageDistribution["26-30"]++;
        } else if (age >= 31 && age <= 35) {
          ageDistribution["31-35"]++;
        } else if (age >= 36 && age <= 40) {
          ageDistribution["36-40"]++;
        } else if (age > 40) {
          ageDistribution["40+"]++;
        }
      }
  
      // Return the age distribution
      res.json(ageDistribution);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching age distribution data' });
    }
  });
  

//Delete a lab member by name
app.delete('/lab-members/:name', (req, res) => {

    const memberIndex = labMembers.findIndex(m => m.name.toLowerCase() === req.params.name.toLowerCase());
    if (memberIndex === -1) return res.status(404).send('Lab member not found');

    const deletedMember = labMembers.splice(memberIndex, 1)[0];
    fs.writeFileSync(dataFilePath, JSON.stringify(labMembers, null, 2));  // Save updated data
    res.send(deletedMember);
});


//Port - environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at ${port}...`));

const LabMember = mongoose.model('LabMember', labMemberSchema);
module.exports = LabMember;

//group data of similar types e.g grouping CS majors,
//use a set
//returns an array to the front-end to use for data visualization
//check reducer functions
//modify my api to receive filters