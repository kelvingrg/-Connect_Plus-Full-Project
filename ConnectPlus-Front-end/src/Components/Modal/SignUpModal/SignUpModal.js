import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {CButton} from '../../Button/CButton'
import {HiXMark} from "react-icons/hi2";
import {setsignupModal,setLoginModal} from '../../../App/ReduxHandlers/ModalSlice';
import axios from '../../../Config/Axios'
import './SignUpModal.css'
import { VscVerified } from "react-icons/vsc";


function SignUpModal() {
    const dispatch = useDispatch()

    // states for local componentt usage start
    const [emailexist, setEmailErr] = useState(false)
    const [mobexist, setMobErr] = useState(false)
    const [invalidEntry, setInavlidEntry] = useState(false)
    const [passMisMatch, setpassMisMatch] = useState(false)
    const [signupData, setSignupData] = useState({
        userName: '',
        email: '',
        mobileNumber: '',
        password: '',
        repeatPassword: '',
        verificationCode:'',
    });
    const[nameErr,setNameErr]=useState(false)
    const[emailerr ,setEmailError]=useState(false)
    const[numerr, setNumErr]=useState(false)
    const[passerr, setPassErr]=useState(false) 
    const[enterVerifyCode, setEnterVerifyCode]=useState(false)
    const[verifiedEmail,setVerifiedEmail]=useState(false)




    const handleFormImput = (e) => {

    // e.preventDefault();
    setMobErr(false)
      setEmailErr(false)
        setInavlidEntry(false)
        setpassMisMatch(false)
        console.log("veriofied code 11111111111111111")

        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(vallidateEmail(), vallidateNumber(), vallidateName(), validatePassword(), "vallidateEmail() && vallidateNumber() && vallidateName() && validatePassword()");
        if (vallidateEmail() && vallidateNumber() && vallidateName() && validatePassword() && verifiedEmail) {
            axios({method: 'post', url: '/signup', data: signupData}).then((response) => {
            console.log(response,"response AAT FRONTEND AFTER SIGNUPO");
              if(response.data?.moberr)
         setMobErr(true)
               if(response.data?.emailerr)
             setEmailErr(true)
               if(response.data?.signup)
               console.log("iside login navigate ");
               dispatch(setsignupModal(false))
               dispatch(setLoginModal(true))
            })
        } else {
            console.log(validatePassword())
            console.log(passMisMatch, "passMisMatch");
            setInavlidEntry(true)
          
        }
    }


    // valiadtion functions start

    const vallidateName = (e) => {
        // e.preventDefault();
        var regx = /^[a-zA-Z ]+$/;
        if (regx.test(signupData.userName)) 
       { setNameErr(false)
        console.log(nameErr,"nameerrr");
            return(true)}
         else 
        { setNameErr(true)
            console.log(nameErr,"nameerrr");
            return false}

        

    }
    const vallidateNumber = (e) => {
        // e.preventDefault();
        setMobErr(false)
        var regx = /^([0-9]{10})+$/;
        if (regx.test(signupData.mobileNumber)) 
           {
            setNumErr(false)
            return(true)}
         else 
       {  setNumErr(true)
            return false
}
        

    }
    const vallidateEmail = (e) => {
        // e.preventDefault();
        setEmailErr(false)
        var regx = /^([a-zA-Z0-9\.-_ ]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,20})(.[a-zA-Z]{2,5})$/;
        if (regx.test(signupData.email)) 
       { setEmailError(false)
            return true}
         else 
        { setEmailError(true)
            return false
}
        

    }
    const validatePassword = (e) => {
        // e.preventDefault();
        
        var regx = /^([0-9a-zA-Z\.<>,!@#$%&*]{6,20})+$/
        if (regx.test(signupData.password)) {
            if (signupData.password === signupData.repeatPassword) 
                {return true
                setPassErr(false)}
             else {
                {setpassMisMatch(true)
                setPassErr(true)}
             
                  
               
            }

        } else {
            return false
        }

    }
     // imput validtion functions ends
    const getVerificationCode=(e)=>{
        e.preventDefault();
        setEnterVerifyCode(true)
        axios.get(`/verifyEmail?email=${signupData.email}`).then((response)=>{
            console.log(response);
         if(response.data.codeGenerated){
            setEnterVerifyCode(true)
           
         }
        })
    }

    const checkVerificationCode=()=>{
        axios.get(`/checkVerificationCode?email=${signupData.email}&verificationCode=${signupData.verificationCode}`).then((response)=>{
            console.log(response);
         if(response.data.verified){
            setEnterVerifyCode(false)
            setVerifiedEmail(true)

         }
        })
    }
      return (<div className='ModalTest absolute flex justify-center items-center h-screen w-screen z-30 overflow-visible border'>

        <div className='md:w-1/4 w-full m-5 md:m-0 bg bg-white h-auto rounded-lg shadow-lg'
            onClick={
                (e) => {
                    e.stopPropagation()
                }
        }>
            <HiXMark className='float-right mt-3 mr-3 hover:text-ccOrange hover:stroke-2 hover:scale-150'
                onClick={
                    (e) => {
                        e.stopPropagation()
                        return dispatch(setsignupModal(false))
                    }
                }/><br/>
            <h1 className='text-center text-lg mt-5 font-bold'>Sign Up..</h1><br/>
            <div className=' w-[90%] m-5  '>
                <label htmlFor="username" className=' '>Full Name :
                </label><br/>
                <input type="text" name='userName' className={` ${nameErr?"border-red-600 border-2 ":"border-black border"}  w-full my-3 h-10 rounded-lg `}  placeholder='Enter your full name' 
                    onChange={handleFormImput}
                    onKeyUp={vallidateName}
                    value={
                        signupData.userName
                    }/>
                <label htmlFor="email" className=' '>
                    email:
                </label><br/>
                
                <div className='flex  items-center'>
                <input type="text" name='email'className={` ${emailerr?"border-red-600 border-2 ":"border-black border"}  w-full my-3 h-10 rounded-lg `}
                    value={
                        signupData.email
                    }
                    onChange={handleFormImput}
                    onKeyUp={vallidateEmail}
                    />

                    {/* for email verify  */}

                    {
                    verifiedEmail ? <a className='cursor-pointer text-green-400 pl-5 italic font-thin underline-offset-1  flex items-center' onClick={getVerificationCode}><VscVerified/>&nbsp;verified </a> :
                    signupData.email ? (!emailerr ) &&  
                      <a className='cursor-pointer text-blue-600 pl-5 italic font-thin underline-offset-1 inline ' onClick={getVerificationCode}> get&nbsp;otp</a>
                   :null }
                   </div>

                   {
                   enterVerifyCode
                    &&
                    <div className=' flex items-center'> 
                    <input type="text" 
                     name='verificationCode' 
                     className={`border-black border w-full my-3 h-10 rounded-lg `}
                      placeholder="Enter the verification Code "
                 value={signupData.verificationCode}
                    onChange={(e)=>{ setVerifiedEmail(false)
                        console.log("veriofied code **************", e.target.name,e.target.value)
                     handleFormImput(e);
                       
                    }}
                
                    />
                     <a className='cursor-pointer text-blue-600 pl-5 italic font-thin underline-offset-1 ' onClick={checkVerificationCode}>verify...</a>
                    </div>}
                  
                    {/* for email verify  */}

                <label htmlFor="username" className=' '>Mobile Number :
                </label><br/>
                <input type="text" name='mobileNumber'className={` ${numerr?"border-red-600 border-2":"border-black border"}  w-full my-3 h-10 rounded-lg`} placeholder='Enter Your Mobile Number '
                    onChange={handleFormImput}
                    onKeyUp={vallidateNumber}
                    value={
                        signupData.mobileNumber
                    }/>
                <label htmlFor="username" className=' '>Password :
                </label><br/>
                <input type="password" name='password' className='border
                                                  border-black w-full my-3 h-10 rounded-lg' placeholder='Enter your Password ..'
                    onChange={handleFormImput}
                    value={
                        signupData.password
                    }/>
                <br/>
                <input type="text" name='repeatPassword' className={` ${passerr?"border-red-600 border-2 ":"border-black border"}  w-full my-3 h-10 rounded-lg `} placeholder='Repeat your Password ..'
                    onChange={handleFormImput}
                    onKeyUp={validatePassword}
                    value={
                        signupData.repeatPassword
                    }/>
                <br/> {
                passMisMatch && <p htmlFor="username" className='text-red-700 font-normal '>password mismatch
                </p>
            }
                {
                invalidEntry &&< p htmlFor = "" className = 'text-red-700 font-normal ' > Invalid entries check your inputs </p>
            }
            {
              mobexist &&< p htmlFor = "" className = 'text-red-700 font-normal ' > This mobile Number has already registered  </p>
            }
              {
                emailexist &&< p htmlFor = "" className = 'text-red-700 font-normal ' > This Email Id has already registered </p>
            }
                <div className='w-full flex  justify-center items-center mt-5 '>

                  <span  onClick={handleSubmit}> <CButton text={'Signup'} /></span> 
                </div>


            </div>
        </div>
    </div>)
}
export default SignUpModal
