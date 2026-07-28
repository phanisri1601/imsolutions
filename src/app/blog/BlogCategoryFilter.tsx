"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BLOG_FILTER_CATEGORIES } from "@/data/blogCategories";
import styles from "./BlogPage.module.css";

type Props = {
  categoryCounts: Record<string, number>;
  totalPosts: number;
};

function buildBlogHref(category: string | null, page?: string | null) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page && page !== "1") params.set("page", page);
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export default function BlogCategoryFilter({ categoryCounts, totalPosts }: Props) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams?.get("category") ?? null;
  const activePage = searchParams?.get("page") ?? null;

  const visibleCategories = BLOG_FILTER_CATEGORIES.filter((cat) => (categoryCounts[cat] ?? 0) > 0);

  return (
    <div className={styles.categoryFilter} role="navigation" aria-label="Filter blog posts by category">
      <p className={styles.categoryFilterLabel}>Filter by category</p>
      <div className={styles.categoryFilterList}>
        <Link
          href={buildBlogHref(null)}
          className={`${styles.categoryFilterPill} ${!activeCategory ? styles.categoryFilterPillActive : ""}`}
          aria-current={!activeCategory ? "true" : undefined}
        >
          All
          <span className={styles.categoryFilterCount}>{totalPosts}</span>
        </Link>
        {visibleCategories.map((category) => {
          const isActive =
            activeCategory?.toLowerCase() === category.toLowerCase();
          return (
            <Link
              key={category}
              href={buildBlogHref(category)}
              className={`${styles.categoryFilterPill} ${isActive ? styles.categoryFilterPillActive : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              {category}
              <span className={styles.categoryFilterCount}>{categoryCounts[category]}</span>
            </Link>
          );
        })}
      </div>
      {activeCategory && (
        <p className={styles.categoryFilterActiveNote}>
          Showing posts in <strong>{activeCategory}</strong>
          {activePage && activePage !== "1" ? ` · page ${activePage}` : ""}
        </p>
      )}
    </div>
  );
}
