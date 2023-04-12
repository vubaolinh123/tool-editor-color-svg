import convert from "color-convert"


export const hexToRgbObj = (input) =>{
    const list = convert.hex.rgb(input)

    return {
        R: list[0],
        G: list[1],
        B: list[2]
    }
}

export const rgbToHex = (input) =>{
    return convert.rgb.hex(input)
}