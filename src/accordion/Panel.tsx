/*
 * @Author: ssruoyan 
 * @Date: 2017-03-27 21:46:22 
 * @Last Modified by: chenhao
 * @Last Modified time: 2018-05-09 12:04:27
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classnames from 'classnames';
import Icon from '../icon';

interface PanelProps {
  isActive?: boolean,
  prefixCls?: string,
  header?: string,
  onClickPanel?: () => void,
  arrow?: boolean,
  className?: string,
  children?: any
}

class Panel extends React.Component<PanelProps, any> {
  static defaultProps: PanelProps = {
    isActive: false,
    onClickPanel() {}
  }
  private node: Element
  constructor(props) {
    super(props)
  }
  handleClickPanel() {
    const { onClickPanel } = this.props

    onClickPanel && onClickPanel()
  }
  render() {
    const { className, prefixCls, children, isActive, arrow, header } = this.props
    const classSet = classnames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-active`]: isActive
    }, className)
    const panelCls = classnames({
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-content-active`]: isActive,
      [`${prefixCls}-content-inactive`]: !isActive,
    })
    const style = {
      height: isActive ? this.node.scrollHeight : 0
    }

    return (
      <div className={classSet}>
        <div
          onClick={this.handleClickPanel.bind(this)}
          className={`${prefixCls}-header`}
          role="header">
          {arrow ? <Icon icon="right" className={`${prefixCls}-arrow`}/> : ''}
          { header }
        </div>
        <div ref={(node) => this.node = node} style={style} className={panelCls}>
          <div className={`${prefixCls}-content-body`}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Panel

