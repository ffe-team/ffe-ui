import * as React from 'react'
import * as classnames from 'classnames'
import './index.less'

interface BadgePropTypes {
  color?: string,
  text?: string,
  corner?: boolean,
  dot?: boolean,
  round?: boolean,
  children?: any,
  className?: string,
  style?: React.CSSProperties,
  prefixCls?: string,
}

class Badge extends React.Component<BadgePropTypes, any> {
  static defaultProps = {
    prefixCls: 'ffe-badge'
  }
  constructor(props) {
    super(props)
  }
  render() {
    let { dot, corner, color, text, round, children, className, prefixCls, style } = this.props

    if (color) {
      style = {
        ...style,
        background: color,
      }
    }
    const cls = {
      [`${prefixCls}`]: true,
      [`${prefixCls}-dot`]: dot,
      [`${prefixCls}-corner`]: corner,
      [`${prefixCls}-round`]: round
    }
    return (
      <div style={style} className={classnames(className, cls)}>
        {children}
        <sup className={`${prefixCls}-text`}>{ dot ? '' : text}</sup>
      </div>
    )
  }
}

export default Badge