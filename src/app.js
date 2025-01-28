import { generatePalette } from "./modules/util";
import { transformHSLToShadow } from "./modules/util";
import { Color } from "./modules/Color";
import * as convert from "color-convert";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

//En gros : L'utilisateur entre un code hexadécimal, la fonction generatePalette transforme ce hex en hsl pour pouvoir faire
//les opérations nécéssaires (avoir un dégradé donc changer la luminosité), ensuite displayColors() créer des instances de Color 
//pour chaque couleur de la palette générée avec le hex de base. Dans chaque instance de Color le hsl est retransformé
//en hex pour pouvoir générer les éléments avec display().
//Dans displayColors on ajoute la class "minimized" au header pour afficher la palette quand on submit le code hex

//Créer une instance de la classe Notyf
const notyf = new Notyf();

const form = document.querySelector("form");
const container = document.querySelector("main");
const header = document.querySelector("header");


const displayColors = (palette, inputValue) => {
    container.replaceChildren();
    header.classList.add("minimized");
    //Pour chaque palette on génère un élément
    palette.forEach(c => {
        new Color(c).display(container);
    });

    //Marche mais pas très beau
    //Changer le dégradé de l'arrière plan en fonction de la couleur
    const start = convert.hsl.hex(palette[2]);
    const mid = convert.hsl.hex(palette[10]);
    const end = convert.hsl.hex(palette[18]);
    document.body.style.background = `linear-gradient(-45deg, #${start}, #${mid}, #${end})`;
    document.body.style.backgroundSize = `400% 400%`;

    //Changer la couleur de l'ombre
    const hsl = convert.hex.hsl(inputValue);
    const transformedHSL = transformHSLToShadow(hsl);
    const root = document.documentElement;
    root.style.setProperty("--shadow-color", transformedHSL);
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const formInput = document.querySelector("input");

    //vérifie si l'utilisateur entre un code hex valide
    if (/^#[0-9A-F]{6}$/i.test(formInput.value)) {
        const palette = generatePalette(formInput.value);
        displayColors(palette,formInput.value);
    }else{
        console.error(`${formInput.value} is not a valid Hexadecimal color`)
        notyf.error(`${formInput.value} is not a valid Hexadecimal color`);
    }

    

})

//Copier le code hex
container.addEventListener("click", async e => {
    if (e.target.className === "color") {
        const color = e.target.dataset.color;
        await navigator.clipboard.writeText(color);
        notyf.success(`copied ${color} to clipboard`);
    }
})
