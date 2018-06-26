import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface IPropTypes {
  node: Element
  children: React.ReactNode
}

class Portal extends React.Component<IPropTypes, any> {
  _node: Element

  componentWillUnmount() {
    if (this._node && this._node !== document.body) {
      this._node.parentNode.removeChild(this._node)
    }

    this._node = null
  }
  render() {
    const { node, children } = this.props

    if (!this._node || !node) {
      this._node = document.body
    }

    return ReactDOM.createPortal(children, node || this._node)
  }
}