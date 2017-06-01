import * as React from 'react'
import * as classnames from 'classnames'

class DurationTime extends React.PureComponent<any, any> {
  constructor(props) {
    super(props)
  }
  render() {
    const { time, prefixCls } = this.props
    const cls = {
      [`${prefixCls}-duration`]: true,
      [`${prefixCls}-control`]: true,
    }

    return <span className={classnames(cls)}>{time}</span>
  }
}

export default DurationTime