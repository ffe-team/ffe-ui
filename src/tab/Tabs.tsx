import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classnames from 'classnames'
import Touchable from '../touchable'

interface TabsPropTypes {
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

class Tabs extends React.Component<TabsPropTypes, any> {
  public static TabItem
  static defaultProps = {
    prefixCls: 'ffe-tabs'
  }

  // record the nav boundingClientRect object
  private navRect: any

  constructor(props) {
    super(props)
    this.state = {
      activeKey: props.activeKey || this.props.defaultActiveKey || 0,
      navList: [],
      navBarStyle: {
        transform: 'translateX(0) translateZ(0)'
      },
    }
    this.navRect = {}
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
    this.navRect = ReactDOM.findDOMNode(this.refs.nav).getBoundingClientRect()
  }
  renderContent() {
    const { navList } = this.state
    const { children, prefixCls } = this.props
    const newChildren: Array<any> = React.Children.map(children, item => item)

    return React.Children.map(newChildren, (ele:any, idx) => {
      const { tabId } = ele.props

      return React.cloneElement(ele, {
        ...ele.props,
        prefixCls: `${prefixCls}-item`,
        active: idx === this.state.activeKey,
      })
    })
  }
  handleSwipeLeft() {
    const { activeKey, navList } = this.state
    const length = navList.length;

    this.handleNavTo(activeKey + 1) 
  }
  handleSwipeRight() {
    const { activeKey, navList } = this.state
    const length = navList.length;

    this.handleNavTo(activeKey - 1)
  }
  handleNavTo(index) {
    const { navList } = this.state
 
    if (index < 0 || index >= navList.length) {
      return
    }

    this.setState({
      activeKey: index
    }, () => {
      this.updateNav()
    })
    this.props.onChange && this.props.onChange(navList[index])
  }
  // 点击Tabbar触发变更
  handleTabClick(idx, e) {
    const { navList, activeKey } = this.state

    this.props.onTabClick && this.props.onTabClick(navList[idx], e)
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
    const ref = ReactDOM.findDOMNode(this.refs[`item_${activeKey}`])
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
    let navList = []
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
      } )
    })
  }
  render() {
    const { className, prefixCls } = this.props
    const { navBarStyle, navList, activeKey } = this.state

    const cls = {
      [`${prefixCls}`]: true,
    }
    const contentStyle = {
      transform: `translateX(${-100 * activeKey}%) translateZ(0)`
    }

    return (
      <div className={classnames(className, cls)}>
        <div className={`${prefixCls}-bar`}>
          <div className={`${prefixCls}-nav-container`}>
            <div className={`${prefixCls}-nav-wrap`}>
              <div className={`${prefixCls}-nav-scroll`}>
                <div className={`${prefixCls}-nav`} ref="nav">
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
                        <div ref={`item_${idx}`} key={item.key} onClick={this.handleTabClick.bind(this, idx)} className={classnames(navItemCls)}>{item.label}</div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Touchable onSwipeLeft={this.handleSwipeLeft.bind(this)} onSwipeRight={this.handleSwipeRight.bind(this)}>
          <div style={contentStyle} className={`${prefixCls}-content`}>
          {this.renderContent()}
          </div>
        </Touchable>
      </div>
    )
  }
}

export default Tabs
