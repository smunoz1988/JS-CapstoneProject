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

const getLikesApi = async (index) => {
  try {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/t2cJ7KaFhU2NhoHQVMnI/likes/', {
      method: 'GET',
    });
    const responseDataDetail = await response.json();
    /* eslint-disable */
    const result = responseDataDetail.find(({ item_id }) => item_id === `item${index}`);
    /* eslint-enable */
    return result.likes;
  } catch (error) {
    return 0;
  }
};

const display = (detail) => {
  const body = document.querySelector('body');
  body.classList.add('popup-open');
  const popUp = document.createElement('div');
  popUp.classList.add('pop-up-container');

  const popUpContent = `
  <img src='${detail.sprites.front_default}'>
  <button class="close"><i class="fa fa-window-close" aria-hidden="true"></i></button>
  <div>${detail.name}</div>
  <p>Height: ${detail.height}</p>
  <p>Weight: ${detail.weight}</p>
  <p>Abilities: ${detail.abilities.map((ability) => ability.ability.name).join(', ')}</p>
  <form>
    <input type="text" id="name" placeholder="Enter Name" maxlength="30">
    <textarea id="comment" maxlength="500">Write your comment here...</textarea>
  </form>
`;

  popUp.classList.add('pop-up-container');
  popUp.innerHTML = popUpContent;

  const closeButton = popUp.querySelector('.close');
  closeButton.addEventListener('click', () => {
    popUp.classList.add('hidden');
  });

  document.body.appendChild(popUp);
};

const renderMainCards = async () => {
  try {
    const scoreContainer = document.getElementById('pokemon');
    scoreContainer.innerHTML = '';
    for (let i = 1; i < 20 + 1; i += 1) {
      /* eslint-disable */
      const detail = await apiDataPokemonDetail(i);
      const likes = await getLikesApi(i);
      /* eslint-enable */
      const pokemonCard = `
      <div class=pokemonCard>
      <div>${detail.name.toUpperCase()}</div>
      <img src='${detail.sprites.front_default}'>
      <button class='likeBtn'>Like</button>
      <p>${likes}</p>
      <button class='pop-up'>comment</button>
      </div>
      `;
      scoreContainer.innerHTML += pokemonCard;

      const popUpButton = scoreContainer.querySelectorAll('.pop-up');
      popUpButton.forEach((button, i) => {
        button.addEventListener('click', async () => {
          const pokemonDetails = await apiDataPokemonDetail(i + 1);
          display(pokemonDetails);
        });
      });
    }
  } catch (error) {
    return error;
  }
  return null;
};

renderMainCards();
