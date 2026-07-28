import styles from "./BlogPage.module.css";
import { blogPosts } from "../../data/blogPosts";
import {
  filterPostsByCategory,
  getCategoryCounts,
  normalizeBlogCategory,
} from "../../data/blogCategories";
import Link from "next/link";
import { Suspense } from "react";
import BlogHomeSection from "@/components/BlogHomeSection";
import PortfolioBlogGrid from "./PortfolioBlogGrid";
import BlogCategoryFilter from "./BlogCategoryFilter";

const CATEGORY_PAGE_SIZE = 12;
const DEFAULT_TOTAL_PAGES = 4;

export const metadata = {
  title: "Blog | IM Solutions",
  description:
    "Insights, trends, and strategies from IM Solutions across SEO, branding, creative, and technology.",
};

// blogPosts are now loaded from src/data/blogPosts.ts

type Props = {
  searchParams?:
    | Promise<{ page?: string | string[]; category?: string | string[] }>
    | { page?: string | string[]; category?: string | string[] };
};

function buildBlogPageHref(page: number, category: string | null) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export default async function BlogPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const rawPage = resolvedSearchParams?.page;
  const rawCategory = resolvedSearchParams?.category;
  const pageParam = Array.isArray(rawPage) ? rawPage[0] : rawPage;
  const categoryParam = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;
  const activeCategory = normalizeBlogCategory(categoryParam ?? "");

  const parsedPage = Number.parseInt(pageParam ?? "1", 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const categoryCounts = getCategoryCounts(blogPosts);
  const filteredPosts = activeCategory
    ? filterPostsByCategory(blogPosts, activeCategory)
    : blogPosts;

  const totalPages = activeCategory
    ? Math.max(1, Math.ceil(filteredPosts.length / CATEGORY_PAGE_SIZE))
    : DEFAULT_TOTAL_PAGES;
  const clampedPage = Math.min(Math.max(currentPage, 1), totalPages);

  const postsForPage = activeCategory
    ? filteredPosts.slice(
        (clampedPage - 1) * CATEGORY_PAGE_SIZE,
        clampedPage * CATEGORY_PAGE_SIZE
      )
    : blogPosts.filter((p) => (p.page ?? 1) === clampedPage);

  const gridLeadSlug = "top-seo-trends-2026-what-businesses-need-to-prepare-for";
  const gridLeadPost =
    !activeCategory && clampedPage === 1
      ? postsForPage.find((p) => p.slug === gridLeadSlug)
      : undefined;
  const postsWithoutGridLead = gridLeadPost
    ? postsForPage.filter((p) => p.slug !== gridLeadSlug)
    : postsForPage;
  const listedPosts = gridLeadPost
    ? [gridLeadPost, ...postsWithoutGridLead]
    : postsForPage;

  return (
    <main className={styles.page}>
      <BlogHomeSection />

      <section className={styles.portfolioSection}>
        <div className={styles.portfolioInner}>
          <Suspense fallback={null}>
            <BlogCategoryFilter
              categoryCounts={categoryCounts}
              totalPosts={blogPosts.length}
            />
          </Suspense>

          {listedPosts.length > 0 ? (
            <PortfolioBlogGrid posts={listedPosts} />
          ) : (
            <p className={styles.categoryFilterEmpty}>
              No posts found in this category.{" "}
              <Link href="/blog">View all blogs</Link>
            </p>
          )}

          {totalPages > 1 && (
            <nav className={styles.portfolioPagination} aria-label="Blog pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={buildBlogPageHref(page, activeCategory)}
                  className={`${styles.portfolioPageNumber} ${page === clampedPage ? styles.portfolioPageNumberActive : ""}`}
                  aria-current={page === clampedPage ? "page" : undefined}
                >
                  {page}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
