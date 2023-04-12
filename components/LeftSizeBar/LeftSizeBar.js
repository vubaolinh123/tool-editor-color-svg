import { Space, Divider, Typography, Button } from "antd";
import React, { useContext } from "react";
import SvgEditContext from "../../context/svgEditContex";
import { APPLY_PALETTE, MAKE_HISTORY, UPDATE_COLOR_MAPPER } from "../../constants/actionTypes";
import ColorPill from "../ColorPill/colorPill";
import ColorGroup from "../UI/ColorGroup/ColorGroup";

const { Text } = Typography;

const LeftSizeBar = () => {
  const [state, dispatch] = useContext(SvgEditContext)

  const HandleColorChange = (key, value)=>{
    dispatch({
      type: UPDATE_COLOR_MAPPER,
      payload: {key, value}
    })
  }

  const handlePaletteChange = (palette)=>{
    dispatch({
      type: APPLY_PALETTE,
      payload: palette
    })
  }

  return (
    <div className="edit-size-container">
      <div className="edit-size-header">Recolor Options</div>
      <div className="edit-size-content">
        <div className="edit-card-container">
          <Space direction="vertical" className="w-full">
            <Space direction="vertical" className="w-full">
              <Text className="card-head">ITEM COLORS</Text>
              <div className="card-content">
                <Space wrap>
                  {
                    state.colorMapper &&
                    Object.keys(state.colorMapper).map((key, i) => (
                      <ColorPill 
                        key={i}
                        pillColor={state.colorMapper[key]}
                        handleColorChange={(value)=> HandleColorChange(key, value)}
                        captureChange={()=> {
                          dispatch({
                            type: MAKE_HISTORY
                          })
                        }}
                      />
                    ))
                  }
                </Space>
              </div>
            </Space>
            <Divider></Divider>
            <Space direction="vertical" className="w-full">
              <Text className="card-head">PALETTES</Text>
              <div className="card-content">
                <Space direction="vertical" size="middle" className="w-full">
                  {
                    state.palettes.map((item, i)=>(
                      <Button style={{borderLeft: `2px solid ${item[0]}`}}
                        className="palette-block"
                        block
                        key={i} 
                        onClick={()=> handlePaletteChange(item)}
                      >
                        <Text className="palette-block-title"> {`#${i}`} </Text>
                        <ColorGroup items={item} />
                      </Button>
                    ))
                  }
                </Space>
              </div>
            </Space>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default LeftSizeBar;
