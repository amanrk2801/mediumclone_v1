import React from 'react';
import FeaturedArticle from '../FeaturedArticle';
import LatestArticles from '../LatestArticles';
import Sidebar from '../Sidebar';
import NewsletterSection from '../NewsletterSection';

interface HomePageProps {
  articles: Array<any>;
  popularTags: string[];
  climateImage: string;
}

const HomePage: React.FC<HomePageProps> = ({ articles, popularTags, climateImage }) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <FeaturedArticle image={climateImage} />
          <LatestArticles articles={articles} />
        </div>
        <Sidebar popularTags={popularTags} />
      </div>
      <NewsletterSection />
    </main>
  );
};

export default HomePage;
