import React from 'react'

function SkillProgressBar(props) {
    console.log(props);
   
let progrssColor="bg-white"
    if(props.progress >90)
   { progrssColor="bg-green-600"}
    else if(props.progress >70)
    {progrssColor="bg-green-300"}
    else if(props.progress >50)
 {   progrssColor="bg-orange-300"}
    else if(props.progress >40)
    progrssColor="bg-orange-600"
   else if(props.progress >30)
 {   progrssColor=" bg-red-400"}
    else if(props.progress <30)
   { progrssColor="bg-red-600"}
    else
  {  progrssColor="bg-red-600"}
  console.log(progrssColor,"progrssColor");
    
    
  return (
  <div className="w-3/4 ">
  


  <div className="overflow-hidden h-4 text-xs flex rounded bg-white border  ">
    <div style={{ width:`${props.progress}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${progrssColor} text-xs`}>{props.progress}% </div>
  </div>

</div>
 )
}

export default SkillProgressBar