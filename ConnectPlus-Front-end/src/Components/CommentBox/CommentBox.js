import React from 'react'
import { useState } from 'react'
import { CButton } from '../Button/CButton'
import UserRoundDp from '../PostBox/UserRoundDp.js/UserRoundDp'
import axiosInstance from '../../Config/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import Swal from 'sweetalert2'
import {setSendNotification} from '../../App/ReduxHandlers/TempDataReducer'


function CommentBox({data ,childDataFetch}) {
   const navigate=useNavigate()
    const {userData}=useSelector(state=>state?.login)
    const [postData,setPostData]=useState(data)

    


    const [commentText, setCommentText]=useState("")
    const dispatch =useDispatch()
    useEffect(()=>{
        childDataFetch(postData.comment.length)
     },[postData.comment])

    const handleCommentTextChange=(e)=>{
        setCommentText(e.target.value)
    }
    const handleSubmit=()=>{

      if(commentText.length<1){
        Swal.fire('Any fool can use a computer')
      }
      else{
     
    
axiosInstance.get(`/addNewComment?postId=${postData._id}&userId=${userData._id}&commentText=${commentText}&userName=${userData.userName}&keyrole=${userData.keyrole}&dp=${userData.dp}`)

.then((response)=>{
    if (response ?. data ?. loadError) {
        navigate('/page404')
    }
    if (response ?. data ?. upload) {
        setCommentText("")
        setPostData({...postData,comment : response?.data?.singlePostData.comment})
  
        dispatch(setSendNotification({
          userId: userData._id,
       receiverId: response?.data?.singlePostData.postedByGIT
         }))
   }
})
   .catch((error)=>{
    console.log(error);
     localStorage.clear()
             navigate('/')
   })
}
    }
  return (
   <> 
           
   
   <div className='px-5 border-t border-zinc-200  shadow-sm w-full overflow-y-scroll max-h-[50rem]'>
   <div className=' w-full mt-3 '>
                <div className=''>
                    <div className='flex '>
                        <div className=' w-12 h-12 rounded-full'>
                        <UserRoundDp image={"https://media.istockphoto.com/id/821257330/photo/fisherman-on-silhouette-sunrise-with-gear-fishing.jpg?s=612x612&w=0&k=20&c=3jMZAY0g2QCT5OqO4mIVX0mv4eKSY0jNpzyA67F9iV4="}/>

                        </div>
                        <div className='w-full pl-2'>

                        <textarea type="text-area"
                        className={
                            `border border-zinc-400 w-full  rounded-lg px-6 py-2  placeholder-shown:italic placeholder:font-normal focus:border-zinc-600 focus:outline-none min-h-fit
                            }`
                        }
                        placeholder='share your view on this Post'
                        name="commentText"
                        value={commentText}
                         onChange={handleCommentTextChange}
                        /> 
                        </div>
                       
                    </div>
             <div className='w-full h-fit flex justify-end '> { commentText?<span className='float-right font-semibold' onClick={handleSubmit}> <CButton text={"Post"}/></span>:null}</div>
                   
                 </div>
  </div>




     {  postData?.comment?.sort(function(a,b){
return new Date(b.timeStamp) - new Date(a.timeStamp)}).map((element)=> <div className='flex mt-2 '>
<div className='h-12 w-12 '>
<UserRoundDp image={`images/dp/${element.dp}`}/>
</div> 
<div className=' ml-2 bg-gray-100 w-full pt-1 px-3 rounded-lg'>
 <p className="text-lg font-semibold leading-[1.2rem] float-left"> {element.userName}</p>
 <p className="text-xs font-thin leading-[0.8rem] inline float-right pr-3">{moment(element.timeStamp).format("DD/MM/YYYY h:mm a")}</p><br />
 {element?.keyrole && <p className=" text-sm font-thin leading-[0.8rem] italic"> {element?.keyrole.map((role)=>role)}</p>}

 <p className='font-normal font-serif mt-2'>{element.commentText}</p>
</div>
</div>
)}

   
   {/* delete  */}

   {/* <div className='flex mt-2 '>
<div className='h-12 w-12 '>
<UserRoundDp image={"https://media.istockphoto.com/id/821257330/photo/fisherman-on-silhouette-sunrise-with-gear-fishing.jpg?s=612x612&w=0&k=20&c=3jMZAY0g2QCT5OqO4mIVX0mv4eKSY0jNpzyA67F9iV4="}/>
</div> 
<div className=' ml-2 bg-gray-100 w-full pt-1 px-3 rounded-lg'>
 <p className="text-lg font-semibold leading-[1.2rem] float-left"> user Name</p>
 <p className="text-sm font-thin leading-[0.8rem] inline float-right pr-3">timed zone </p><br />
 <p className=" text-sm font-thin leading-[0.8rem] italic"> user contentr </p>

 <p className='font-normal font-serif mt-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto temporibus eius tempora velit neque. Aperiam aliquam, soluta magni quidem autem doloremque. Beatae aut ad perferendis velit facilis, amet assumenda illo?</p>
</div>
</div>
<div className='flex mt-2 '>
<div className='h-12 w-12 '>
<UserRoundDp image={"https://media.istockphoto.com/id/821257330/photo/fisherman-on-silhouette-sunrise-with-gear-fishing.jpg?s=612x612&w=0&k=20&c=3jMZAY0g2QCT5OqO4mIVX0mv4eKSY0jNpzyA67F9iV4="}/>
</div> 
<div className=' ml-2 bg-gray-100 w-full pt-1 px-3 rounded-lg'>
 <p className="text-lg font-semibold leading-[1.2rem] float-left"> user Name</p>
 <p className="text-sm font-thin leading-[0.8rem] inline float-right pr-3">timed zone </p><br />
 <p className=" text-sm font-thin leading-[0.8rem] italic"> user contentr </p>

 <p className='font-normal font-serif mt-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto temporibus eius tempora velit neque. Aperiam aliquam, soluta magni quidem autem doloremque. Beatae aut ad perferendis velit facilis, amet assumenda illo?</p>
</div>
</div>
<div className='flex mt-2 '>
<div className='h-12 w-12 '>
<UserRoundDp image={"https://media.istockphoto.com/id/821257330/photo/fisherman-on-silhouette-sunrise-with-gear-fishing.jpg?s=612x612&w=0&k=20&c=3jMZAY0g2QCT5OqO4mIVX0mv4eKSY0jNpzyA67F9iV4="}/>
</div> 
<div className=' ml-2 bg-gray-100 w-full pt-1 px-3 rounded-lg'>
 <p className="text-lg font-semibold leading-[1.2rem] float-left"> user Name</p>
 <p className="text-sm font-thin leading-[0.8rem] inline float-right pr-3">timed zone </p><br />
 <p className=" text-sm font-thin leading-[0.8rem] italic"> user contentr </p>

 <p className='font-normal font-serif mt-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto temporibus eius tempora velit neque. Aperiam aliquam, soluta magni quidem autem doloremque. Beatae aut ad perferendis velit facilis, amet assumenda illo?</p>
</div>
</div>
<div className='flex mt-2 '>
<div className='h-12 w-12 '>
<UserRoundDp image={"https://media.istockphoto.com/id/821257330/photo/fisherman-on-silhouette-sunrise-with-gear-fishing.jpg?s=612x612&w=0&k=20&c=3jMZAY0g2QCT5OqO4mIVX0mv4eKSY0jNpzyA67F9iV4="}/>
</div> 
<div className=' ml-2 bg-gray-100 w-full pt-1 px-3 rounded-lg'>
 <p className="text-lg font-semibold leading-[1.2rem] float-left"> user Name</p>
 <p className="text-sm font-thin leading-[0.8rem] inline float-right pr-3">timed zone </p><br />
 <p className=" text-sm font-thin leading-[0.8rem] italic"> user contentr </p>

 <p className='font-normal font-serif mt-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto temporibus eius tempora velit neque. Aperiam aliquam, soluta magni quidem autem doloremque. Beatae aut ad perferendis velit facilis, amet assumenda illo?</p>
</div>
</div> */}

   
      {/* delete  */}
    </div>





    
    
    </>
  )
}

export default CommentBox
