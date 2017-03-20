import React, { Component } from 'react'
import classnames from 'classnames'
import './index.less'

interface types {
  prefixCls?: string,
  activeKeys?: Array<any>,
  defaultActiveKeys?: Array<any>,
  accordion?: boolean,
  onChange?: (a: any) => void
}

class Accordion extends Component<types, any> {
  static defaultProps = {
    prefixCls: 'ffe-accordion'
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKeys: props.defaultActiveKeys || []
    };
  }

}