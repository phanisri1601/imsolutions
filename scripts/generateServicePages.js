
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: GEMINI_API_KEY is not set in your .env file or environment variables.");
  process.exit(1);
}

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${API_KEY}`;

const urls = [
  "advertising-marketing-activities-in-apartments",
  "btl-advertising-agency-bangalore",
  "advertising-in-malls-and-multiplex",
  "advertising-in-tech-parks",
  "airport-advertising",
  "paper-insertion-in-bangalore",
  "advertisements-in-cafes-gyms-and-super-markets",
  "advertisment-in-atm",
  "auto-branding-services",
  "advertisement-in-magazines",
  "advertisement-in-public-private-parking",
  "branding-re-branding",
  "corporate-gifts",
  "corporate-training-services",
  "fm-campaigns",
  "fabrications",
  "hoarding-services",
  "marketing-collaterals",
  "marketing-services-for-start-ups",
  "photographic-services-bangalore",
  "pr-services",
  "printing-services",
  "retail-advertisment",
  "realestate-videography-in-bangalore",
  "signage-services",
  "advertising-agency-in-bangalore",
  "best-digital-marketing-company-in-bangalore",
  "seo-company-bangalore",
  "sem-search-engine-marketing-company",
  "orm-services-bangalore",
  "website-design-development-company-bangalore",
  "social-media-optimization-company",
  "social-media-marketing-company-bangalore",
  "software-development-company",
  "analytical-sms",
  "ai-advertising-agency",
  "creative-designing-services",
  "api-integration",
  "ecommerce-website-development-services",
  "email-marketing-company",
  "mobile-application-development-company",
  "real-estate-online-marketing-company",
  "display-advertisement",
  "blog-articles",
  "classified-portal-management",
  "press-releases-blog-articles"
];

const dataDir = path.join(__dirname, '../src/data/services');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

async function generateContentForSlug(slug) {
  console.log(`Generating content for: ${slug}...`);
  
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
Keep it simple, clean, and concise. Do NOT write a wall of text.
The \`longDescription\` MUST be a single HTML string. Use only <h2>, <h3>, <p>, <ul>, and <li> tags. Do NOT use markdown.

Only include:
1. An <h2> Heading
2. A short Service Overview (1-2 paragraphs max)
3. A short <h3> heading followed by a concise <ul> list of 4-6 key offerings or benefits.

Do not include case studies, long processes, or massive lists. Keep the total word count under 250 words. Ensure the tone is professional and SEO-optimized.
`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    const result = await response.json();
    if (result.error) {
      console.error(`API Error for ${slug}:`, result.error.message);
      return false;
    }

    const text = result.candidates[0].content.parts[0].text;
    
    // Save to JSON
    const filePath = path.join(dataDir, `${slug}.json`);
    fs.writeFileSync(filePath, text, 'utf8');
    console.log(`✓ Saved ${slug}.json`);
    return true;
  } catch (error) {
    console.error(`Failed to generate ${slug}:`, error.message);
    return false;
  }
}

async function main() {
  console.log(`Starting generation for ${urls.length} services...`);
  
  // Process in batches of 3 to respect rate limits
  for (let i = 0; i < urls.length; i += 3) {
    const batch = urls.slice(i, i + 3);
    await Promise.all(batch.map(slug => generateContentForSlug(slug)));
    
    if (i + 3 < urls.length) {
      console.log("Waiting 5 seconds before next batch to prevent rate limiting...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  console.log("All pages generated successfully!");
  console.log("Please update src/app/services/[slug]/page.tsx to load these JSON files.");
}

main();
