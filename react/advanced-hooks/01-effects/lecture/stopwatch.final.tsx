import { useState, useEffect } from 'react'
import './styles.scss'

export function App() {
  const [active, setActive] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (active) {
      const id = setInterval(() => {
        setSeconds((seconds) => { //<- current state  /set state by a function
          return seconds + 1 // <- return new state
        })
      }, 1000)
      return () => clearInterval(id) //cleanup from memory leak if active
    }
  }, [active])

  return (
    <div className="text-center spacing stopwatch">
      <div className="horizontal-spacing">
        <button className="button" onClick={() => setActive(true)}>
          Start
        </button>
        <button className="button" onClick={() => setActive(false)}>
          Stop
        </button>
      </div>
      <hr />
      <div>Seconds: {seconds}</div>
    </div>
  )
}
