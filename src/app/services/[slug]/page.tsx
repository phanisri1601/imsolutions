'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './ServiceDetail.module.css';
import { serviceData } from '@/data/servicesData';
import { blogPosts } from '@/data/blogPosts';
import { serviceUrlMap } from '@/data/services';
import {
  FaCompass,
  FaLightbulb,
  FaPencilAlt,
  FaBullhorn,
  FaChartBar,
} from 'react-icons/fa';
import { FaCar, FaShoppingCart, FaShoppingBag, FaBuilding, FaLandmark, FaHeartbeat, FaCheckCircle } from 'react-icons/fa';
import FAQ from '@/components/FAQ';

/* ---- image map for service tiles ---- */
const onlineServiceImages: Record<string, string> = {
  'advertising-agency-bangalore': '/online services/Advertising Agency In Banglore.png',
  'digital-marketing-service': '/online services/Digital Marketing Service.png',
  'seo': '/online services/Search Engine Optimization.png',
  'sem': '/online services/Search Engine Marketing.png',
  'online-reputation-management': '/online services/Online Reputation Management.png',
  'website-design-development': '/online services/Web Designing And Development.png',
  'social-media-optimization': '/online services/Social Media Optimization.png',
  'social-media-marketing': '/online services/Social Media Marketing.png',
  'software-design-development': '/online services/Software Design and Development.png',
  'geolocation-sms': '/online services/Geolocation Analytical SMS.png',
  'creative-designing': '/online services/Creative Designing.png',
  'api-integration': '/online services/API Integration.png',
  'ecommerce-solutions': '/online services/Ecommerce Solutions.png',
  'email-marketing': '/online services/Email Marketing.png',
  'mobile-app-development': '/online services/Mobile Application Development.png',
  'real-estate-marketing': '/online services/Real Estate Online Marketing Service.png',
  'display-advertisement': '/online services/Display Advertisement.png',
  'blog-articles': '/online services/Blog Articles.png',
  'classified-portal': '/online services/Classified Portal Management.png',
  'press-releases': '/online services/Press Releases Services.png',
};

const offlineServiceImages: Record<string, string> = {
  'bus-branding': '/offline images/Bus Branding.png',
  'rwa-activation': '/offline images/rwa activation service.png',
  'btl-advertising': '/offline images/btl advertising service.png',
  'mall-advertising': '/offline images/Advertising Activities In Malls & Multiplex service.png',
  'tech-park-ads': '/offline images/Advertisements In Tech Parks.png',
  'airport-advertising': '/offline images/Advertising in Airports.png',
  'paper-insertion': '/offline images/paper insertion.png',
  'cafe-gym-ads': '/offline images/Advertisements In Cafes Gyms & Super Markets.png',
  'atm-ads': '/offline images/Advertisement in ATMs.png',
  'auto-rickshaw-ads': '/offline images/Auto Rickshaw Advertising.png',
  'magazine-ads': '/offline images/Advertisement in Magazines.png',
  'parking-ads': '/offline images/Advertising in Public & Private Parking Lots.png',
  'branding-rebranding': '/offline images/Branding Re-Branding.png',
  'corporate-gifts': '/offline images/Corporate Gifts.png',
  'corporate-training': '/offline images/Corporate Training.png',
  'event-management': '/offline images/Event Management.png',
  'fm-campaigns': '/offline images/FM Campaigns.png',
  'fabrications': '/offline images/Fabrications services.png',
  'hoarding-services': '/offline images/Hoarding Services.png',
  'marketing-collaterals': '/offline images/Marketing Collaterals service.png',
  'startup-marketing': '/offline images/Marketing Services for Start-ups.png',
  'photographic-services': '/offline images/Photographic Services.png',
  'pr-services': '/offline images/PR Services.png',
  'printing-services': '/offline images/Printing Services.png',
  'retail-advertising': '/offline images/retail advertising services.png',
  'real-estate-videography': '/offline images/Real Estate Videography service.png',
  'signage': '/offline images/signage services.png',
};

/* helper: find relevant blogs by matching service title keywords to blog tags/title */
function getRelevantBlogs(serviceTitle: string, count = 3) {
  const keywords = serviceTitle.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const scored = blogPosts.map(post => {
    let score = 0;
    const haystack = `${post.title} ${post.tags?.join(' ') || ''} ${post.excerpt}`.toLowerCase();
    keywords.forEach(kw => { if (haystack.includes(kw)) score++; });
    return { post, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const results = scored.filter(s => s.score > 0).slice(0, count).map(s => s.post);
  // Fallback: if not enough matches, pad with latest posts
  if (results.length < count) {
    const slugs = new Set(results.map(r => r.slug));
    for (const p of blogPosts) {
      if (results.length >= count) break;
      if (!slugs.has(p.slug)) { results.push(p); slugs.add(p.slug); }
    }
  }
  return results;
}

/* helper: get related services from the same category */
function getRelatedServices(currentSlug: string, category: 'online' | 'offline', count = 8) {
  const pool = category === 'online' ? onlineServiceImages : offlineServiceImages;
  const slugToName: Record<string, string> = {};
  Object.entries(serviceUrlMap).forEach(([name, url]) => {
    const s = url.replace('/services/', '');
    slugToName[s] = name;
  });
  return Object.entries(pool)
    .filter(([s]) => s !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
    .map(([s, img]) => ({ slug: s, name: slugToName[s] || s, image: img }));
}

const briefDataMap: Record<string, { tagline: string; title1: string; title2: string; desc: string }> = {
  'seo': {
    tagline: '',
    title1: 'Better Rankings.',
    title2: 'Sustainable Growth.',
    desc: "We don't chase algorithms. We build long-term visibility. That's how real growth happens."
  },
  'sem': {
    tagline: 'SMART SEM.',
    title1: 'More Traffic.',
    title2: 'More Leads.',
    desc: 'Strategic search engine marketing that targets high-intent buyers and maximizes campaign ROI.'
  },
  'advertising-agency-bangalore': {
    tagline: 'SMART ADVERTISING.',
    title1: 'More Reach.',
    title2: 'More Impact.',
    desc: 'Strategic advertising that drives brand awareness, attracts high-value customers, and delivers real growth.'
  },
  'digital-marketing-service': {
    tagline: 'SMART DIGITAL.',
    title1: 'More Engagement.',
    title2: 'More Growth.',
    desc: 'Strategic digital marketing that connects your brand with the right audience and drives conversions.'
  },
  'online-reputation-management': {
    tagline: 'SMART ORM.',
    title1: 'More Trust.',
    title2: 'More Control.',
    desc: 'Strategic brand monitoring that highlights positive customer experiences and repairs online trust.'
  },
  'website-design-development': {
    tagline: 'SMART DESIGN.',
    title1: 'More Clicks.',
    title2: 'More Customers.',
    desc: 'Strategic website design that creates intuitive user experiences, fast performance, and drives growth.'
  },
  'social-media-optimization': {
    tagline: 'SMART SMO.',
    title1: 'More Followers.',
    title2: 'More Influence.',
    desc: 'Strategic social media optimization that increases brand recall, expands reach, and builds community.'
  },
  'social-media-marketing': {
    tagline: 'SMART SMM.',
    title1: 'More Connections.',
    title2: 'More Sales.',
    desc: 'Strategic social media campaigns that engage your audience and build lasting brand loyalty.'
  },
  'software-design-development': {
    tagline: 'SMART CODE.',
    title1: 'More Power.',
    title2: 'More Efficiency.',
    desc: 'Strategic custom software development designed to automate tasks, improve workflows, and scale.'
  },
  'geolocation-sms': {
    tagline: 'SMART SMS.',
    title1: 'More Targets.',
    title2: 'More Responses.',
    desc: 'Strategic geolocation analytical SMS campaigns that deliver timely updates directly to local users.'
  },
  'creative-designing': {
    tagline: 'SMART CREATIVE.',
    title1: 'More Style.',
    title2: 'More Identity.',
    desc: 'Strategic creative designing services to establish a striking brand identity across print and digital media.'
  },
  'api-integration': {
    tagline: 'SMART API.',
    title1: 'More Synergy.',
    title2: 'More Automation.',
    desc: 'Strategic API integration services connecting your backend databases, custom web apps and services.'
  },
  'ecommerce-solutions': {
    tagline: 'SMART COMMERCE.',
    title1: 'More Orders.',
    title2: 'More Growth.',
    desc: 'Strategic e-commerce solutions that optimize product pages, shopping checkout flows and boost sales.'
  },
  'email-marketing': {
    tagline: 'SMART EMAIL.',
    title1: 'More Inboxes.',
    title2: 'More Clicks.',
    desc: 'Strategic email marketing campaigns that engage users, nurture prospects, and generate inbound sales.'
  },
  'mobile-app-development': {
    tagline: 'SMART APP.',
    title1: 'More Installs.',
    title2: 'More Mobility.',
    desc: 'Strategic mobile app development delivering premium native iOS and Android apps for modern enterprises.'
  },
  'real-estate-marketing': {
    tagline: 'SMART PROPERTY.',
    title1: 'More Inquiries.',
    title2: 'More Bookings.',
    desc: 'Strategic real estate online marketing designed to showcase properties and deliver high-intent homebuyers.'
  },
  'display-advertisement': {
    tagline: 'SMART DISPLAY.',
    title1: 'More Impressions.',
    title2: 'More Actions.',
    desc: 'Strategic display advertisements positioned on high-traffic sites to captivate and convert web audiences.'
  },
  'blog-articles': {
    tagline: 'SMART CONTENT.',
    title1: 'More Readers.',
    title2: 'More Authority.',
    desc: 'Strategic blog article development that boosts organic search traffic, positioning your brand as a leader.'
  },
  'classified-portal': {
    tagline: 'SMART PORTAL.',
    title1: 'More Listings.',
    title2: 'More Transactions.',
    desc: 'Strategic classified portal management facilitating seamless peer-to-peer listings and deals.'
  },
  'press-releases': {
    tagline: 'SMART PR.',
    title1: 'More Coverage.',
    title2: 'More Trust.',
    desc: 'Strategic press releases targeting leading publications to broadcast your milestones and brand stories.'
  },
  'bus-branding': {
    tagline: 'SMART TRANSIT.',
    title1: 'More Eyes.',
    title2: 'More Impact.',
    desc: 'Strategic BMTC and KSRTC bus branding campaigns delivering high-impact visual reach across the city.'
  },
  'rwa-activation': {
    tagline: 'SMART LOCAL.',
    title1: 'More Residents.',
    title2: 'More Trust.',
    desc: 'Strategic RWA activation campaigns delivering direct on-ground resident engagement in premium societies.'
  },
  'btl-advertising': {
    tagline: 'SMART ACTIVATION.',
    title1: 'More Ground.',
    title2: 'More Engagement.',
    desc: 'Strategic below-the-line advertising campaigns built to drive personal, experiential customer reactions.'
  },
  'mall-advertising': {
    tagline: 'SMART MALL.',
    title1: 'More Footfalls.',
    title2: 'More Shoppers.',
    desc: 'Strategic advertising activities in malls and multiplexes designed to target ready-to-buy consumers.'
  },
  'tech-park-ads': {
    tagline: 'SMART CORPORATE.',
    title1: 'More Professionals.',
    title2: 'More B2B.',
    desc: 'Strategic advertisement in tech parks positioning your solution directly in front of corporate buyers.'
  },
  'airport-advertising': {
    tagline: 'SMART TRAVEL.',
    title1: 'More Premium.',
    title2: 'More Global.',
    desc: 'Strategic airport advertising putting your messaging before highly affluent travelers and executives.'
  },
  'paper-insertion': {
    tagline: 'SMART PRINT.',
    title1: 'More Homes.',
    title2: 'More Leads.',
    desc: 'Strategic newspaper insert distribution designed to achieve rapid, local household penetration.'
  },
  'cafe-gym-ads': {
    tagline: 'SMART LIFESTYLE.',
    title1: 'More Members.',
    title2: 'More Local.',
    desc: 'Strategic ads in cafes, gyms, and supermarkets targeting urban consumers during daily activities.'
  },
  'atm-ads': {
    tagline: 'SMART TRANSACTION.',
    title1: 'More Eyeballs.',
    title2: 'More Impact.',
    desc: 'Strategic advertisement in ATMs grabbing high-attention moments during cash transactions.'
  },
  'auto-rickshaw-ads': {
    tagline: 'SMART TRANSIT.',
    title1: 'More Streets.',
    title2: 'More Mass.',
    desc: 'Strategic auto rickshaw transit advertising driving your brand value across all residential areas.'
  },
  'magazine-ads': {
    tagline: 'SMART MAGAZINE.',
    title1: 'More Readers.',
    title2: 'More Premium.',
    desc: 'Strategic print advertising placements inside leading lifestyle, business, and tech magazines.'
  },
  'parking-ads': {
    tagline: 'SMART PARKING.',
    title1: 'More Drivers.',
    title2: 'More Attention.',
    desc: 'Strategic advertising in public and private parking lots capturing high-exposure driver dwell time.'
  },
  'branding-re-branding': {
    tagline: 'SMART BRAND.',
    title1: 'More Identity.',
    title2: 'More Recall.',
    desc: 'Strategic brand identity consulting and rebranding packages designed for the modern marketplace.'
  },
  'corporate-gifts': {
    tagline: 'SMART GIFTS.',
    title1: 'More Loyalty.',
    title2: 'More Smiles.',
    desc: 'Strategic corporate gifts selection that deepens relationship trust with clients and employees.'
  },
  'corporate-training': {
    tagline: 'SMART TRAINING.',
    title1: 'More Skills.',
    title2: 'More Power.',
    desc: 'Strategic corporate training programs upskilling your workforce in digital, sales, and strategy.'
  },
  'event-management': {
    tagline: 'SMART EVENTS.',
    title1: 'More Buzz.',
    title2: 'More Memories.',
    desc: 'Strategic corporate and brand event management services that ensure flawless, premium executions.'
  },
  'fm-campaigns': {
    tagline: 'SMART RADIO.',
    title1: 'More Listeners.',
    title2: 'More Tune-Ins.',
    desc: 'Strategic FM radio campaigns delivering memorable, catchy audio spots across popular stations.'
  },
  'fabrications': {
    tagline: 'SMART SIGN.',
    title1: 'More Presence.',
    title2: 'More Quality.',
    desc: 'Strategic design fabrication services creating premium event setups, custom retail racks, and booths.'
  },
  'hoarding-services': {
    tagline: 'SMART OUTDOOR.',
    title1: 'More Scale.',
    title2: 'More Prominence.',
    desc: 'Strategic outdoor hoarding billboard placements positioned at major high-traffic intersections.'
  },
  'marketing-collaterals': {
    tagline: 'SMART PRINT.',
    title1: 'More Collaterals.',
    title2: 'More Quality.',
    desc: 'Strategic marketing collateral design producing premium brochures, flyers, and sales pitches.'
  },
  'startup-marketing': {
    tagline: 'SMART STARTUP.',
    title1: 'More Traction.',
    title2: 'More Growth.',
    desc: 'Strategic startup marketing plans tailored to accelerate user acquisition and venture funding.'
  },
  'photographic-services': {
    tagline: 'SMART PHOTO.',
    title1: 'More Focus.',
    title2: 'More Detail.',
    desc: 'Strategic commercial photography capturing crisp product shots, corporate events, and portfolios.'
  },
  'pr-services': {
    tagline: 'SMART PR.',
    title1: 'More Presence.',
    title2: 'More Authority.',
    desc: 'Strategic public relations campaigns that build trust and position your executives as leaders.'
  },
  'printing-services': {
    tagline: 'SMART PRINT.',
    title1: 'More Detail.',
    title2: 'More Precision.',
    desc: 'Strategic printing services delivering high-quality print banners, brochures, and corporate kits.'
  },
  'retail-advertising': {
    tagline: 'SMART RETAIL.',
    title1: 'More Shoppers.',
    title2: 'More Sales.',
    desc: 'Strategic retail advertising solutions driving point-of-sale display recall and local shopper traffic.'
  },
  'real-estate-videography': {
    tagline: 'SMART VIDEO.',
    title1: 'More Angles.',
    title2: 'More Interest.',
    desc: 'Strategic real estate videography utilizing drone shots and walk-throughs to highlight properties.'
  },
  'signage': {
    tagline: 'SMART SIGN.',
    title1: 'More Standout.',
    title2: 'More Presence.',
    desc: 'Strategic outdoor and indoor signage fabrication ensuring maximum visibility and premium branding.'
  }
};


/* =============================================
   Service Content Map (from IM_Solutions_SEO_Refined_Service_Content.docx)
   ============================================= */
interface ServiceContent {
  intro: string;
  capabilitiesTitle: string;
  capabilities: string[];
  bodyBlocks: { heading: string; text: string }[];
  why: string;
  cta: string;
}

const serviceContentMap: Record<string, ServiceContent> = {
  'advertising-agency-bangalore': {
    intro: 'Advertising works best when every idea has a clear commercial purpose. IM Solutions is an advertising agency in Bangalore that brings strategy, creative thinking, production and media planning together to help brands earn attention and translate it into meaningful business momentum. We begin by understanding your audience, market, positioning and growth priorities. This clarity shapes the campaign idea, message, visual language and channel mix, ensuring that every execution feels consistent, relevant and unmistakably connected to your brand.',
    capabilitiesTitle: 'Integrated advertising capabilities',
    capabilities: [
      'Brand and campaign strategy',
      'Creative concepts, copy and visual direction',
      'Digital, print, outdoor and on-ground advertising',
      'Media planning and campaign deployment',
      'Campaign adaptations across formats and platforms',
      'Performance review and creative optimisation',
    ],
    bodyBlocks: [
      {
        heading: 'Ideas designed to move the market',
        text: 'Whether you are launching a new brand, introducing a product, entering a new market or refreshing an established identity, we build campaigns around the action you want audiences to take. Our integrated model reduces fragmentation between strategy, design and media, helping your communication remain focused from the first concept to the final placement. Creativity is supported by audience insight, competitive context and disciplined execution. The result is advertising that not only looks distinctive, but also strengthens recall, communicates value clearly and supports measurable marketing objectives.',
      },
      {
        heading: 'Built for brands at pivotal moments',
        text: 'This service is particularly valuable for launches, repositioning, seasonal campaigns and categories where brand distinction is essential. By connecting the central idea to every audience touchpoint, we help reduce message dilution and create campaigns that can be recognised, adapted and remembered across channels.',
      },
    ],
    why: 'Strategy, creative development, production and media planning are considered together, giving the campaign a stronger central idea and greater consistency from concept to rollout.',
    cta: 'Planning your next campaign? Speak with IM Solutions to build advertising that is strategically sharp, creatively compelling and ready to perform.',
  },
  'digital-marketing-service': {
    intro: 'Digital growth rarely comes from a single channel. It comes from a connected system in which search, content, social media, paid advertising, email and landing experiences work toward the same commercial goal. IM Solutions provides digital marketing services in Bangalore designed to turn online visibility into qualified demand. Every engagement begins with a clear view of your brand, customers, competitors, sales cycle and current performance. We then prioritise the channels and messages most likely to create impact, instead of spreading budgets across disconnected activities.',
    capabilitiesTitle: 'A connected digital growth engine',
    capabilities: [
      'Search engine optimisation and content strategy',
      'Paid search, social and display advertising',
      'Social media strategy and community engagement',
      'Email marketing and lead-nurturing journeys',
      'Landing-page and conversion optimisation',
      'Analytics, reporting and ongoing campaign refinement',
    ],
    bodyBlocks: [
      {
        heading: 'From attention to measurable opportunity',
        text: 'Our team aligns creative communication with audience targeting and performance data. Campaigns are continuously reviewed against meaningful metrics such as qualified enquiries, conversion rate, cost per lead and revenue contribution—not vanity metrics alone. This integrated approach helps brands improve discoverability, build trust across the customer journey and create a more predictable pipeline of opportunities. From market entry and lead generation to e-commerce growth and brand building, every strategy is shaped around the outcomes that matter to your business.',
      },
      {
        heading: 'A strategy that can evolve with the business',
        text: 'The channel mix can expand or contract as performance, budgets and priorities change. This makes the approach suitable for growing businesses that need stronger lead generation as well as established brands seeking better coordination, attribution and efficiency across their digital marketing activity.',
      },
    ],
    why: 'Our integrated team connects channel strategy, content, media and analytics, helping businesses avoid fragmented execution and make decisions with a clearer view of the complete customer journey.',
    cta: 'Turn your digital presence into a growth channel. Connect with IM Solutions for a focused, data-informed marketing strategy.',
  },
  'seo': {
    intro: 'When potential customers search for a solution, your brand should be easy to find and worth choosing. IM Solutions provides SEO services in Bangalore that improve search visibility, attract relevant audiences and turn organic discovery into sustained business opportunity. Our approach goes beyond ranking isolated keywords. We examine search intent, website structure, technical performance, content quality, internal linking and authority signals to build a stronger search presence across the full customer journey.',
    capabilitiesTitle: 'End-to-end search optimisation',
    capabilities: [
      'Keyword, competitor and search-intent research',
      'Technical SEO audits and issue resolution',
      'On-page optimisation and internal linking',
      'Content planning, creation and content refreshes',
      'Local SEO and location-page optimisation',
      'Authority-building, reporting and opportunity tracking',
    ],
    bodyBlocks: [
      {
        heading: 'Sustainable visibility, not temporary rankings',
        text: 'SEO is an ongoing growth discipline. Search behaviour, competing content and website requirements continue to evolve, so we regularly review performance and refine priorities. Every recommendation is designed to improve both search-engine understanding and the experience of the people visiting your site. We follow ethical, long-term practices and avoid shortcuts that can undermine credibility. The objective is not traffic for its own sake; it is to attract the right visitors, answer their questions with clarity and guide them toward an enquiry, purchase or meaningful next step.',
      },
      {
        heading: 'Organic growth that supports the sales journey',
        text: 'A strong search presence can reduce dependence on paid acquisition while creating valuable entry points for different stages of consideration. We connect informational, commercial and local search opportunities so that content can attract early researchers, solution-aware prospects and customers ready to enquire.',
      },
    ],
    why: 'Technical specialists, content strategists and marketers work from one roadmap, allowing recommendations to reflect both search requirements and the commercial priorities of the website.',
    cta: 'Build an organic growth foundation that compounds over time. Speak with our SEO team about your current visibility and growth opportunities.',
  },
  'sem': {
    intro: 'Paid search places your brand in front of people who are already looking for a product, service or solution. IM Solutions provides search engine marketing services in Bangalore that help businesses capture high-intent demand, generate qualified leads and use advertising budgets more efficiently. We structure campaigns around search behaviour, commercial priorities and conversion potential. From keyword selection to landing-page alignment, every element is designed to reduce wasted spend and make the path from search to action as clear as possible.',
    capabilitiesTitle: 'Performance-focused paid search management',
    capabilities: [
      'Keyword planning and search-intent mapping',
      'Google Ads campaign structure and setup',
      'Ad copy, assets and extension planning',
      'Landing-page and conversion-path alignment',
      'Remarketing and audience strategy',
      'Bid, budget and cost-per-acquisition optimisation',
    ],
    bodyBlocks: [
      {
        heading: 'Optimised beyond the click',
        text: 'Launching a campaign is only the beginning. We review search terms, device and location performance, conversion quality, cost trends and audience behaviour to identify where budget should be protected, reduced or scaled. Clear tracking helps connect campaign activity with real enquiries, purchases and sales outcomes. Whether your priority is lead generation, e-commerce sales, local visibility or a time-sensitive launch, we create a paid search strategy matched to your market, competition and budget.',
      },
      {
        heading: 'Suitable for immediate, accountable demand generation',
        text: 'SEM is especially effective when businesses need faster market visibility, high-intent leads or support for a defined offer or launch. Clear conversion tracking also creates useful market intelligence, revealing the search terms, messages and audience segments most closely associated with action.',
      },
    ],
    why: 'Campaign strategy, ad communication, landing experience and reporting are reviewed together, creating tighter accountability between advertising spend and the quality of the resulting action.',
    cta: 'Reach customers at the moment of intent. Connect with IM Solutions for a paid search strategy built around conversion, not clicks alone.',
  },
  'online-reputation-management': {
    intro: 'Customers often form an opinion about a business before speaking to its team. Search results, reviews, social conversations and published content all influence confidence. IM Solutions provides online reputation management services in Bangalore to help brands understand, strengthen and protect their digital presence. Our work begins with a structured view of how your brand appears across relevant online touchpoints. We identify reputation risks, recurring customer concerns, content gaps and opportunities to build a more credible and balanced digital narrative.',
    capabilitiesTitle: 'A proactive reputation framework',
    capabilities: [
      'Brand mention and review monitoring',
      'Reputation audits across search and social channels',
      'Review-response guidelines and escalation planning',
      'Positive content and credibility-building strategy',
      'Search-result improvement through ethical content practices',
      'Reporting, sentiment review and ongoing recommendations',
    ],
    bodyBlocks: [
      {
        heading: 'Credibility built through clarity and consistency',
        text: 'Effective ORM is not about suppressing valid criticism. It is about listening carefully, responding professionally and ensuring that accurate, useful information about the brand is easy to discover. Transparent communication and consistent customer engagement can turn reputation management into a long-term trust advantage. We work with businesses to establish responsible processes for monitoring, response and content development, helping internal teams address concerns faster while strengthening the quality of the brand\'s public presence.',
      },
      {
        heading: 'A stronger foundation for customer trust',
        text: 'A well-managed reputation supports more than crisis response. It can improve the confidence of prospective customers, partners and employees while giving leadership a clearer view of recurring feedback. The goal is a digital presence that is resilient, credible and easier to manage over time.',
      },
    ],
    why: 'We combine monitoring, content, search and communication strategy, enabling brands to respond thoughtfully while building a stronger body of credible information around the business.',
    cta: 'Strengthen the confidence surrounding your brand. Speak with IM Solutions for a discreet, responsible and long-term reputation strategy.',
  },
  'website-design-development': {
    intro: 'Your website is often the first place a prospective customer evaluates your credibility. It must communicate your value quickly, feel effortless to navigate and make the next step obvious. IM Solutions provides website design and development services in Bangalore that bring brand expression, user experience and technical performance into one cohesive platform. We design around real user journeys and business objectives—not visual trends alone. The result is a website that looks distinctive, works smoothly across devices and supports marketing, sales and long-term growth.',
    capabilitiesTitle: 'Web experiences built for people and performance',
    capabilities: [
      'Information architecture and user-journey planning',
      'UI/UX design and responsive development',
      'Corporate websites, landing pages and custom platforms',
      'E-commerce and lead-generation website development',
      'SEO-ready structure, speed and accessibility considerations',
      'Redesigns, integrations and ongoing enhancements',
    ],
    bodyBlocks: [
      {
        heading: 'Every page should earn its place',
        text: 'Our process moves from discovery and content structure to visual design, development, testing and deployment. We consider how visitors arrive, what information they need and where friction may prevent them from enquiring, purchasing or engaging further. Clean code, scalable architecture, security, usability and content manageability are considered from the outset. Whether you are building a new website or transforming an outdated one, we create a digital experience that strengthens the brand and performs as an active business asset.',
      },
      {
        heading: 'A platform ready for marketing and sales',
        text: 'The website can be structured to support organic search, paid campaigns, content publishing and lead capture without creating separate, disconnected experiences. This gives marketing teams a more flexible foundation and helps sales teams receive enquiries with better context and clearer intent.',
      },
    ],
    why: 'Brand, content, UX, development and digital marketing perspectives are brought into the same process, reducing the gaps that often weaken a website after launch.',
    cta: 'Build a website that looks refined and works harder. Connect with IM Solutions to plan your next digital experience.',
  },
  'social-media-optimization': {
    intro: 'A strong social presence is built through more than frequent posting. Profiles, content formats, visual consistency, publishing rhythm and audience interaction must work together. IM Solutions provides social media optimization services in Bangalore that help brands improve organic visibility and present themselves with greater clarity across relevant platforms. We analyse your existing presence, audience behaviour, competitive context and content performance to identify what should be refined, strengthened or removed.',
    capabilitiesTitle: 'Optimisation across the social ecosystem',
    capabilities: [
      'Profile setup, positioning and information refinement',
      'Platform-specific content pillars and formats',
      'Publishing cadence and content-calendar planning',
      'Hashtag, caption and discoverability optimisation',
      'Visual consistency and tone-of-voice alignment',
      'Community engagement and performance review',
    ],
    bodyBlocks: [
      {
        heading: 'Consistency that builds recognition',
        text: 'Each platform has a different audience mindset. We preserve a coherent brand identity while adapting the presentation, format and message to suit Instagram, Facebook, LinkedIn, YouTube and other relevant channels. This makes the brand recognisable without making every platform feel identical. Performance insights guide ongoing improvements to content themes, formats and posting decisions. Over time, this helps the brand create a more useful, engaging and discoverable social presence that supports wider marketing objectives.',
      },
      {
        heading: 'Organic visibility with a more coherent brand presence',
        text: 'SMO is ideal for brands that already publish regularly but lack consistency, reach or platform clarity. A stronger foundation makes future content easier to plan, helps audiences recognise the brand faster and creates a more credible profile for paid campaigns and influencer collaborations.',
      },
    ],
    why: 'Creative direction and performance insight are handled as one continuous process, helping the brand become more consistent without losing the flexibility each platform requires.',
    cta: 'Refine your organic social presence with a strategy built for consistency, relevance and stronger audience connection.',
  },
  'social-media-marketing': {
    intro: 'Social media shapes how customers discover brands, evaluate relevance and decide whom to trust. IM Solutions provides social media marketing services in Bangalore that combine content, creative production, paid media and community engagement to turn attention into meaningful business relationships. Every strategy is built around your audience, category, brand personality and commercial goals. We avoid one-size-fits-all content formulas and focus on the platforms, formats and conversations that can genuinely influence your market.',
    capabilitiesTitle: 'Complete social media campaign management',
    capabilities: [
      'Platform and audience strategy',
      'Content pillars, calendars and campaign concepts',
      'Reels, static creatives, carousels and video assets',
      'Paid social advertising and audience targeting',
      'Community engagement and response workflows',
      'Analytics, reporting and ongoing optimisation',
    ],
    bodyBlocks: [
      {
        heading: 'Creative relevance with commercial direction',
        text: 'Our team develops communication designed for the behaviour of each platform while keeping the brand\'s identity consistent. Paid and organic activity are planned together so that strong content can be amplified and audience insights can improve future creative decisions. Campaigns are reviewed against reach quality, engagement, traffic, leads and conversion behaviour. This creates a more disciplined social presence—one that builds recognition, encourages participation and supports customer acquisition over time.',
      },
      {
        heading: 'Built for sustained audience and business growth',
        text: 'The service can support always-on brand building, product launches, recruitment, lead generation and e-commerce activity. By learning from both organic response and paid performance, we create a feedback loop that helps future campaigns become more relevant and commercially focused.',
      },
    ],
    why: 'Our content, design and media teams work from a shared strategy, allowing organic communication and paid promotion to strengthen one another instead of operating separately.',
    cta: 'Make social media a strategic growth channel. Speak with IM Solutions about content and campaigns built to connect and convert.',
  },
  'software-design-development': {
    intro: 'Technology should remove friction, improve visibility and support better decisions. IM Solutions provides custom software development services for organisations that need digital solutions aligned with their workflows, users and growth plans. We begin with the business problem—not a predetermined technology stack. By mapping requirements, processes, integrations and future needs, we create software that fits the way your organisation operates while remaining adaptable as priorities evolve.',
    capabilitiesTitle: 'Software designed around real operations',
    capabilities: [
      'Custom business and workflow applications',
      'Web-based and database-driven platforms',
      'Enterprise solutions and system integrations',
      'Cloud-enabled applications and dashboards',
      'Legacy application modernisation',
      'Testing, deployment and ongoing enhancement',
    ],
    bodyBlocks: [
      {
        heading: 'Reliable architecture, intuitive experience',
        text: 'Our development process covers discovery, solution architecture, interface design, development, quality assurance and deployment. Usability, security, performance, maintainability and scalability are considered throughout—not added as afterthoughts. Close collaboration with stakeholders helps reduce ambiguity and keeps the solution connected to measurable operational value. The outcome is software that simplifies work, reduces manual dependency and creates a stronger foundation for digital growth.',
      },
      {
        heading: 'Technology that creates operational leverage',
        text: 'Custom software is most valuable where spreadsheets, manual handovers or disconnected tools are limiting scale. A purpose-built solution can improve process visibility, standardise important workflows and give teams more time to focus on higher-value decisions and customer outcomes.',
      },
    ],
    why: 'Business understanding, interface design and technical development remain connected throughout the project, helping the final solution stay practical for both users and administrators.',
    cta: 'Transform a complex process into a practical digital solution. Connect with IM Solutions to discuss your software requirement.',
  },
  'geolocation-sms': {
    intro: 'Mobile communication becomes more useful when the message is relevant to the recipient\'s context. IM Solutions provides Geolocation Analytical SMS solutions that help businesses plan more focused campaigns around defined geographic markets and compliant audience segments. Rather than treating SMS as indiscriminate mass communication, we help align the audience, message, timing and campaign objective. This is particularly valuable for regional promotions, store launches, events, local services and market-specific communication.',
    capabilitiesTitle: 'Focused mobile campaign support',
    capabilities: [
      'Campaign objective and audience planning',
      'Geographic and relevant segment definition',
      'Message strategy and concise copy development',
      'Campaign execution and scheduling support',
      'Delivery and response-performance analysis',
      'Consent, privacy and communication-compliance considerations',
    ],
    bodyBlocks: [
      {
        heading: 'Relevance without compromising responsibility',
        text: 'Campaign parameters depend on the availability and lawful use of appropriate data. We plan communication with respect for applicable consent, privacy and messaging requirements, while helping brands avoid irrelevant outreach that can weaken trust. Clear messages, carefully selected markets and post-campaign analysis make SMS a more purposeful part of an integrated marketing plan. When used responsibly, it can support timely awareness and action at a local or regional level.',
      },
      {
        heading: 'Best used as part of an integrated local strategy',
        text: 'Location-led SMS can complement digital advertising, retail activity, events and regional sales initiatives. Its strength lies in timely, concise communication; it should therefore be deployed selectively, with a clear reason for contact and a simple action the recipient can understand immediately.',
      },
    ],
    why: 'Audience planning, message development and campaign analysis are coordinated within one workflow, helping businesses use mobile communication with greater clarity and control.',
    cta: 'Plan a more relevant mobile outreach campaign with clear targeting, concise communication and responsible execution.',
  },
  'creative-designing': {
    intro: 'Design shapes how quickly a brand is understood, remembered and trusted. IM Solutions provides creative design services in Bangalore that turn strategy and ideas into visual communication with clarity, character and purpose. Every creative is developed around the platform, audience and communication objective. We balance visual impact with disciplined hierarchy, ensuring that the message remains easy to absorb across digital and physical touchpoints.',
    capabilitiesTitle: 'Creative support across brand touchpoints',
    capabilities: [
      'Advertising and campaign creatives',
      'Social media design systems and content assets',
      'Brochures, presentations and marketing collateral',
      'Packaging, banners and point-of-sale communication',
      'Illustrations, infographics and visual storytelling',
      'Campaign adaptations and multi-format production',
    ],
    bodyBlocks: [
      {
        heading: 'Distinctive design, consistent brand expression',
        text: 'We do not rely on generic templates or decoration without meaning. Typography, imagery, composition, colour and copy are brought together to express the right idea and create a recognisable visual language. From a single launch creative to an ongoing communication system, our team combines design craft with marketing awareness. This helps brands communicate more confidently, maintain consistency and create work that feels relevant to both the audience and the medium.',
      },
      {
        heading: 'Design systems that improve speed and consistency',
        text: 'For brands with recurring content needs, we can establish reusable visual principles and adaptable formats without making the work feel repetitive. This improves production efficiency, protects brand recognition and gives campaigns enough flexibility to remain fresh across multiple channels.',
      },
    ],
    why: 'Because our designers work closely with strategists and marketers, each visual is shaped not only for aesthetic quality but also for message clarity and platform performance.',
    cta: 'Give your next campaign a stronger visual voice. Connect with IM Solutions for creative design that is refined, relevant and memorable.',
  },
  'api-integration': {
    intro: 'Business systems create more value when they communicate reliably. IM Solutions provides API integration services that connect applications, platforms and databases, helping organisations reduce manual work and create smoother digital workflows. We design each integration around the business process, data requirements and technical environment. The objective is not simply to connect two systems, but to ensure that information moves securely, accurately and consistently.',
    capabilitiesTitle: 'Integration across your digital ecosystem',
    capabilities: [
      'Custom API design and development',
      'Third-party API integration',
      'CRM, ERP and business-platform connectivity',
      'Payment gateway and e-commerce integrations',
      'Cloud, analytics and communication-tool integrations',
      'API documentation, testing and maintenance support',
    ],
    bodyBlocks: [
      {
        heading: 'Secure connections built for continuity',
        text: 'Our developers consider authentication, permissions, data mapping, error handling, rate limits, performance and scalability throughout implementation. Clear documentation and testing make the integration easier to maintain and extend. Whether you are connecting an existing website to a CRM, enabling payments, synchronising operational systems or building a larger platform ecosystem, we create integration solutions that improve efficiency and support long-term technical stability.',
      },
      {
        heading: 'Integration that supports better customer and team experiences',
        text: 'Reliable connectivity can remove repeated data entry, shorten response times and reduce inconsistencies between systems. It also creates the technical foundation for automation, real-time reporting and more seamless experiences across sales, service, finance and operations.',
      },
    ],
    why: 'Our integration work is planned with the wider product and operational environment in mind, reducing technical isolation and making future development easier to manage.',
    cta: 'Connect your systems and simplify the flow of information. Speak with IM Solutions about your API integration requirements.',
  },
  'ecommerce-solutions': {
    intro: 'An effective online store makes discovery, evaluation and purchase feel effortless. IM Solutions provides e-commerce development services in Bangalore for businesses that need secure, scalable and intuitive digital sales experiences. We design around the complete customer journey as well as the operational realities behind it. Product structure, payments, inventory, shipping and administration are planned together so that the platform works for both shoppers and internal teams.',
    capabilitiesTitle: 'Complete e-commerce platform development',
    capabilities: [
      'Storefront strategy, UX and responsive design',
      'Product catalogues, search and filtering',
      'Cart, checkout and payment gateway integration',
      'Order, inventory and shipping workflows',
      'Customer accounts and administrative dashboards',
      'SEO readiness, analytics, security and scalability',
    ],
    bodyBlocks: [
      {
        heading: 'Designed to reduce friction and support growth',
        text: 'We consider how customers discover products, compare options, understand value and complete transactions across devices. Clear navigation, strong product presentation and a streamlined checkout can improve confidence and reduce abandonment. Behind the experience, we build for reliability and manageability. Whether you are launching a new online business or upgrading an existing store, the platform is structured to support evolving product ranges, campaigns, integrations and customer expectations.',
      },
      {
        heading: 'A digital storefront aligned with commercial priorities',
        text: 'The platform can support direct-to-consumer growth, new product launches, regional expansion and omnichannel operations. We prioritise the features that influence customer confidence and operational control, helping the business scale without compromising the shopping experience.',
      },
    ],
    why: 'Design, development, marketing and integration requirements are considered together, allowing the storefront and its supporting operations to evolve as one connected commerce system.',
    cta: 'Create an e-commerce experience built to convert and scale. Connect with IM Solutions to plan your online store.',
  },
  'email-marketing': {
    intro: 'Email gives brands a direct, measurable way to nurture prospects and deepen customer relationships. IM Solutions provides email marketing services in Bangalore that deliver relevant communication at the right stage of the customer journey. We focus on purposeful segmentation and clear messaging rather than sending the same communication to every contact. Each campaign is aligned with a specific action, whether that is an enquiry, purchase, renewal, event registration or return visit.',
    capabilitiesTitle: 'Campaigns built around the customer lifecycle',
    capabilities: [
      'Email strategy and audience segmentation',
      'Newsletters and promotional campaigns',
      'Automated lead-nurturing and customer journeys',
      'Campaign copy, design and call-to-action planning',
      'List hygiene and deliverability considerations',
      'Performance reporting and optimisation',
    ],
    bodyBlocks: [
      {
        heading: 'Relevant communication earns attention',
        text: 'Subject lines, content hierarchy, visual design, timing and landing destinations are developed as one connected experience. We review opens, clicks, conversions and audience behaviour to understand what is working and where communication can be improved. Used consistently, email becomes more than a promotional channel. It can educate prospects, recover missed opportunities, support retention and create repeat business while giving the brand greater ownership of its customer relationships.',
      },
      {
        heading: 'A channel that becomes more valuable over time',
        text: 'As audience data and engagement history grow, campaigns can become more relevant and efficient. A structured email programme also reduces dependence on rented media platforms by creating a direct communication channel the business can continue to develop.',
      },
    ],
    why: 'Strategy, writing, design, automation and reporting are developed within one campaign framework, creating a more coherent experience from inbox to landing page.',
    cta: 'Build an email programme that nurtures interest into action. Speak with IM Solutions about campaigns and automated journeys.',
  },
  'mobile-app-development': {
    intro: 'A successful mobile application solves a real need with speed, clarity and reliability. IM Solutions provides mobile app development services in Bangalore for businesses creating customer-facing applications, operational tools and connected digital products. We do not simply compress a website into a smaller screen. User journeys, interface behaviour, architecture, performance and integrations are designed specifically for the mobile context.',
    capabilitiesTitle: 'From product concept to application launch',
    capabilities: [
      'Product discovery and feature prioritisation',
      'UI/UX design and interactive prototypes',
      'Android, iOS and cross-platform development',
      'Business, e-commerce and customer-service applications',
      'API, payment and platform integrations',
      'Testing, deployment and future enhancement',
    ],
    bodyBlocks: [
      {
        heading: 'Built for adoption, performance and scale',
        text: 'Our process begins by defining users, use cases and the value the application must deliver. Features are organised around the most important journeys, helping reduce unnecessary complexity and create a cleaner experience. Technical decisions consider security, maintainability, device performance and future growth. From planning and design to development and release, we work closely with stakeholders to create a mobile product that is useful today and capable of evolving tomorrow.',
      },
      {
        heading: 'A product roadmap beyond version one',
        text: 'Successful applications improve through real user feedback. We plan the initial release around essential value, then use adoption and performance insights to guide future features. This reduces unnecessary complexity and gives the product a clearer path to sustainable growth.',
      },
    ],
    why: 'Product thinking, interface design, development and integration are handled as a connected discipline, giving stakeholders one clear path from concept to release.',
    cta: 'Turn your application idea into a purposeful mobile product. Connect with IM Solutions to discuss scope, users and technical direction.',
  },
  'display-advertisement': {
    intro: 'Display advertising keeps your brand visible beyond the search results and social feed. IM Solutions creates display advertising campaigns that combine audience targeting, compelling visual communication and continuous optimisation to support awareness, consideration and conversion. Campaigns are planned around where the audience is in the decision journey. This allows creative, messaging and targeting to change between prospecting, product promotion and remarketing activity.',
    capabilitiesTitle: 'Strategic display campaign management',
    capabilities: [
      'Audience, contextual and placement strategy',
      'Banner, responsive and rich-media creative direction',
      'Prospecting and remarketing campaigns',
      'Location, interest and behaviour-based targeting',
      'Landing-page and conversion tracking alignment',
      'Performance analysis and creative optimisation',
    ],
    bodyBlocks: [
      {
        heading: 'Visual impact with performance discipline',
        text: 'We evaluate impressions, viewability, clicks, conversions, frequency and campaign costs to understand whether the advertising is reaching the right people with the right message. Targeting and creative are refined to reduce fatigue and improve efficiency. Display can support a product launch, maintain brand presence, re-engage website visitors or strengthen a broader digital campaign. Our approach ensures it is connected to a defined objective rather than treated as background visibility alone.',
      },
      {
        heading: 'A versatile layer within the media mix',
        text: 'Display works particularly well when customers need repeated exposure before acting. It can introduce a brand to new audiences, reinforce key messages during consideration and bring previous visitors back with communication connected to their interests or behaviour.',
      },
    ],
    why: 'Creative production and media optimisation sit within the same team, allowing performance findings to influence the next message, format and audience decision more quickly.',
    cta: 'Extend your reach with display campaigns designed for relevance, recall and measurable action.',
  },
  'real-estate-marketing': {
    intro: 'Property decisions begin long before a site visit. Buyers compare locations, pricing, amenities, configurations and developer credibility across multiple digital touchpoints. IM Solutions provides real estate digital marketing services that help developers and property brands build visibility and generate more relevant enquiries. Campaigns are shaped around the project\'s positioning, buyer profile, geography, inventory and sales priorities. This creates communication that is more precise than generic property promotion.',
    capabilitiesTitle: 'Integrated marketing for the property journey',
    capabilities: [
      'Project positioning and campaign strategy',
      'Paid search, social and display advertising',
      'Landing pages and lead-conversion journeys',
      'Content, creative and video communication',
      'Remarketing and audience-nurturing campaigns',
      'Lead-quality analysis and ongoing optimisation',
    ],
    bodyBlocks: [
      {
        heading: 'More than lead volume',
        text: 'High enquiry numbers do not automatically create sales value. We focus on the quality and relevance of demand, while clearly communicating the project\'s differentiators. Targeting, creative, forms and landing experiences are continuously reviewed to improve the prospect journey. From new launches and inventory movement to sustained developer brand building, our integrated approach helps sales and marketing teams maintain visibility, learn from campaign data and support prospects from initial discovery to site visit.',
      },
      {
        heading: 'Marketing aligned with sales realities',
        text: 'We consider lead-routing, response speed, qualification criteria and feedback from the sales team wherever possible. This creates a more useful view of campaign quality and helps marketing decisions reflect the prospects most likely to progress, not only those most likely to submit a form.',
      },
    ],
    why: 'Our experience across creative, media, landing pages and lead generation enables the campaign to be managed as a complete property-marketing system rather than a collection of ads.',
    cta: 'Market your project with greater precision. Connect with IM Solutions for a strategy built around qualified demand and the property sales journey.',
  },
  'blog-articles': {
    intro: 'Useful content gives prospective customers a reason to discover, trust and return to your brand. IM Solutions provides blog writing and content marketing services that transform audience questions, search demand and brand expertise into valuable editorial assets. We begin with the topics your market genuinely cares about. Each article is then structured to answer the reader\'s intent clearly while supporting your wider search, authority and lead-generation goals.',
    capabilitiesTitle: 'Content designed for discovery and credibility',
    capabilities: [
      'Audience, topic and keyword research',
      'Editorial calendars and content clusters',
      'SEO-focused blogs and pillar content',
      'Thought leadership and industry insight articles',
      'Product, service and educational content',
      'Content refreshes, internal linking and performance review',
    ],
    bodyBlocks: [
      {
        heading: 'Written for people, structured for search',
        text: 'Headings, examples, internal links and calls to action are planned to make each article useful and easy to navigate. Keywords are used naturally, without sacrificing readability or forcing repetition. Consistent, well-developed content can strengthen topical authority, answer objections before a sales conversation and create organic entry points into your website. Over time, your blog becomes a strategic knowledge resource rather than a collection of isolated posts.',
      },
      {
        heading: 'A long-term asset for search and sales',
        text: 'Well-chosen articles continue to support the brand after publication. They can strengthen internal linking, give sales teams useful educational material and create content that can be repurposed into social posts, email communication, presentations and campaign assets.',
      },
    ],
    why: 'SEO insight, editorial judgement and brand understanding shape the same content plan, helping articles remain useful to readers while supporting commercial search visibility.',
    cta: 'Build a content library that earns attention and supports organic growth. Speak with IM Solutions about your editorial strategy.',
  },
  'classified-portal': {
    intro: 'Classified portals can connect businesses with audiences actively searching for products, services, properties and opportunities. IM Solutions provides classified portal management services that help brands maintain accurate, consistent and persuasive listings across relevant platforms. We manage the detail-intensive work behind effective portal visibility, from selecting appropriate channels to preparing content, organising assets and keeping information current.',
    capabilitiesTitle: 'Structured listing and portal support',
    capabilities: [
      'Portal selection and listing strategy',
      'Listing copy, titles and information structure',
      'Image preparation and asset coordination',
      'Publishing and platform-specific adaptation',
      'Updates, monitoring and listing maintenance',
      'Enquiry-path and visibility improvement recommendations',
    ],
    bodyBlocks: [
      {
        heading: 'Accuracy and relevance at every touchpoint',
        text: 'Each platform has different requirements, audience expectations and content limitations. We adapt listings accordingly rather than repeating identical information everywhere. Clear details, strong images and a defined next step help interested users evaluate the offering faster. Regular monitoring reduces the risk of outdated prices, contact details or availability. This gives businesses a more professional presence while freeing internal teams to focus on core operations and enquiry handling.',
      },
      {
        heading: 'A more dependable presence across third-party platforms',
        text: 'Centralised management helps protect brand consistency when listings are spread across multiple portals. It also creates a clearer process for approvals, updates and enquiries, reducing errors and ensuring that promotional activity reflects current business priorities.',
      },
    ],
    why: 'Content preparation, publishing and ongoing maintenance are managed through one process, giving businesses greater consistency and a clearer view of activity across portals.',
    cta: 'Keep your listings current, consistent and easier to act on. Connect with IM Solutions for end-to-end portal management.',
  },
  'press-releases': {
    intro: 'Important business developments deserve communication that is clear, credible and easy to act on. IM Solutions provides press release writing and distribution services for product launches, partnerships, expansions, events, appointments and significant company milestones. We identify the strongest news angle, organise the facts and shape the announcement for media professionals, stakeholders and digital audiences. The writing remains concise, factual and aligned with the brand\'s positioning.',
    capabilitiesTitle: 'Professional announcement support',
    capabilities: [
      'News-angle and message development',
      'Press release writing and editorial refinement',
      'Headline, quotation and information structuring',
      'Brand and spokesperson alignment',
      'Digital distribution strategy where appropriate',
      'Coordination with broader PR, SEO and content activity',
    ],
    bodyBlocks: [
      {
        heading: 'Clarity creates credibility',
        text: 'A press release should make the significance of the announcement immediately understandable. We avoid exaggerated language and focus on verifiable information, context and relevance. This gives journalists and readers a cleaner foundation for evaluating the story. Where suitable, digital distribution and supporting content can extend the announcement\'s visibility. Used within a broader communication strategy, press releases can strengthen public presence, support discoverability and maintain a polished record of brand progress.',
      },
      {
        heading: 'Communication that supports a wider brand narrative',
        text: 'A single announcement becomes more valuable when it connects with executive communication, social content, website updates and stakeholder outreach. We help position the release within that larger context so the news feels timely, consistent and strategically relevant.',
      },
    ],
    why: 'Editorial, brand and digital perspectives are considered together, helping each announcement remain factual while supporting the organisation\'s wider communication objectives.',
    cta: 'Share your next announcement with greater precision. Speak with IM Solutions about press release writing and distribution support.',
  },
};

const getServiceContent = (slug: string): ServiceContent | null => {
  return serviceContentMap[slug?.toLowerCase()] || null;
};

const getBriefData = (slug: string, serviceTitle: string, serviceDesc: string) => {
  const key = slug?.toLowerCase();
  const baseData = briefDataMap[key] || {
    tagline: '',
    title1: 'More Visibility.',
    title2: 'More Business.',
    desc: serviceDesc ? (serviceDesc.split('.')[0] + '.') : 'Strategic marketing that drives the right traffic, brings qualified leads and delivers real growth.'
  };
  
  return {
    tagline: '', // Clear tagline for the first brief section to match the title-first design
    title1: baseData.title1,
    title2: baseData.title2,
    desc: baseData.desc
  };
};

const secondBriefDataMap: Record<string, { tagline: string; title1: string; title2: string; desc: string }> = {
  'seo': {
    tagline: 'DATA. STRATEGY. RESULTS.',
    title1: 'Rank Higher.',
    title2: 'Grow Faster.',
    desc: 'Data-driven SEO strategies that turn searches into loyal customers.'
  },
  'sem': {
    tagline: 'DATA. STRATEGY. RESULTS.',
    title1: 'Target Right.',
    title2: 'Convert Faster.',
    desc: 'Performance-focused SEM campaigns built to capture high-intent buyers instantly.'
  },
  'advertising-agency-bangalore': {
    tagline: 'CREATIVE. PLANNED. DELIVERED.',
    title1: 'Build Buzz.',
    title2: 'Scale Higher.',
    desc: 'Integrated advertising campaigns that place your brand at the center of attention.'
  },
  'digital-marketing-service': {
    tagline: 'STRATEGY. EXECUTION. GROWTH.',
    title1: 'Market Smarter.',
    title2: 'Scale Faster.',
    desc: 'Comprehensive marketing funnels optimized to capture leads and drive real growth.'
  },
  'online-reputation-management': {
    tagline: 'MONITOR. PROTECT. SECURE.',
    title1: 'Repair Image.',
    title2: 'Build Trust.',
    desc: 'Proactive reputation management to shield your brand from negative sentiment.'
  },
  'website-design-development': {
    tagline: 'DESIGN. CODE. OPTIMIZE.',
    title1: 'Stunning Look.',
    title2: 'Fast Loading.',
    desc: 'Responsive web development optimized for user engagement and lead conversion.'
  },
  'social-media-optimization': {
    tagline: 'ENGAGE. RECALL. INFLUENCE.',
    title1: 'Go Viral.',
    title2: 'Engage More.',
    desc: 'Organic social optimization techniques that establish solid community connections.'
  },
  'social-media-marketing': {
    tagline: 'TARGET. CONNECT. CONVERT.',
    title1: 'Drive Interest.',
    title2: 'Close Sales.',
    desc: 'Targeted social media ad campaigns optimized for maximum brand exposure and ROAS.'
  },
  'software-design-development': {
    tagline: 'INNOVATION. ARCHITECTURE. SPEED.',
    title1: 'Code Better.',
    title2: 'Automate Faster.',
    desc: 'Custom software architectures developed to optimize workflows and scale business operations.'
  },
  'geolocation-sms': {
    tagline: 'GEO. REACH. ENGAGE.',
    title1: 'Alert Instantly.',
    title2: 'Convert Locally.',
    desc: 'Precision location tracking messages triggering immediate audience reactions.'
  },
  'creative-designing': {
    tagline: 'CONCEPT. ART. IMPACT.',
    title1: 'Design Unique.',
    title2: 'Stand Out.',
    desc: 'Original graphic solutions created to present premium aesthetic brand recall.'
  },
  'api-integration': {
    tagline: 'CONNECT. AUTOMATE. SCALE.',
    title1: 'Sync Systems.',
    title2: 'Work Faster.',
    desc: 'Integrated database and software pipelines eliminating manual tasks.'
  },
  'ecommerce-solutions': {
    tagline: 'RETAIL. SPEED. CONVERSION.',
    title1: 'Sell Globally.',
    title2: 'Scale Profit.',
    desc: 'Optimized online stores built to maximize customer checkout speeds.'
  },
  'email-marketing': {
    tagline: 'DELIVER. NURTURE. SELL.',
    title1: 'Direct Message.',
    title2: 'Increase Sales.',
    desc: 'Automated email flows returning high-converting corporate and customer leads.'
  },
  'mobile-app-development': {
    tagline: 'MOBILE. FUNCTION. REACH.',
    title1: 'Build Native.',
    title2: 'Retain Users.',
    desc: 'Beautiful iOS and Android experiences tailored for customer lifestyle engagement.'
  },
  'real-estate-marketing': {
    tagline: 'PROPERTY. ENQUIRY. BOOKING.',
    title1: 'Generate Leads.',
    title2: 'Close Deals.',
    desc: 'Targeted real estate campaigns matching active properties to premium buyers.'
  },
  'display-advertisement': {
    tagline: 'BANNER. VIEW. ACTION.',
    title1: 'Gain Exposure.',
    title2: 'Win Clicks.',
    desc: 'Visual display ad placements returning consistent buyer intent.'
  },
  'blog-articles': {
    tagline: 'RESEARCH. WRITE. RANK.',
    title1: 'Share Value.',
    title2: 'Build Authority.',
    desc: 'High-quality SEO articles ranking on Google search for buyer keywords.'
  },
  'classified-portal': {
    tagline: 'PORTAL. LISTING. DEAL.',
    title1: 'Connect Buyers.',
    title2: 'Facilitate Sales.',
    desc: 'Scalable portal development designed to support heavy traffic.'
  },
  'press-releases': {
    tagline: 'NEWS. OUTREACH. TRUST.',
    title1: 'Get Featured.',
    title2: 'Gain Publicity.',
    desc: 'Strategic distribution networks sending your stories to top news desks.'
  },
  'bus-branding': {
    tagline: 'TRANSIT. OUTDOOR. MASS.',
    title1: 'Cover Streets.',
    title2: 'Catch Commuters.',
    desc: 'High-exposure mobile transit ads covering prime municipal routes daily.'
  },
  'rwa-activation': {
    tagline: 'LOCAL. TRUST. ENGAGEMENT.',
    title1: 'Meet Residents.',
    title2: 'Nurture Leads.',
    desc: 'Direct housing society activations setting up personal product trials.'
  },
  'btl-advertising': {
    tagline: 'EXPERIENCE. REACH. CONVERT.',
    title1: 'Interact Direct.',
    title2: 'Create Impact.',
    desc: 'Memorable on-ground advertising concepts returning high user feedback.'
  },
  'mall-advertising': {
    tagline: 'RETAIL. FOOTFALL. DISPLAY.',
    title1: 'Capture Buyers.',
    title2: 'Promote Offers.',
    desc: 'Visual multiplex and mall screen placements targeting leisure shoppers.'
  },
  'tech-park-ads': {
    tagline: 'CORPORATE. B2B. TECH.',
    title1: 'Target Employees.',
    title2: 'Pitch Enterprise.',
    desc: 'Strategic banners inside premier software hubs capturing tech professionals.'
  },
  'airport-advertising': {
    tagline: 'PREMIUM. ELITE. GLOBAL.',
    title1: 'Reach Travelers.',
    title2: 'Elevate Brand.',
    desc: 'Airport signage placing your brand directly before international flyers.'
  },
  'paper-insertion': {
    tagline: 'PRINT. DIRECT. HOUSEHOLD.',
    title1: 'Deliver Flyers.',
    title2: 'Reach Families.',
    desc: 'High-volume paper inserts targeting selected postcodes and neighborhoods.'
  },
  'cafe-gym-ads': {
    tagline: 'LIFESTYLE. SPOTLIGHT. LOCAL.',
    title1: 'Connect Daily.',
    title2: 'Target Audiences.',
    desc: 'Strategic lifestyle ad spaces capturing urban buyers during active hours.'
  },
  'atm-ads': {
    tagline: 'FINANCE. ATTENTION. REACH.',
    title1: 'Catch Focus.',
    title2: 'Deliver Message.',
    desc: 'Digital ATM display ads getting high attention during screen interactions.'
  },
  'auto-rickshaw-ads': {
    tagline: 'TRANSIT. STREET. MASS.',
    title1: 'Navigate Traffic.',
    title2: 'Spread Message.',
    desc: 'Cost-effective auto rickshaw hood advertisements driving across Bangalore.'
  },
  'magazine-ads': {
    tagline: 'PRINT. COVERAGE. LUXURY.',
    title1: 'Get Published.',
    title2: 'Target Elite.',
    desc: 'Exclusive editorial ads placed in premium lifestyle and industry journals.'
  },
  'parking-ads': {
    tagline: 'OUTDOOR. CARS. VISIBILITY.',
    title1: 'Target Commuters.',
    title2: 'Maximize Dwell.',
    desc: 'High-dwell billboard placements placed in key commercial parkings.'
  },
  'branding-re-branding': {
    tagline: 'REDEFINE. REPOSITION. RECALL.',
    title1: 'Build Identity.',
    title2: 'Dominate Markets.',
    desc: 'Complete corporate identity makeovers aligning visual values.'
  },
  'corporate-gifts': {
    tagline: 'LOYALTY. REWARD. RELATION.',
    title1: 'Send Thanks.',
    title2: 'Deepen Ties.',
    desc: 'Premium selection of corporate branded goods for clients and partners.'
  },
  'corporate-training': {
    tagline: 'SKILLS. PROGRESS. PERFORMANCE.',
    title1: 'Empower Teams.',
    title2: 'Drive Efficiency.',
    desc: 'Targeted operational modules training employees in modern strategies.'
  },
  'event-management': {
    tagline: 'PLAN. STAGE. EXECUTE.',
    title1: 'Create Memories.',
    title2: 'Build Authority.',
    desc: 'End-to-end management of large-scale product launches and events.'
  },
  'fm-campaigns': {
    tagline: 'AUDIO. SPOT. BROADCAST.',
    title1: 'Air Banners.',
    title2: 'Target Listeners.',
    desc: 'Vocal ads reaching listeners during daily commute hours.'
  },
  'fabrications': {
    tagline: 'BUILD. STRUCTURE. INSTALL.',
    title1: 'Form Displays.',
    title2: 'Ensure Quality.',
    desc: 'Sturdy physical construction of display setups and retail shelves.'
  },
  'hoarding-services': {
    tagline: 'OUTDOOR. MASSIVE. LANDMARK.',
    title1: 'Claim Skyline.',
    title2: 'Get Noticed.',
    desc: 'Large format highway and city junction billboards demanding attention.'
  },
  'marketing-collaterals': {
    tagline: 'PRINT. COLLATERALL. SALES.',
    title1: 'Pitch Smarter.',
    title2: 'Close Quicker.',
    desc: 'Sales enablement documents developed for maximum investor recall.'
  },
  'startup-marketing': {
    tagline: 'TRACTION. SCALE. FUNDING.',
    title1: 'Acquire Fast.',
    title2: 'Grow Exponentially.',
    desc: 'Lean, budget-optimized marketing programs for high-growth startups.'
  },
  'photographic-services': {
    tagline: 'LENS. FOCUS. PORTFOLIO.',
    title1: 'Capture Detail.',
    title2: 'Showcase Products.',
    desc: 'High-definition industrial photography highlighting product details.'
  },
  'pr-services': {
    tagline: 'COMMUNITY. TRUST. MEDIA.',
    title1: 'Manage Press.',
    title2: 'Establish Authority.',
    desc: 'Dynamic media relations programs building positive brand trust.'
  },
  'printing-services': {
    tagline: 'PRINT. INK. DETAIL.',
    title1: 'Produce Quality.',
    title2: 'Deliver Fast.',
    desc: 'Professional offset and digital printing of business collateral.'
  },
  'retail-advertising': {
    tagline: 'RETAIL. DEALS. SALE.',
    title1: 'Boost Shoppers.',
    title2: 'Increase Income.',
    desc: 'In-store marketing and counter displays driving instant checkouts.'
  },
  'real-estate-videography': {
    tagline: 'DRONE. VIDEO. LISTINGS.',
    title1: 'Highlight Spaces.',
    title2: 'Engage Buyers.',
    desc: 'High-end cinema walk-throughs bringing property listings to life.'
  },
  'signage': {
    tagline: 'BOARD. SIGN. STANDOUT.',
    title1: 'Light Up.',
    title2: 'Stay Visible.',
    desc: 'Premium LED signage boards providing sharp, all-weather brand recall.'
  }
};

const getSecondBriefData = (slug: string, serviceTitle: string) => {
  const key = slug?.toLowerCase();
  if (secondBriefDataMap[key]) {
    return secondBriefDataMap[key];
  }
  
  const cleanTitle = (serviceTitle || '').split('|')[0].trim();
  
  return {
    tagline: 'DATA. STRATEGY. RESULTS.',
    title1: 'Stand Out.',
    title2: 'Grow Faster.',
    desc: `Data-driven ${cleanTitle} strategies that turn prospects into loyal customers.`
  };
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  let service: any = null;
  try {
    service = require(`../../../data/services/${slug}.json`);
  } catch (e) {
    service = serviceData[slug];
  }

  if (!service) {
    notFound();
  }

  const category = service.category || (onlineServiceImages[slug] ? 'online' : 'offline');
  const relatedServices = getRelatedServices(slug, category);
  const relevantBlogs = getRelevantBlogs(service.title || '', 3);

  const briefData = getBriefData(slug, service.title, service.description);
  const secondBriefData = getSecondBriefData(slug, service.title);
  const serviceContent = getServiceContent(slug);

  const servicesGridData = [
    { num: '01', title: 'Strategy', image: '/aervice/c075c89b-19d5-4dec-848a-889dfb74a554.png', color: '#1a3322' },
    { num: '02', title: 'Creative', image: '/aervice/a981681e-929c-4d59-bc8b-96860c3d1c19.png', color: '#6e1919' },
    { num: '03', title: 'Digital & Technology', image: '/aervice/16b2eb51-d473-41a3-a6f9-4e7f529e8a0f.png', color: '#1c2b42' },
    { num: '04', title: 'Media', image: '/aervice/ef983301-dfb4-4710-977a-4fd1d36b8e53.png', color: '#1a2744' },
    { num: '05', title: 'Outdoor', image: '/aervice/1a804cf6-7715-46f0-8249-05d6dbe2f75e.png', color: '#1c3d2e' },
    { num: '06', title: 'Production & Experiences', image: '/aervice/47700efa-0d09-445c-940e-57d4e12a5432.png', color: '#4a3621' },
  ];

  return (
    <main className={styles.pageContainer}>
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <img
          src="/aervice/service banner image.png"
          alt="Service Banner"
          className={styles.heroBannerBg}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Everything<br />
            Your Brand<br />
            Needs to Move Forward.
          </h1>
          <p className={styles.heroSubtitle}>One Partner. Every Possibility.</p>
          <hr className={styles.heroDivider} />
        </div>
      </section>

      {/* 1.5. Wide Full-Width Brief Section (service breif section.jpeg) */}
      <section className={styles.wideBriefSection}>
        <div className={styles.wideBriefContent}>
          {briefData.tagline && (
            <>
              <span className={styles.wideBriefTagline}>{briefData.tagline}</span>
              <div className={styles.wideBriefLine}></div>
            </>
          )}
          <h2 className={styles.wideBriefTitle}>
            {briefData.title1}
            <span className={styles.wideBriefTitleRed}>{briefData.title2}</span>
          </h2>
          {!briefData.tagline && <div className={styles.wideBriefLine}></div>}
          <p className={styles.wideBriefDescription}>{briefData.desc}</p>
        </div>
      </section>

      {/* 1.6 + 1.7. Dual Brief Sections — side by side */}

      <div className={styles.briefDualRow}>
        {/* Left: Second Brief (Dark blue stairs) */}
        <section className={styles.secondBriefSection}>
          <div className={styles.secondBriefContent}>
            <span className={styles.secondBriefTagline}>{secondBriefData.tagline}</span>
            <div className={styles.secondBriefLine}></div>
            <h2 className={styles.secondBriefTitle}>
              {secondBriefData.title1}
              <span className={styles.secondBriefTitleRed}>{secondBriefData.title2}</span>
            </h2>
            <p className={styles.secondBriefDescription}>{secondBriefData.desc}</p>
          </div>
        </section>

        {/* Right: First Brief (Cream/plant) */}
        <section className={styles.briefSection}>
          <div className={styles.briefContent}>
            {briefData.tagline && (
              <>
                <span className={styles.briefTagline}>{briefData.tagline}</span>
                <div className={styles.briefLine}></div>
              </>
            )}
            <h2 className={styles.briefTitle}>
              {briefData.title1}
              <span className={styles.briefTitleRed}>{briefData.title2}</span>
            </h2>
            {!briefData.tagline && <div className={styles.briefLine}></div>}
            <p className={styles.briefDescription}>{briefData.desc}</p>
          </div>
        </section>
      </div>

      {/* 1.8. Service Content Section */}
      {serviceContent && (
        <section className={styles.serviceContentSection}>
          <div className={styles.serviceContentInner}>
            {/* Top: intro + capabilities */}
            <div className={styles.serviceContentTop}>
              <p className={styles.serviceContentIntro}>{serviceContent.intro}</p>
              <div className={styles.serviceContentCapabilities}>
                <h3 className={styles.serviceCapabilitiesTitle}>{serviceContent.capabilitiesTitle}</h3>
                <ul className={styles.serviceCapabilitiesList}>
                  {serviceContent.capabilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Body blocks */}
            {serviceContent.bodyBlocks.length > 0 && (
              <div className={styles.serviceContentBody}>
                {serviceContent.bodyBlocks.map((block, i) => (
                  <div key={i} className={styles.serviceBodyBlock}>
                    <h3>{block.heading}</h3>
                    <p>{block.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Why IM Solutions */}
            <div className={styles.serviceWhyBar}>
              <span className={styles.serviceWhyLabel}>Why IM Solutions</span>
              <p className={styles.serviceWhyText}>{serviceContent.why}</p>
              <p className={styles.serviceCtaLine}>{serviceContent.cta}</p>
            </div>
          </div>
        </section>
      )}

      {/* 2. Intro & Collage Section */}
      <section className={styles.introSection}>
        <div className={styles.introLayout}>
          <div className={styles.introText}>
            We bring strategy, creativity, technology, media, outdoor and production together to build meaningful connections between brands and people. Integrated by design. Impact by destination.
          </div>
          <div className={styles.introCollage}>
            <div className={`${styles.collageImgWrap} ${styles.collageShort}`}>
              <img src="/aervice/WhatsApp Image 2026-07-17 at 2.50.02 PM.jpeg" alt="Brand Strategy" className={styles.collageImg} />
            </div>
            <div className={`${styles.collageImgWrap} ${styles.collageTall}`}>
              <img src="/aervice/WhatsApp Image 2026-07-17 at 2.50.14 PM.jpeg" alt="Ideas" className={styles.collageImg} />
            </div>
            <div className={`${styles.collageImgWrap} ${styles.collageTall}`}>
              <img src="/aervice/WhatsApp Image 2026-07-17 at 2.50.35 PM.jpeg" alt="Move Forward" className={styles.collageImg} />
            </div>
            <div className={`${styles.collageImgWrap} ${styles.collageShort}`}>
              <img src="/aervice/WhatsApp Image 2026-07-17 at 2.50.41 PM.jpeg" alt="Production" className={styles.collageImg} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className={styles.servicesGridSection}>
        <div className={styles.servicesGrid}>
          {servicesGridData.map((item, idx) => (
            <div key={idx} className={styles.serviceCard}>
              <div className={styles.serviceCardContent}>
                <span className={styles.serviceNum} style={{ color: item.color, borderBottomColor: item.color }}>{item.num}</span>
                <h3 className={styles.serviceCardTitle} style={{ color: item.color }}>{item.title}</h3>
              </div>
              <div className={styles.serviceCardImageWrapper}>
                <img src={item.image} alt={item.title} className={styles.serviceCardImage} />
                <div className={styles.serviceCardOverlay}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Process Timeline */}
      <section className={styles.processSection}>
        <div className={styles.processContainer}>
          <div className={styles.processLine}></div>
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepCircle}>1</div>
              <div className={styles.stepIcon}><FaCompass /></div>
              <p className={styles.stepText}>Understand</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepCircle}>2</div>
              <div className={styles.stepIcon}><FaLightbulb /></div>
              <p className={styles.stepText}>Strategize</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepCircle}>3</div>
              <div className={styles.stepIcon}><FaPencilAlt /></div>
              <p className={styles.stepText}>Create</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepCircle}>4</div>
              <div className={styles.stepIcon}><FaBullhorn /></div>
              <p className={styles.stepText}>Amplify</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepCircle}>5</div>
              <div className={styles.stepIcon}><FaChartBar /></div>
              <p className={styles.stepText}>Measure &<br/>Optimize</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Impact Section */}
      <section className={styles.impactSection}>
        <h2 className={styles.impactTitle}>Ideas That Became Impact.</h2>
        <div className={styles.impactTitleUnderline}></div>
        <div className={styles.impactCollage}>
          <img src="/aervice/97a558b2-4527-4183-a2be-3097a73e415d.png" alt="Impact 1" className={styles.impactImg} />
          <img src="/aervice/761dde1e-3339-4099-ad1b-b9dbefb40b3f.png" alt="Impact 2" className={styles.impactImg} />
          <img src="/aervice/3957978b-1b40-4818-8063-1ba2b2ed9cb9.png" alt="Impact 3" className={`${styles.impactImg} ${styles.impactImgWide}`} />
          <img src="/aervice/34843754-92c9-4981-a003-a0dc0918ac21.png" alt="Impact 4" className={styles.impactImg} />
          <img src="/aervice/f89cad5e-dc84-4c26-826b-a548309c827c.png" alt="Impact 5" className={styles.impactImg} />
        </div>
      </section>

      {/* 6. Industries Section */}
      <section className={styles.industriesSection}>
        <div className={styles.industryItem}>
          <FaCar className={styles.industryIcon} />
          <p>AUTOMOTIVE</p>
        </div>
        <div className={styles.industryItem}>
          <FaShoppingBag className={styles.industryIcon} />
          <p>CONSUMER<br/>GOODS</p>
        </div>
        <div className={styles.industryItem}>
          <FaShoppingCart className={styles.industryIcon} />
          <p>RETAIL &<br/>E-COMMERCE</p>
        </div>
        <div className={styles.industryItem}>
          <FaBuilding className={styles.industryIcon} />
          <p>REAL ESTATE &<br/>INFRASTRUCTURE</p>
        </div>
        <div className={styles.industryItem}>
          <FaLandmark className={styles.industryIcon} />
          <p>BANKING &<br/>FINANCIAL SERVICES</p>
        </div>
        <div className={styles.industryItem}>
          <FaHeartbeat className={styles.industryIcon} />
          <p>HEALTHCARE &<br/>WELLNESS</p>
        </div>
      </section>

      {/* 7. Why Choose Us Section */}
      <section className={styles.whyChooseSection}>
        <div className={styles.whyChooseContent}>
          <h2 className={styles.whyChooseTitle}>Why Brands Choose<br/>IM Solutions</h2>
          <div className={styles.whyChooseUnderline}></div>
          <div className={styles.whyChooseLogoBackground}>IM</div>
        </div>
        <div className={styles.whyChooseList}>
          <ul>
            <li><FaCheckCircle className={styles.checkIcon}/> Integrated thinking across every touch point.</li>
            <li><FaCheckCircle className={styles.checkIcon}/> One team. Seamless execution.</li>
            <li><FaCheckCircle className={styles.checkIcon}/> Data-informed. Insight-led. Outcome-focused.</li>
            <li><FaCheckCircle className={styles.checkIcon}/> Agile, transparent and accountable.</li>
            <li><FaCheckCircle className={styles.checkIcon}/> Built for today. Ready for what&apos;s next.</li>
          </ul>
        </div>
        <div className={styles.whyChooseImageWrapper}>
            <img src="/aervice/abdefc39-7b76-4b3a-85f0-503540871f50.png" alt="Why Choose IM Solutions" className={styles.whyChooseImage} />
        </div>
      </section>

      {/* 8. FAQs */}
      {service.faqs && service.faqs.length > 0 ? (
          <FAQ title={`${service.title} FAQ's`} items={service.faqs.map((f: any) => ({ question: f.q, answer: f.a }))} />
      ) : (
          <FAQ />
      )}

      {/* 9. Relevant Services */}
      <section className={styles.relatedServicesSection}>
        <div className={styles.relatedSectionHeader}>
          <span className={styles.relatedEyebrow}>EXPLORE MORE</span>
          <h2 className={styles.relatedSectionTitle}>Relevant Services</h2>
        </div>
        <div className={styles.relatedServicesGrid}>
          {relatedServices.map((svc, index) => (
            <Link
              key={index}
              href={`/services/${svc.slug}`}
              className={styles.relatedServiceTile}
              style={{ backgroundImage: `url("${svc.image}")` }}
            >
              <span className={styles.relatedServiceLabel}>{svc.name.toLowerCase()}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. Relevant Blogs */}
      <section className={styles.relatedBlogsSection}>
        <div className={styles.relatedSectionHeader}>
          <span className={styles.relatedEyebrow}>INSIGHTS</span>
          <h2 className={styles.relatedSectionTitle}>Relevant Blogs</h2>
        </div>
        <div className={styles.relatedBlogsGrid}>
          {relevantBlogs.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.relatedBlogCard}>
              <img src={post.image} alt={post.title} className={styles.relatedBlogImage} />
              <div className={styles.relatedBlogContent}>
                <span className={styles.relatedBlogDate}>{post.date}</span>
                <h3 className={styles.relatedBlogTitle}>{post.title}</h3>
                <p className={styles.relatedBlogExcerpt}>{post.excerpt}</p>
                <span className={styles.relatedBlogReadMore}>Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 11. Footer CTA Section */}
      <section className={styles.footerCtaSection}>
        <img src="/aervice/2c2db5ef-3f75-4b58-90b6-6c0d62a82d62.png" alt="Let's Build Background" className={styles.footerCtaBg} />
        <div className={styles.footerCtaOverlay}></div>
        <div className={styles.footerCtaContent}>
          <h2 className={styles.footerCtaTitle}>Let&apos;s Build What<br/>Your <span className={styles.highlightRed}>Brand</span> Needs Next.</h2>
          <div className={styles.footerCtaUnderline}></div>
        </div>
        <div className={styles.footerCtaAction}>
          <p className={styles.footerCtaSubtitle}>Let&apos;s start a conversation.</p>
          <Link href="/contact" className={styles.footerCtaButton}>
            GET IN TOUCH <span className={styles.arrow}>&rarr;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
