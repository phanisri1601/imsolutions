const fs = require('fs');

const pagePath = 'c:/Users/Sreenivasa/Documents/GitHub/ims-nextjs/src/app/services/[slug]/page.tsx';
let content = fs.readFileSync(pagePath, 'utf8');

const lines = content.split('\n');

// The file currently starts with imports up to line 12:
// import { serviceData } from '@/data/servicesData';
// And line 13 is:
//       if (!bgRef.current || !heroRef.current) return;

// We need to inject the missing function declaration, states, and the start of useEffect between line 12 and 13.
const missingLines = `
export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  let service: any = null;
  try {
    // Try to load dynamically generated JSON file first
    service = require(\`../../../data/services/\${slug}.json\`);
  } catch (e) {
    // Fallback to legacy static data
    service = serviceData[slug];
  }

  if (!service) {
    notFound();
  }

  const heroRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLImageElement | null>(null);
  const [heroRevealed, setHeroRevealed] = useState(false);

  // parallax for hero background
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {`;

const newContent = [
  ...lines.slice(0, 12),
  missingLines,
  ...lines.slice(12)
].join('\n');

fs.writeFileSync(pagePath, newContent, 'utf8');
console.log("Successfully fixed page.tsx!");
