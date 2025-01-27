import { generatePalette } from "./modules/util";
import { Color } from "./modules/Color";

//En gros : L'utilisateur entre un code hexadécimal, la fonction generatePalette transforme ce hex en hsl pour pouvoir faire
//les opérations nécéssaires (avoir un dégradé donc changer la luminosité), ensuite displayColors() créer des instances de Color 
//pour chaque couleur de la palette générée avec le hex de base. Dans chaque instance de Color le hsl est retransformé
//en hex pour pouvoir générer les éléments avec display().
//Dans displayColors on ajoute la class "minimized" au header pour afficher la palette quand on submit le code hex

const form = document.querySelector("form");
const container = document.querySelector("main");
const header = document.querySelector("header");

//Partie à faire : Reset du container etc...

const displayColors = (palette) => {
    container.replaceChildren();
    header.classList.add("minimized");
    //Pour chaque palette on génère un élément
    palette.forEach(c => {
        new Color(c).display(container);
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const formInput = document.querySelector("input");

    //vérifie si l'utilisateur entre un code hex valide
    if (/^#[0-9A-F]{6}$/i.test(formInput.value)) {
        const palette = generatePalette(formInput.value);
        displayColors(palette);
    }else{
        console.error(`${formInput.value} is not a valid Hexadecimal color`)
    }

})
