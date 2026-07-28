import type { BlogPost } from "@/data/blogPosts";
import { BLOG_FILTER_CATEGORIES, postMatchesCategory } from "@/data/blogCategories";
import BlogSidebarPostLink from "./BlogSidebarPostLink";
import styles from "./BlogPost.module.css";
import Link from "next/link";

type Props = {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  relatedPosts: BlogPost[];
};

function postsForCategory(posts: BlogPost[], category: string, limit = 2) {
  return posts.filter((p) => postMatchesCategory(p, category)).slice(0, limit);
}

export default function BlogPostSidebar({ currentPost, allPosts, relatedPosts }: Props) {
  const primaryCategory = currentPost.tags?.[0] ?? "Insights";

  return (
    <aside className={styles.sidebar} aria-label="Blog navigation">
      <div className={`${styles.sidebarBlock} ${styles.sidebarCategories}`}>
        <h2 className={styles.sidebarHeading}>All categories</h2>
        {BLOG_FILTER_CATEGORIES.map((category) => {
          const categoryPosts = postsForCategory(allPosts, category);
          if (!categoryPosts.length) return null;

          const isActiveCategory = primaryCategory.toLowerCase() === category.toLowerCase();

          return (
            <div key={category} className={styles.categoryGroup}>
              <span
                className={`${styles.categoryLabel} ${isActiveCategory ? styles.categoryLabelActive : ""}`}
              >
                {category}
              </span>
              {categoryPosts.map((p) => (
                <BlogSidebarPostLink
                  key={p.slug}
                  post={p}
                  isActive={p.slug === currentPost.slug}
                />
              ))}
            </div>
          );
        })}
      </div>

      {relatedPosts.length > 0 ? (
        <div className={styles.sidebarBlock}>
          <h2 className={styles.sidebarHeading}>Related post</h2>
          <div className={styles.relatedList}>
            {relatedPosts.map((rp) => (
              <div key={rp.slug} className={styles.relatedItem}>
                <BlogSidebarPostLink post={rp} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <Link href="/blog" className={styles.backLink}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to blog page
      </Link>
    </aside>
  );
}
