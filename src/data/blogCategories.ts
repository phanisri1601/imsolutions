import type { BlogPost } from "./blogPosts";

/** Categories shown on /blog and post sidebar */
export const BLOG_FILTER_CATEGORIES = [
  "SEO",
  "Web Design",
  "Digital Marketing",
  "Branding",
  "Social Media",
  "Marketing",
  "ORM",
  "Advertising",
] as const;

export type BlogFilterCategory = (typeof BLOG_FILTER_CATEGORIES)[number];

export function postMatchesCategory(post: BlogPost, category: string): boolean {
  const needle = category.toLowerCase();
  return (post.tags ?? []).some((tag) => {
    const t = tag.toLowerCase();
    return t === needle || t.includes(needle);
  });
}

export function filterPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  return posts.filter((post) => postMatchesCategory(post, category));
}

export function getCategoryCounts(posts: BlogPost[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const category of BLOG_FILTER_CATEGORIES) {
    const count = posts.filter((post) => postMatchesCategory(post, category)).length;
    if (count > 0) counts[category] = count;
  }
  return counts;
}

export function isValidBlogCategory(value: string | undefined): value is BlogFilterCategory {
  if (!value) return false;
  return BLOG_FILTER_CATEGORIES.some((c) => c.toLowerCase() === value.toLowerCase());
}

export function normalizeBlogCategory(value: string): BlogFilterCategory | null {
  const match = BLOG_FILTER_CATEGORIES.find((c) => c.toLowerCase() === value.toLowerCase());
  return match ?? null;
}
