import * as React from 'react'
import * as classnames from 'classnames'

interface SwipeItemPropType {
  style?: React.CSSProperties,
  prefixCls?: string
}

class SwipeItem extends React.Component<SwipeItemPropType, any> {
  static defaultProps: SwipeItemPropType = {
    prefixCls: 'ffe-swipe-item'
  }
  render() {
    const { prefixCls, style, children } = this.props

    return <div className={prefixCls} style={style}>{ children }</div>
  }
}

export default SwipeItem