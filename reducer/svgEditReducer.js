import { produce } from "immer";
import {
    APPLY_PALETTE,
  CLOSE_EXPORT_MODAL,
  IMAGE_URL,
  MAKE_HISTORY,
  OPEN_EXPORT_MODAL,
  ORIGINAL_SVG_MAPPER,
  ORIGINAL_SVG_STRING,
  PALETTES,
  REDO,
  RESET_IMAGE,
  UNDO,
  UPDATE_COLOR_MAPPER,
} from "../constants/actionTypes";
import {
  getAllSvgColors,
  replaceAllStringColor,
  svgToBase64,
} from "../library/helper";
import { hexToRgbObj, rbgToHex } from "../library/colorConver";
import { closestColor } from "../library/colorDiff";

export const initialState = {
  originalSvg: null,
  updateSvg: null,
  imageUrl: null,
  history: {
    histroy: [],
    undoIdx: 0,
  },
  colorMapper: {},
  isExportModal: false,
  palettes: [],
};

export const svgEditReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case IMAGE_URL:
        draft.imageUrl = action.payload;
        break;
      case ORIGINAL_SVG_STRING:
        draft.originalSvg = action.payload;
        draft.colorMapper = getOriginalColorFromSvg(draft.originalSvg);
        draft.updateSvg = updateSvg(draft.originalSvg, draft.colorMapper);
        draft.history = {
          history: [
            {
              updatedSvg: draft.updatedSvg,
              imgUrl: draft.imageUrl,
              colorMapper: draft.colorMapper,
            },
          ],
          undoIdx: 0,
        };
        break;
      case UPDATE_COLOR_MAPPER:
        draft.colorMapper[action.payload.key] = action.payload.value;
        draft.updatedSvg = updateSvg(draft.originalSvg, draft.colorMapper);
        draft.imageUrl = updateImageUrl(draft.updatedSvg);
        break;
      case RESET_IMAGE:
        draft.colorMapper = getOriginalColorFromSvg(draft.originalSvg);
        draft.updatedSvg = updateSvg(draft.originalSvg, draft.colorMapper);
        draft.imageUrl = updateImageUrl(draft.updatedSvg);
        draft.history = {
          history: [
            {
              updatedSvg: draft.updatedSvg,
              imgUrl: draft.imageUrl,
              colorMapper: draft.colorMapper,
            },
          ],
          undoIdx: 0,
        };
        break;
      case OPEN_EXPORT_MODAL:
        draft.isExportModal = true;
        break;
      case CLOSE_EXPORT_MODAL:
        draft.isExportModal = false;
        break;
      case MAKE_HISTORY:
        makeHistory(draft);
        break;
      case UNDO:
        undo(draft);
        break;
      case REDO:
        redo(draft);
        break;
      case APPLY_PALETTE:
        appyPalette(action.payload, draft); 
      case PALETTES:
        draft.palettes = action.payload;
    default:
        return draft;
    }
  });
};

const appyPalette = (palette, stateCopy)=>{
    const updateObj = {};
    const rgbPalette = palette.map((item)=> hexToRgbObj(item))
    const { colorMapper} = stateCopy;
    for(const key in colorMapper){
        const inputColor = hexToRgbObj(key)
        const outputColorRgb = closestColor(inputColor, rgbPalette)
        const rbgArray = Object.values(outputColorRgb)
        const hexColor = rbgToHex(rbgArray)
        updateObj[key] = `#${hexColor}`;
    }
    
    stateCopy.colorMapper = {...stateCopy.colorMapper, ...updateObj}
    stateCopy.updatedSvg = updateSvg(stateCopy.originalSvg, stateCopy.colorMapper);

    stateCopy.imageUrl = updateImageUrl(stateCopy.updatedSvg);
}


const redo = (stateCopy)=>{
    if(stateCopy.history.undoIdx === stateCopy.history.history.length - 1){
        return
    }

    const historyStep = stateCopy.history.undoIdx + 1;
    const historyState = stateCopy.history.history[historyStep]

    if(!historyState){
        return;
    }

    stateCopy.history.undoIdx = historyStep;
    stateCopy.updatedSvg = historyState.updatedSvg
    stateCopy.imageUrl = historyState.imageUrl
    stateCopy.colorMapper = historyState.colorMapper
}

const undo = (stateCopy)=>{
    if(stateCopy.history.undoIdx === 0){
        return;
    }
    const historyStep = stateCopy.history.undoIdx - 1;
    const historyState = stateCopy.history.history[historyStep]

    stateCopy.history.undoIdx = historyStep;
    stateCopy.updatedSvg = historyState.updatedSvg
    stateCopy.imageUrl = historyState.imageUrl
    stateCopy.colorMapper = historyState.colorMapper
}

const makeHistory = (stateCopy) => {
  let newHistory = [];
  let stateClone = JSON.parse(JSON.stringify(stateCopy));

  newHistory = stateCopy.history.history.slice(
    0,
    stateCopy.history.undoIdx + 1
  );
  stateCopy.history.history = newHistory.concat([
    {
      updatedSvg: stateClone.updatedSvg,
      imageUrl: stateClone.imageUrl,
      colorMapper: stateClone.colorMapper,
    },
  ]);

  stateCopy.history.undoIdx += 1;
};

const updateImageUrl = (inputString) => {
  return svgToBase64(inputString);
};

const updateSvg = (inputString, colorMap) => {
  return replaceAllStringColor(inputString, colorMap);
};

const getOriginalColorFromSvg = (svgString) => {
  return getAllSvgColors(svgString).reduce((a, v) => ({ ...a, [v]: v }), {});
};
