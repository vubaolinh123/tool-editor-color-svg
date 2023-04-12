import { Button, InputNumber, Space, Tooltip } from 'antd'
import React, { useState } from 'react'

const ImageExport = ({handleExport, defaultDimensions}) => {
  const [widthImage, setWidthImage] = useState(defaultDimensions.width)
  const [heightImage, setHeightImage] = useState(defaultDimensions.height)

  const onHandleChangeWidth = (value)=>{
    setWidthImage(value)
  }

  const onHandleChangeHeight = (value)=>{
    setHeightImage(value)
  }

  return (
    <Space direction="vertical" size="large">
        <Tooltip title={`W: ${defaultDimensions.width} H: ${defaultDimensions.height}`}>
            <Button block onClick={()=> handleExport("IMAGE", defaultDimensions)}>
                Original Size
            </Button>
        </Tooltip>
          <Button block onClick={()=> handleExport("IMAGE", {width: '512', height: '512', name: 'download_512x512'})}>
                512 x 512
            </Button>
            <Button block onClick={()=> handleExport("IMAGE", {width: '256', height: '256', name: 'download_256x256'})}>
                256 x 256
            </Button>
            <Button block onClick={()=> handleExport("IMAGE", {width: '128', height: '128', name: 'download_128x128'})}>
                128 x 128
            </Button>
            <Space>
              <InputNumber placeholder='Width' onChange={onHandleChangeWidth} min={1} value={widthImage}/>
              <InputNumber placeholder='Height'onChange={onHandleChangeHeight} min={1} value={heightImage} />
              <Button 
              type="primary" block 
              onClick={()=> handleExport("IMAGE", {width: widthImage, height: heightImage, name: `download_${widthImage}x${heightImage}`})}>
                Download Image
             </Button>
            </Space>
    </Space>
  )
}

export default ImageExport