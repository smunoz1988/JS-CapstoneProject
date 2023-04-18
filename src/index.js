// const apiData = {
//   url: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'
// };

//const { get } = require("lodash")

// const {url} = apiData

// fetch(url)
//   .then( (data) => console.log(data.json()));

const apiData = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/', {
      method: 'GET',
    })
    const responseDataApi = await response.json();
    return responseDataApi
  } catch (error) {
    return error;
  }
};

const renderMainCards = async () => {
  try {
    const score = await apiData();
    const { results } = score;
    console.log(results);
    const scoreContainer = document.getElementById('pokemon');
    scoreContainer.innerHTML = '';
    for (let i = 0; i < results.length; i++) {
      const pokemonCard = `<div>${results[i].name}</div>`;
      scoreContainer.innerHTML += pokemonCard;
    }
  } catch (error) {
    return error;
  }
  return null;
};

renderMainCards();