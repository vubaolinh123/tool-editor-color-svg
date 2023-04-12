import { Button, Divider, Drawer, Image, Segmented, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import SvgEditContext from "../../context/svgEditContex";
import { CLOSE_EXPORT_MODAL } from "../../constants/actionTypes";
import { parseSvg, svgDimensions } from "../../library/svgParser";
import ImageExport from "./ImageExport";
import { dowloadSVGAsImage, dowloadSVGAsText } from "../../library/export";

const exportOptions = ["SVG", "IMAGE"];

const ExportModal = () => {
  const [state, dispatch] = useContext(SvgEditContext);
  const [exportTab, setExportTab] = useState(exportOptions[0]);
  const [exportImageSize, setExportImageSize] = useState(null);

  useEffect(() => {
    if (state.isExportModal) {
      setExportTab(exportOptions[0]);
      getSvgInfo();
    }
  }, [state.isExportModal]);

  const getSvgInfo = async () => {
    const svgInfo = await parseSvg(state.updateSvg);
    const { width, height } = svgDimensions(svgInfo);
    setExportImageSize({ width, height });
  };

  const onClose = () => {
    dispatch({
      type: CLOSE_EXPORT_MODAL,
    });
  };

  const handleExport = async (key, payload = {}) => {
    if(key === "SVG"){
      dowloadSVGAsText(state.updatedSvg) 
    }else if(key === "IMAGE"){
      dowloadSVGAsImage(state.updatedSvg, payload)
    }
  };

  const renderSvgTabOptions = () => {
    return (
      <Space>
        <Button type="primary" onClick={() => handleExport("SVG")}>
          Dowload SVG
        </Button>
      </Space>
    );
  };

  const renderExportTabOptions = (key) => {
    if (key === "SVG") {
      return renderSvgTabOptions();
    } else if (key === "IMAGE") {
      return (
        <ImageExport
          handleExport={handleExport}
          defaultDimensions={exportImageSize}
        />
      );
    }
  };

  return (
    <Drawer
      title="Export Options"
      placement="right"
      onClose={onClose}
      open={state.isExportModal}
    >
      <Segmented
        block
        options={exportOptions}
        defaultChecked={exportOptions[0]}
        value={exportTab}
        onChange={(v) => setExportTab(v)}
      />
      <Divider />
      <Space
        className="w-full"
        size={50}
        direction="vertical"
        wrap
        align="center"
      >
        <Image width={200} src={state.imageUrl} alt="" />

        {renderExportTabOptions(exportTab)}
      </Space>
    </Drawer>
  );
};

export default ExportModal;
