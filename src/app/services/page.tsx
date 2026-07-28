import { redirect } from "next/navigation";

// Redirect legacy /services to /services/online (no landing page)
export default function ServicesPage() {
  redirect("/services/online");
}
