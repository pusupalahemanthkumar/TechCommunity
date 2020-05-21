// Importing Required Files And Packages Here.
const express = require("express");
const { check, validationResult } = require("express-validator");
const axios = require("axios");
const config = require("config");

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();

// Defining Profile Routes Here.

// @route       GET api/profile/me
// @desc        Get Current User Profile
// @access      Private
router.get("/me", auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({
        msg: "There is no profile for this User.",
      });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       POST api/profile/
// @desc        Create Or Update User Profile.
// @access      Private

router.post(
  "/",
  [
    auth,
    [
      check("skills", "Skills is required.").not().isEmpty(),
      check("about", "About is required.").not().isEmpty(),
      check("location", "Location is required.").not().isEmpty(),
    ],
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      location,
      website,
      about,
      skills,
      github,
      instagram,
      linkedin,
      facebook,
    } = req.body;
    console.log(website);
    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) {
      profileFields.location = location;
    }
    if (website) {
      profileFields.website = website;
    }
    if (about) {
      profileFields.about = about;
    }
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => {
        return skill.trim();
      });
    }

    // Build social object
    profileFields.social = {};
    if (github) {
      profileFields.social.github = github;
    }

    if (facebook) {
      profileFields.social.facebook = facebook;
    }
    if (linkedin) {
      profileFields.social.linkedin = linkedin;
    }
    if (instagram) {
      profileFields.social.instagram = instagram;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       GET api/profile/
// @desc        Get All User Profile.
// @access      Public
router.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// @route       GET api/profile/user/:user_id
// @desc        Get  Profile by userId
// @access      Public
router.get("/user/:user_id", async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({
        msg: "Profile not found.",
      });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        msg: "Profile not found.",
      });
    }
    res.status(500).json("Server Error");
  }
});

module.exports =router;