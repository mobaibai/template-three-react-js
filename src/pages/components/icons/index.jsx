import { useTitle } from "@/hooks/useTitle"

export const Icons = (props) => {
  if(props.title) useTitle(props.title)

  return (
    <div className='icons-container p-10 flex justify-center'>
      <div className='icon-items flex items-center space-x-5 children:text-24px'>
        <div className='icon-item i-svg-spinners-clock rainbow-text' />
        <div className='icon-item i-svg-spinners-bouncing-ball rainbow-text' />
        <div className='icon-item i-cryptocurrency-color-blk' />
        <div className='icon-item i-eos-icons-application-outlined rainbow-text' />
      </div>
    </div>
  )
}

export default Icons