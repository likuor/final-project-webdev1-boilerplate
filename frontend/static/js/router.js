import Homepage from './views/Homepage.js';
import CountryView from './views/CountryView.js';
import Countries from './views/Countries.js';
import { getCountries } from './countries.js';

const pathToRegex = (path) =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: '/', view: Homepage },
    { path: '/countries', view: Countries },
    { path: '/countries/:id', view: CountryView },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  const countries = getCountries();
  const params = getParams(match);

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  } else if (match.route.path === '/countries/:id') {
    let found = false;
    for (let country of countries) {
      const cca3 = country.cca3.toLowerCase();
      const paramsId = params.id.toLowerCase();
      if (cca3 === paramsId) {
        found = true;
      }
    }
    !found && (match = { route: routes[0], result: [location.pathname] });
  }

  const view = new match.route.view(params);

  document.querySelector('#app').innerHTML = await view.getHTML();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  // document.body.addEventListener("click", e => {
  //     if(e.target.matches("[data-link]")){
  //         e.preventDefault();
  //         navigateTo(e.target.href);
  //     }
  // })
  router();
});
