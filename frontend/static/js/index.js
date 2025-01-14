import { getCountries } from './countries.js';

export const countries = getCountries();

window.addEventListener('DOMContentLoaded', (event) => {
  const darkmodeBtn = document.querySelector('.btnDarkMod');
  darkmodeBtn.addEventListener('click', function () {
    const background = document.querySelector('body');
    const textcolor = document.querySelectorAll('.countryInfo');
    const outlineColor = document.querySelectorAll('.countryCard');
    if (background.style.backgroundColor === 'white') {
      background.style.backgroundColor = 'black';
      background.style.color = 'white';
      for (let i of textcolor) {
        i.style.color = 'white';
      }
      for (let i of outlineColor) {
        i.style.outlineColor = 'white';
      }
    } else {
      background.style.backgroundColor = 'white';
      background.style.color = 'black';
      for (let i of textcolor) {
        i.style.color = 'black';
      }
      for (let i of outlineColor) {
        i.style.outlineColor = 'black';
      }
    }
  });
  const inputForm = document.getElementById('inputForm');
  const searchCountries = function () {
    if (inputForm) {
      inputForm.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
          let countriesSearched = [];
          const inputValue = e.target.value;
          for (let i = 0; i < countries.length; i++) {
            let countryName = countries[i].name.common.toLowerCase();
            if (countryName.indexOf(inputValue) !== -1) {
              countriesSearched.push(countries[i]);
            }
          }
          console.log(countriesSearched);
          let box = document.getElementsByClassName('countryMenu')[0];
          let div = document.createElement('div');
          div.className = 'countryCard';
          let result = '';
          for (let i = 0; i < countriesSearched.length; i++) {
            div.innerHTML += `
          <div class="countryCard">
            <a href="countries/${countriesSearched[i].cca3}">
              <div class="flags" id="countreis/${countriesSearched[i].cca3}">
                  <img src="${countriesSearched[i].flags.png}" alt="">
              </div>
              <div class="countryInfo">
                  <h3 class="name">${countriesSearched[i].name.common}</h3>
                  <span class="num-pop">Population: ${countriesSearched[
                    i
                  ].population.toLocaleString()}</span>
                  <span class="region">Region: ${
                    countriesSearched[i].subregion
                  }</span>
                  <span class="capital">Capital: ${
                    countriesSearched[i].capital
                  }</span>
              </div>
            </a>
          </div">
            `;
            box.innerHTML = div.innerHTML;
          }
        }
      });
    }
  };

  searchCountries();
});
