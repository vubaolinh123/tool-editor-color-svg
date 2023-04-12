import { Row, Col, Space, Divider, Button } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { useContext, useRef } from "react";
import Image from "next/image";
import LeftSizeBar from "../LeftSizeBar/LeftSizeBar";
import SvgEditContext from "../../context/svgEditContex";
import { OPEN_EXPORT_MODAL, REDO, RESET_IMAGE, UNDO } from "../../constants/actionTypes";
import ExportModal from "../ExportModal/ExportModal";

const EditContainer = ({ data }) => {
  const editImageContainerRef = useRef(null);
  const [,dispatch] = useContext(SvgEditContext)

  const reset = ()=>{
    dispatch({
      type: RESET_IMAGE,
    })
  }

  const handleExport = ()=>{
    dispatch({
      type: OPEN_EXPORT_MODAL,
    })
  }

  return (
    <>
      <Row className="edit-container">
        <Col span={6} className="left-size-container">
          <LeftSizeBar />
        </Col>
        <Col
          span={18}
          className="edit-main-container"
          ref={editImageContainerRef}
        >
          <div className="edit-main-header">
            <Row className="w-full h-full">
              <Col span={12} className="edit-main-header-left-size">
                <Space
                  className="h-full"
                  split={<Divider type="vertical"></Divider>}
                >
                  <ButtonGroup>
                    <Button
                      onClick={()=>{
                        dispatch({type: UNDO})
                      }}
                    >
                      <ArrowLeftOutlined />
                    </Button>
                    <Button
                      onClick={()=>{
                        dispatch({type: REDO})
                      }}
                    >
                      <ArrowRightOutlined />
                    </Button>
                  </ButtonGroup>
                </Space>
              </Col>
              <Col span={12} className="edit-main-header-right-size">
                <Space>
                  <Button size="medium" onClick={reset}>
                    Reset
                    </Button>
                  <Button type="primary" onClick={handleExport}>
                    Export
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
          <div className="edit-image-container">
            <div className="image-holder">
              <img src={data} alt="avatar" className="image"></img>
            </div>
          </div>
        </Col>
      </Row>
      <ExportModal />
    </>
  );
};

export default EditContainer;
