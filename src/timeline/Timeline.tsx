import * as React from 'react'
import * as classnames from 'classnames'
import TimelineItem from './TimelineItem'

interface TimelinePropTypes {
  prefixCls: string,
  pending?: boolean
  className?: string,
}

class Timeline extends React.Component<TimelinePropTypes, any> {
  public static defaultProps: TimelinePropTypes = {
    prefixCls: 'ffe-timeline',
  }

  public static Item:any = TimelineItem
  
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

export default Timeline