import * as React from 'react'
import Swipe from '../index'

import './index.less'

class SwipeDemo extends React.Component<any, any> {
  render() {
    return (
      <div className="swipe-demo">
        <Swipe indicator>
          <Swipe.Item>121212</Swipe.Item>
          <Swipe.Item>1adsdasd</Swipe.Item>
          <Swipe.Item>1212dfw2121212</Swipe.Item>
          <Swipe.Item>12dfdgdfg1212</Swipe.Item>
        </Swipe>
      </div>
    )
  }
}

export default SwipeDemo