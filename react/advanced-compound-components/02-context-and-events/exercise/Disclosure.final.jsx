import * as React from 'react'
import { wrapEvent } from '../../utils'

const DisclosureContext = React.createContext()

export function Disclosure({ onChange, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const id = React.useId()
  const panelId = `panel-${id}`

  const context = {
    isOpen,
    panelId,
    onSelect: () => {
      onChange && onChange(!isOpen)
      setIsOpen(!isOpen)
    },
  }

  return (
    <DisclosureContext.Provider value={context}>
      {typeof children === 'function' ? children(isOpen) : children}
    </DisclosureContext.Provider>
  )
}

export const DisclosureButton = React.forwardRef(
  ({ children, onClick, ...props }, forwardedRef) => {
    const { isOpen, panelId, onSelect } = React.useContext(DisclosureContext)

    return (
      <button
        {...props}
        onClick={wrapEvent(onClick, onSelect)}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-expanded={isOpen}
        aria-controls={panelId}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { isOpen, panelId } = React.useContext(DisclosureContext)

  return (
    <div
      {...props}
      id={panelId}
      hidden={!isOpen}
      data-disclosure-panel=""
      data-state={isOpen ? 'open' : 'collapsed'}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})

DisclosurePanel.displayName = 'DisclosurePanel'
