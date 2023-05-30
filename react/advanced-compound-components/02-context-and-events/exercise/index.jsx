import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure.final'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.scss'

function App() {
  return (
    <Disclosure>
      <DisclosureButton>Click Me</DisclosureButton>
      <DisclosurePanel>Panel Info</DisclosurePanel>
    </Disclosure>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
