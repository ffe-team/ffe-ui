import * as React from 'react'
import * as classnames from 'classnames'

interface IndicatorPropTypes {
  count: number;
  activeIndex: number;
  activeStyle?: React.CSSProperties;
  prefixCls?: string;
  onChange?: () => void;
}

class Indicator extends React.Component<IndicatorPropTypes, any> {
  static defaultProps = {
    activeIndex: 0,
    onChange: (index: number) => {},
    prefixCls: 'ffe-swipe-indicator'
  }
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: props.activeIndex
    }

    this.dots = this.dots.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex
      })
    }
  }
  dots() {
    const dots = [],
      { count, prefixCls } = this.props,
      { activeIndex } = this.state

    for (let i = 0; i < count; i++) {
      let cls = {
        [`${prefixCls}-dot`]: true,
        [`${prefixCls}-active`]: i === activeIndex
      }

      dots.push(<div key={i} className={classnames(cls)}></div>)
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