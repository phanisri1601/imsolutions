import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blogPosts";
import styles from "./BlogPost.module.css";

type Props = {
  post: BlogPost;
  isActive?: boolean;
  className?: string;
};

function formatSidebarDate(date: string) {
  if (!date?.trim()) return "Insights";
  return date;
}

export default function BlogSidebarPostLink({ post, isActive, className }: Props) {
  const coverImage = post.image || "/blog_seo.png";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${styles.sidebarPostLink} ${isActive ? styles.sidebarPostLinkActive : ""} ${className ?? ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={styles.sidebarPostThumb}>
        <Image
          src={coverImage}
          alt={post.title}
          width={254}
          height={143}
          sizes="254px"
          className={styles.sidebarPostThumbImg}
        />
      </div>
      <span className={styles.sidebarPostDate}>{formatSidebarDate(post.date)}</span>
      <p className={styles.sidebarPostTitle}>{post.title}</p>
    </Link>
  );
}
