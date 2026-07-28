export type Job = {
    id: string;
    title: string;
    location: string;
    employmentType: string;
    experience: string;
    description: string;
    responsibilities: string[];
    skills: string[];
    qualifications?: string[];
    benefits?: string[];
    additionalInfo?: Record<string, string>;
};

export const jobs: Job[] = [
    {
        id: "vp-corporate-sales",
        title: "Vice President – Corporate Sales",
        location: "Bangalore",
        employmentType: "Full-Time | Senior Leadership",
        experience: "10+ years",
        description: "IM Solutions is a leading full-service advertising agency that provides integrated digital and offline advertising solutions. We are seeking a visionary, client-focused VP – Corporate Sales to lead our revenue generation and strategic growth initiatives.",
        responsibilities: [
            "Design and execute sales strategies aligned with IM Solutions' digital and offline advertising growth goals.",
            "Identify and penetrate high-value accounts, building a sustainable sales pipeline and achieving quarterly and annual revenue targets.",
            "Develop pricing models and commercial proposals tailored to client needs and market trends.",
            "Engage directly with CXOs, Marketing Heads, and Brand Managers to pitch customized advertising solutions.",
            "Maintain and expand relationships with existing clients, ensuring high retention and upselling opportunities.",
            "Build and lead a high-performing corporate sales team, nurturing talent and driving team success.",
            "Set clear KPIs, oversee performance tracking, and drive a culture of excellence, accountability, and learning.",
            "Stay updated on emerging trends in digital marketing, outdoor media, and BTL activations."
        ],
        skills: [
            "Excellent communication, presentation, and interpersonal skills.",
            "Proactive, strategic thinker with a client-first mindset.",
            "Smart, articulate, and confident in client conversations.",
            "High emotional intelligence and stakeholder management skills.",
            "Agile and adaptable to fast-paced, target-driven environments."
        ],
        qualifications: [
            "Graduate/Postgraduate from a Tier 1 institute",
            "Digital marketing and leadership certifications will be a strong plus."
        ],
        benefits: [
            "A leadership role in one of India’s most dynamic advertising agencies.",
            "Opportunity to work with top-tier clients and premium brands.",
            "Competitive compensation and performance-linked incentives.",
            "Fast-tracked growth and a collaborative leadership culture."
        ]
    },
    {
        id: "visual-content-creator",
        title: "Visual Content Creator",
        location: "Bangalore",
        employmentType: "Full-Time",
        experience: "3+ years",
        description: "We are looking for a creative and dynamic Photographer to join our advertising agency and bring visual stories to life. This role is perfect for someone who loves capturing stunning images, creating engaging reels, and editing content to perfection.",
        responsibilities: [
            "Plan and execute professional photoshoots for brands, products, events, and ad campaigns.",
            "Capture high-quality still images and short-form video content (reels, behind-the-scenes, ads, etc.).",
            "Conceptualize and shoot engaging Instagram Reels, YouTube Shorts, and TikTok-style videos.",
            "Edit photos and videos using tools like Adobe Photoshop, Lightroom, Premiere Pro, After Effects and emerging AI tools.",
            "Enhance images with colour correction, retouching, and branding overlays.",
            "Stay updated with trending video formats and viral content ideas to drive engagement."
        ],
        skills: [
            "Proven experience in photography, videography, and editing.",
            "Expertise in Adobe Creative Suite (Photoshop, Lightroom, Premiere Pro, After Effects, etc.).",
            "Strong understanding of social media trends and visual storytelling.",
            "Ability to work in a fast-paced, creative, and collaborative environment.",
            "Excellent time management and passion for creativity."
        ],
        qualifications: [
            "Proven portfolio showcasing photoshoots, reels, and edited visuals.",
            "Hands-on knowledge of professional cameras, lenses, and lighting setups."
        ],
        benefits: [
            "Work on high-profile advertising campaigns and prominent brands.",
            "Freedom to experiment with innovative creative concepts.",
            "Opportunity to grow within a fast-scaling agency.",
            "Hands-on exposure to top-tier projects in photography and social media marketing."
        ]
    },
    {
        id: "sr-graphic-designer",
        title: "Sr. Graphic Designer",
        location: "Bengaluru",
        employmentType: "Full Time",
        experience: "2 - 4 years",
        description: "The ideal candidate will have strong creative skills and a portfolio of work that demonstrates their passion for illustrative design and typography. Experience in working with numerous different design platforms such as digital and print forms.",
        responsibilities: [
            "Experience in designing projects for both Print and Digital media from concept creation to completion.",
            "Ability to work collaboratively with client engagement teams, creative directors, and account managers.",
            "Understand business objectives and proactively contribute both strategic and design ideas.",
            "Develop a high level of understanding of brief requirements and execution of campaigns.",
            "Provide concepts for digital, offline, and social media campaigns.",
            "Design website, microsite, web banners, and other UI-based collateral."
        ],
        skills: [
            "Fluent in CorelDRAW, Photoshop, Illustrator, and After Effects.",
            "Ability to create artwork and lead the team.",
            "Strong creative skills and passion for illustrative design and typography.",
            "Able to naturally funnel constructive criticism into new ideas."
        ],
        qualifications: [
            "2 - 4yrs Experience in a design/creative firm.",
            "A Professional degree from a design school is advantageous.",
            "Graduation: Any Graduation"
        ],
        additionalInfo: {
            "Industry": "Marketing & Advertising",
            "Office Timings": "09:30 am - 6:30 pm",
            "Joining": "Immediate"
        }
    },
    {
        id: "campaign-manager",
        title: "Campaign Manager",
        location: "Bengaluru",
        employmentType: "Full Time",
        experience: "5+ years",
        description: "Responsible for creating and managing paid ad campaigns across various digital channels, including SEM and Social Media. Agency experience and handling large amount campaigns is preferred.",
        responsibilities: [
            "Create paid ad campaigns on Google Adwords (Search, Display, Remarketing), Programmatic Ads, and Yahoo Ads.",
            "Create paid Social Media Ad Campaigns on Facebook, Instagram, LinkedIn, and Twitter.",
            "Effectively use Google Analytics and Google Console to optimize campaigns and improve PPC / CPA.",
            "Create performance reports and optimize spends and performance.",
            "Plan and execute email marketing strategies and maintain company email campaigns.",
            "Handle display campaigns and native ads campaigns."
        ],
        skills: [
            "In-depth experience with Google, Facebook, LinkedIn, Instagram and Twitter advertising products.",
            "Proficiency with AdWords Editor, Google Analytics and Adobe Omniture.",
            "Familiarity with planning, implementing and analyzing online marketing campaigns.",
            "Proven track record of delivering tangible results."
        ],
        qualifications: [
            "Any Graduation",
            "5+ years of experience"
        ],
        additionalInfo: {
            "Position Type": "Permanent",
            "Office Timings": "09:30 am – 6:30 pm"
        }
    },
    {
        id: "btl-marketing-ops",
        title: "Marketing Operation Executive",
        location: "Bangalore",
        employmentType: "Full-Time",
        experience: "Experience preferred",
        description: "We are looking for a smart and proactive Marketing Operations Executive to oversee BTL (Below-The-Line) marketing activities and offline advertising solutions. This role demands strong negotiation skills and vendor management.",
        responsibilities: [
            "Build and maintain a strong network of vendors and BTL agencies for promotional campaigns.",
            "Plan and execute roadshows, exhibitions, RWA activations, mall activations, and product launches.",
            "Oversee the production, fabrication, and installation of branding materials.",
            "Plan and manage budgets for BTL marketing campaigns.",
            "Conduct post-campaign audits and performance reviews."
        ],
        skills: [
            "Strong negotiation and relationship-building skills.",
            "Excellent written and verbal communication skills.",
            "Highly organized with a keen eye for detail.",
            "Strong analytical skills to assess marketing performance."
        ],
        qualifications: [
            "Bachelor’s degree in Marketing, Business, or a related field.",
            "Experience in BTL marketing and vendor management preferred."
        ],
        benefits: [
            "A dynamic and fast-paced work environment.",
            "Opportunity to work on high-impact BTL campaigns.",
            "Career growth opportunities and exposure to leading brands.",
            "Competitive salary and performance-based incentives."
        ]
    },
    {
        id: "content-writer",
        title: "Content Writer",
        location: "Bengaluru",
        employmentType: "Full Time",
        experience: "2-4 years",
        description: "Ability to create and write engaging content for product presentations, sales presentations, digital campaigns, social media, and more. Strong attention to detail and impeccable research skills are required.",
        responsibilities: [
            "Create content for Product presentations, Sales presentations, Digital campaigns, Social Media, and Web content.",
            "Write quality, professional blog post articles relevant to the brand (Real Estate, Business Centres, Digital Marketing).",
            "Coordinate with internal marketing teams and handle tasks independently.",
            "Proofreading and editing copy before publication.",
            "Stay on top of trends in the digital space."
        ],
        skills: [
            "Ability to convert ideas into writing with clarity.",
            "Effective communication and interpersonal skills.",
            "Aware of Social Media platforms and content creation processes.",
            "Strong attention to detail and impeccable research skills."
        ],
        qualifications: [
            "Bachelor's degree in communications, journalism, marketing, English, or a related field.",
            "2-4 Yrs Experience"
        ],
        additionalInfo: {
            "Office Timings": "09:30 am – 6:30 pm",
            "Saturdays": "2nd & 4th Saturdays Off"
        }
    },
    {
        id: "business-development-associate",
        title: "Business Development Associate",
        location: "Bengaluru",
        employmentType: "Full Time",
        experience: "4-5 years",
        description: "Identifying new opportunities for business growth, pitching company's services, and maintaining fruitful relationships with existing clients. Strong presentation and negotiation skills are essential.",
        responsibilities: [
            "Identifying new opportunities for business growth and pitching services.",
            "Maintaining fruitful relationships with existing clients.",
            "Contacting potential clients via email or phone to establish rapport.",
            "Planning and overseeing new marketing initiatives.",
            "Preparing PowerPoint presentations and sales displays.",
            "Developing proposals to match customer requirements."
        ],
        skills: [
            "Socially adept and professional attitude.",
            "Excellent teamwork spirit and communication skills.",
            "In-depth knowledge of the industry and current events.",
            "Strong presentation and negotiation skills.",
            "Numerical and IT skills."
        ],
        qualifications: [
            "Graduation - B.E./B.Tech. /BBM, BBA/MBA",
            "4-5 Yrs Experience"
        ],
        additionalInfo: {
            "Languages": "English (Fluent), Hindi (Fluent), Kannada, Telugu",
            "Office Timings": "09:30 am – 6:30 pm"
        }
    }
];
