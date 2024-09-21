import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useDarkMode } from '../../contexts/DarkModeContext'; 

export default function OurStoryPage() {
  const [showMore, setShowMore] = useState(false);
  const { darkMode } = useDarkMode(); 

  return (
    <div
      className={`py-16 px-4 transition-colors duration-200 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-serif mb-8">Everyone has a story to tell</h2>
        <div className="space-y-4">
          <p>
            Medium is a home for human stories and ideas. Here, anyone can share insightful
            perspectives, useful knowledge, and life wisdom with the world—without building a mailing
            list or a following first. The internet is noisy and chaotic; Medium is quiet yet full of
            insight. It's simple, beautiful, collaborative, and helps you find the right audience for
            whatever you have to say.
          </p>
          {showMore && (
            <>
              <p>
                Ultimately, our goal is to deepen our collective understanding of the world through the
                power of writing.
              </p>
              <p>
                We believe that what you read and write matters. Words can divide or empower us,
                inspire or discourage us. In a world where the most sensationalist and surface-level
                stories often win, we're building a system that rewards depth, nuance, and time well
                spent. A space for thoughtful conversation more than drive-by takes, and substance
                over packaging.
              </p>
            </>
          )}
        </div>
        <button
          className={`mt-4 text-green-400 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded transition-colors duration-200`}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Show less' : 'Read more'}
        </button>
        <div className="mt-8 space-y-4">
          {/* Start Reading Link */}
          <Link
            to="/"
            className={`block text-xl hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded transition-colors duration-200 ${
              darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
            }`}
            aria-label="Start reading articles on Home Page"
          >
            Start reading
          </Link>
          {/* Start Writing Link */}
          <Link
            to="/write"
            className={`block text-xl hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded transition-colors duration-200 ${
              darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
            }`}
            aria-label="Start writing on Write Page"
          >
            Start writing
          </Link>
          {/* Become a Member Link */}
          <Link
            to="/membership-plans"
            className={`block text-xl hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded transition-colors duration-200 ${
              darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
            }`}
            aria-label="Become a member on Membership Page"
          >
            Become a member
          </Link>
        </div>
      </div>
    </div>
  );
}
