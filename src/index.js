// const apiData = {
//   url: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'
// };

//const { get } = require("lodash")

// const {url} = apiData

// fetch(url)
//   .then( (data) => console.log(data.json()));

const apiData = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1/', {
      method: 'GET',
    })
    const responseDataApi = await response.json();
    return responseDataApi
  } catch (error) {
    return error;
  }
};

console.log(apiData());