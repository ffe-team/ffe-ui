import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classnames from 'classnames'
import Swipe from '../swipe'

interface IPropTypes {
  activeKey?: number,
  defaultActiveKey?: number,
  onChange?: (to: any) => void,
  onTabClick?: (to: any, e: any) => void,
  onPrevClick?: () => void,
  onNextClick?: () => void,
  prefixCls?: string,
  position?: 'top' | 'right' | 'bottom' | 'left',
  className?: string,
}

class Tabs extends React.Component<IPropTypes, any> {
  static TabItem
  static defaultProps = {
    prefixCls: 'ffe-tabs',
  }

  private nav: HTMLElement
  private navRect: any

  constructor(props) {
    super(props)
    this.state = {
      activeKey: props.activeKey || this.props.defaultActiveKey || 0,
      navList: [],
      navBarStyle: {
        transform: 'translateX(0) translateZ(0)',
      },
    }

    this.renderContent = this.renderContent.bind(this)
    this.handleNavTo = this.handleNavTo.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
    this.updateNavBar = this.updateNavBar.bind(this)
    this.updateNav = this.updateNav.bind(this)

  }
  componentWillReceiveProps(nextProps) {
    const { activeKey } = nextProps

    if (activeKey && activeKey !== this.state.activeKey) {
      this.setState({
        activeKey,
      })
    }
  }
  componentDidMount() {
    this.updateNav()
    this.navRect = this.nav.getBoundingClientRect()
  }
  renderContent() {
    const { navList } = this.state
    const { children, prefixCls } = this.props
    const newChildren: any[] = React.Children.map(children, (item) => item)

    return React.Children.map(newChildren, (ele: React.ReactElement<any>, idx) => {
      const { tabId } = ele.props

      return (
        <Swipe.Item>
          {
            React.cloneElement(ele, {
              ...ele.props,
              prefixCls: `${prefixCls}-item`,
              active: idx === this.state.activeKey,
            })
          }
        </Swipe.Item>
      )
    })
  }
  handleNavTo(index) {
    const { navList } = this.state

    if (index < 0 || index >= navList.length) {
      return
    }

    this.setState({
      activeKey: index,
    }, () => {
      this.updateNav()
    })
    this.props.onChange && this.props.onChange(navList[index])
  }
  // 点击Tabbar触发变更
  handleTabClick(idx, e) {
    const { navList, activeKey } = this.state
    const { onTabClick } = this.props

    onTabClick && onTabClick(navList[idx], e)

    if (activeKey === idx) {
      return
    }

    this.setState({
      activeKey: navList[idx].key,
    }, () => {
      this.updateNavBar()
    })
  }
  updateNavBar() {
    const { navList, activeKey } = this.state
    const ref = this[`item-${activeKey}`]
    const boundingRect = ref.getBoundingClientRect()
    const offset = boundingRect.left - this.navRect.left

    const style = {
      transform: `translateX(${offset}px) translateZ(0px)`,
      width: boundingRect.width + 'px',
    }

    this.setState({
      navBarStyle: style,
    })
  }
  updateNav() {
    const navList: any[] = []
    const { children } = this.props
    React.Children.map(children, (ele: any, idx) => {
      navList.push({
        key: idx,
        ...ele.props,
      })

      this.setState({
        navList,
      }, () => {
        this.updateNavBar()
      })
    })
  }
  render() {
    const { className, prefixCls } = this.props
    const { navBarStyle, navList, activeKey } = this.state

    return (
      <div className={classnames(className, prefixCls)}>
        <div className={`${prefixCls}-bar`}>
          <div className={`${prefixCls}-nav-container`}>
            <div className={`${prefixCls}-nav-wrap`}>
              <div className={`${prefixCls}-nav-scroll`}>
                <div className={`${prefixCls}-nav`} ref={(node) => this.nav = node}>
                  <div style={navBarStyle} className={`${prefixCls}-nav-bar`}>
                    <div className={`${prefixCls}-nav-bar-inner`}></div>
                  </div>
                  {
                    navList.map((item, idx) => {
                      const navItemCls = {
                        [`${prefixCls}-nav-item`]: true,
                        [`${prefixCls}-nav-item-disabled`]: item.disabled,
                        [`${prefixCls}-nav-item-active`]: item.key === activeKey
                      }
                      return (
                        <div ref={(node) => this[`item-${idx}`] = node}  key={item.key} onClick={this.handleTabClick.bind(this, idx)} className={classnames(navItemCls)}>{item.label}</div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${prefixCls}-content`}>
          <Swipe onChange={this.handleNavTo} activeSlide={activeKey}>
            {this.renderContent()}
          </Swipe>
        </div>
      </div>
    )
  }
}

export default Tabs
