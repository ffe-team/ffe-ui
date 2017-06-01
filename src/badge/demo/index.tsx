import * as React from 'react'
import Badge from '../index'

class BadgeDemo extends React.Component<any, any> {
  render() {
    return (
      <div style={{padding: '10px'}}>
        <Badge text="11" corner>
          <span style={{height: '50px', width: '50px', background: '#eee', display: 'inline-block'}}></span>
        </Badge>
        <br/>
        <Badge text="11" dot>
          <span style={{height: '50px', width: '50px', background: '#eee', display: 'inline-block'}}></span>
        </Badge>
        <br/>
        <Badge text="热卖" color="#ff9e55" round>
        </Badge>
        <br />
        <Badge text='11+' corner round>
          <span style={{border: 'solid 1px #ff9e55', padding: '3px 5px', color: 'red', display: 'inline-block'}}>热卖的吗</span>
        </Badge>
      </div>
    )
  }
}

export default BadgeDemo