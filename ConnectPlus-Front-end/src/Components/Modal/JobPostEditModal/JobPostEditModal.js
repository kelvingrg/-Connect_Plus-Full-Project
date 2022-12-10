import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CloseButton from '../../CLoseButton/CloseButton';
import axios from '../../../Config/Axios'
import { setJobPostEditModalState, setUserProfileModalClose } from '../../../App/ReduxHandlers/ModalSlice';
import { CButton } from '../../Button/CButton';
import { setSingleJobPostData } from '../../../App/ReduxHandlers/TempDataReducer';

function JobPostEditModal() {
    
    const {userData}=useSelector(state=>state?.login)
    const dispatch=useDispatch()
  const {singleJobPostData}=useSelector((state)=>state.tempData)
    const navigate=useNavigate()
    const [companyLogo ,setCompanyLogo]=useState('')
    const [logoChange,setLogoChange]=useState(false)
    let [formData,setformData]=useState(  singleJobPostData )
    console.log(singleJobPostData,"single form data at modal compi=unenet",formData,"formadtaa")
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
       
    }
    const hnadleMediaFileInput =(e)=>{
        console.log(e.target.files[0]);
     setCompanyLogo({file: e.target.files[0]})
     setLogoChange(true)
      
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData,"reached inside handlesubmit ",companyLogo.file);
        let fileData = new FormData()
    
        fileData.append("image", companyLogo.file);
        console.log(fileData);
        axios.post('/updateSingleJobPostData',fileData,{params: {
            companyName:formData.companyName  ,
            designation:formData.designation ,
            workLocation :formData. workLocation ,
            workType :formData.workType,
            workMode:formData.workMode,
            minSalary :formData.minSalary,
            maxSalary:formData.maxSalary,
            overView :formData.overView,
            jd:formData.jd,
            authorisationReq:formData?.authorisationReq,
            userId:userData._id,
            postId:singleJobPostData._id,
            logoChange:logoChange,
             
    
        },       
        headers: {
            "Content-Type": "multipart/form-data"
        }}
        )
        .then((response)=>{
            if (response ?. data ?. loadError) {
                navigate('/page404')
            }
            if (response ?. data ?. update) {
                console.log(response,"iresponse of userAboutSessionUpdate ")
                dispatch(setJobPostEditModalState(false))
                dispatch(setSingleJobPostData({}))
           
            }
        
           })
           .catch((error)=>{
            console.log(error);
             localStorage.clear()
             navigate('/')
           })
    
    }
  
    return (
        <>
        <div
          className=" ModalTest justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
        >
          <div className="relative w-full my-6 mx-auto md:w-1/2 mt-80">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
              {/*header*/}
              <div className="flex  justify-between items-center p-5 border-b border-zinc-400 rounded-t">
                <h3 className="text-xl font-semibold capitalize ">
                 edit your job post
                </h3>
                <span className=' w-fit h-fit'
                 onClick={()=>dispatch(setUserProfileModalClose())}
                >
               <CloseButton/>
          </span>
             
              </div>




        <div className='py-2 p-10 '>
           <div className='w-full overflow-y-visible mt- '> 
           <label htmlFor="" className=''>Company Name </label>
        <input type="text"
        className='border border-zinc-400 w-full rounded-lg pl-5 py-2 capitalize focus:border-zinc-600 focus:outline-none mt-1 mb-3 font-semibold placeholder:font-thin'
        value=  {formData.companyName}
        name="companyName"
        id=""
        placeholder='companyName'
        onChange={handleChange}
        />
          <label htmlFor="" className=''>Designation you are looking for : </label>
        <input type="text"
        className='border border-zinc-400 w-full rounded-lg pl-5 py-2  capitalize focus:border-zinc-600 focus:outline-none mt-1 mb-3 font-semibold placeholder:font-thin'
        value=  {formData.designation}
        id=""
        name="designation"
        placeholder='designation'
        onChange={handleChange}
        />
    
        <div className=' flex-1 flex space-x-2 w-full'>
    <div className='w-1/2'>
    <label htmlFor="" className=''>   Work Location </label>
          <input type="text"
        className='border border-zinc-400 w-full rounded-lg pl-5 py-2  capitalize focus:border-zinc-600 focus:outline-none mt-1 mb-3 font-semibold placeholder:font-thin'
        value= {formData.workLocation}
       // id={index+1}
        name="workLocation"
        placeholder='workLocation'
        onChange={handleChange}
        />
    
    </div>
    <div className='w-1/2'>
    
    <label htmlFor="" className=''> Upload Company Logo</label>
          <input type="file"
        className='border border-zinc-400 w-full rounded-lg pl-5 py-2  capitalize focus:border-zinc-600 focus:outline-none mt-1 mb-3 font-semibold placeholder:font-thin'
       // value=  {elements.workLocation}
       // id={index+1}
        name="logo"
        placeholder='workLocation'
        accept='image/*'
        onChange={hnadleMediaFileInput}
        />
    </div>
    
        </div>
    
        <div className=' flex-1 flex space-x-2 w-full'>
    <div className='w-1/2'>
    <label htmlFor="" className=''>   Work Type </label>
    <select 
        className='border border-zinc-400 w-full rounded-lg pl-5  py-2 capitalize focus:border-zinc-600 focus:outline-none mt-1 mb-3 font-semibold placeholder:font-thin'
        value={formData.workType}
       // id={index+1}
        name="workType"
       onChange={handleChange}
        >
            <option value="Work from Home">Work from Home</option>
            <option value="Office">Office</option>
            <option value="Hybrid">Hybrid</option>
         
        </select>
    </div>
    
    <div className='w-1/2'>
    <label htmlFor="" className=''>   Mode of Operation  </label>
    <select
        className='border border-zinc-400 w-full rounded-lg pl-5  py-2 capitalize focus:border-zinc-600 focus:outline-none mt-1 mb-3 font-semibold placeholder:font-thin'
        value={formData.workMode}
       // id={index+1}
        name="workMode"
        onChange={handleChange}
        >
              <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time </option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
            <option value="Permanent">Permanent</option>
        </select>
    </div>
    
        </div>
    
        <div className=' flex-1 flex space-x-2 w-full'>
    <div className='w-1/2'>
    <label htmlFor="" className=''> Minimum Salary Package in LPA</label>
    <input type="number"
        className='border border-zinc-400 w-full rounded-lg pl-5  py-2 capitalize focus:border-zinc-600 focus:outline-none mt-1 mb-3 font-semibold placeholder:font-thin'
        value={formData.minSalary}
       // id={index+1}
        name="minSalary"
        onChange={handleChange}
        />
         
         
    
    </div>
    
    <div className='w-1/2'>
    <label htmlFor="" className=''>  Maximum Salary Package in LPA </label>
    <input type="number"
        className='border border-zinc-400 w-full rounded-lg pl-5  py-2 capitalize focus:border-zinc-600 focus:outline-none mt-1 mb-3 font-semibold placeholder:font-thin'
        value={formData.maxSalary}
       // id={index+1}
        name="maxSalary"
        onChange={handleChange}
     />
    </div>
    
        </div>
    
        <label htmlFor="" className=''>  OverView bout the job   </label>
        <textarea type="text"
                            className=
                                ' border border-zinc-400 w-full  rounded-lg px-6 py-2  placeholder-shown:italic  focus:border-zinc-600 focus:outline-none h-24 mt-3 font-semibold placeholder:font-thin '                        
                            placeholder='OverView about the job  (write in 130 characters)'
                            value={formData.overView}
                            name="overView"
                            maxLength={130}
                            //id={index+1}
                            onChange={handleChange}
                            />
        <label htmlFor="" className=''>  Job Description  </label>
        <textarea type="text"
                            className=
                                ' border border-zinc-400 w-full  rounded-lg px-6 py-2  placeholder-shown:italic  focus:border-zinc-600 focus:outline-none h-56 max-h-fit mt-3 font-semibold placeholder:font-thin'                        
                            placeholder='Job Description'
                           value={formData.jd}
                            name="jd"
                            //id={index+1}
                            onChange={handleChange}
                            />
                           <input type="checkbox"
        className=' border-zinc-400 mt-3 capitalize focus:border-zinc-600 focus:outline-none  mb-3 font-semibold placeholder:font-thin float-left'
        value={formData.authorisationReq}
    id="authorisationReq"
        name="authorisationReq"
       onClick={(e)=>{
        console.log(formData);
        setformData({...formData,[e.target.name]:!formData.authorisationReq})
       }}
     />
      &nbsp; <label htmlFor="" className=''>  Apply for Authorisation   </label>
        </div>
       <div className=' w-full flex justify-center'><span onClick={handleSubmit}><CButton text={"Submit"}/></span> </div> 



          </div>
          </div>
            </div>
          </div>
          
       
    
    </>
      )
 
  
}

export default JobPostEditModal