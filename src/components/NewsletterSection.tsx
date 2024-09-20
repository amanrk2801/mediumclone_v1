import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function NewsletterSection() {
  return (
    <section className="mt-12 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Get the latest articles and insights delivered straight to your inbox.
      </p>
      <form className="flex gap-4">
        <Input
          type="email"
          placeholder="Your email address"
          className="flex-grow dark:border-white"
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </section>
  )
}
