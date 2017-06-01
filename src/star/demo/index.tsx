import * as React from 'react'
import Star from '../index'

class StarDemo extends React.Component<any, any> {
  render() {
    return (
      <div className="star-demo">
        <Star name="demo" count={5} value={3} />
      </div>
    )
  }
}

export default StarDemo