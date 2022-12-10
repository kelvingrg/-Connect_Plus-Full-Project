import React, { useEffect, useState } from 'react'
import { BsPlusCircle } from 'react-icons/bs';
import { CButton } from '../../../Button/CButton';
import CPIcon from '../../../Icon/CPIcon';
import axios from '../../../../Config/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../../../App/ReduxHandlers/LoginReducer';
import { setUserSkillUpdateModalState } from '../../../../App/ReduxHandlers/ModalSlice';

function UserSkillUpdateModal() {
const {userData}=useSelector((state=>state?.login))
useEffect(()=>{},[userData])
const dispatch=useDispatch()
const navigate =useNavigate()

  const [data,setData]=useState(userData.skills); 
  const handleChange= index => event => {
        

    console.log('index: ' + index);
    console.log('property name: '+ event.target.name,"*******",event.target.value);
    let newArr = [...data]; 
   let  propertyName = event.target.name // copying the old datas array
    // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
   newArr[index-1][propertyName] = event.target.value; // replace e.target.value with whatever you want to change it to
  
    setData(newArr);
  }
    
  const handleSubmit=()=>{
    console.log(data,"data inside axios before submission ")
     axios.post(`/userSkillUpdate?userId=${userData._id}`,data)                                                                                                                 
    .then((response)=>{
      if (response ?. data ?. loadError) {
          navigate('/page404')
      }
      if (response ?. data ?. upload) {
          console.log(response,"iresponse of userAboutSessionUpdate ")
          // to set new useradata
          dispatch(setUserData(response.data.userData))
          localStorage.setItem("userData",response.data.userData)
          // modal close
           dispatch(setUserSkillUpdateModalState(false))
      }
  
     })
     .catch((error)=>{
      //  localStorage.clear()
      //          navigate('/')
     })
  
  }
  return (
    <>
 <div className='w-full p-5'>

{data.map((element,index)=>

    <div className=' flex-1 flex space-x-2 w-full'>
    <input type="text"
    className='border border-zinc-400 w-full rounded-lg pl-5  capitalize focus:border-zinc-600 focus:outline-none mt-3'
    value={element.skillName}
    id={index+1}
    placeholder="New Skill"
    name="skillName"
    onChange={handleChange(index+1)}
    />
     <input type="number"
    className='border border-zinc-400 w-full rounded-lg pl-5    focus:border-zinc-600 focus:outline-none mt-3'
    value={element.percentage}
    id={index+1}
    name="percentage"
    placeholder="Percentage of level "
    onChange={handleChange(index+1)}
    />
       
    </div>
 

     
      )}


      <div className='float-right my-2'>
                        <CPIcon tippyPlacement="top" tippyContent="Add New Skill"
                            tooltip={true}>
                            <span className='hover:text-ccOrange hover:bg-ccBlack'
                                onClick={
                                    (e) => {
                                        setData([
                                            ...data,
                                             {
                                                id:data.length+1 ,
                                                skillName:"",
                                                percentage:"",

                                            }
                                        ])
                                    }
                            }
                            >
                                <BsPlusCircle size={20}/></span>
                        </CPIcon>
                    </div><br/>

                    <div className='w-full flex justify-end '>
                        <span className='ml-5' onClick={handleSubmit}><CButton text={"Update"}/></span>
                    </div>
                
                    
 
 </div>



 
     
 </>
  )
}

export default UserSkillUpdateModal