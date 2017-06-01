import * as React from 'react'
import * as classnames from 'classnames'

interface TabItemPropTypes {
  children: React.ReactNode,
  className?: string,
  active?: boolean,
  style?: React.CSSProperties,
  tabId?: string,
  prefixCls: string,
  disabled?: boolean,
  key: string,
}

class TabItem extends React.Component<TabItemPropTypes, any> {
  constructor(props) {
    super(props)
  }
  render() {
    const { children, className, active, prefixCls, style, tabId } = this.props

    const cls = {
      [prefixCls]: true,
      [`${prefixCls}-active`]: active,
    }

    return (
      <div style={style} className={classnames(className, cls)}>
        {children}
      </div>
    )
  }
}

export default TabItem