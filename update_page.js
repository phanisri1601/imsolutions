const fs = require('fs');

const generatedStr = fs.readFileSync('generated_offline_services.txt', 'utf8');
const pageFile = fs.readFileSync('src/app/services/[slug]/page.tsx', 'utf8');

// The marker we will use to find where to start replacing is the start of photographic-services or end of press-releases
// Previously I added photographic-services, pr-services, printing-services, retail-advertising, real-estate-videography, signage.
// I will just find the end of 'press-releases' in serviceContentMap and replace everything after it in the map until };

const pressReleasesEndMarker = "cta: 'Share your next announcement with greater precision. Speak with IM Solutions about press release writing and distribution support.',\n  },\n";

const startIndex = pageFile.indexOf(pressReleasesEndMarker);
if (startIndex === -1) {
  console.log("Could not find marker");
  process.exit(1);
}

const beforeStr = pageFile.substring(0, startIndex + pressReleasesEndMarker.length);

const endMarker = "};\n\nconst getServiceContent = (slug: string): ServiceContent | null => {";
const endIndex = pageFile.indexOf(endMarker, startIndex);

if (endIndex === -1) {
  console.log("Could not find end marker");
  process.exit(1);
}

const afterStr = pageFile.substring(endIndex);

const newPageFile = beforeStr + generatedStr + afterStr;

fs.writeFileSync('src/app/services/[slug]/page.tsx', newPageFile);
console.log('Successfully updated page.tsx with all 27 offline services');
