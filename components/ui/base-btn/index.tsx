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
      style={{ background: '#f5f5f5' }}
    >
      <div className="text-white text-2xl" style={{ color: '#d9d9d9' }}>{btnText}</div>
    </div>
  )
}

export default BaseBtn