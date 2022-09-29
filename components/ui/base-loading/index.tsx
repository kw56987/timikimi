import { FC } from "react";

type Prop = {
  label?: string
}

const BaseLoading: FC<Prop> = ({ label = 'loading...' }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-custom-700 z-50">
      <div className="loading">
        <div>
          <div className="c1"></div>
          <div className="c2"></div>
          <div className="c3"></div>
          <div className="c4"></div>
        </div>
        <span>{label}</span>
      </div>
    </div>
  )
}

export default BaseLoading;