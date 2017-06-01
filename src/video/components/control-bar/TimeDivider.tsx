import * as React from 'react'
import * as classnames from 'classnames'

class TimeDivider extends React.PureComponent<any, any> {
  constructor(props) {
    super(props)
  }
  render() {
    const { children, prefixCls } = this.props
    const cls = {
      [`${prefixCls}-time-divider`]: true,
      [`${prefixCls}-control`]: true
    }

    return <span className={classnames(cls)}>{children}</span>
  }
}

export default TimeDivider