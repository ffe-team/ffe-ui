import * as React from 'react'

interface SeekPropTypes {
  onChange?: (e) => void,
  buffered?: number,
  played?: number,
  className?: string,
  style?: React.CSSProperties,
  ariaLabel?: string,
  prefixCls?: string
}

class SeekBar extends React.Component<SeekPropTypes, any> {
  constructor(props) {
    super(props)
  }
  render() {
    const { onChange, buffered, played, className, style, ariaLabel, prefixCls } = this.props
    return (
      <div className={`${prefixCls}-seekbar`}>
        <div className={`${prefixCls}-seekbar-buffer`} style={{width: `${buffered}%`}}></div>
        <div className={`${prefixCls}-seekbar-palyed`} style={{width: `${played}%`}}></div>
        <input
          className={`${prefixCls}-seekbar-input`}
          value={played}
          type="range"
          min="0"
          step="1"
          max="100"
          onChange={onChange}
          aria-label={ariaLabel}/>
      </div>
    )
  }
}

export default SeekBar