import * as React from 'react'
import Transition from 'react-transition-group/Transition'
import React, { Component } from 'react';

const transitionStyle = {
  entering: {
    opacity: 0,
  }
  entered: {
    opacity: 1,
  }
}

const FadePropTypes = {
  onEnter: () => void,
  onExit: () => void,
}

class Fade extends Component {

  static defaultProps = {
    
  }
  
  render() {
    const { children, style, ...props } = this.props

    return (
      <Transition {...props}>
      {
        (state, childProps) => {
          return React.cloneElement(children, {
            ...style,
            ...transitionStyle[state]
          })
        }
      }
      </Transition>
    );
  }
}

export default Fade;