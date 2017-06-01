import Accordion from '../index'
import * as React from 'react'

const Panel = Accordion.Panel
export default class AccordionDemo extends React.Component<any, any> {
  render() {
    return (
      <Accordion>
        <Panel header="标题一">铁氮神猴，当今皇上的叔父，建立胡龙山庄</Panel>
        <Panel header="标题二">东厂嘟嘟，掌管让朝中文武百官闻之丧胆的特务机关东厂。修炼天罡童子功五十年</Panel>
        <Panel header="标题三">诸葛村妇，诸葛村第十三代村长，前世是大名鼎鼎的诸葛亮转世。为了带领诸葛存走向社会主义初级阶段小康生活，参加了圣地亚哥农夫足球总决赛。</Panel>
        <Panel header="标题四">雷布斯，世界顶级企业的CEO，有名的成功人士。但是在圣地亚哥这样的庞然大物面前显得微不足道，就算是圣地亚哥的一名扫厕所的阿姨都比他要高贵的多。能参加此次足球大会并作为裁判，是一名CEO百年难遇的机会和荣耀。</Panel>
      </Accordion>
    )
  }
}