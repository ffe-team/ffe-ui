import * as React from 'react'
import * as classnames from 'classnames'

interface TimelineItemPropTypes {
  prefixCls: string,
  pending?: boolean,
  last?: boolean,
  icon?: string,
  className?: string
}

class TimelineItem extends React.Component<TimelineItemPropTypes, any> {
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

export default TimelineItem