import { Spin } from "antd"

export const Loading = () => {
  return (
    <div className='loading-component flex justify-center pt-[10%]'>
      <Spin />
    </div>
  )
}