import * as React from 'react'
import * as classnames from 'classnames'

interface FullscreenProps {
  prefixCls?: string,
  ariaLabel?: string,
  onClick?: (e: any) => void,
  style?: React.CSSProperties
}

class Fullscreen extends React.Component<FullscreenProps, any> {
  render() {
    const { prefixCls, ariaLabel, onClick, style } = this.props
    const cls = {
      [`${prefixCls}-fullscreen`]: true,
      [`${prefixCls}-control`]: true
    }

    return <button type="button" className={classnames(cls)} onClick={onClick} aria-labe={ariaLabel} style={style}></button>
  }
}

export default Fullscreen