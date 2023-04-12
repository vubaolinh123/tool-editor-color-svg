import { Button, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import CustomColorPicker from '../CustomColorPicker/CustomColorPicker'

const ColorPill = ({pillColor, handleColorChange, captureChange}) => {

    const [color, setColor] = useState(pillColor)
    const [visible, setVisible] = useState(false)

    useEffect(()=>{
        setColor(pillColor)
    },[pillColor])

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible)
    }

    const getHexCode = (value) => {
        handleColorChange(value)
    }

    const updateColorPicker = (colorObj)=>{
        setColor(colorObj)
    }

  return (
    <div>
        <Popover
            getPopupContainer={(triggerNode)=> triggerNode}
            overlayClassName="color-pill-popover"
            placement="bottom"
            content={
                <CustomColorPicker 
                    color={color}
                    updateColorPicker={updateColorPicker}
                    getHexCode={getHexCode}
                    captureChange={captureChange}
                />
            }
            trigger="click"
            open={visible}
            onOpenChange={handleVisibleChange}
        >
            <Button type="link" className="no-padding">
                <div className="color-pill-container" style={{background: pillColor}}></div>
            </Button>
        </Popover>
    </div>
  )
}

export default ColorPill