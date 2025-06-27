const express = require('express');

const generateResume = async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default; // Dynamic import for CommonJS
        const { name, email, phone, summary, skills, experience, education, additionalInfo, references } = req.body;

        // Validate JSON inputs
        let parsedExperience, parsedEducation;
        try {
            parsedExperience = JSON.parse(experience);
            parsedEducation = JSON.parse(education);
        } catch (e) {
            return res.status(400).json({ error: "Experience and Education fields must contain valid JSON." });
        }

        // Format experience and education sections
        const formattedExperience = parsedExperience.map(exp => 
            `- ${exp.jobTitle} at ${exp.company} (${exp.years})\n  ${exp.description}`
        ).join('\n\n');
        
        const formattedEducation = parsedEducation.map(edu => 
            `- ${edu.degree}, ${edu.institution} (${edu.year})`
        ).join('\n');

        // Construct the full resume text
        const resumeData = {
            resumeText: `**CONTACT**\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n` + // Added "Name:" label
                        `**SUMMARY**\n${summary}\n\n` +
                        `**SKILLS**\n${skills}\n\n` +
                        `**WORK EXPERIENCE**\n${formattedExperience}\n\n` +
                        `**EDUCATION**\n${formattedEducation}\n\n` +
                        `**ADDITIONAL INFORMATION**\n${additionalInfo || ''}\n\n` +
                        `**REFERENCES**\n${references || ''}`
        };
        
        

        const apiUrl = 'https://ai-resume-builder-cv-checker-resume-rewriter-api.p.rapidapi.com/generateResume?noqueue=1&language=en';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'c61d2a41e6msha677143a858cee4p1bd26ejsn166a6ee3f3ef',
                'x-rapidapi-host': 'ai-resume-builder-cv-checker-resume-rewriter-api.p.rapidapi.com',
                'Content-Type': 'application/json',
                'x-usiapps-req': 'true'
            },
            body: JSON.stringify(resumeData)
        };

        const response = await fetch(apiUrl, options);
        const result = await response.json();

        console.log("API Response:", result); // Debugging

        if (!result || Object.keys(result).length === 0) {
            return res.render('generate', { resume: null });
        }

        console.log("Final Rendered Resume Data:", result.result);
        res.render('generate', { resume: { result: result.result || "" } });
        
    } catch (error) {
        console.error("Error generating resume:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { generateResume };