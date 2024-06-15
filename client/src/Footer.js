import React from 'react'
import { FcCopyright } from "react-icons/fc";
import { RiCopyrightFill } from "react-icons/ri";

function Footer() {
  return (
    <div className='bg-dark p-2 text-center text-light bottom-0 position-fixed w-100 mt-5'>
      <RiCopyrightFill className='fs-3' /> Copyright
      <h5>Muvvala Thoran Chandra</h5>
    </div>
  )
}

export default Footer