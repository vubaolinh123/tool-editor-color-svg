import { Input, Space } from "antd";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { CirclePicker, CustomPicker } from "react-color";
import {
  EditableInput,
  Hue,
  Saturation,
} from "react-color/lib/components/common";

const CustomColorPicker = ({
  color,
  updateColorPicker,
  getHexCode,
  captureChange,
  ...props
}) => {
  useEffect(() => {
    getHexCode(props.hex);
  }, [props.hex]);

  const handleOnMouseDown = () => {
    captureChange();
  };

  const handleOnMouseUp = () => {
    captureChange();
  };

  const handleChange = (data) => {
    updateColorPicker(data);
  };

  const handleChangeCirclePicker = () => {
    captureChange();
  };

  const saturationPicker = () => {
    return <div className="saturation-picker-pointer" />;
  };

  const otherPointer = () => {
    return <div className="other-picker-pointer" />;
  };

  const handleChangeInput = (data) => {
    handleChange(data);
    captureChange();
  };

  const listStyle = {
    wrap: {
      flex: 1,
      width: "100%",
    },
    input: {
      height: 32,
      width: "100%",
      border: "1px solid #d9d9d9",
      borderRadius: "5px 0 0 5px",
      paddingLeft: "10px",
      background: "#fafafc",
    },
  }

  return (
    <div className="color-picker-container">
      <Space direction="vertical" size={15} className="w-full">
        <div
          className="saturation-picker"
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
        >
          <Saturation
            {...props}
            onChange={handleChange}
            pointer={saturationPicker}
          />
        </div>

        <div className="circle-picker">
          <CirclePicker
            onChange={handleChange}
            onChangeComplete={handleChangeCirclePicker}
            circleSize={16}
            circleSpacing={11}
            colors={[
              "#f44336",
              "#e91e63",
              "#9c27b0",
              "#673ab7",
              "#3f51b5",
              "#2196f3",
              "#03a9f4",
            ]}
          />
        </div>
        <div
          className="hue-picker"
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
        >
          <Hue {...props} onChange={handleChange} pointer={otherPointer} />
        </div>
        <div className="text-picker">
          <Space direction="horizontal">
            <div className="text-picker-input-group" >
              <EditableInput
                style={listStyle}
                lable="hex"
                value={props.hex}
                onChange={handleChangeInput}
              />
            </div>
            <div style={{ background: props.hex }} className="color-preview" />
          </Space>
        </div>
      </Space>
    </div>
  );
};

export default CustomPicker(CustomColorPicker);
