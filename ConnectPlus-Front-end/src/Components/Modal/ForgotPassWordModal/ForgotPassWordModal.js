import React, { useEffect, useState } from 'react'
import { CButton } from '../../Button/CButton'
import './ForgotPassWordModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModal } from '../../../App/ReduxHandlers/ModalSlice';
import { setForgotPassWordModalState} from '../../../App/ReduxHandlers/ModalSlice';


import CloseButton from '../../CLoseButton/CloseButton';
import axios from '../../../Config/Axios';
import Swal from 'sweetalert2';

function ForgotPassWordModal() {


const [email,setEmail]=useState('')
const [verificationCode,setVerificationCode]=useState('')
const [newPassword,setNewPassword]=useState('')
const [repeatNewPassword,setRepeatNewPassword]=useState('')
const[enterVerifyCode, setEnterVerifyCode]=useState(false)
const[emailerr ,setEmailError]=useState(true)
const [timer, setTimer]=useState(false)
const [passErr, setPassErr]=useState(true)
const [passMisMatch, setpassMisMatch]=useState(false)
const[passwordEnter,setpasswordEnter]=useState(false)


const [ minutes, setMinutes ] = useState(0);
const [seconds, setSeconds ] =  useState(10);

const dispatch=useDispatch()

  const vallidateEmail = (e) => {
    setEmailError(false)
    var regx = /^([a-zA-Z0-9\.-_ ]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,20})(.[a-zA-Z]{2,5})$/;
    if (regx.test(email)) 
   { setEmailError(false)
        return true}
     else 
    { setEmailError(true)
        return false
}
  }

  const getVerificationCode=(e)=>{
    e.preventDefault();
    setSeconds(0)
    setMinutes(5)
    setEnterVerifyCode(true)
    setTimer(true)
    axios.get(`/verificationCodeforForgotPassword?email=${email}`).then((response)=>{
        console.log(response);
     if(response?.data?.codeGenerated){
        }
        else if(response?.data?.noEmail){
            setEnterVerifyCode(false)
            setTimer(false)
             
Swal.fire(
    'Inavalid email ',
    'this email is not registered with us ',
)
        }
    })
}
useEffect(()=>{
   

        let myInterval= enterVerifyCode? setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    setTimer(false)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000) :null
                
        return () => {
            clearInterval(myInterval)
          }
              
})
const checkVerificationCode=()=>{
    axios.get(`/checkVerificationCode?email=${email}&verificationCode=${verificationCode}`).then((response)=>{
        console.log(response);
     if(response?.data?.verified){
        setEnterVerifyCode(true)
        setpasswordEnter(true)
        setTimer(false)
 
           

      }
      if(response?.data?.verified==false){

 
Swal.fire(
  'Inavalid code ',
  'please Try once more ',

)
      }
    })
}

const handleReset=()=>{
setTimer(false)
setEnterVerifyCode(false)
}

  const handleSubmit=(e)=>{
e.preventDefault()
if(validatePassword){
axios.post("/changePassword",{email:email,newPassword:newPassword})
.then((resposne)=>{
    dispatch(setLoginModal(true))
    dispatch(setForgotPassWordModalState(false))
console.log(resposne);
})

}else{
    setPassErr(true)
}
  }

  const validatePassword = (e) => {
    // e.preventDefault();
    
    var regx = /^([0-9a-zA-Z\.<>,!@#$%&*]{6,20})+$/
    if (regx.test(newPassword)) {
        if (newPassword === repeatNewPassword) 
            {setPassErr(false)
                return true
            }
         else {
            {setpassMisMatch(true)
            setPassErr(true)}
         
              
           
        }

    } else {
        return false
    }
  }

  
  return (
    <div className='ModalTest absolute flex justify-center items-center h-screen w-screen z-30 overflow-visible border ' >

      <div className='md:w-1/4 w-full m-5 md:m-0 bg bg-white h-auto rounded-lg shadow-lg ' onClick={(e)=>{ e.stopPropagation()}}>
        <span className='float-right mt-3 mr-3 hover:text-ccOrange hover:stroke-2 hover:scale-150'  onClick={()=>
     dispatch(setForgotPassWordModalState(false))}> <CloseButton/> </span>
        <br />
      <h1 className='text-center text-lg mt-5 font-bold'> Forgot Password </h1><br />
      <div className=' w-[90%] m-5  '>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username" className=' '>Registered Email: </label><br />
      
      <div className='flex  items-center'>
                <input type="text" name='email'className={` ${emailerr?"border-red-600 border-2 ":"border-black border"}   w-full my-3 h-10 rounded-lg `}
   disabled={enterVerifyCode}
                   value={
                        email
                    }
                     onChange={(e)=>{
                        setEmail(e.target.value)
                     }}
                    onKeyUp={vallidateEmail}
                    />

                    {/* for email verify  */}

                    {
                   (!emailerr && !enterVerifyCode &&!passwordEnter ) &&  
                      <a className='cursor-pointer text-blue-600 pl-5 italic font-thin underline-offset-1 inline '
                       onClick={getVerificationCode}> get&nbsp;otp</a>
              }  {
               ( enterVerifyCode &&  timer) &&
                   <a className='cursor-pointer text-blue-600 pl-5 italic font-thin underline-offset-1 inline '
                   onClick={ timer? null: handleReset}> {timer ? <div className='text-black'>
                        { minutes === 0 && seconds === 0
                            ? null
                            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
                        }
                        </div>:"reset" }</a>
           }
                   </div>



                  { passwordEnter ?<> <label htmlFor="username" className=' '>Password :
                </label><br/>
                <input type="password" name='password' className='border
                                                  border-black w-full my-3 h-10 rounded-lg' placeholder='Enter your Password ..'
                    onChange={(e)=>{
                        setNewPassword(e.target.value)
                    }}
                    value={
                        newPassword
                    }/>
                <br/>
                <input type="text" name='repeatPassword' className={` ${passErr?"border-red-600 border-2 ":"border-black border"}  w-full my-3 h-10 rounded-lg `} placeholder='Repeat your Password ..'
                    onChange={(e)=>{
                        setRepeatNewPassword(e.target.value)
                    }}
                    onKeyUp={validatePassword}
                    value={
                        repeatNewPassword
                    }/>
                       { passMisMatch && <p htmlFor="username" className='text-red-700 font-normal '>password mismatch</p> }<br />
                    </> :

   
   enterVerifyCode &&
   <>
   
   <label htmlFor="username" className=' '>Enter the verification code  : </label><br />
   

                    <div className=' flex items-center'> 
                    <input type="text" 
                     name='verificationCode' 
                     className={`border-black border w-full my-3 h-10 rounded-lg `}
                      placeholder="Enter the verification Code "
                 value={verificationCode}
                    onChange={(e)=>{ setVerificationCode(e.target.value)
                    }}
                
                    />
                     <a className='cursor-pointer text-blue-600 pl-5 italic font-thin underline-offset-1 '  onClick={checkVerificationCode}>verify...</a>

                    </div> 
                
                      </>  }

               
         

   { passwordEnter &&  <div className='w-full flex  justify-center items-center mt-5 '>
<CButton text={'Set New Passwowrd'} />
      </div >}
      </form>
  
      </div>
      </div>
    </div>
  )
    }

export default ForgotPassWordModal