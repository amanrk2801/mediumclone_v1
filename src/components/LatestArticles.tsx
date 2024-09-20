import ArticleCard from './ArticleCard'

export default function LatestArticles({ articles }:any) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
      <div className="space-y-8">
        {articles.map((article:any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
