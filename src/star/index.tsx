import * as React from 'react'
import * as classnames from 'classnames'
import './index.less'

interface StarPropsTypes {
  name?: string,
  count: number,
  value?: number,
  defaultValue?: number,
  starIcon?: (i: number, value: number, name: string) => React.ReactNode,
  starHalfIcon?: (i: number, value: number, name: string) => React.ReactNode,
  editable?: boolean,
  onStarClick?: (i: number, value: number, name: string) => void,
  onChange?: (i: number, value: number, name: string) => void,
  className?: string,
  prefixCls?: string,
}

class Star extends React.Component<StarPropsTypes, any> {

  static defaultProps = {
    name: 'star',
    coout: 5,
    prefixCls: 'ffe-star',
    editable: true,
    starColor: '#fff',
    emptyStarColor: '#fff'
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || props.defaultValue || 0,
    }
  }
  handleChange(index, value, name) {
    const { editable, onChange } = this.props

    if (!editable) {
      return
    }

    this.setState({
      value: index,
    })
    onChange && onChange(index, value, name)
  }
  handelLabelClick(index, value, name) {
    const {  editable, onStarClick } = this.props  
    if (!editable) {
      return
    }

    onStarClick && onStarClick(index, value, name)
  }
  renderIcon(index, value, name) {
    const { starHalfIcon, starIcon, prefixCls } = this.props

    if (typeof starHalfIcon === 'function' && Math.ceil(value) === index && value % index !== 0) {
      return starHalfIcon(index, value, name)
    }

    if (typeof starIcon === 'function') {
      return starIcon(index, value, name)
    }

    return <i className={`${prefixCls}-icon`}>★</i>
  }
  renderStars() {
    const { name, count, editable, prefixCls } = this.props
    const { value } = this.state, starNodes: React.ReactNode[] = []

    for(let i = count; i >= 1; i--) {
      let id = `${name}_${i}`

      starNodes.push(
        <label
          key={`label_${id}`}
          className={ i <= value ? `${prefixCls}-label` : `${prefixCls}-label-empty`}
          htmlFor={id}
          onClick={this.handelLabelClick.bind(this, i, value, name)}>
          <input
            key={id}
            type="radio"
            name={name}
            className={`${prefixCls}-input`}
            id={id}
            value={i}
            checked={value === i}
            onChange={this.handleChange.bind(this, i, value, name)}/>
          {this.renderIcon(i, value, name)}
        </label>
      )
    }

    return starNodes
  }
  render() {
    const { editable, className, prefixCls } = this.props

    const cls = {
      [`${prefixCls}`]: true,
      [`${prefixCls}-non-editable`]: !editable,
    }

    return (
      <div className={classnames(className, cls)}>
        {this.renderStars()}
      </div>
    )
  }
}

export default Star
