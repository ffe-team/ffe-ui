import * as React from 'react'
import * as classnames from 'classnames'

interface AudioPropTypes {
  src: string,
  volume?: number,
  current?: number,
  duration?: number,
  prefixCls?: string,
  onPlaying?: () => void, 
  onMute?: () => void, 
  onPaused?: () => void,
  onLoad?: () => void,
  onFinished?: () => void,
  onError?: () => void,
}

class Audio extends React.Component<AudioPropTypes, any> {

  public static defaultProps = {
    prefixCls: 'ffe-audio'
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      duration: 0,
      current: 0,
      volume: 0,
    }
  }
  // 创建audio
  createAudio() {

  }
  // 跳转到指定位置
  skipTo() {

  }
  render() {
    return (
      <div>
        <div></div>
        <div></div>
      </div>
    )
  }
}

export default Audio