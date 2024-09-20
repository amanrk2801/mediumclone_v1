import PopularTags from './PopularTags'
import ReadingList from './ReadingList'
import GetApp from './GetApp'

export default function Sidebar({ popularTags }:any) {
  return (
    <aside className="md:w-1/3">
      <PopularTags popularTags={popularTags} />
      <ReadingList />
      <GetApp />
    </aside>
  )
}
