import { Button } from "@/components/ui/button"

export default function PopularTags({ popularTags }:any) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
      <h3 className="text-xl font-bold mb-4">Discover more of what matters to you</h3>
      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag:any) => (
          <Button key={tag} variant="outline" className="rounded-full">
            {tag}
          </Button>
        ))}
      </div>
    </div>
  )
}
