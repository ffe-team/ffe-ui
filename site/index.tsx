import * as React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import './style.less'

import TouchableDemo from '../src/touchable/demo/index'
import AccordionDemo from '../src/accordion/demo/index'
import StarDemo from '../src/star/demo/index'
import TabsDemo from '../src/tab/demo/index'
import BadgeDemo from '../src/badge/demo/index'
import SwipeDemo from '../src/swipe/demo/index'

class App extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/touchable" component={TouchableDemo} />
          <Route path="/accordion" component={AccordionDemo} />
          <Route path="/star" component={StarDemo} />
          <Route path="/tabs" component={TabsDemo} />
          <Route path="/badge" component={BadgeDemo} />
          <Route path="/swipe" component={SwipeDemo} />
        </Switch>
      </Router>
    )
  }
}

render(<App />, document.getElementById('app'))
