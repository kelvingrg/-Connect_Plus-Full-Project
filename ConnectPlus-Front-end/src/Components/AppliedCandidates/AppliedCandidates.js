import React, {useEffect, useState} from 'react'
import SingleAppliedCandidate from './SingleAppliedCandidate/SingleAppliedCandidate'


import axios from '../../Config/Axios'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function AppliedCandidates({onViewPage}) {
    const navigate = useNavigate()

    const {singleJobPostData}=useSelector(state=>state.tempData)
    const [singleCandidateData, setSingleCandidateData] = useState()
    const dispatch=useDispatch();

    useEffect(() => {
    
       Object.values(singleJobPostData).length> 0    &&  (axios.get(`/getCandidateDataOfJobApplied?postId=${
        singleJobPostData ?. _id
        }`).then((response) => {
            // console.log(response, "respojsne at applied candidates ");
            if (response ?. data ?. loadError) {
              navigate('/page404')
            }
            if (response ?. data ?. dataFetched) { 
             
                setSingleCandidateData(response ?. data ?. response)
      

             

            }

        }).catch((error) => {
            localStorage.clear()
            navigate('/')
        }))
    }, [singleJobPostData])


    return (

        <div className='bg-white h-full'>

            {
       singleCandidateData?.appliedCandidates?.sort(function(a,b){
              return new Date(b.timeStamp) - new Date(a.timeStamp)}) ?. map((element) =>< SingleAppliedCandidate singleCandidateData = {element} onViewPage={onViewPage} /> )
        } 
        </div>

    )
}

export default AppliedCandidates
