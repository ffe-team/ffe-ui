import * as React from 'react'
import Tabs from '../index'

class TabsDemo extends React.Component<any, any> {
  render() {
    return (
      <Tabs activeKey={1}>
        <Tabs.TabItem label="标签一" key="t1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, totam!
        </Tabs.TabItem>
        <Tabs.TabItem label="标签二" key="t2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, doloremque. Ducimus, perspiciatis. Consequatur, itaque, ullam. Repudiandae eveniet hic deserunt, velit quia nihil quod consequuntur praesentium asperiores minus obcaecati dolores quis, explicabo quo animi. Doloremque culpa ad illum fugiat eos cum, consectetur et quo. Commodi quo dolorum laborum tenetur, ab molestiae.
        </Tabs.TabItem>
        <Tabs.TabItem label="标签三" key="t3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam quam consectetur, voluptas quo quod architecto provident debitis laudantium eveniet? Ipsa dolor unde eligendi facere consectetur suscipit rerum. Cum, possimus.
        </Tabs.TabItem>
        <Tabs.TabItem label="标签四" key="t4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id facere sequi, deserunt dolorem voluptas veritatis enim eius asperiores quo, debitis ipsum dicta voluptate velit sit labore facilis quisquam earum provident accusantium. Suscipit blanditiis quasi laborum nisi a, ipsa distinctio veritatis at id corporis possimus ab est ratione. Iure, porro, corporis. Tempora nihil rem accusamus minus nobis. Perspiciatis corrupti obcaecati ducimus mollitia dolorum voluptatum reprehenderit accusamus consequatur error harum, illo saepe quia fuga esse reiciendis necessitatibus sed nam pariatur culpa adipisci non assumenda vel ad quis? Esse explicabo neque numquam obcaecati qui delectus inventore! Veritatis nihil voluptate possimus. Qui, culpa, fuga!
        </Tabs.TabItem>
      </Tabs>
    )
  }
}

export default TabsDemo