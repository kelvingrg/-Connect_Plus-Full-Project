import React from 'react'
import {useDispatch} from 'react-redux'
import {setPostModal} from '../../App/ReduxHandlers/ModalSlice'

function PostBoxInput({jobPost}) {
    const dispatch = useDispatch()
    return <div className=''>

        <div className='w-full h-12 border rounded-lg border-zinc-400 pl-5  flex  items-center italic font-thin'
            onClick={
                () => dispatch(setPostModal(true))
        }>
          {jobPost?"Add new Job":"job  Post Your Experince..."}

        </div>
    </div>
}

export default PostBoxInput
