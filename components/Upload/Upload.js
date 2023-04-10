import React, { useState } from 'react'
import { Button, Upload, message } from "antd"
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons"

const Uploads = ({getUploadedFile, getUploadedSvgData, size = "large"}) => {
    const [loading, setLoading] = useState(false)

    const beforeUpload = (file) => {
        const isSvgImg = file.type === "image/svg+xml"

        if(!isSvgImg){
            message.error("You can only upload SVG file")
        }

        const isLargeFile = file.size / 1024 / 1024 < 2

        if(!isLargeFile){
            message.error("SVG must be smaller than 2MB !")
        }

        return isSvgImg && isLargeFile
    }

    const getBase64 = (img, callback)=>{
        const reader = new FileReader()
        reader.addEventListener("load",()=> callback(reader.result))
        reader.readAsDataURL(img)
    }

    const getSvg = (img, callback)=>{
        const reader = new FileReader()
        reader.addEventListener("load",()=> callback(reader.result))
        reader.readAsText(img)
    }

    const handleChange = (info) => {
        if(info.file.status === "uploading"){
            setLoading(true)
            return
        }

        getBase64(info.file.originFileObj, (url)=>{
            setLoading(false)
            getUploadedFile(url)
        })

        getSvg(info.file.originFileObj, (svgData)=>{
            getUploadedSvgData(svgData)
        })
    }

    const uploadButton = (
        <div>
            { loading ? (
                    <LoadingOutlined></LoadingOutlined>
                ) : <PlusOutlined className="upload-icon"></PlusOutlined>
            }
            <div className="">
                Drop your SVG here
            </div>
        </div>
    )

    const smallUploadButton = <Button>Upload New SVG</Button>


  return size === "large" ? (
    <Upload
        name="avatar"
        listType="picture-card"
        className="upload-button"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
    >
        {uploadButton}
    </Upload>
    
  ) : (
    <Upload className="upload-button-small"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
    >
        {smallUploadButton}
    </Upload>
  )
}

export default Uploads