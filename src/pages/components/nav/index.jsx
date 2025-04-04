import { Skeleton } from "antd"
import { NavFollow } from "@/components/NavFollow"
import { useTitle } from "@/hooks/useTitle"

const navList1 = [{ id: '-1', fruit: '全部' }, { id: '11', fruit: '西瓜' }, { id: '12', fruit: '哈密瓜' }, { id: '13', fruit: '榴莲' }, { id: '14', fruit: '芒果' }, { id: '15', fruit: '猕猴桃' }, { id: '16', fruit: '木瓜' }, { id: '17', fruit: '橙柚' }, { id: '18', fruit: '柠檬' }, { id: '19', fruit: '石榴' }, { id: '20', fruit: '橘子' }, { id: '21', fruit: '蜜柚' }, { id: '22', fruit: '杏子' }, { id: '23', fruit: '柿子' }, { id: '24', fruit: '青梅' }, { id: '25', fruit: '山竹' }, { id: '26', fruit: '百香果' }, { id: '27', fruit: '桑葚' }, { id: '28', fruit: '杨梅' }, { id: '29', fruit: '荔枝' }, { id: '30', fruit: '番茄' }]
const navList2 = [{ id: '-1', name: '全部' }, { id: '1', name: '香蕉' }, { id: '2', name: '苹果' }, { id: '3', name: '橙子' }, { id: '4', name: '草莓' }, { id: '5', name: '蓝莓' }, { id: '6', name: '菠萝' }, { id: '7', name: '樱桃' }, { id: '8', name: '葡萄' }, { id: '9', name: '柚子' }, { id: '10', name: '桃子' }, { id: '11', name: '西瓜' }, { id: '12', name: '哈密瓜' }, { id: '13', name: '榴莲' }, { id: '14', name: '芒果' }, { id: '15', name: '猕猴桃' }, { id: '16', name: '木瓜' }, { id: '17', name: '橙柚' }, { id: '18', name: '柠檬' }, { id: '19', name: '石榴' }, { id: '20', name: '橘子' }]

export const Nav = (props) => {
  if (props.title) useTitle(props.title)

  /**
   * @description: Nav点击处理
   * @param {Object} item
   * @return {void}
   */
  const onClickNavItemHandler = (item) => {
    console.log('NavItem', item)
  }

  return (
    <div className='nav-container p-10 flex justify-center'>
      <NavFollow list={navList1} navItemName="fruit" followType="bg" size="large" onClickNavItemHandler={onClickNavItemHandler} />
      <NavFollow list={navList2} navItemName="name" color="#eb2f96" onClickNavItemHandler={onClickNavItemHandler} />
    </div>
  )
}
export default Nav