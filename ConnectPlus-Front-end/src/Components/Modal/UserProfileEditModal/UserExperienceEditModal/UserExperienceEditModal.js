import React,{useState} from 'react'
import { Input } from "@material-tailwind/react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import CPIcon from '../../../Icon/CPIcon';
import { BsPlusCircle } from 'react-icons/bs';
import { useEffect } from 'react';
import { CButton } from '../../../Button/CButton';
import  axios from "../../../../Config/Axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../../../App/ReduxHandlers/LoginReducer';
import { setUserExperienceEditModalState } from '../../../../App/ReduxHandlers/ModalSlice';

function UserExperienceEditModal() {

    const {userData}=useSelector((state)=>state?.login)
    const [data, setData]=useState(userData.experience)
const navigate=useNavigate()
const dispatch=useDispatch()



 useEffect(()=>{},[userData])

    const [open, setOpen] = useState(1);
 
    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    }

    function Icon({ id, open }) {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              id === open ? "rotate-180" : ""
            } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        );
      }

      const handleChange  = index => event => {
        

        console.log('index: ' + index);
        console.log('property name: '+ event.target.name,"*******",event.target.value);
        let newArr = [...data]; 
       let  propertyName = event.target.name // copying the old datas array
        // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
       newArr[index-1][propertyName] = event.target.value; // replace e.target.value with whatever you want to change it to
      
        setData(newArr);
        
      }
      const handleSubmit=(e)=>{
        console.log(data,"data at handle submu=it")
        e.preventDefault()
        axios.post(`/userExperienceUpdate?userId=${userData._id}`,data)
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
                 dispatch(setUserExperienceEditModalState(false))
            }
        
           })
           .catch((error)=>{
            console.log(error)
             localStorage.clear()
                     navigate('/')
           })
        


      }

  return (
 <>
 <div className='w-full p-5'>

{data.map((elements,index)=>
 <div className='py-2'>
<Accordion open={open === index+1} icon={<Icon id={index+1} open={open} />}>
   
        <AccordionHeader onClick={() => handleOpen(index+1)}>
      <p className='text-sm font-semibold'>  {elements.companyName?elements.companyName:"Add New experinece"}</p>
        </AccordionHeader>
        <AccordionBody>
       <div className='w-full overflow-y-visible'> 
    <input type="text"
    className='border border-zinc-400 w-full rounded-lg pl-5 py-2 capitalize focus:border-zinc-600 focus:outline-none mt-3'
    value=  {elements.companyName}
    name="companyName"
    id={index+1}
    placeholder='companyName'
    onChange={handleChange(index+1)}
    />
    
    <input type="text"
    className='border border-zinc-400 w-full rounded-lg pl-5 py-2  capitalize focus:border-zinc-600 focus:outline-none mt-3'
    value=  {elements.designation}
    id={index+1}
    name="designation"
    placeholder='designation'
    onChange={handleChange(index+1)}
    />
      <input type="text"
    className='border border-zinc-400 w-full rounded-lg pl-5 py-2  capitalize focus:border-zinc-600 focus:outline-none mt-3'
    value=  {elements.workLocation}
    id={index+1}
    name="workLocation"
    placeholder='workLocation'
    onChange={handleChange(index+1)}
    />
    <div className=' flex-1 flex space-x-2 w-full'>
    <input type="date"
    className='border border-zinc-400 w-full rounded-lg pl-5  py-2 capitalize focus:border-zinc-600 focus:outline-none mt-3'
    value={elements.fromDate}
    id={index+1}
    name="fromDate"
    onChange={handleChange(index+1)}
    />
     <input type="date"
    className='border border-zinc-400 w-full rounded-lg pl-5  py-2 capitalize focus:border-zinc-600 focus:outline-none mt-3'
    value={elements.endDate}
    id={index+1}
    name="endDate"
    onChange={handleChange(index+1)}
    />

    </div>
    <input type="text"
                        className=
                            ' border border-zinc-400 w-full  rounded-lg px-6 py-2  placeholder-shown:italic placeholder:font-normal focus:border-zinc-600 focus:outline-none h-28 mt-3 '                        
                        placeholder='A brief description about your role'
                        value={elements.jd}
                        name="jd"
                        id={index+1}
                        onChange={handleChange(index+1)}
                        />
    </div>
        </AccordionBody>
      </Accordion>
      </div>
      )}


      <div className='float-right my-2'>
                        <CPIcon tippyPlacement="top" tippyContent="Add More"
                            tooltip={true}>
                            <span className='hover:text-ccOrange hover:bg-ccBlack'
                                onClick={
                                    (e) => {
                                        setData([
                                            ...data,
                                             {
                                                id:data.length+1 ,
                                                companyName:"",
                                                designation:"",

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
)}

export default UserExperienceEditModal