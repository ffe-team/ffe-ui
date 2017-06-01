import * as React from 'react'
import * as classnames from 'classnames'

interface PlayProps {
  paused?: boolean,
  onClick?: (e:any) => void,
  className?: string,
  prefixCls?: string,
}

class Play extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  render() {
    const { paused, onClick, prefixCls } = this.props
    const cls = {
      [`${prefixCls}-play`]: true,
      [`${prefixCls}-control`]: true
    }

    return <button type="button" className={classnames(cls)}></button>
  }
}