import AbstractView from "./AbstractView.js";
import { countries } from "../index.js";

export default class extends AbstractView{
    constructor(params) {
        super(params);
        this.setTitle("Countries");
    }

    
    async getHTML() {
        let div = document.createElement("div");
        
        
        console.log(countries)
        for (let i = 0; i < countries.length; i++) {
            let card = document.createElement("div");
            card.className = "countryCard"
            card.innerHTML = ` 
            <a href="countries/${countries[i].cca3}">
                <div class="flags" id="countreis/${countries[i].cca3}">
                    <img src="${countries[i].flags.png}" alt="">
                </div>
                <div class="countryInfo">
                    <h3 class="name">${countries[i].name.common}</h3>
                    <span class="num-pop">Population: ${countries[i].population.toLocaleString()}</span>
                    <span class="region">Region: ${countries[i].subregion}</span>
                    <span class="capital">Capital: ${countries[i].capital}</span>
                </div>
            </a>`
            div.appendChild(card);
        }

        return`
        <body>
            <h1>Countries</h1>
            <section>
            <div class="subHeader">
                <div>    
                    <input placeholder="Search a country" type="text" id="fname" name="fname">
                </div>
                <div>
                    <select name="filter" id="filter">
                        <option value="" disabled selected>Filter By Region</option>
                        <option value="">Africa</option>
                        <option value="America">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>   
            <section class="countryMenu">
                ${div.innerHTML}
            </section>
        </body>
        `;
    }
}