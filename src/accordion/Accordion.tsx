import * as React from 'react'
import * as classnames from 'classnames'
import './index.less'

interface AccordionProps extends React.Props<any> {
  prefixCls?: string,
  activeKey?: string[],
  defaultActiveKey?: string[],
  onChange?: (key?: any) => void,
  animate?: boolean,
  arrow?: boolean,
  linkage?: boolean,
  style?: React.CSSProperties,
  className?: string,
  children?: any
};

class Accordion extends React.Component<AccordionProps, any> {
  static Panel:any
  static defaultProps: AccordionProps = {
    prefixCls: 'ffe-accordion',
    onChange() {},
    linkage: false,
    arrow: true,
  }
  constructor(props) {
    super(props)
    this.state = {
      activeKey: this.props.activeKey || this.props.defaultActiveKey || [] 
    }
  }
  componentWillReceiveProps(nextProps: AccordionProps) {
    if (nextProps.activeKey) {
      this.setState({
        activeKey: nextProps.activeKey,
      });
    }
  }
  handleClickPanel(key) {
    let activeKey = this.state.activeKey,  { linkage } = this.props
    if (linkage) {
      activeKey = activeKey[0] === key ? [] : [key]
    } else {
      activeKey = [...activeKey]

      let index = activeKey.indexOf(key), isActive = index > -1
      
      if (isActive) {
        activeKey.splice(index, 1)
      } else {
        activeKey.push(key)
      }
    }
    this.setState({
      activeKey,
    })

    this.props.onChange(activeKey)
  }
  getPanels() {
    let { activeKey } = this.state, { prefixCls, linkage, children, arrow } = this.props

    const newChildren: Array<any> = React.Children.map(children, item => item)
    return React.Children.map(newChildren, (child: any, idx) => {
      let key = String(idx), isActive = false

      if (linkage) {
        isActive = activeKey[0] === key
      } else {
        isActive = activeKey.indexOf(key) !== -1 
      }

      return React.cloneElement(child, {
        ...child.props,
        isActive,
        prefixCls,
        arrow,
        onClickPanel: this.handleClickPanel.bind(this, key),
      })
    })
  }
  render() {
    const { prefixCls, className } = this.props
    return (
      <div className={classnames(prefixCls, className)}>
        {this.getPanels.bind(this)()}
      </div>
    )
  }
}

export default Accordion