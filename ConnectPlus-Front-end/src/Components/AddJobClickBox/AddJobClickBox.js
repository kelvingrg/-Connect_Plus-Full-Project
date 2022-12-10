import React ,{useState}from 'react'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import { CButton } from '../../Components/Button/CButton'
import PostBox from '../../Components/PostBox/PostBox'
import Feeds from '../../Components/Feeds/Feeds'
import {useDispatch, useSelector} from 'react-redux'
import axios from '../../Config/Axios'
import { useNavigate } from 'react-router-dom';
import { setSingleJobPostData } from '../../App/ReduxHandlers/TempDataReducer';

function AddJobClickBox() {

    const {userData}=useSelector(state=>state?.login)
    const dispatch=useDispatch()
  
    const navigate=useNavigate()
  const [open, setOpen]=useState() 
  const [companyLogo ,setCompanyLogo]=useState('')
  let [formData,setformData]=useState({
      companyName:"",
      designation:"",
      workLocation:"",
      workType:"",
      workMode:"",
      minSalary:"",
      maxSalary:"",
      overView:"",
      jd:"",
      authorisationReq:true,
  })
  
  const handleChange=(e)=>{
      setformData({...formData,[e.target.name]:e.target.value})
  
  }
  const hnadleMediaFileInput =(e)=>{
      console.log(e.target.files[0]);
   setCompanyLogo({file: e.target.files[0]})
    
  }
  const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(formData,"reached inside handlesubmit ",companyLogo.file);
      let fileData = new FormData()
  
      fileData.append("image", companyLogo.file);
      console.log(fileData);
      axios.post('/addNewJobPost',fileData,{params: {
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
           
  
      },       
      headers: {
          "Content-Type": "multipart/form-data"
      }}
      )
      .then((response)=>{
          if (response ?. data ?. loadError) {
              navigate('/page404')
          }
          if (response ?. data ?. upload) {
              console.log(response,"iresponse of userAboutSessionUpdate ")
               dispatch(setSingleJobPostData({}))
               handleOpen(!open)
             
          }
      
         })
         .catch((error)=>{
           localStorage.clear()
                   navigate('/')
         })
  
  }
  
    function Icon({  open }) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
          open ? "rotate-180" : ""
          } h-5 w-5 transition-transform`}
          fill="none"
         // viewBox="0 0 24 24"
         // stroke="currentColor"
         // strokeWidth={2}
        >
         // <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
  
    const handleOpen=(boolean)=>{
      setOpen(boolean)
    }

  return (
    <div className='py-2'>
<Accordion open={open} 
icon={<Icon  open={open} />}

>
   
        <AccordionHeader onClick={() => handleOpen(!open)}>
     <PostBox jobPost={true}/>
        </AccordionHeader>
        <AccordionBody>
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
    value=  {formData.workLocation}
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
  //  value=  {elements.workLocation}
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
        </AccordionBody>
      </Accordion>
      </div>
  )
}

export default AddJobClickBox