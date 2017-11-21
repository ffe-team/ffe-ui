import * as React from 'react'
import * as classnames from 'classnames'
import FlexItem from './FlexItem'

interface FlexPropTypes {
  prefixCls: string,
  direction?: 'row' | 'row-reserve' | 'column' | 'column-reserve',
  justify?: 'start' | 'end' | 'center' | 'between' | 'around',
  alignItem?: 'start' | 'end' | 'baseline' | 'stretch' | 'center'
  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch'
  wrap?: 'no-wrap' | 'wrap' | 'wrap-reverse',
  style?: React.CSSProperties,
  className?: string,
  children?: any,
}

class Flex extends React.Component<FlexPropTypes, any> {
  public static defaultProps: FlexPropTypes = {
    prefixCls: 'ffe-flex',
  }
  public static Item: any = FlexItem

  constructor(props) {
    super(props)
  }
  render() {
    let {
      direction,
      justify,
      alignItem,
      alignContent,
      wrap,
      prefixCls,
      className,
      children,
      ...other
    } = this.props

    let classSet = {
      [prefixCls]: true,
      [`${prefixCls}-dir-${direction}`]: direction,
      [`${prefixCls}-${wrap}`]: wrap,
      [`${prefixCls}-justify-${justify}`]: justify,
      [`${prefixCls}-align-${alignItem}`]: alignItem,
      [`${prefixCls}-align-content-${alignContent}`]: alignContent
    }
    return (
      <div className={classnames(className, classSet)} {...other}>
        {children}
      </div>
    )
  }
}

export default Flex