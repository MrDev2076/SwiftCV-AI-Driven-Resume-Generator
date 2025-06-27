const express = require("express");
const multer = require("multer");
const { generateResume } = require("../controllers/generateController");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Stores file in memory (change as needed)
const upload = multer({ storage });

// Serve the resume generation form
router.get("/generate", (req, res) => {
    res.render("generate", { resume: null, imageUrl: null });
});

// Handle resume generation with image upload
router.post("/generate", upload.single("profileImage"), generateResume);

module.exports = router;
