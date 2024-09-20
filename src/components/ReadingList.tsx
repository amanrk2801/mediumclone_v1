import { Button } from "@/components/ui/button"
import { BookmarkIcon } from 'lucide-react'

export default function ReadingList() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-4">Reading list</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Click the <BookmarkIcon className="inline-block w-5 h-5" /> on any story to easily add it to
        your reading list or a custom list that you can share.
      </p>
      <Button className="w-full">Get started</Button>
    </div>
  )
}
