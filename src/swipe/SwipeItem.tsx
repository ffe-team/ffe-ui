import * as React from 'react'
import * as classnames from 'classnames'

interface IPropTypes {
  style?: React.CSSProperties,
  prefixCls?: string
}

class SwipeItem extends React.Component<IPropTypes, any> {
  static defaultProps = {
    prefixCls: 'ffe-swipe-item',
  }
  render() {
    const { prefixCls, style, children } = this.props

    return <div className={prefixCls} style={style}>{children}</div>
  }
}

export default SwipeItem
