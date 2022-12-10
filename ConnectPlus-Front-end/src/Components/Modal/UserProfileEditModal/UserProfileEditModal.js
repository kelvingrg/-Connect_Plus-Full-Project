
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseButton from "../../CLoseButton/CloseButton";
import UserBasicDetailsModal from "./UserBasicDetailsModal/UserBasicDetailsModal";
// import './UserProfileEditModal.css';
import { setUserProfileModalClose } from "../../../App/ReduxHandlers/ModalSlice";
import UserDpEditModal from "./UserDpEditModal/UserDpEditModal";
import UserAboutSessionModal from "./UserAboutSessionModal/UserAboutSessionModal";
import UserExperienceEditModal from "./UserExperienceEditModal/UserExperienceEditModal";
import UserSkillUpdateModal from "./UserSkillUpdateModal/UserSkillUpdateModal";

export default function UserProfileEditModal(props) {
  const dispatch=useDispatch();
  const{
    basicDetailsModal,
    userDpEditModalState,
    userAboutSessionModalState,
    userExperienceEditModalState,
    userSkillUpdateModalState,
    
    
    
  }=useSelector((state)=>state.modal)

  return (
   
    
  
        <>
          <div
            className=" ModalTest justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-full my-6 mx-auto md:w-1/2">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex  justify-between items-center p-5 border-b border-zinc-400 rounded-t">
                  <h3 className="text-xl font-semibold normal-case">
                   {props.heading}
                  </h3>
                  <span className=' w-fit h-fit'
                   onClick={()=>dispatch(setUserProfileModalClose())}
                  >
                 <CloseButton/>
            </span>
               
                </div>


                {/*body starts*/}
                {basicDetailsModal&& <UserBasicDetailsModal/>}
               {userDpEditModalState && <UserDpEditModal/>}
               {userAboutSessionModalState && <UserAboutSessionModal/>}
               {userExperienceEditModalState && <UserExperienceEditModal/>}
               {userSkillUpdateModalState && <UserSkillUpdateModal/> }

                   {/*body ends */}
               
              </div>
            </div>
          </div>
          
       
    
    </>
  );
}