export const runtime = "nodejs";

type VoiceAssistantRequest = {
  query?: string;
};

/* =========================
   KNOWLEDGE BASE (SITE DATA)
========================= */

const knowledgeBase = {
  company_info: {
    name: "IM Solutions",
    type: "Full-service advertising and digital agency",
    founded: "2013",
    location: "Bengaluru, India",
    team_size: "50+",
    offices: ["Bengaluru", "Alwar"],
  },
  blogs: {
    headings: [
      "Modern SEO strategies for AI-powered search",
      "How AI Is Transforming Website Design",
      "Top SEO Trends for 2025",
      "What is RWA Activation and why your business needs it?",
    ],
  },
  services: {
    online_services: [
      "Digital Marketing Services",
      "Search Engine Optimization (SEO)",
      "Search Engine Marketing (SEM)",
      "Social Media Optimization",
      "Social Media Marketing",
      "Website Design & Development",
      "Software Design & Development",
      "Geolocation Analytical SMS",
      "Creative Designing",
      "API Integration",
      "E-commerce Solutions",
      "Email Marketing",
      "Mobile Application Development",
      "Real Estate Online Marketing",
      "Display Advertisement",
      "Blog Articles",
      "Classified Portal Management",
      "Press Releases Services",
    ],
    offline_services: [
      "Bus Branding",
      "RWA Activation",
      "BTL Advertising",
      "Mall & Multiplex Advertising",
      "Tech Park Advertising",
      "Airport Advertising",
      "Paper Insertion",
      "Cafe, Gym & Supermarket Advertising",
      "ATM Advertising",
      "Auto Rickshaw Advertising",
      "Magazine Advertising",
      "Parking Lot Advertising",
      "Branding & Re-Branding",
      "Corporate Gifts",
      "Corporate Training",
      "Event Management",
      "FM Campaigns",
      "Fabrications",
      "Hoarding Services",
      "Marketing Collaterals",
      "Start-up Marketing",
      "Photographic Services",
      "PR Services",
      "Printing Services",
      "Retail Advertising",
      "Real Estate Videography",
      "Signage",
      "Washroom Advertising",
    ],
  },
  career_opportunities: [
    "Vice President – Corporate Sales",
    "Visual Content Creator",
    "Business Development Manager",
    "SEO Executive",
    "Social Media Marketing",
    "Web Design and Development",
    "Content Writing",
    "Graphic and Web Designing",
    "Digital Marketing Manager",
    "HR Executive",
  ],
  contact: {
    corporate_office: {
      address:
        "921, Laxmi Tower, 4th Floor, 5th Main Rd, Sector 7, HSR Layout, Bengaluru",
      phone: "+91-8880564488",
      email: "info@imsolutions.mobi",
    },
  },
};

/* =========================
   HELPERS
========================= */

function isSafeSuggestedPath(path: unknown): path is string {
  return (
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.includes("://") &&
    !path.includes("..")
  );
}

/** Safe JSON extraction */
function extractJson(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isBlogIntent(t: string) {
  return (
    t.includes("blog") ||
    t.includes("blogs") ||
    t.includes("article") ||
    t.includes("articles") ||
    t.includes("posts") ||
    t.includes("insights")
  );
}

function isServicesIntent(t: string) {
  return (
    t.includes("service") ||
    t.includes("services") ||
    t.includes("offer") ||
    t.includes("provide")
  );
}

function isOnlineIntent(t: string) {
  return t.includes("online") || t.includes("digital") || t.includes("seo") || t.includes("sem");
}

function isOfflineIntent(t: string) {
  return (
    t.includes("offline") ||
    t.includes("outdoor") ||
    t.includes("btl") ||
    t.includes("hoarding")
  );
}

function isPricingIntent(t: string) {
  return (
    t.includes("price") ||
    t.includes("pricing") ||
    t.includes("cost") ||
    t.includes("charges") ||
    t.includes("charge") ||
    t.includes("fee") ||
    t.includes("fees") ||
    t.includes("budget") ||
    t.includes("how much")
  );
}

function pricingContactReply() {
  return {
    answer:
      "For accurate pricing and budget details, please contact our team directly by phone or email through the Contact page.",
    suggestedPath: "/contact",
  };
}

/** Local fallback rules when Gemini does not return a good answer */
function answerFromKnowledge(query: string): {
  answer: string;
  suggestedPath: string | null;
} | null {
  const t = normalize(query);

  // Pricing / budget / cost → always contact team
  if (isPricingIntent(t)) return pricingContactReply();

  // Blogs → mention popular posts and open blog page
  if (isBlogIntent(t)) {
    const tops = knowledgeBase.blogs.headings.slice(0, 3).join(", ");
    return {
      answer: `Some popular blog posts include ${tops}. Please go through our website for more insights.`,
      suggestedPath: "/blog",
    };
  }

  // Services (online/offline) → short summary + open the right page
  if (isServicesIntent(t)) {
    if (isOfflineIntent(t)) {
      const picks = knowledgeBase.services.offline_services.slice(0, 4).join(", ");
      return {
        answer: `We provide offline services such as ${picks} and more. Please go through our website for full details.`,
        suggestedPath: "/services/offline",
      };
    }
    if (isOnlineIntent(t)) {
      const picks = knowledgeBase.services.online_services.slice(0, 4).join(", ");
      return {
        answer: `We provide online services such as ${picks} and more. Please go through our website for full details.`,
        suggestedPath: "/services/online",
      };
    }
    return {
      answer:
        "We provide both online and offline services. Please go through our website for full details.",
      suggestedPath: "/services/online",
    };
  }

  // Services asked (generic) → answer with online + offline
  if (
    (t.includes("services") || t.includes("service")) &&
    (t.includes("im solutions") || t.includes("you") || t.includes("your"))
  ) {
    return {
      answer: "We provide both online and offline services.",
      suggestedPath: "/services/online",
    };
  }

  // About IM Solutions
  if (
    t.includes("im solutions") ||
    (t.includes("about") && (t.includes("company") || t.includes("you"))) ||
    t.includes("who are you")
  ) {
    const info = knowledgeBase.company_info;
    const answer = `IM Solutions is a ${info.type} founded in ${info.founded} in ${info.location}, with a team of over ${info.team_size} professionals and offices in ${info.offices.join(
      " and "
    )}.`;
    return { answer, suggestedPath: "/about" };
  }

  // Careers
  if (t.includes("career") || t.includes("job") || t.includes("opening")) {
    const roles = knowledgeBase.career_opportunities;
    const answer = `IM Solutions offers roles such as ${roles
      .slice(0, 4)
      .join(", ")} and more.`;
    return { answer, suggestedPath: "/careers" };
  }

  // Contact
  if (t.includes("contact") || t.includes("phone") || t.includes("email")) {
    const c = knowledgeBase.contact.corporate_office;
    const answer = `You can reach IM Solutions at ${c.phone} or email ${c.email}, and visit our corporate office at ${c.address}.`;
    return { answer, suggestedPath: "/contact" };
  }

  return null;
}

/* =========================
   API HANDLER
========================= */

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
  }

  const body = (await req.json().catch(() => ({}))) as VoiceAssistantRequest;
  const query = body.query?.trim();

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  // Hard rule: pricing always goes to contact (fast, deterministic)
  const normalized = normalize(query);
  if (isPricingIntent(normalized)) {
    return Response.json(pricingContactReply(), { status: 200 });
  }

  // Hard rule: for blogs/services discovery, respond deterministically (and the UI will open the page)
  if (isBlogIntent(normalized) || isServicesIntent(normalized)) {
    const local = answerFromKnowledge(query);
    if (local) return Response.json(local, { status: 200 });
  }

  const allowedPaths = [
    "/",
    "/about",
    "/services",
    "/services/online",
    "/services/offline",
    "/clients",
    "/careers",
    "/blog",
    "/contact",
  ];

  const pricingInstruction =
    "If the user asks anything about price, pricing, cost, charges, fees or budget, DO NOT guess numbers. Instead, set answer to: 'For accurate pricing and budget details, please contact our team directly by phone or email through the Contact page.' and set suggestedPath to '/contact'.";

  const servicesInstruction =
    "If the user asks about services offered/provided, briefly mention online/offline services and set suggestedPath to '/services/online' by default (or '/services/offline' if explicitly requested). End with: 'Please go through our website for full details.'";

  const blogsInstruction =
    "If the user asks about blogs/articles/posts, mention a few popular blog headings from knowledge and set suggestedPath to '/blog'. End with: 'Please go through our website for more insights.'";

  const prompt = `
You are IM Solutions Voice Assistant.

Use ONLY the knowledge below to answer.
Do NOT invent facts.

Rules:
- Respond ONLY with valid JSON
- No markdown
- No extra text
- Keep answer short (1–3 sentences)
- ${pricingInstruction}
- ${servicesInstruction}
- ${blogsInstruction}

JSON format:
{
  "answer": string,
  "suggestedPath": string | null
}

Allowed paths:
${allowedPaths.join(", ")}

Knowledge:
${JSON.stringify(knowledgeBase)}

User question:
${query}
IMPORTANT: Output ONLY JSON.
`.trim();
  const url = "https://api.openai.com/v1/chat/completions";

  const openaiRes = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 256,
    }),
  });

  if (!openaiRes.ok) {
    const err = await openaiRes.text();
    return Response.json(
      { error: "OpenAI failed", details: err },
      { status: 500 }
    );
  }

  const data = await openaiRes.json();
  const rawText =
    data?.choices?.[0]?.message?.content ??
    "";

  const parsed = extractJson(rawText);
  const answer =
    typeof parsed?.answer === "string" ? parsed.answer.trim() : "";

  const suggestedPath = isSafeSuggestedPath(parsed?.suggestedPath)
    ? parsed.suggestedPath
    : null;

  // If Gemini didn't give a usable answer, fall back to our own rules
  if (!answer) {
    const local = answerFromKnowledge(query);
    if (local) return Response.json(local, { status: 200 });

    return Response.json(
      { answer: "I don't have that information yet.", suggestedPath: null },
      { status: 200 }
    );
  }

  return Response.json(
    {
      answer,
      suggestedPath:
        suggestedPath && allowedPaths.includes(suggestedPath)
          ? suggestedPath
          : null,
    },
    { status: 200 }
  );
}


