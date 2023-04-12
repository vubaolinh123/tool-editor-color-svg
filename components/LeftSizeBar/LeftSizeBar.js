import { Space, Divider, Typography } from "antd";
import React, { useContext } from "react";
import SvgEditContext from "../../context/svgEditContex";
import { MAKE_HISTORY, UPDATE_COLOR_MAPPER } from "../../constants/actionTypes";
import ColorPill from "../ColorPill/colorPill";

const { Text } = Typography;

const LeftSizeBar = () => {
  const [state, dispatch] = useContext(SvgEditContext)

  const HandleColorChange = (key, value)=>{
    dispatch({
      type: UPDATE_COLOR_MAPPER,
      payload: {key, value}
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
                  color paltettes
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
