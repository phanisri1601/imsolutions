const fs = require('fs');

const contentFile = fs.readFileSync('src/app/services/offline/offlineServiceContent.ts', 'utf8');
let arrayStr = contentFile.replace('export const offlineServiceContent = ', '').replace(/;\s*$/, '');
let data = eval(arrayStr);

const keys = [
  'bus-branding', 'rwa-activation', 'btl-advertising', 'mall-advertising',
  'tech-park-ads', 'airport-advertising', 'paper-insertion', 'cafe-gym-ads',
  'atm-ads', 'auto-rickshaw-ads', 'magazine-ads', 'parking-ads',
  'branding-rebranding', 'corporate-gifts', 'corporate-training',
  'event-management', 'fm-campaigns', 'fabrications', 'hoarding-services',
  'marketing-collaterals', 'startup-marketing', 'photographic-services',
  'pr-services', 'printing-services', 'retail-advertising',
  'real-estate-videography', 'signage'
];

let generatedStr = '';
for (let i = 0; i < data.length; i++) {
  const item = data[i];
  const key = keys[i];
  
  const intro = item.lead.replace(/'/g, "\\'").replace(/\n/g, ' ');
  const capabilitiesTitle = 'What We Offer';
  const capabilities = item.offers.map(o => "'" + o.replace(/'/g, "\\'") + "'").join(',\n      ');
  const strategic = item.strategic.replace(/'/g, "\\'").replace(/\n/g, ' ');
  const execution = item.execution.replace(/'/g, "\\'").replace(/\n/g, ' ');
  const why = item.why.replace(/'/g, "\\'").replace(/\n/g, ' ');
  const cta = `Elevate your brand presence. Connect with IM Solutions for ${item.title.toLowerCase()}.`.replace(/'/g, "\\'");

  generatedStr += `  '${key}': {
    intro: '${intro}',
    capabilitiesTitle: '${capabilitiesTitle}',
    capabilities: [
      ${capabilities},
    ],
    bodyBlocks: [
      {
        heading: 'Strategic Planning',
        text: '${strategic}',
      },
      {
        heading: 'End-to-End Execution',
        text: '${execution}',
      },
    ],
    why: '${why}',
    cta: '${cta}',
  },\n`;
}

fs.writeFileSync('generated_offline_services.txt', generatedStr);
console.log('Generated successfully.');
