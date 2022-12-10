import React, {useState} from 'react'
import {CButton} from '../../../Button/CButton';
import {useDispatch} from 'react-redux';
import axios from "../../../../Config/Axios"
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {setUserData} from '../../../../App/ReduxHandlers/LoginReducer';
import {setUserDpEditModalState} from '../../../../App/ReduxHandlers/ModalSlice';
import {useNavigate} from 'react-router-dom';

function UserDpEditModal() {
    useEffect(() => {}, [])
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {userData} = useSelector((state) => state ?. login)
    const [error, setError] = useState(null) // error while loading


    const [file, setFile] = useState(null);
    const [profileDp, setProfileDp] = useState({file: []});


    function handleChange(e) {
        console.log(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        setProfileDp({file: e.target.files[0]})
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        let formData = new FormData()
        console.log(profileDp.file, "file name on submit");
        formData.append("dp", profileDp.file);
        const response = await axios.post('/changeProfileDp', formData, {
            params: {
                userId: userData._id
            }, // user id is passed as qury string
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            console.log(response, "response from backend after image upload req gone from front end")
            if (response ?. data ?. loadError) {
                navigate('/page404')
            }
            if (response ?. data ?. upload) {
                console.log("inside modal change ")
                // to set new useradata
                dispatch(setUserData(response.data.userData))                 
                // modal close
                dispatch(setUserDpEditModalState(false))
            }
        }).catch((error => {
            localStorage.clear()
            navigate('/')
        }))
    }

    return (
        <>


            <div class=" h-3/4 w-full">

                <div class={
                    `${
                        file ? "hidden" : "flex"
                    } items-center justify-center w-full `
                }>
                    <label class=" w-full h-full  border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div class="flex flex-col items-center justify-center pt-7">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                            </svg>
                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                Attach a file</p>
                        </div>
                        <form action="">
                            <input type="file" class="opacity-0" name="dp" accept="image/*"
                                onChange={handleChange}/>
                        </form>

                    </label>
                </div>
            </div>


            {
            file ? <div className=' w-auto h-72 flex items-center justify-center'><img src={file}
                    className="w-auto h-full max-h-full grid place-self-center border shadow-lg"/></div> : null
        }
            <div class="flex justify-end p-2">
                <button className='text-red-600 mr-5  hover:border border-red-600 rounded-full px-3 '
                    onClick={
                        () => {
                            setFile(null);
                        }
                }>Delete</button>
                <span onClick={handleSubmit}><CButton text={"Upload"}/>
                </span>
            </div>

        </>
    )

}

export default UserDpEditModal
