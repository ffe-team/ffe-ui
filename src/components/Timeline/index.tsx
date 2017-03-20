import React, { Component } from 'react'
import classnames from 'classnames'
import './index.less'

interface TimelinePropTypes {
  prefixCls: string,
  pending?: boolean
  className?: string,
}

class Timeline extends Component<TimelinePropTypes, any> {
  public static defaultProps: TimelinePropTypes = {
    prefixCls: 'ffe-timeline',
  }
  public static Item: any = TimelineItem

  constructor(props) {
    super(props);
  }
  render() {
    const { prefixCls, children, className, ...props } = this.props
    const newChildren: Array<any> = React.Children.map(children, item => item)
    const items = React.Children.map(newChildren, (ele: any, idx) => {
      return React.cloneElement(ele, {
        last: idx === newChildren.length - 1,
      })
    })

    return (
      <ul className={classnames(className, prefixCls)} {...props}>
        {items}
      </ul>
    )
  }
}

interface TimelineItemPropTypes {
  prefixCls: string,
  pending?: boolean,
  last?: boolean,
  icon?: string,
  className?: string
}


class TimelineItem extends Component<TimelineItemPropTypes, any> {
  static defaultProps: TimelineItemPropTypes = {
    prefixCls: 'ffe-timeline-item'
  }
  constructor(props) {
    super(props);
  }
  render() {
    let {pending, icon, last, className, prefixCls, children, ...other} = this.props
    let classSet = {
      [prefixCls]: true,
      [`${prefixCls}-last`]: last,
      [`${prefixCls}-pending`]: pending,
    }

    let dotClass = {
      [`${prefixCls}-head`]: true,
      [`${prefixCls}-head-custom`]: icon,
    }
    return (
      <div className={classnames(className, classSet)} {...other}>
        <div className={`${prefixCls}-tail`}></div>
        <div className={classnames(dotClass)}></div>
        <div className={`${prefixCls}-content`}>
          {children}
        </div>
      </div>
    )
  }
}

export default Timeline