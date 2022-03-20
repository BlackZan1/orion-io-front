import React from 'react'
import './FieldUI.scss'

interface FieldUIInterface {
  label: string | null
  children: string | null
  blue: boolean
}

export const FieldUI: React.FC<FieldUIInterface> = ({
  label,
  blue,
  children
}) => (
  <div className="fieldUI">
    <div className="fieldUI__name">
      <span className="">
        {label}
      </span>
    </div>
    <div className="fieldUI__result">
      <span 
        className={blue ? 'blue' : ''}
      >
        {children}
      </span>
    </div>
  </div>
)
