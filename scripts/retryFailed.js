require('dotenv').config();
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${API_KEY}`;
const slug = "website-design-development-company-bangalore";
const dataDir = path.join(__dirname, '../src/data/services');

async function retry() {
  console.log(`Retrying generation for: ${slug}...`);
  const prompt = `
You are a senior SEO strategist and enterprise content writer.
I need to generate a complete, SEO-optimized service page payload for the following service slug: "${slug}"

Your task is to create completely original, enterprise-grade, conversion-focused content based on the following structure.
You MUST return ONLY a valid JSON object. Do not include markdown formatting like \`\`\`json. The JSON must have the following schema:

{
  "title": "Main Service Title (e.g. SEO Company in Bangalore)",
  "description": "A short meta description like summary (155 chars max).",
  "longDescription": "A large HTML string containing all the detailed content sections.",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
  "benefits": ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4", "Benefit 5", "Benefit 6"],
  "category": "online or offline",
  "faqs": [
    { "q": "Question 1", "a": "Answer 1" },
    { "q": "Question 2", "a": "Answer 2" }
  ]
}

SPECIAL INSTRUCTIONS FOR "longDescription" HTML:
The \`longDescription\` MUST be a single HTML string containing the following sections. Use <h2>, <h3>, <h4>, <p>, <ul>, and <li> tags for structure. Do NOT use markdown.
- HERO SECTION (H2, paragraph)
- SERVICE OVERVIEW SECTION (What it is, why businesses need it)
- SERVICE OFFERINGS SECTION (List of 6-10 specific services using <h3> and paragraphs)
- BENEFITS SECTION (8-10 business impact points)
- WHY CHOOSE US SECTION (6-8 reasons like Experienced Team, Proven Results)
- INDUSTRIES WE SERVE SECTION
- PROCESS SECTION (6-8 steps)
- TECHNOLOGY / TOOLS SECTION (Relevant tools for the service)
- CASE STUDIES SECTION (3 realistic case studies with Challenge, Solution, Results)
- FINAL CTA SECTION

Make the content comprehensive (1000+ words equivalent embedded in the HTML), authoritative, and highly SEO optimized for keywords naturally extracted from the slug (e.g. mention Bangalore if it's in the slug). Tone should be professional, similar to top consulting firms (Accenture, Deloitte).
`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, responseMimeType: "application/json" }
      })
    });
    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    fs.writeFileSync(path.join(dataDir, `${slug}.json`), text, 'utf8');
    console.log(`✓ Saved ${slug}.json`);
  } catch (error) {
    console.error(`Failed to generate ${slug}:`, error.message);
  }
}
retry();
