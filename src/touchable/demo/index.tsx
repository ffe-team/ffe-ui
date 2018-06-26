import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Touchable from '../index'
class TouchableDemo extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1
    }
  }
  handletap() {
    console.log('tap');
  }
  handlePress() {
    console.log('press')
  }
  handleSwipeLeft(e) {
    console.log(e)
  }
  handleSwipeRight(e) {
    console.log(e)
  }
  handlePinch(e) {
    this.setState({
      scale: e.scale*this.state.scale
    })
  }
  render() {
    const style: React.CSSProperties = {
      margin: '100px auto',
      width: '300px',
      height: '300px',
      textAlign: 'center',
      border:'solid 1px #000',
      transform: `scale(${this.state.scale})`
    }
    return (
      <div>
        <Touchable onPinch={this.handlePinch.bind(this)} onSwipeRight={this.handleSwipeRight.bind(this)} onSwipeLeft={this.handleSwipeLeft} onPress={this.handlePress.bind(this)} onTap={this.handletap.bind(this)}>
          <div style={style}>触摸一下</div>
        </Touchable>
      </div>
    );
  }
}

export default TouchableDemo;