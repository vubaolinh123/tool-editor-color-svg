import ButtonGroup from 'antd/lib/button/button-group'
import React from 'react'

const ColorGroup = ({items}) => {

    const getFirstAndLastElement = (i)=>{
        if(i === 0){
            return "first"
        }else if(i === items.length - 1){
            return "last"
        }else{
            return ""
        }
    }

  return (
    <ButtonGroup className="color-group">
        {items.map((item,i)=>(
            <div className={`color ${getFirstAndLastElement(i)}`} 
            key={i}
            style={{background: item, border:item}}
            />
        ))}
    </ButtonGroup>
  )
}

export default ColorGroup