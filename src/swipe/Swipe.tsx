/**
 * @desc: Swipe container
 * @author: ssruoyan
 * @create: 2017-09-06 17:42:39
 * @modified by: ssruoyan
 * @modified time: 2017-09-06 17:42:39
 */

import * as React from 'react'
import * as classnames from 'classnames'

interface SwipePropTypes {
  className?: string,
  navigation: boolean,
  autoPlay: boolean,
  autoPlaySpeed: number,
  pagination: boolean,
  direction: 'horizontal' | 'vertical',
  loop: boolean,
  speed: number,
  initialSlide: number,

  onTransitionStart?: (swipe: any) => void,
  onTransitionEnd?: (swipe: any) => void,
  onSwipeChangeStart?: (swipe: any) => void,
  onSwipeChangeEnd?: (swipe: any) => void
  onDestroy?: (swipe: any) => void,
  onAutoPlay?: (swipe: any) => void,
  prefixCls?: string
}

class Swipe extends React.Component<SwipePropTypes, any> {

  public static defaultProps : SwipePropTypes = {
    autoPlay: false,
    autoPlaySpeed: 300,
    navigation: false,
    pagination: false,
    speed: 300,
    direction: 'horizontal',
    loop: false,
    initialSlide: 0,
    prefixCls: 'ffe-swipe',
  }

  constructor(props) {
    super(props)

    this.state = {
      
    }
  }
  move() {
    
  }
  translate() {

  }
  render() {
    const { prefixCls } = this.props

    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-wrap`}>
        </div>
      </div>
    )
  }
}

export default Swipe