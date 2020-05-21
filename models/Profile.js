// Importing Required Files And Packages Here.
const mongoose = require("mongoose");

// Defining Profile Schema Here.
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  about: {
    type: String,
    required: true
  },
  skills:{
    type: [String],
    required :true
  },
  social: {
    github: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },

    instagram: {
      type: String,
    },
  },
});

module.exports =mongoose.model("Profile",ProfileSchema);