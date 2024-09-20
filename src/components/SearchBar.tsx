import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <div className="container mx-auto px-4 py-4">
      <Input type="search" placeholder="Search Medium" className="w-full" />
    </div>
  )
}
