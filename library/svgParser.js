import { parse } from "svgson"

export const parseSvg = async (svg)=>{
    return await parse(svg)
}

export const svgDimensions = (svgInfo)=>{
    let width = 100;
    let height = 100;
    if(svgInfo?.attributes?.viewBox){
        const [, , w, h] = svgInfo.attributes.viewBox.split(" ");
        width = w
        height = h
    }else if(svgInfo.attributes.width && svgInfo.attributes.height){
        width = svgInfo.attributes.width
        height = svgInfo.attributes.height
    }

    return { width, height };
}