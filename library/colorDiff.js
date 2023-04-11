import diff from "color-diff"



export const closestColor = (color,palette)=>{
    return diff.closest(color,palette)
}

export const furthestColor = (color,palette)=>{
    return diff.furthest(color,palette)
}