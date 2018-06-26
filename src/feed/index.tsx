import React, { Children } from 'react'
import classnames from 'classnames'

interface FeedProps {
  activeCls?: string,
  className?: string,
  disabled?: boolean,
  children?: any
  activeStyle?: React.CSSProperties
}

interface FeedState {
  actived: boolean
}

class Feed extends React.Component<FeedProps, FeedState> {
  constructor(props) {
    super(props)

    this.state = {
      actived: false,
    }
  }

  emit(type, isActive, evt) {
    const { disabled } = this.props
    const { actived } = this.state

    if (disabled) {
      return
    }

    this.props[type] && this.props[type](evt)

    if (isActive !== actived) {
      this.setState({
        actived: isActive
      })
    }
  }
  render() {
    const { children, activeCls, activeStyle } = this.props
    const { actived } = this.state 
    const child = React.Children.only(children)
    const style = actived ? activeStyle : undefined

    return React.cloneElement(child, {
      className: classnames(child.props.className, {
        [activeCls]: actived
      }),
      style: {
        ...child.props.style,
        ...style
      },
      onTouchStart: this.emit.bind(this, 'onTouchStart', true),
      onTouchMove: this.emit.bind(this, 'onTouchMove', true),
      onTouchEnd: this.emit.bind(this, 'onTouchEnd', true),
      onTouchCancel: this.emit.bind(this, 'onTouchCancel', true),
      onMouseDown: this.emit.bind(this, 'onTouchDown', true),
      onMouseUp: this.emit.bind(this, 'onTouchUp', true),
      onMouseLeave: this.emit.bind(this, 'onTouchLeave', true)
    })
  }
}