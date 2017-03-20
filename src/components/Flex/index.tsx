import React, { Component } from 'react'
import classnames from 'classnames'
import './index.less'

interface FlexPropTypes {
  prefixCls: string,
  direction?: 'row' | 'row-reserve' | 'column' | 'column-reserve',
  justify?: 'start' | 'end' | 'center' | 'between' | 'around',
  alignItem?: 'start' | 'end' | 'baseline' | 'stretch' | 'center'
  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch'
  wrap?: 'no-wrap' | 'wrap' | 'wrap-reverse',
  style?: React.CSSProperties,
  className?: string,
}

class Flex extends Component<FlexPropTypes, any> {
  public static defaultProps: FlexPropTypes = {
    prefixCls: 'ffe-flex',
  }
  public static Item: any = Item
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

interface FlexItemPropTypes {
  prefixCls: string,
  flex?: number,
  offset?: number,
  align?: string,
  className?: string,
}

class Item extends Component<FlexItemPropTypes, any> {
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

export default Flex