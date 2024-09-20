import { useState } from 'react'

export default function OurStoryPage() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="bg-black text-white py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-serif mb-8">Everyone has a story to tell</h2>
        <div className="max-w-2xl space-y-4">
          <p>
            Medium is a home for human stories and ideas. Here, anyone can share insightful perspectives, useful knowledge, and life wisdom with the world—without building a mailing list or a following first. The internet is noisy and chaotic; Medium is quiet yet full of insight. It's simple, beautiful, collaborative, and helps you find the right audience for whatever you have to say.
          </p>
          {showMore && (
            <>
              <p>
                Ultimately, our goal is to deepen our collective understanding of the world through the power of writing.
              </p>
              <p>
                We believe that what you read and write matters. Words can divide or empower us, inspire or discourage us. In a world where the most sensationalist and surface-level stories often win, we're building a system that rewards depth, nuance, and time well spent. A space for thoughtful conversation more than drive-by takes, and substance over packaging.
              </p>
            </>
          )}
        </div>
        <button 
          className="mt-4 text-green-400 hover:underline"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Show less' : 'Read more'}
        </button>
        <div className="mt-8 space-y-4">
          <a href="#" className="block text-xl hover:underline">Start reading</a>
          <a href="#" className="block text-xl hover:underline">Start writing</a>
          <a href="#" className="block text-xl hover:underline">Become a member</a>
        </div>
      </div>
    </div>
  )
}