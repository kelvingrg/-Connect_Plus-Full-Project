import React from 'react'

import UserRoundDp from '../../../PostBox/UserRoundDp.js/UserRoundDp'
import {BsPlusCircle} from "react-icons/bs";
import CPIcon from '../../../Icon/CPIcon';
import {useState, useEffect} from 'react';
import {CButton} from '../../../Button/CButton';
import {setBasicDetailsModal} from '../../../../App/ReduxHandlers/ModalSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from '../../../../Config/Axios'
import {setUserData} from '../../../../App/ReduxHandlers/LoginReducer';
import {useNavigate} from 'react-router-dom';


function UserBasicDetailsModal() {
    const navigate = useNavigate()
    const {userData} = useSelector((state) => state ?. login)
    const [data, setData] = useState({
        userName: userData ?. userName,
        keyrole: userData ?. keyrole,
        currentCompanyName: userData ?. currentCompanyName,
        currentDesignation: userData ?. currentDesignation
    })
    const [resume,setResume]=useState({})
    const dispatch = useDispatch()
    // console.log(Object.values(data.keyrole),"juhsrfiuhseiuhru",Object.values(data.keyrole).length)

    useEffect(() => {}, [userData])

    const handleSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData()

        formData.append("resume", resume.file);
    
        console.log("handleSubmit", formData)

        // backened call and response
        axios.post('/userBasicDetailsUpdate',formData, {
            params: {
                userId: userData._id,
                userName:data.userName,
            keyrole:data.keyrole,
            currentCompanyName:data.currentCompanyName,
            currentDesignation:data.currentDesignation,
            }, // user id is passed as qury string
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if (response ?. data ?. loadError) {
                navigate('/page404')
            } else {
                console.log(response, "backend data from ")
                dispatch(setBasicDetailsModal(false))
                 dispatch(setUserData(response.data))
            }
        }).catch((error) => {
            localStorage.clear()
            navigate('/')

        })
        // backened call and response ends
    }
    return (


        <>


            <div className=" p-6">
                <label htmlFor="">Full Name:</label><br/>
                <input type="text" name='userName' className='border border-zinc-400 w-full rounded-lg pl-5  capitalize mb-2' placeholder="Enter Your full name"
                    value={
                        data.userName
                    }
                    onChange={
                        (e) => setResume({
                            file:e.target.files[0]
                        })
                    }/>

                <label htmlFor="">Key Roles:</label><br/>

                <div className=' w-full flex-col  '>


                    {
                 ( data?.keyrole?.length >0) &&  Object.values(data?.keyrole) ?. map((element, index) => <div className='w-full flex  '>
                        <input type="text" name='keyRoles' className='border border-zinc-400 w-full rounded-lg pl-5  capitalize flex mb-1' placeholder="Key Roles"
                            id={
                                `${
                                    index + 1
                                }`
                            }
                            value={element}
                            onChange
                            ={(e)=>setData({...data,keyrole:{...data.keyrole,[e.target.id]:e.target.value}})}/>
                    </div>)
                }
                    <div className='float-right'>
                        <CPIcon tippyPlacement="top" tippyContent="Add More Key Roles"
                            tooltip={true}>
                            <span className=''
                                onClick={
                                    (e) => {

                                        data?.keyrole?

                                        setData({
                                            ...data,
                                            keyrole: {
                                                ...data.keyrole,
                                                [Object.values(data.keyrole).length + 1]: ""
                                            }
                                        }):
                                        setData({
                                            ...data,
                                            keyrole: {
                                                ...data.keyrole,
                                                1: ""
                                            }
                                        })

                                    }
                            }>
                                <BsPlusCircle size={20}/></span>
                        </CPIcon>
                    </div><br/>
                </div>

                <div className=' md:flex  mt-2 '>
                    <div className='w-full md:w-1/2'>
                        <label htmlFor="">Current Company Name</label><br/>
                        <input type="text" name='currentCompanyName' className='border border-zinc-400  rounded-lg pl-5 w-full capitalize  mb-1' placeholder="Current Company Name"
                            value={
                                data.currentCompanyName
                            }
                            onChange={
                                (e) => setData({
                                    ...data,
                                    currentCompanyName: e.target.value
                                })
                            }/>
                    </div>
                    <div className='w-full md:w-1/2 md:pl-4'>
                        <label htmlFor="">Designation</label><br/>
                        <input type="text" name='currentDesignation' className='border border-zinc-400  rounded-lg pl-5 w-full  capitalize  mb-1' placeholder="Designation"
                            value={
                                data.currentDesignation
                            }
                            onChange={
                                (e) => setData({
                                    ...data,
                                    currentDesignation: e.target.value
                                })
                            }/>
                    </div>
                </div>
                <div className='w-full '>
                        <label htmlFor="">Current Company Name</label><br/>
                        <input type="file" name='resume' className='border border-zinc-400  rounded-lg pl-5 w-full capitalize  mb-1' accept='application/*' placeholder="Upload your Resume"
                        
                            onChange={
                                (e) => setResume({
                                
                                file: e.target.files[0]
                                })
                            }/>
                    </div>


            </div>
            {/*footer*/}

            <div className="flex items-center justify-end p-6 border-t  border-zinc-400 border- rounded-b">
                <button className="text-red-500 background-transparent font-bold  px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                    onClick={
                        () => dispatch(setBasicDetailsModal(false))
                }>
                    Close
                </button>
                <span onClick={handleSubmit}>
                    <CButton text={'Save Changes'}></CButton>
                </span>

            </div>

        </>


    )
}

export default UserBasicDetailsModal
