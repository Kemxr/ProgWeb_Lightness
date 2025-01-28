import * as convert from "color-convert";

//génération de la palette
export const generatePalette = (hex) => {

    //tableau vide pour mettre le tout à la fin
    const colors = [];

    //le code hsl
    const hsl = convert.hex.hsl(hex);

    //premier élément du tableau hsl
    const h = hsl[0];
    //deuxième élément du tableau hsl
    const s = hsl[1];

    //Boucle allant de 0 a 100 de 10 en 10 pour que la lightness soit multiple de 10
    //et a chaque boucle on push les même deux premier éléments en ajoutant la lightness qui monte
    for (let i = 0; i < 100; i+=5) {
        //on met des [] pour créer un tableau pour chaque itération de i
        colors.push([h,s,i]);
    }
    
    //On retourne le tableau de colors pour pouvoir utiliser les fonctions de tableau dans app.js
    return colors;
    
}

export const transformHSLToShadow = (hsl) => {
    const shadows = [];

    //Rajoute ce qu'on a besoin derrière chaque valeur HSL
    const first = `${hsl[0]}deg`;
    const second = `${hsl[1]}%`;
    const third = `${hsl[2]}%`;

    shadows.push(first,second,third);
    
    return shadows;
}

