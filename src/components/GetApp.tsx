import { Button } from "@/components/ui/button"

export default function GetApp() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Get the Medium app</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Read stories on the go and get personalized recommendations.
      </p>
      <div className="flex space-x-4">
        <Button className="flex-1">App Store</Button>
        <Button className="flex-1">Google Play</Button>
      </div>
    </div>
  )
}
