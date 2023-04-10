import { useState } from 'react'
import Uploads from '../../components/Upload/Upload'
import EditContainer from '../../components/EditContainer/EditContainer'


export default function Home() {
  const [tempImage, setTempImage] = useState(null)

  console.log(tempImage)

  const getUploadedFile = (data)=>{
    setTempImage(data)
}

const getUploadedSvgData = (data)=>{
    console.log(data)
}

return (
<div className="w-[95%] mx-auto my-5 bg-white rounded-md">
    <div className="px-4 py-4 w-full flex justify-between">
        <div>
          <i className="bi bi-pencil-square"></i> 
          <span className="font-bold pl-2">Tool Editor</span>
        </div>
         <div>
            {
              tempImage && (
                <Uploads size="small"
                getUploadedFile={getUploadedFile} getUploadedSvgData={getUploadedSvgData} />
              )
            }
         </div>
    </div>
    <div className="bg-[#f5f6fa] w-full items-center text-center flex justify-center border bt-2 border-gray-[#ebedf5] py-5">
        {
          tempImage ? (
            <EditContainer data={tempImage}></EditContainer>
          ) : (
            <Uploads className=""
            getUploadedFile={getUploadedFile} getUploadedSvgData={getUploadedSvgData} />
          )
        }
    </div>
</div>
)
}
