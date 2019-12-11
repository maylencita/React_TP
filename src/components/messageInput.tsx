import * as React from 'react'

interface InputProps {
  placeholder: string
  className?: string
  value: string
  onChange?: (value: string) => void
}

const input = (props: InputProps) => {
  let placeholder = props.placeholder;

  return (
    <div className={`inputWrapper ${props.className || ''}`}>
      <input 
        type="text" 
        placeholder={placeholder} 
        value={props.value}
        onChange={(event) => props.onChange && props.onChange(event.target.value)}
      />
    </div>
  )
}

export default input