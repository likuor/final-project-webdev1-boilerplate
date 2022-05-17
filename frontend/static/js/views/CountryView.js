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

    //Getting a country data by id
    const countryData = countries.filter((value) => {
      return value['cca3'] === id;
    });
    console.log(countryData);

    const languages = [];
    const borders = [];
    const currenciesArray = [];
    const population = countryData[0].population.toLocaleString();

    // const getData = (dataTitle, array) => {
    //   for (const key in countryData[0].dataTitle) {
    //     array = array.push(countryData[0].dataTitle[key]);
    //   }
    //   console.log(array);
    //   return array;
    // };
    // getData('currencies', currenciesArray);
    // console.log(getData('languages', languages));

    // Getting currencies data
    for (const key in countryData[0].currencies) {
      currenciesArray.push(countryData[0].currencies[key]);
    }

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

    let test = '';
    const displayBorders = (array) => {
      for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
        console.log();
        test += `<li><a href='${array[i]}'><span>${array[i]}</span></a></li>`;
      }
      return test;
    };

    return `
        <div class='view-container'>
          <div>
              <a href="/countries">
                  <button>back</button>
              </a>
          </div>
          <div class='countryContainaer'>
              <div class='flag'>
                  <img src="${countryData[0].flags.png}"/>
              </div>
              <div class='countryDetail'>
                <div class='countryExplanation'>

                  <div class='firstCountryDetail'>
                      <h1>${countryData[0].name.common}</h1>
                      <p><span>Native Name:</span> ${
                        countryData[0].altSpellings[1]
                      }</p>
                      <p><span>Population:</span> ${population}</p>
                      <p><span>Region:</span> ${countryData[0].region}</p>
                      <p><span>Sub Region:</span> ${
                        countryData[0].subregion
                      }</p>
                      <p><span>Capital:</span> ${countryData[0].capital}</p>
                  </div>

                  <div class='secondCountryDetail'>
                      <p><span>Top Level Domain:</span> ${
                        countryData[0].tld
                      }</p>
                      <p><span>Currencies:</span> ${currenciesArray[0].name} (${
      currenciesArray[0].symbol
    })</p>
                      <p><span>Languages:</span> ${languages}</p>
                  </div>
                </div>
                <div class='borderCountryDetail'>
                  <h1>Border Countries</h1>
                  <div class='borderCountryDetailContainer'>
                    <ul>
                    ${displayBorders(borders)}
                    </ul>
                  </div>
                </div>
              </div>
          </div>
        </div>
        `;
  }
}
