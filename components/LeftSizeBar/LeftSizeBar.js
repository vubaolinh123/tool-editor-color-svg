import { Space, Divider, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const LeftSizeBar = () => {
  return (
    <div className="edit-size-container">
      <div className="edit-size-header">Recolor Options</div>
      <div className="edit-size-content">
        <div className="edit-card-container">
          <Space direction="vertical" className="w-full">
            <Space direction="vertical" className="w-full">
              <Text className="card-head">ITEM COLORS</Text>
              <div className="card-content">
                <Space wrap>color section</Space>
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
