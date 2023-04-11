import convert from "color-convert"


export const hexToRgbObj = (input) =>{
    const list = convert.hex.rgb(input)

    return {
        R: list[0],
        G: list[1],
        B: list[2]
    }
}

export const rbgToHex = (input) =>{
    return convert.rbg.hex(input)
}