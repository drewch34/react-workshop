import { useState, useRef, useEffect } from 'react'
import './styles.scss'

export function App() {
  const [count, setCount] = useState(0)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const countRef = useRef<number>() 
  //useRef for current instead of what was saved to database, creating different closure
  //not supposed to do mutations inside render
  countRef.current = count

  useEffect(() => {
    if (saving) {
      setTimeout(() => {
        setMessage(
          `We saved a count of ${count}, but this might be stale because count is currently ${countRef.current}`
        )
        setSaving(false)
      }, 3000)
    }
    // 👇🏼 showing with and without count reveals some characteristics of useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving])

  function saveToDatabase() {
    setSaving(true)
  }

  return (
    <div className="text-center spacing closure-basics">
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <hr />
      <button className="button" onClick={saveToDatabase}>
        Save Count to Database
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}
