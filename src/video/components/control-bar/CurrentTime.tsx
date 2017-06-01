import * as React from 'react'
import * as classnames from 'classnames'

class CurrentTime extends React.PureComponent<any, any> {
  constructor(props) {
    super(props)
  }
  render() {
    const { prefixCls, time } = this.props
    const cls = {
      [`${prefixCls}-current-time`]: true,
      [`${prefixCls}-control`]: true
    }

    return <span className={classnames(cls)}>{time}</span>
  }
}

export default CurrentTime