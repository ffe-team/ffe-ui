/**
 * @desc: Swipe container
 * @author: ssruoyan
 * @create: 2017-09-06 17:42:39
 * @modified by: ssruoyan
 * @modified time: 2017-09-06 17:42:39
 */

import * as classnames from 'classnames'
import * as React from 'react'
import Indicator from './Indicator'

import './index.less'

interface IPropTypes {
  className?: string

  // auto play swipe
  auto?: boolean

  // autoplay duration
  duration?: number

  // show indicator
  indicator?: boolean

  // loop shift
  loop?: boolean

  // duration of transition between two slides
  speed?: number

  // active slide index
  activeSlide?: number

  // finger swipe direction
  direction?: 'h' | 'v'

  // prevent default touch event
  preventDefault?: boolean

  // swipe change slide threshold percent
  threshold?: number

  // transition effect
  effect?: 'slide' | 'fade' | '3d' | 'skew' | 'none'

  easeing?: 'linear' | 'easeInOut' | 'easeIn' | 'easeOut'
  // class prefix
  prefixCls?: string

  // slide change event
  onChange?: (index: number) => void

  // init over
  onReady?: () => void

  // swipe destoryed
  onDestroy?: () => void

  // event
  onTransitionStart?: (index: number) => void
  onTransitionEnd?: (index: number) => void

  // touchevent
  onTouchStart?: () => void
  onTouchMove?: () => void
  onTouchEnd?: () => void

  // moving handler
  onMove?: () => void
}

type Swipes = Array<{style: React.CSSProperties}>

interface IStateTypes {
  count: number
  width: number
  offset: number
  swipes: Swipes
  active: number
  duration: number
  direction: string
}

const TRANSITION = {
  slide(swipes: Swipes, prev, current, next, move, width) {
    const len = swipes.length

    swipes[current].style = {
      ...swipes[current].style,
      transform: `translateX(${move}px)`,
      display: 'block',
    }
    swipes[next].style = {
      ...swipes[next].style,
      transform: `translateX(${width + move}px)`,
      display: 'block',
    }
    swipes[prev].style = {
      ...swipes[prev].style,
      transform: `translateX(${-width + move}px)`,
      display: 'block',
    }

    return swipes
  },
  fade(swipes: Swipes, prev, current, next, move, width) {
    const len = swipes.length
    const percent = move / width

    swipes[current].style = {
      opacity: 1 - Math.abs(percent)
    }
    if (percent > 0) {
      swipes[next].style = {
        opacity: percent,
      }
    }
    if (percent < 0) {
      swipes[prev].style = {
        opacity: Math.abs(percent)
      }
    }

    return swipes
  },
  perspect() {

  },
  skew() {

  },
  none() {}
}

function next(c, l) {
  return c + 1 >= l ? 0 : c + 1
}
function prev(c, l) {
  return c - 1 < 0 ? l - 1 : c - 1
}

const EASE = {
  linear: (t) => {
    return t
  },
  easeIn: (t) => {
    return t * t * t
  },
  easeOutCubic: (t) => {
    return (--t) * t * t + 1
  },
  easeInOut: (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },
}

class Swipe extends React.Component<IPropTypes, IStateTypes> {

  static Item: any

  static defaultProps = {
    auto: false,
    indicator: false,
    duration: 1000,
    speed: 400,
    loop: false,
    activeSlide: 0,
    effect: 'slide',
    prefixCls: 'ffe-swipe',
  }
  timer: number
  node: Element
  touch: any = {
    startX: 0,
    startY: 0,
    deltaX: 0,
    direction: '',
  }

  constructor(props) {
    super(props)

    const len = props.children.length
    const style = {
      display: 'none',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
    }
    const swipes = props.children.map(() => ({ style }))
    const active = props.activeSlide || 0

    this.state = {
      count: len,
      width: 0,
      offset: 0,
      swipes,
      active,
      duration: 0,
      direction: '',
    }

    this.touchmove = this.touchmove.bind(this)
    this.touchstart = this.touchstart.bind(this)
    this.touchend = this.touchend.bind(this)
    this.transitionend  = this.transitionend.bind(this)
  }
  componentDidMount() {
    this.init()
  }
  init() {
    this.timer && clearTimeout(this.timer)

    const { children, activeSlide, auto, effect } = this.props
    const { active, swipes, count } = this.state
    const { width } = this.node.getBoundingClientRect()

    this.setState({
      width,
      swipes: TRANSITION[effect](swipes, prev(active, count), active, next(active, count), 0, width)
    })

    this.autoPlay()
  }
  moveTo(index: number, offset: number) {
    const { active, swipes, width, count } = this.state
    const { effect } = this.props

    this.setState({
      active: index,
      swipes: TRANSITION[effect](swipes, prev(index, count), index, next(index, count), 0, width)
    })
  }
  move() {
    const { effect } = this.props
    const { width, count, swipes } = this.state
    let { active } = this.state
    let { deltaX }  = this.touch
    const percent = deltaX / width

    if (percent <= 1 && percent >= -1) {
      this.setState({
        swipes: TRANSITION[effect](swipes, prev(active, count), active, next(active, count), deltaX, width),
      })
    }
  }
  autoPlay() {
    const { auto, duration, speed } = this.props
    const {  active, count } = this.state

    if (auto && count > 1) {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.moveTo(next(active, count), 0)
        this.autoPlay()
      }, duration)
    }
  }
  touchstart(event) {
    const { onTransitionStart } = this.props
    const { active, count } = this.state

    this.timer && clearTimeout(this.timer)

    this.touch.deltaX = 0
    this.touch.direction = ''
    this.touch.startX = event.touches[0].clientX
    this.touch.startY = event.touches[0].clientY

    this.setState({
      duration: 0,
    })
  }
  touchmove(event) {
    const { preventDefault } = this.props
    const { width } = this.state
    const direction = this.touch.direction || this.getDirection(event.touches[0])

    preventDefault && event.preventDefault()

    this.touch.direction = direction

    if (direction === 'X') {

      const range = Math.min(Math.max(this.touch.deltaX, -width), width)

      this.touch.deltaX = event.touches[0].clientX - this.touch.startX

      this.move()
    }
  }
  touchend() {
    const { speed, threshold } = this.props
    const { width, active, count } = this.state

    if (this.touch.deltaX) {
      const percent = this.touch.deltaX / width

      if (Math.abs(percent) >= threshold) {
        this.moveTo(next(active, count), 0)
      } else {
        this.moveTo(active, 0)
      }

      this.setState({
        duration: speed,
      })
    }
    this.autoPlay()
  }
  transitionend() {
    const { onTransitionEnd, onChange } = this.props
    const { active } = this.state

    onTransitionEnd && onTransitionEnd(active)
  }
  getDirection(touch) {
    const distanceX = Math.abs(touch.clientX - this.touch.startX)
    const distanceY = Math.abs(touch.clientY - this.touch.startY)

    return distanceX >= distanceY ? 'X' : 'Y'
  }
  render() {
    const { prefixCls, children, indicator } = this.props
    const { swipes, width, count, active, duration, offset } = this.state
    const newChildren: any[] = React.Children.map(children, (item) => item)

    return (
      <div className={prefixCls} ref={(node) => this.node = node}>
        <div
          onTouchStart={this.touchstart}
          onTouchMove={this.touchmove}
          onTouchEnd={this.touchend}
          onTransitionEnd={this.transitionend}
          className={`${prefixCls}-wrap`}>
        {
          React.Children.map(newChildren, (child: any, idx: number) => {
            return React.cloneElement(child, {
              ...child.props,
              key: idx,
              style: swipes[idx].style,
            })
          })
        }
        </div>

        { indicator ? <Indicator
            count={count}
            activeIndex={active <= -1 ? count - 1 : active >= count ? 0 : active}/> : ''}
      </div>
    )
  }
}

export default Swipe
