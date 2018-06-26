import * as React from 'react'
import * as classnames from 'classnames'
import CSSTransition from 'react-transition-group/CSSTransition'

interface IPropTypes {
  // transition name
  name: string

  // show
  in: boolean
  key: string

  // 'enter' or 'appear' class is applied
  onEnter: () => void

  // 'enter-active' or 'appear-active' class is applied
  onEntering: () => void

  // 'enter' or 'appear' class removed
  onEntered: () => void

  // like enter handler
  onExit: () => void
  onExiting: () => void
  onExited: () => void
}
class Transition extends React.Component<IPropTypes, any> {
  
}
