import * as React from 'react'

export function Disclosure({ children, onChange, defaultOpen = false, ...props }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const id = React.useId() //
  const panelId = `panel-${id}`

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      isOpen,
      panelId,
      onSelect: () => {
        onChange && onChange(!isOpen)
        setIsOpen(!isOpen)
      },
    })
  })

  // Notice we don't need the wrapper div. It wasn't doing anything stylistically for us anyway
  return children
}

export const DisclosureButton = React.forwardRef(
  ({ children, isOpen, panelId, onSelect, ...props }, forwardedRef) => {
    // Note, data attributes in React need to have an empty string in order to be created correctly.
    return (
      <button
        {...props} //do at beginning because otherwise will be overridden
        onClick={onSelect}
        data-disclosure-button="" 
        //instead of className, can use 'data' attributes; empty string = attribute, without '=""', it just creates className
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

DisclosureButton.displayName = 'DisclosureButton' //name the component name for Chrome tools

export const DisclosurePanel = React.forwardRef(
  ({ children, isOpen, panelId, ...props }, forwardedRef) => {
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
  }
)

DisclosurePanel.displayName = 'DisclosurePanel'
