import * as convert from "color-convert";

export const generatePalette = (hex) => {

    const hsl = convert.hex.hsl(hex);
    
    console.log(hsl)
}

