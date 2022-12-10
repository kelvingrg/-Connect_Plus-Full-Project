import axios from '../../../../Config/Axios'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserAboutSessionModalState } from '../../../../App/ReduxHandlers/ModalSlice'
import { CButton } from '../../../Button/CButton'
import { setUserData, } from '../../../../App/ReduxHandlers/LoginReducer'
import { useEffect } from 'react'


function UserAboutSessionModal() {
  
    const {userData}=useSelector((state)=>state?.login)
    useEffect(()=>{},[userData])
    const navigate=useNavigate();
    const [about,setAbout]=useState("");
    const dispatch=useDispatch()
    const handleChange=(e)=>{
        setAbout(e.target.value)

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
   axios.get(`/userAboutSessionUpdate?data=${about}&userId=${userData._id}`)
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
         dispatch(setUserAboutSessionModalState(false))
    }

   })
   .catch((error)=>{
     localStorage.clear()
             navigate('/')
   })


    }
  return (
    <>
    <div className='w-full h-full mt-5 px-3'>
    <textarea type="text-area"
                        className={
                            ` border border-zinc-400 w-full  rounded-lg px-6 py-2  placeholder-shown:italic placeholder:font-normal focus:border-zinc-600 focus:outline-none h-56 mb-5 `
                        }
                        placeholder='Write some thing about youu.'
                        value={about}
                        onChange={handleChange}
                        />

                        <div className='w-full flex justify-end mb-3 space-x-5'>
                            <button className='text-red-600' onClick={()=>dispatch(setUserAboutSessionModalState(false))}>Close</button>
<span onClick={handleSubmit}><CButton text={"Upload"} /></span>

                        </div>
    </div>
    </>
  )
}

export default UserAboutSessionModal