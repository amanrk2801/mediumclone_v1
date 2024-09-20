import ArticleMeta from './ArticleMeta'

export default function FeaturedArticle({ image }:any) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Article</h2>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <img
          src={`${image}?height=400&width=800`}
          alt="Featured article"
          className="w-full md:h-[360px] object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-bold mb-2">
          The Impact of Climate Change on Global Economies
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          An in-depth analysis of how climate change is affecting economic systems worldwide...
        </p>
        <ArticleMeta
          author="Alex Johnson"
          date="May 16, 2023"
          readTime="10 min read"
        />
      </div>
    </section>
  )
}
