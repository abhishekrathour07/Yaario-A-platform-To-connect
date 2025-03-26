import React from 'react'

type CustomButtonProps ={
    text:string,
    className?:string,
}
const CustomButton:React.FC<CustomButtonProps> = ({text,className}) => {
  return (
    <button className={`${className} bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600 w-fit rounded-md text-white px-4 py-1 cursor-pointer`}>
      {text}
    </button>
  )
}

export default CustomButton
