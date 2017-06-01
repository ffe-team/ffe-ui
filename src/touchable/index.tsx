import * as React from 'react'
import * as classnames from 'classnames'

interface TouchProps extends React.Props<any> {
  moveThreshold?: number,
  tapDelay?: number,
  pressDelay?: number,
  className?: string,
  stopPropagation?: boolean,
  preventDefault?: boolean,
  onTap?: (e?:any) => void,
  onMultipleTap?: (e?:any) => void,
  onPress?: (e?:any) => void,
  onPinch?: (e?:any) => void,
  onRotate?: (e?:any) => void,
  onSwipe?: (e?:any) => void,
  onSwipeLeft?: (e?:any) => void,
  onSwipeRight?: (e?:any) => void,
  onSwipeDown?: (e?:any) => void,
  onSwipeUp?: (e?:any) => void,
}

interface Touch {
  //rotate angle
  angle?: number,
  // scale rate
  scale?: number,
  // touch event touches
  touches: any,
  // swipe movex
  moveX?: number,
  // swipe moveY
  moveY?: number,
  // swipe direction
  direction?: 'Left' | 'Right' | 'Up' | 'Down',
  // touchmove deltaX
  deltaX?: number,
  // touchmove deltaY
  deltaY?: number,
}

class Touchable extends React.Component<TouchProps, any> {
  public static defaultProps: TouchProps = {
    moveThreshold: 30,
    tapDelay: 300,
    pressDelay: 750,
  }
  // self event timeout
  private tapTimeout: number
  private pressTimeout: number
  private swipeTimeout: number
  private mutipleTimeout: number
  
  // record position
  private x1: number = 0
  private y1: number = 0
  private x2: number = 0
  private y2: number = 0

  // record event action time
  private last: number = 0

  // record delta move
  private prevX: number
  private prevY: number
  private pinch: number
  constructor(props) {
    super(props)
  }

  // 阻止事件的默认动作
  stopEventAction(e) {
    const { preventDefault, stopPropagation } = this.props
    if (preventDefault) {
      e.preventDefault()
    }
    if (stopPropagation) {
      e.stopPropagation()
    }
  }
  emitEvent(name, evt) {
    if (typeof this.props[name] === 'function') {
      this.props[name](evt)
    }
  }
  handleTouchStart(e) {
    this.stopEventAction(e)
    
    let now = Date.now()
    // caculate time from last touch time
    let deltaT = now - (this.last || now)

     // deltaT value is in the setting range
    if (this.props.tapDelay && deltaT > 0 && deltaT < this.props.tapDelay) {
      return
    }
    let touch: Touch = {
      touches: e.touches,
    }
    // record touch position
    this.x1 = touch.touches[0].pageX
    this.y1 = touch.touches[0].pageY
    if (touch.touches.length > 1) {
      this.prevX = touch.touches[1].pageX - this.x1
      this.prevY = touch.touches[1].pageY - this.y1

      this.pinch = this.getPinch(this.prevX, this.prevY)

      this.mutipleTimeout = setTimeout(() => {
        this.emitEvent('onMultipleTap', touch)
      }, 0)
    }

    this.last = now

    clearTimeout(this.pressTimeout)
    this.pressTimeout = setTimeout(() => {
      this.emitEvent('onPress', touch)
    }, this.props.pressDelay)
  }
  getPinch(distX, distY) {
    return Math.sqrt(distX * distX + distY * distY)
  }
  getRotateAngle(prevX, prevY, distX, distY) {
    // vector product
    let product = prevX * distX + prevY * distY

    // vector model
    let mr = this.getPinch(prevX, prevY) * this.getPinch(distX, distY)
    if (mr === 0) return 0

    // cosine formula, angle range [-1, 1]
    let r = product / mr
    r = r > 1 ? 1 : r < -1 ? -1 : r

    let direct = prevX * distY - distX * prevY

    return direct / Math.abs(direct) * Math.acos(r) * 180 / Math.PI
  }
  getMoveDirect(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) > Math.abs(y1 - y2) ? x1 > x2 ? 'Left' : 'Right' : y1 > y2 ? 'Up' : 'Down'
  }
  handleTouchMove(e) {
    this.stopEventAction(e)
    let touch: Touch = {
      touches: e.touches,
    }
    let len = touch.touches.length,
        currentX = touch.touches[0].pageX,
        currentY = touch.touches[0].pageY
    if (len > 1) {
      let distX = touch.touches[1].pageX - currentX, distY = touch.touches[1].pageY - currentY
      if (this.pinch > 0) {
        // 计算放大缩小倍数
        touch.scale = this.getPinch(distX, distY) / this.pinch
        this.emitEvent('onPinch', e)
      }
      touch.angle = this.getRotateAngle(this.prevX, this.prevY, distX, distY)

      this.emitEvent('onRotate', e)
      this.prevX = touch.touches[1].pageX - currentX
      this.prevY = touch.touches[1].pageY - currentY
    } else {
      if (this.x2) {
        touch.deltaX = currentX - this.x2
        touch.deltaY = currentY - this.y2
      } else {
        touch.deltaX = 0;
        touch.deltaY = 0;
      }
      this.emitEvent('onSwipe', touch)
    }

    clearTimeout(this.pressTimeout)

    this.x2 = currentX
    this.y2 = currentY
  }
  handleTouchCancel() {
    clearTimeout(this.tapTimeout)
    clearTimeout(this.pressTimeout)
    clearTimeout(this.mutipleTimeout)
    clearTimeout(this.swipeTimeout)
  }
  handleTouchEnd(e) {
    clearTimeout(this.pressTimeout)
    let touch: Touch = {
      touches: e.touches,
    }
    let { moveThreshold, tapDelay } = this.props, moveX = Math.abs(this.x1 - this.x2), moveY = Math.abs(this.y1 - this.y2)
    if ((moveThreshold && this.x2 && moveX > moveThreshold) || (moveThreshold && this.y2 && moveY > moveThreshold)) {
      // console.log(this.x1, this.x2, this.y1, this.y2)
      touch.direction = this.getMoveDirect(this.x1, this.x2, this.y1, this.y2)
      touch.moveX = Math.abs(this.x1 - this.x2)
      touch.moveY = Math.abs(this.y1 - this.y2)
      if (touch.moveX > 0 || touch.moveY > 0) {
        clearTimeout(this.swipeTimeout)
        this.swipeTimeout = setTimeout(() => {
          this.emitEvent(`onSwipe${touch.direction}`, touch)
        }, 0)
      }
    } else {
      clearTimeout(this.tapTimeout)
      this.tapTimeout = setTimeout(() => {
        this.emitEvent('onTap', touch)
      }, 0)
    }
    this.resetTouch()
  }
  handlePress() {
    this.pressTimeout = 0
    this.props.onPress && this.props.onPress()
    this.resetTouch()
  }
  resetTouch() {
    this.prevX = 0
    this.prevY = 0
    this.x1 = this.x2 = this.y1 = this.y2 = 0
  }
  render() {
    const { children } = this.props
    return React.cloneElement(React.Children.only(children), {
      onTouchStart: this.handleTouchStart.bind(this),
      onTouchMove: this.handleTouchMove.bind(this),
      onTouchCancel: this.handleTouchCancel.bind(this),
      onTouchEnd: this.handleTouchEnd.bind(this),
    })
  }
}

export default Touchable