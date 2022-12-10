import React from 'react'

function CompanyLogo(props) {
  return (
   <img src={props.image} alt="company logo" className='h-14 w-14'/>
  )
}

export default CompanyLogo