import * as convert from "color-convert";

export class Color {

    #hsl;
    #hex;
    #element;

    constructor(hsl) {
        this.#hsl = hsl;
        //Mettre le # pour que ça fonctionne avec le css sinon on a que les chiffre et lettre
        this.#hex = `#${convert.hsl.hex(hsl)}`;
        this.#element = this.#generateElement();
    }

    #generateElement() {
        const colorElement = document.createElement("div");
        colorElement.classList.add("color");
        colorElement.dataset.color = this.#hex;
        colorElement.style.backgroundColor = this.#hex;

        const textElement = document.createElement("p");
        textElement.textContent = this.#hex;
        textElement.style.color = this.#hsl[2] < 60 ? "#ffffff" : "#000000";
        //On met le textElement dans la div
        colorElement.appendChild(textElement);

        // Retourne le <div>
        return colorElement;
    }

    display(parentElement) {
        //Ajoute this.#element en enfant de l'élément passé en paramètre
        parentElement.appendChild(this.#element);
    }
}