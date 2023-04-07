import React from 'react'
import Uploads from '../../../components/Upload/Upload'

const Editor = () => {

    const getUploadedFile = (data)=>{
        console.log(data)
    }

    const getUploadedSvgData = (data)=>{
        console.log(data)
    }

  return (
    <div className="w-[95%] mx-auto my-5 bg-white rounded-md">
        <div className="px-4 py-4 w-full ">
            <i className="bi bi-pencil-square"></i> 
             <span className="font-bold pl-2">Tool Editor</span>
        </div>
        <div className="bg-[#f5f6fa] w-full items-center text-center flex justify-center border bt-2 border-gray-[#ebedf5] py-5">
            <Uploads className=""
             getUploadedFile={getUploadedFile} getUploadedSvgData={getUploadedSvgData} />
        </div>
    </div>
  )
}

export default Editor