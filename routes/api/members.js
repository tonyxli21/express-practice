const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");
// Create a simple REST API route
// Gets ALL members
router.get("/", (req, res) => {
  // Return json when you hit this route
  res.json(members);
});

// Get Single Member
router.get("/:id", (req, res) => {
  // some() filters array, returns boolean
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    // Use request object to get member info
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    // If there does not exist a member with that id
    // Give 400 error (bad request)
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Member
// '/' implies '/api/members' since we initialized the middleware in index.js
router.post("/", (req, res) => {
  // Server is receiving data from the request object
  const newMember = {
    // Generate random universal id since we're not using a database
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  // Check to make sure name and email are sent
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  // Add new Member to array
  members.push(newMember);
  // Send response
  // res.json(members);

  res.redirect("/");
});

// Update Member
// Check to make sure there exists a member with specified id
router.put("/:id", (req, res) => {
  // some() filters array, returns boolean
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    // Get name and email from req.body
    const updatedMember = req.body;
    // Loop through current members to check which one matches the id
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        // User ternary operator to make sure either or both are valid inputs
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;

        // Send message and member itself
        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    // If there does not exist a member with that id
    // Give 400 error (bad request)
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  // some() filters array, returns boolean
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    // Use request object to get member info
    // Filter out one member with specified id
    res.json({
      msg: "Member deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    // If there does not exist a member with that id
    // Give 400 error (bad request)
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
