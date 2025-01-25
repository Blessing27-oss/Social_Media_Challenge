
const express = require('express');
const Joi = require('joi');
const fs = require ('fs');
const app = express();
const cors = require ('cors');
const helmet = require ('helmet');


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
console.log(labMembers);

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
        dev: req.body.dev
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

    fs.writeFileSync(dataFilePath, JSON.stringify(labMembers, null, 2));  // Save updated data
    //Return the updated member
    res.send(member);
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

//module.exports = server;
//group data of similar types e.g grouping CS majors, front-end filtering users with CS
//data in the form of statistics /trends
//use a set
//returns an array to the front-end to use for data visualization
//check reducer functions
//modify my api to receive filters