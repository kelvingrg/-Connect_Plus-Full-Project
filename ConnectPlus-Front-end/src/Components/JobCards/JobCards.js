import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
  import { TfiLocationPin } from "react-icons/tfi";
  import { AiFillCaretRight } from "react-icons/ai";
  import moment from 'moment'
  import ReactTimeAgo from 'react-time-ago'
  import en from 'javascript-time-ago/locale/en.json'
  import ru from 'javascript-time-ago/locale/ru.json'
  import TimeAgo from 'javascript-time-ago'
import { useDispatch, useSelector } from 'react-redux';
import { setDetailedSingleJobPostData } from '../../App/ReduxHandlers/TempDataReducer';
import {  useNavigate } from 'react-router-dom';
  TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

function JobCards({data}) {
const dispatch=useDispatch()
const navigate =useNavigate()


  return (
    <Card className="w-80 h-80 rounded-lg shadow-lg border mb-3" onClick={()=>{
    
      navigate(`/detailedJobPostView/${data._id}`, { state: data  });
    }}>

    
    
      <div className='flex p-3 pt-4'>
      <img
          src={`jobPosts/CompanyLogo/${data.companyLogo}`}
          alt="img-blur-shadow"
          className="w-16 h-16"
        />
        <div className='pl-2'>
<p className='bold text-black font-bold text-lg capitalize'>{data.designation} </p>
<p className='bold text-black  font-semibold capitalize'> {data.companyName} </p>
        </div>
        </div> 

      
   <div className='px-5 h-72 text-sm'>
   <p className='bold text-black  font-semibold capitalize'>{data.overView} </p>
<ul>
    <li className='flex items-center gap-2 capitalize space-x-2'><AiFillCaretRight/>{data.minSalary} lpa -{data.maxSalary} lpa</li>
    <li className='flex items-center gap-2 capitalize'><AiFillCaretRight/>sample </li>
    <li className='flex items-center gap-2 capitalize'><AiFillCaretRight/>{data.workType}</li>
    <li className='flex items-center gap-2 capitalize'><AiFillCaretRight/>{data.workMode}</li>
    


</ul>

   </div>
     
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small"><ReactTimeAgo date={data.timeStamp}  locale="en-US"/> </Typography>  
        {/* {moment(data.timeStamp).format("DD/MM/YYYY h:mm a")} */}
        <Typography variant="small" color="gray" className="flex items-center gap-1">  <button>Apply</button>
        <TfiLocationPin/> 
        {data.workLocation}
        </Typography>
      </CardFooter>
    </Card>
  )
}

export default JobCards