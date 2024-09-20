export default function ArticleMeta({ author, date, readTime }:any) {
    return (
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span>{author}</span>
        <span className="mx-2">·</span>
        <span>{date}</span>
        <span className="mx-2">·</span>
        <span>{readTime}</span>
      </div>
    )
  }
  