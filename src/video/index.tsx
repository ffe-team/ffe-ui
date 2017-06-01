import * as React from 'react'
import * as classnames from 'classnames'
import VideoPropTypes from './VideoPropTypes'
import './index.less'

class Video extends React.Component<VideoPropTypes, any> {
  private video:any
  private player:any
  constructor(props) {
    super(props)
    this.player = null
    this.video = null
    this.state = {
      volume: 0,
      muted: false,
      paused: false,
      currentTime: 0,
      duration: 0,
      source: [],
      playBackRate: 0,
    }
  }
  componentDidMount() {
    
  }
  componentWillUnmount() {
    this.player && this.player.dispose()
  }
  render() {
    const { onReady, style, className } = this.props

    return (
      <div className="ffe-video-player">
        <video ref={ node => this.video = node } style={style} className={classnames("video-js", className)}></video>
      </div>
    )
  }
}