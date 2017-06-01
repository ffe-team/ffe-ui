import  * as React from 'react'
import  * as classnames from 'classnames'
import './index.less'

interface types {
  prefixCls?: string,
  icon: string,
  style?: React.CSSProperties,
  className?: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xlg'
}

class Icon extends React.Component<types, any> {
  static defaultProps = {
    prefixCls: 'ffe-icon',
  };

  render() {
    let { prefixCls, icon, className, style, size } = this.props
    let classSet = {
      [prefixCls as string]: true,
      [`${prefixCls}-${icon}`]: true,
      [`${prefixCls}-${size}`]: size,
    }

    return (
      <span className={classnames(className, classSet)} style={style}></span>
    )
  }
}

export default Icon
