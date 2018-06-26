import * as classnames from 'classnames'
import * as React from 'react'

interface IndicatorPropTypes {
  count: number
  activeIndex: number
  activeStyle?: React.CSSProperties
  prefixCls?: string
  onChange?: () => void
}

class Indicator extends React.Component<IndicatorPropTypes, any> {
  static defaultProps = {
    activeIndex: 0,
    prefixCls: 'ffe-swipe-indicator',
  }
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: props.activeIndex,
    }

    this.dots = this.dots.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      })
    }
  }
  dots() {
    const dots: React.ReactNode[] = [],
      { count, prefixCls } = this.props,
      { activeIndex } = this.state

    for (let i = 0; i < count; i++) {
      const cls = {
        [`${prefixCls}-dot`]: true,
        [`${prefixCls}-active`]: i === activeIndex,
      }

      dots.push(<div key={i} className={classnames(cls)} />)
    }

    return dots
  }
  render() {
    const { count, prefixCls } = this.props

    return (
      <ul className={prefixCls}>{this.dots()}</ul>
    )
  }
}

export default Indicator
