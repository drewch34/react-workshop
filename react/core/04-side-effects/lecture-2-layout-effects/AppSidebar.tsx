import { useState, useEffect, useLayoutEffect } from 'react'
import { RecentLessons } from '~/RecentLessons'

export const AppSidebar = () => {
  const [isWide, setIsWide] = useState(true)

  // if bigger than 1200px we want to show this sidebar

  //useLayoutEffect vs useEffect -> useLayoutEffect holds onto rerender vs 
  //useEffect will initally render as state default then change mind 

  return isWide ? (
    <aside className="card w-130">
      <RecentLessons />
    </aside>
  ) : null
}
