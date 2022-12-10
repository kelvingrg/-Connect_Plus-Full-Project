import React, { useEffect,useState } from 'react'
import { AiOutlineLike ,AiOutlineComment} from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import './FeedActionBar.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../Config/Axios';

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import CommentBox from '../../CommentBox/CommentBox';
import { useNavigate } from 'react-router-dom';
import { setSendNotification } from '../../../App/ReduxHandlers/TempDataReducer';

function FeedActionBar({data}) {
    const {userData} = useSelector((state) => state.login)
    const [postData, setPostData] = useState(data)
    const [isLiked, setIsLiked] = useState(true)
    const [commentCount, setCommentCount] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    // accordion
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    // accordion


    useEffect(() => {
        const liked = postData ?. like ?. includes(userData ?. _id)
        // filter((element)=>element.userId===userData._id)
        // console.log( liked,"liked", isLiked,"is liked status true")
        // console.log(postData,":postData")
        if (liked) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [postData])


    const doLike = () => {
        setIsLiked(true)
        axios.get(`/updateLike?userId=${
            userData ?. _id
        }&postId=${
            postData ?. _id
        }&postedById=${
            postData ?. postedBy
        }`).then((response) => {
            console.log(response, "response after like ");
            if (response ?. data ?. loadError) {
                navigate('/page404')
            }
            if (response ?. data ?. singlePostData) {
                setPostData(response.data.singlePostData)
                dispatch(setSendNotification({
                    userId: userData._id,
                    receiverId: response ?. data ?. singlePostData ?. postedBy
                }))


            }

        }).catch((error) => {
            localStorage.clear()
            navigate('/')
        })
    }

    const doUnLike = () => {
        setIsLiked(false)
        axios.get(`/updateUnLike?userId=${
            userData._id
        }&postId=${
            postData ?. _id
        }`).then((response) => {
            if (response ?. data ?. loadError) {
                navigate('/page404')
            }
            if (response ?. data ?. singlePostData) {
                console.log(response ?. data ?. singlePost, "Data,response ?. data ?. singlePostData");
                setPostData(response.data.singlePostData)

            }

        }).catch((error) => {
            localStorage.clear()
            navigate('/')
        })
    }

    const handleChildData = (count) => {
        setCommentCount(count)
    }


    return (

        <>
            <div className='border-b px-4 flex justify-between'>
                <p className='font-light text-sm flex items-center'>
                    <AiOutlineLike/> {
                    postData ?. like ?. length
                }
                    &nbsp;Likes</p>
                <p className='font-light text-sm flex items-center'>
                    <AiOutlineComment/> {commentCount}
                    &nbsp; comments</p>
            </div>
            <div className='h-14  w-full flex items-center  justify-around'>

                <span className={
                        `flex text-sm cursor-pointer ${
                            isLiked ? "text-ccOrange font-medium bg-neutral-600 px-2 py-1 rounded-full bg-opacity-20" : " font-thin hover:scale-125"
                        }`
                    }
                    onClick={
                        isLiked ? doUnLike : doLike
                }><AiOutlineLike size={20}/>
                    &nbsp;{
                    isLiked ? "Liked" : "Like"
                }</span>
                <span className='flex text-sm font-thin cursor-pointer hover:scale-125  '
                    onClick={
                        () => handleOpen(1)
                }><AiOutlineComment size={20}/>
                    &nbsp;Commtents</span>
                <span className='flex text-sm font-thin cursor-pointer hover:scale-125 '><RiShareForwardLine size={20}/>
                    &nbsp;Share</span>
                <span className='flex text-sm font-thin cursor-pointer hover:scale-125 '><FiSend size={20}/>
                    &nbsp; Send</span>
            </div>

            {/* //accordion */}

            <Accordion open={
                open === 1
            }>

                <AccordionBody>
                    <CommentBox data={data}
                        childDataFetch={handleChildData}/>
                </AccordionBody>
            </Accordion>
            {/* accordion  */} </>
    )
}

export default FeedActionBar
