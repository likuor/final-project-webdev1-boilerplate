import AbstractView from './AbstractView.js';
import { getCountries } from '../countries.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Country');
  }

  async getHTML() {
    const countries = getCountries();
    const id = this.params.id;
    let languages = [];
    let borders = [];

    //Getting a country data by id
    let countryData = countries.filter((value) => {
      return value['cca3'] === id;
    });
    console.log(countryData);

    //Getting language data
    for (const key in countryData[0].languages) {
      languages.push(countryData[0].languages[key]);
    }

    //Getting border data
    if (countryData[0].borders) {
      for (let i = 0; i < countryData[0].borders.length; i++) {
        borders.push(countryData[0].borders[i]);
      }
    } else {
      borders.push('None');
    }

    return `
        <div class='view-container'>
            <div>
                <button>back</button>
            </div>
            <div>
                <div>
                    <img src="${countryData[0].flags.png}"/>
                </div>
                <div>
                    <h1>${countryData[0].name.common}</h1>
                    <h2>Native Name: ${countryData[0].altSpellings[1]}</h2>
                    <h2>Population: ${countryData[0].population}</h2>
                    <h2>Region: ${countryData[0].region}</h2>
                    <h2>Sub Region: ${countryData[0].subregion}</h2>
                    <h2>Capital: ${countryData[0].capital}</h2>
                    <h2>Languages: ${languages}</h2>
                </div>
                <div>
                    <h1>Border Countries</h1>

                    <p>${borders}</p>
                </div>
            </div>
        </div>
        `;
  }
}
