import './style.css';

const apiDataPokemonDetail = async (number) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`, {
      method: 'GET',
    });
    const responseDataDetail = await response.json();
    return responseDataDetail;
  } catch (error) {
    return error;
  }
};

const renderMainCards = async () => {
  try {
    const scoreContainer = document.getElementById('pokemon');
    scoreContainer.innerHTML = '';
    for (let i = 1; i < 20 + 1; i += 1) {
      /* eslint-disable */
      const detail = await apiDataPokemonDetail(i);
      /* eslint-enable */
      const pokemonCard = `
      <div>${detail.name}</div>
      <img src='${detail.sprites.front_default}'>
      <button>Like</button>
      <p>here will come the likes</p>
      <button>comment</button>
      `;
      scoreContainer.innerHTML += pokemonCard;
    }
  } catch (error) {
    return error;
  }
  return null;
};

renderMainCards();