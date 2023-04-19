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

const createPokemonCard = (detail, index) => {
  const pokemonCard = `
    <div>${detail.name}</div>
    <img src='${detail.sprites.front_default}'>
    <button class='like'>Like</button>
    <p class='likes'>here will come the likes</p>
    <button type='button' class='comment' data-index='${index}'>Comment</button>
  `;
  return pokemonCard;
};

const showPopup = (detail) => {
  const popContainer = document.getElementById('popContainer');
  popContainer.innerHTML = '';
  const popup = `
    <div>${detail.name}</div>
    <button type='button' id='closePop'>Close</button>
    <img src='${detail.sprites.back_default}'>
    <p>Weight: ${detail.weight}</p>
    <p>Ability: ${detail.abilities[0].ability.name}</p>
    <p>Type: ${detail.types[0].type.name}</p>
  `;
  popContainer.innerHTML += popup;
  popContainer.style.display = 'block';
  const closePop = document.getElementById('closePop');
  closePop.addEventListener('click', () => {
    popContainer.style.display = 'none';
    const scoreContainer = document.getElementById('pokemon');
    scoreContainer.style.display = 'block';
  });
};

const addCommentEventListeners = () => {
  const elements = document.getElementsByClassName('comment');
  for (let i = 0; i < elements.length; i += 1) {
    elements[i].addEventListener('click', async () => {
      const { dataset: { index } } = elements[i];
      const detail = await apiDataPokemonDetail(index);
      showPopup(detail);
      const scoreContainer = document.getElementById('pokemon');
      scoreContainer.style.display = 'none';
    });
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
      const pokemonCard = createPokemonCard(detail, i);
      scoreContainer.innerHTML += pokemonCard;
    }
    addCommentEventListeners();
  } catch (error) {
    return error;
  }
  return null;
};

renderMainCards();