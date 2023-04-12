import { useEffect, useReducer } from "react";
import Uploads from "../../components/Upload/Upload";
import EditContainer from "../../components/EditContainer/EditContainer";
import { initialState, svgEditReducer } from "../../reducer/svgEditReducer";
import SvgEditContext from "../../context/svgEditContex";
import { IMAGE_URL, ORIGINAL_SVG_STRING, PALETTES } from "../../constants/actionTypes";
import { PALETTES_LIST } from "../../constants/constants";

export default function Home() {
  const [state, dispatch] = useReducer(svgEditReducer, initialState);

  useEffect(()=>{
    getPalettes()
  },[])

  const getPalettes = ()=>{
    dispatch({
      type: PALETTES,
      payload: PALETTES_LIST
    })
  }

  const getUploadedFile = (data) => {
    dispatch({
      type: IMAGE_URL,
      payload: data
    })
  };

  const getUploadedSvgData = (data) => {
    dispatch({
      type: ORIGINAL_SVG_STRING,
      payload: data
    })
  };

  return (
    <SvgEditContext.Provider value={[state, dispatch]}>
      <div className="w-[95%] mx-auto my-5 bg-white rounded-md">
        <div className="px-4 py-4 w-full flex justify-between">
          <div>
            <i className="bi bi-pencil-square"></i>
            <span className="font-bold pl-2">Tool Editor</span>
          </div>
          <div>
            {state.imageUrl && (
              <Uploads
                size="small"
                getUploadedFile={getUploadedFile}
                getUploadedSvgData={getUploadedSvgData}
              />
            )}
          </div>
        </div>
        <div className="bg-[#f5f6fa] w-full items-center text-center flex justify-center border bt-2 border-gray-[#ebedf5] py-5">
          {state.imageUrl ? (
            <EditContainer data={state.imageUrl}></EditContainer>
          ) : (
            <Uploads
              className=""
              getUploadedFile={getUploadedFile}
              getUploadedSvgData={getUploadedSvgData}
            />
          )}
        </div>
      </div>
    </SvgEditContext.Provider>
  );
}
