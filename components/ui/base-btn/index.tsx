import { FC } from "react";

interface Prop {
  btnText: string,
  handleClick: () => void
}

const BaseBtn: FC<Prop> = ({ btnText, handleClick }) => {
  return (
    <div 
      className="flex items-center justify-center base-btn cursor-pointer pl-8 pr-8 h-10 hover:opacity-80"
      onClick={handleClick}
    >
      <div className="text-white text-2xl">{btnText}</div>
    </div>
  )
}

export default BaseBtn