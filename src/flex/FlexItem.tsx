import * as React from 'react'
import * as classnames from 'classnames'

interface FlexItemPropTypes {
  prefixCls: string,
  flex?: number,
  offset?: number,
  align?: string,
  className?: string,
}

class FlexItem extends React.Component<FlexItemPropTypes, any> {
  public static defaultProps: FlexItemPropTypes = {
    prefixCls: 'ffe-flex-item'
  }
  constructor(props) {
    super(props)
  }
  render() {
    let { flex, align, offset, prefixCls, className, children, ...other } = this.props
    let classSet = {
      [prefixCls]: true,
      [`${prefixCls}-${flex}`]: flex,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-align-${align}`]: align
    }
    return (
      <div className={classnames(className, classSet)} {...other}>
        {children}
      </div>
    )
  }
}

export default FlexItem