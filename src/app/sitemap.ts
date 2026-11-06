import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";
import { serviceUrlMap } from "@/data/services";

const siteUrl = "https://www.imsolutions.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/blog",
    "/careers",
    "/clients",
    "/contact",
    "/privacy",
    "/services/online",
    "/services/offline",
  ];
  const servicePaths = [...new Set(Object.values(serviceUrlMap))];
  const blogPaths = blogPosts.map((post) => `/blog/${post.slug}`);
  const paths = [...new Set([...staticPaths, ...servicePaths, ...blogPaths])];

  return paths.map((pathname) => ({
    url: new URL(pathname, siteUrl).toString(),
  }));
}
