import * as classnames from 'classnames'
import * as React from 'react'

interface IPropTypes {
  activeKey: number
  navList: any[],
  prefixCls: string,
  maxNav: number,
  direct: 'h' | 'v'
  onTabClick: (index: number) => void,
}

class TabNav extends React.Component<IPropTypes, any> {
  static defaultProps = {
    maxNav: 3,
  }

  private nav: Element
  private width: number
  private height: number

  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { width, height } = this.nav.getBoundingClientRect()

    this.width = width
    this.height = height
  }
  getStyle() {
    const { maxNav, navList, direct, activeKey } = this.props
    const count = navList.length
    const realMaxNav = count < maxNav ? count : maxNav

    if (direct === 'h') {
      const each = this.width / realMaxNav

      return {
        WebkitTransform: `translateX(${each * activeKey}px)`,
        transform: `translateX(${each * activeKey}px)`,
        width: each + 'px',
      }

    }

    if (direct === 'v') {
      const each = this.height / realMaxNav

      return {
        WebkitTransform: `translateY(${each * activeKey}px)`,
        transform: `translateY(${each * activeKey}px)`,
        height: each + 'px',
      }
    }
  }
  render() {
    const { prefixCls, activeKey, direct, navList, onTabClick } = this.props
    const cls = [{
      [prefixCls]: true,
      [`${prefixCls}-direct`]: true,
    }]

    return (
      <div className={classnames(cls)}>
        <div className={`${prefixCls}-nav-wrap`} ref={(node) => this.nav = node}>
          <div className={`${prefixCls}-nav-scroll`}>
            <div className={`${prefixCls}-nav`}>
              <div style={this.getStyle()} className={`${prefixCls}-nav-bar`}>
                <div className={`${prefixCls}-nav-bar-inner`} />
              </div>
              {
                navList.map((item, idx) => {
                  const navItemCls = {
                    [`${prefixCls}-nav-item`]: true,
                    [`${prefixCls}-nav-item-disabled`]: item.disabled,
                    [`${prefixCls}-nav-item-active`]: item.key === activeKey,
                  }

                  return (
                    <div
                      ref={(node) => this[`item-${idx}`] = node}
                      key={item.key}
                      onClick={onTabClick.bind(this, item.key)}
                      className={classnames(navItemCls)}>
                      {item.label}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TabNav
