import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '~/utils/api'
import { Heading } from '~/Heading'
import type { Course } from '~/utils/types'
import { AppSidebar } from '~/AppSidebar'
// import { RecentLessons } from '~/RecentLessons'
import { DataGrid, Row, Col } from '~/DataGrid'

export function BrowseCourses() {
  const [courses, setCourses] = useState<Course[]>(null!)

  useEffect(() => {
    let isCurrent = true
    api.courses.getAll().then((courses: Course[]) => {
      if (!isCurrent) return
      setCourses(courses)
    })
    return () => {
      isCurrent = false
    }
  }, [])

  return (
    <div className="flex flex-gap">
      <div className="card spacing flex-1">
        <Heading>Courses</Heading>
        <DataGrid>
          {Array.isArray(courses) &&
            courses.length > 0 &&
            courses.map((course) => {
              return (
                <Row key={course.id}>
                  <Col key={course.id} flex>
                    <Link to={course.slug}>{course.name}</Link>
                  </Col>
                  <Col width={150}>Lessons: 5</Col>
                  <Col>
                    <button className="button button-small button-outline">Remove</button>
                  </Col>
                </Row>
              )
            })}
        </DataGrid>
      </div>
      <AppSidebar />
    </div>
  )
}
