import React from 'react'
import './input.scss'

interface InputProps {
    value: string,
    placeholder: string,
    type: string,
    setValue: (value: string) => void
}
const Input = ({value, placeholder, type, setValue}: InputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => {setValue(e.target.value)}}
      type={type}
      placeholder={placeholder}
    />
  )
}

export default Input
