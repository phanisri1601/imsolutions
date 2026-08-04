const fs = require('fs');

const pageFile = 'src/app/services/[slug]/page.tsx';
let content = fs.readFileSync(pageFile, 'utf8');

content = content.replace(
  "intro: 'Advertising in Cafes, Gyms and Supermarkets',",
  "intro: 'Advertising in cafes, gyms, and supermarkets places your brand in front of a highly engaged audience during their daily routines. By targeting these lifestyle spaces, we help businesses connect with consumers when they are most receptive to new products and services.',"
);

content = content.replace(
  "intro: 'Branding and Rebranding Services',",
  "intro: 'A strong brand is more than just a logo; it is the complete experience and perception of your business. Our branding and rebranding services help companies define their identity, communicate their core values, and stand out in a competitive market.',"
);

content = content.replace(
  "intro: 'Marketing Collateral Design Services',",
  "intro: 'Marketing collaterals are essential tools that physically represent your brand and communicate your value proposition. We design professional brochures, presentations, and sales kits that leave a lasting impression on your clients and partners.',"
);

content = content.replace(
  "intro: 'Startup Marketing Services',",
  "intro: 'Startups need to build momentum quickly while managing resources effectively. We provide scalable marketing strategies designed specifically for early-stage companies, helping you acquire customers, build brand awareness, and secure your position in the market.',"
);

fs.writeFileSync(pageFile, content);
console.log('Fixed intro text for 4 offline services.');
