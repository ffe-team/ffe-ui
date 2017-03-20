import React from 'react'

interface TouchablePropTypes {
  moveThreshold?: number,
  tapDelay?: number,
  pressDelay?: number,
  stopPropagation?: boolean,
  preventDefault?: boolean,
  onPress?: () => void,
  onTap?: () => void,
  onSwipe?: () => void,
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
}
class TouchableMixin extends React.Component<TouchablePropTypes, any>{
  start: number
  end: number
  touch: any
  moveX: number
  moveY: number
  touchTimeout: any
  pressTimeout: any
  swipeTimeout: any
  tapTimeout: any

  constructor(props) {
    super(props); 
    this.start = 0;
    this.end = 0;
    this.touch = {};
    this.moveX = 0;
    this.moveY = 0;
  }
  static defaultProps = {
    moveThreshold: 30,
    tapDelay: 250,
    pressDelay: 750,
    preventDefault: true
  };
  eventHandle(e) {
    if (this.props.preventDefault) {
      e.preventDefault();
    }
    if (this.props.stopPropagation) {
      e.stopPropagation();
    }
  }
  handleTouchStart(e) {
    this.eventHandle(e)

    if (!e.touches) {
      throw new ReferenceError('Device not support touch event')
    }

    // 如果是单点触摸，重置其余的点
    if (e.touches.length === 1 && this.touch.x2) {
      this.touch.x2 = 0
      this.touch.y2 = 0
    }

    let now = Date.now()
    let startTouch = this.start = e.touches[0]


    this.touchTimeout && clearTimeout(this.touchTimeout)

    // 记录touch的位置
    this.touch.x1 = startTouch.pageX
    this.touch.y1 = startTouch.pageY

    // 记录touch的时间
    this.touch.last = now

    // 长按事件触发
    this.pressTimeout = setTimeout(this.handlePress, this.props.pressDelay)
  }
  handleTouchMove(e) {
    this.eventHandle(e)

    let endTouch = this.end = e.touches[0]

    this.cancelPress()

    this.touch.x2 = endTouch.pageX
    this.touch.y2 = endTouch.pageY

    // 记录移动总距离
    this.moveX = this.moveX + Math.abs(this.touch.x1 - this.touch.x2)
    this.moveY = this.moveY + Math.abs(this.touch.y1 - this.touch.y2)

  }
  handleTouchEnd(e) {
    this.eventHandle(e)

    this.cancelPress()

    const { tapDelay, moveThreshold, onTap } = this.props
    
    // 自定义滑动事件对象
    let event:any = {
      type: null,
      touch: this.touch,
      start: this.start,
      end: this.end,
      preventDefault() {}
    }
    const compareX = this.touch.x2 && Math.abs(this.touch.x1 - this.touch.x2) > moveThreshold
    const compareY = this.touch.y2 && Math.abs(this.touch.y2 - this.touch.y1) > moveThreshold

    if (compareX || compareY) {
      let direct = this.getSwipeDirection()

      event.type = 'swipe' + direct
      this.swipeTimeout = setTimeout(() => {
        let pName = `onSwipe${direct}`

        this.props[pName] && this.props[pName](event)
      }, 0)
    }
    if ('last' in this.touch && this.moveX < moveThreshold && this.moveY < moveThreshold) {
        this.tapTimeout = setTimeout(() => {
          event.type = 'tap'
          
          //单点触摸事件
          onTap()
        }, tapDelay)
    }
    
    this.resetTouch()
  }
  handleTouchCancel(e) {
    this.eventHandle(e)

    this.cancelAll()
  }
  getSwipeDirection() {
    const { x1, x2, y1, y2 } = this.touch
    const absX = Math.abs(x1 - x2), absY = Math.abs(y1 - y2)

    
    return absX >= absY ? x1 > x2 ? 'Left' : 'Right' : y1 > y2 ? 'Up' : 'Down'
  }
  handlePress() {

  }
  cancelPress() {

  }
  resetTouch() {
    this.start = 0;
    this.end = 0 ;
    this.touch = {};
    this.moveX = 0;
    this.moveY = 0;
  }
  cancelAll() {
    this.pressTimeout && clearTimeout(this.pressTimeout)
    this.touchTimeout && clearTimeout(this.touchTimeout)
    this.swipeTimeout && clearTimeout(this.swipeTimeout)
    this.tapTimeout && clearTimeout(this.tapTimeout)

    this.pressTimeout = this.touchTimeout = this.swipeTimeout = this.tapTimeout = null

    this.resetTouch()
  }
}

export default TouchableMixin