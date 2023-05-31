import * as React from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'
import './styles.scss'

//createPortal -> different 'root' div; not react native

const Portal = ({ children }) => {
  const portalNode = React.useRef(null) //have to use 'React' this way because of the way imported
  const [_, forceUpdate] = React.useState()

  React.useLayoutEffect(() => {
    portalNode.current = document.createElement('portal') 
    //create the different root div as needed instead of going to the index.html file and creating a bunch of them
    document.body.appendChild(portalNode.current)
    forceUpdate({})
    return () => {
      if (portalNode.current) {
        document.body.removeChild(portalNode.current)
      }
    }
  }, [])

  return portalNode.current ? createPortal(children, portalNode.current) : null 
  //cleanup to remove 'root' div instead of infinitely creating them
}

const Popover = ({ children, targetRef, ...props }) => {
  const popoverRef = React.useRef(null)
  const [styles, setStyles] = React.useState({})

  // Doing this work in a ref callback helps overcome a race-condition where
  // we need to ensure the popoverRef has been established. It's established
  // later than we might expect because the div it's applied to is the children
  // of Portal which returns null initially (which it must do)
  
  function initPopoverRef(el) {
    // initPopoverRef will be called numerous times, lets do this work once.
    if (!popoverRef.current) {
      popoverRef.current = el
      if (targetRef.current && popoverRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect() //getBoundingClientRect - shows div height, etc.
        const popoverRect = popoverRef.current.getBoundingClientRect()
        setStyles(position(targetRect, popoverRect))
      }
    }
  }

  return (
    <Portal>
      <div
        {...props}
        ref={initPopoverRef}
        data-popover=""
        style={{
          position: 'absolute',
          ...styles,
        }}
      >
        {children}
      </div>
    </Portal>
  )
}

const Define = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const buttonRef = React.useRef()

  React.useEffect(() => {
    const listener = (event) => {
      if (event.target !== buttonRef.current) {
        setOpen(false)
      }
    }
    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  }, [])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {children}
      </button>
      {open && (
        <Popover onClick={(e) => e.stopPropagation()} targetRef={buttonRef}>
          Hooks are a way to compose behavior into components
        </Popover>
      )}
    </>
  )
}

export function App() {
  return (
    <p>
      Modern React is filled with <Define>Hooks</Define>. They work with function-components and
      they give us an ability to use state and other React features similarly to class-based
      components.
    </p>
  )
}
