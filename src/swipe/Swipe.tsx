/**
 * @desc: Swipe container
 * @author: ssruoyan
 * @create: 2017-09-06 17:42:39
 * @modified by: ssruoyan
 * @modified time: 2017-09-06 17:42:39
 */

import * as React from 'react'
import * as classnames from 'classnames'
import Indicator from './Indicator'

import './index.less'

interface PropTypes {
  className?: string,
  auto?: boolean | number,
  indicator?: boolean,
  loop?: boolean,
  speed?: number,
  activeSlide?: number,

  onTransitionStart?: (swipe: any) => void,
  onTransitionEnd?: (swipe: any) => void,
  onSwipeChangeStart?: (swipe: any) => void,
  onSwipeChangeEnd?: (swipe: any) => void
  onDestroy?: (swipe: any) => void,
  onAutoPlay?: (swipe: any) => void,
  prefixCls?: string
}

interface StateTypes {
  count: number,
  width: number,
  offset: number,
  swipes: Array<{offset: number}>,
  active: number
  duration: number,
  direction: string
}

class Swipe extends React.Component<PropTypes, StateTypes> {

  public static Item: any

  public static defaultProps : PropTypes = {
    auto: false,
    indicator: false,
    speed: 400,
    loop: false,
    activeSlide: 0,
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

    this.state = {
      count: len,
      width: 0,
      offset: 0,
      swipes: props.children.map(() => { return { offset: 0 }}),
      active: props.activeSlide || 0,
      duration: 0,
      direction: ''
    }
  }
  componentDidMount() {
    this.initialize()
  }
  initialize() {
    this.timer && clearTimeout(this.timer)

    const { children, activeSlide, auto } = this.props
    const count = React.Children.count(children)
    const { width } = this.node.getBoundingClientRect()
    const duration = 0
    const active = activeSlide
    const offset = count > 1 ? -width * (active + 1) : 0
    const swipes = [].map.call(children, () => {
      return {
        offset: 0
      }
    })

    this.setState({
      offset,
      active,
      width,
      duration,
      swipes,
    })

    this.autoPlay()
  }
  move(move: number = 0, offset: number = 0) {
    let { active, width, count, swipes } = this.state
    const { deltaX } = this.touch

    if (move) {
      if (active === -1) {
        swipes[count - 1].offset = 0;
      }
      swipes[0].offset = active === count - 1 && move > 0 ? count * width : 0;
      active += move;
    } else {
      if (active === 0) {
        swipes[count - 1].offset = deltaX > 0 ? -count * width : 0;
      } else if (active === count - 1) {
        swipes[0].offset = deltaX < 0 ? count * width : 0;
      }
    }

    this.setState({
      offset: offset - (active + 1) * width,
      swipes,
      active,
    })
  }
  autoPlay() {
    const { auto, speed } = this.props
    const {  active, count } = this.state

    if (auto && count > 1) {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.setState({
          duration: 0,
        })
        if (active >= count) {
          this.move(-count);
        }
        setTimeout(() => {
          this.setState({
            duration: speed,
          })
          this.move(1);
          this.autoPlay();
        }, 30);
      }, auto)
    }
  }
  handleTouchStart(event) {
    clearTimeout(this.timer)

    this.touch.deltaX = 0;
    this.touch.direction = '';
    this.touch.startX = event.touches[0].clientX;
    this.touch.startY = event.touches[0].clientY;

    this.setState({
      duration: 0
    })

    const { active, count } = this.state

    if (active <= -1) {
      this.move(count)
    }
    if (active >= count) {
      this.move(-count)
    }
  }
  handleTouchMove(event) {

    const { width } = this.state 
    const direction = this.touch.direction || this.getDirection(event.touches[0])

    this.touch.direction = direction
    
    if (direction === 'horizontal') {
      event.preventDefault();

      const range = Math.min(Math.max(this.touch.deltaX, -width), width)

      this.touch.deltaX = event.touches[0].clientX - this.touch.startX;

      this.move(0, range);
    }
  }
  handleTouchEnd() {
    const { speed } = this.props
    const { width } = this.state

    if (this.touch.deltaX) {
      this.move(Math.abs(this.touch.deltaX) > width / 3 ? (this.touch.deltaX > 0 ? -1 : 1) : 0);

      this.setState({
        duration: speed
      })
    }
    this.autoPlay();
  }
  handleTransitionEnd() {
    const { onTransitionEnd } = this.props
    const { active } = this.state

    onTransitionEnd && onTransitionEnd(active)
  }
  getDirection(touch) {
    const distanceX = Math.abs(touch.clientX - this.touch.startX);
    const distanceY = Math.abs(touch.clientY - this.touch.startY);

    return distanceX > distanceY ? 'horizontal' : distanceX < distanceY ? 'vertical' : '';
  }
  getStyle(idx: number) {
    const { offset, width, swipes } = this.state

    return {
      width: `${width}px`,
      transform: `translate(${swipes[idx].offset}px, 0)`
    }
  }
  render() {
    const { prefixCls, children, indicator } = this.props
    const { swipes, width, count, active, duration, offset } = this.state

    const newChildren: Array<any> = React.Children.map(children, item => item)

    return (
      <div className={prefixCls} ref={node => this.node = node}>
        <div
          style={{
            paddingLeft: `${width}px`,
            width: `${(count + 2) * width}px`,
            transitionDuration: `${duration}ms`,
            transform: `translate(${offset}px, 0)`
          }}
          onTouchStart={this.handleTouchStart.bind(this)}
          onTouchMove={this.handleTouchMove.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}
          onTransitionEnd={this.handleTransitionEnd.bind(this)}
          className={`${prefixCls}-wrap`}>
        {
          React.Children.map(newChildren, (child: any, idx: number) => {
            return React.cloneElement(child, {
              ...child.props,
              key: idx,
              style: this.getStyle(idx)
            })
          })
        }
        </div>

        { indicator ? <Indicator count={count} activeIndex={active <= -1 ? count - 1 : active >= count ? 0 : active}/> : ''}
      </div>
    )
  }
}

export default Swipe