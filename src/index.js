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

// const display = (detail) => {
//   const body = document.querySelector('body');
//   body.classList.add('popup-open');
//   const popUp = document.createElement('div');
//   popUp.classList.add('pop-up-container');

//   const popUpContent = `
//   <img src='${detail.sprites.front_default}'>
//   <button class="close"><i class="fa fa-window-close" aria-hidden="true"></i></button>
//   <div>${detail.name}</div>
//   <p>Height: ${detail.height}</p>
//   <p>Weight: ${detail.weight}</p>
//   <p>Abilities: ${detail.abilities.map((ability) => ability.ability.name).join(', ')}</p>
//   <form>
//     <input type="text" id="name" placeholder="Enter Name" maxlength="30">
//     <textarea id="comment" maxlength="500">Write your comment here...</textarea>
//   </form>
// `;

//   popUp.classList.add('pop-up-container');
//   popUp.innerHTML = popUpContent;

//   const closeButton = popUp.querySelector('.close');
//   closeButton.addEventListener('click', () => {
//     popUp.classList.add('hidden');
//   });

//   document.body.appendChild(popUp);
// };

const display = async (detail) => {
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
    <div class="comments"></div>
    <form>
        <input type="text" id="name" placeholder="Enter Name" maxlength="30">
        <textarea id="comment" maxlength="500">Write your comment here...</textarea>
        <button class="comment-button">Comment</button>
    </form>
  `;

  popUp.innerHTML = popUpContent;

  const closeButton = popUp.querySelector('.close');
  closeButton.addEventListener('click', () => {
    popUp.classList.add('hidden');
  });

  const commentsContainer = popUp.querySelector('.comments');
  try {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ErvLLCGB8PcsVhOAGDFz/comments');
    const comments = await response.json();
    commentsContainer.innerHTML = comments.map((comment) => `
      <div>${comment.username}: ${comment.comment}</div>
    `).join('');
  } catch (error) {
    console.error(error);
  }

  document.body.appendChild(popUp);
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
      <button class='pop-up'>comment</button>
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
