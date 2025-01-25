console.log('Starting server....');
const express = require('express');
//const fs = require('fs');
const app = express();
console.log('Express loaded.');

const port = 5000;
//import routes from the routes folder

// Middleware to parse incoming JSON data
// app.use(express.json());

// // Load the lab members data
// let labMembers = JSON.parse(fs.readFileSync('dali_social_media.json', 'utf8'));

// Get all lab members
//lab-members
app.get('/', (req, res) => {
    res.send('Hello World');
    console.log('Responding to request');
    //res.json(labMembers);
});

// // Get a specific lab member by name
// app.get('/lab-member/:name', (req, res) => {
//     const name = req.params.name.toLowerCase();
//     const member = labMembers.find(member => member.name.toLowerCase() === name);

//     if (!member) {
//         return res.status(404).send('Lab member not found');
//     }

//     res.json(member);
// });

// // create a new lab member (POST)
// app.post('/lab-member', (req, res) => {
//     const newMember = req.body;

//     if (!newMember.name || !newMember.age || !newMember.role) {
//         return res.status(400).send('Missing required fields: name, age, and role');
//     }

//     labMembers.push(newMember);

//     // Save the updated lab members back to the file
//     fs.writeFileSync('dali_social_media.json', JSON.stringify(labMembers, null, 2));

//     res.status(201).send('Lab member added successfully');
// });

// // Update a lab member's information (POST)
// app.post('/lab-member/update/:name', (req, res) => {
//     const name = req.params.name.toLowerCase();
//     const updatedData = req.body;

//     const memberIndex = labMembers.findIndex(member => member.name.toLowerCase() === name);

//     if (memberIndex === -1) {
//         return res.status(404).send('Lab member not found');
//     }

//     // Update the member
//     labMembers[memberIndex] = { ...labMembers[memberIndex], ...updatedData };

//     // Save the updated lab members back to the file
//     fs.writeFileSync('dali_social_media.json', JSON.stringify(labMembers, null, 2));

//     res.send('Lab member updated successfully');
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);

});
