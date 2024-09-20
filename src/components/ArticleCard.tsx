import ArticleMeta from './ArticleMeta'

export default function ArticleCard({ article }:any) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <img
        src={article.image}
        alt={article.title}
        className="w-full md:w-1/3 h-auto object-contain rounded-lg"
      />
      <div className="md:w-2/3">
        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{article.excerpt}</p>
        <ArticleMeta
          author={article.author}
          date={article.date}
          readTime={article.readTime}
        />
      </div>
    </div>
  )
}
