import { Button, Space, Tooltip } from 'antd'
import React from 'react'

const ImageExport = ({handleExport, defaultDimensions}) => {
  return (
    <Space direction="vertical" size="large">
        <Tooltip title={`W: ${defaultDimensions.width} H: ${defaultDimensions.height}`}>
            <Button block onClick={()=> handleExport("IMAGE", defaultDimensions)}>
                Original Size
            </Button>
        </Tooltip>
    </Space>
  )
}

export default ImageExport