import './style.css';
import { countComments, countCom, countItemMain } from './module/countFunctions.js';
import { apiDataPokemonDetail, getLikesApi, postlikes } from './module/apifunctionality.js';

const display = async (detail) => {
  const body = document.querySelector('body');
  body.classList.add('popup-open');
  const popUp = document.createElement('div');
  popUp.classList.add('pop-up-container');

  const popUpContent = `
    <div class="top">
    <img class="img" src='${detail.sprites.front_default}'>
    </div>
    <div class="second">
    <button class="close"><i class="fa fa-window-close" aria-hidden="true"></i></button>
    <div>${detail.name}</div>
    <p>Height: ${detail.height}</p>
    <p>Weight: ${detail.weight}</p>
    <p>Abilities: ${detail.abilities.map((ability) => ability.ability.name).join(', ')}</p>
    </div>
    <div class="third">
    <h2>Add Your Comment.</h2>
    <div id='commentCount' class="comments-count"></div>
    <div id='commentContainer' class="comments"></div>
    <form>
        <input type="text" id="name" placeholder="Enter Name" maxlength="30">
        <textarea id="comment" maxlength="500" placeholder='Write your comment here...'></textarea>
        <button class="comment-button">Comment</button>
    </form>
    </div>
  `;

  popUp.innerHTML = popUpContent;

  const closeButton = popUp.querySelector('.close');
  closeButton.addEventListener('click', () => {
    popUp.remove();
  });

  const commentsContainer = popUp.querySelector('.comments');
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ErvLLCGB8PcsVhOAGDFz/comments?item_id=${detail.name}`);
    const comments = await response.json();
    commentsContainer.innerHTML = comments.map((comment) => `
    <div>${comment.username}: ${comment.comment}</div>`).join('');
  } catch (error) {
    console.error(error);
  }

  const commentButton = popUp.querySelector('.comment-button');
  commentButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const nameInput = popUp.querySelector('#name');
    const commentInput = popUp.querySelector('#comment');
    const username = nameInput.value;
    const comment = commentInput.value;
    if (username && comment) {
      const newComment = document.createElement('div');
      newComment.textContent = `${username}: ${comment}`;
      commentsContainer.appendChild(newComment);
      countComments();
      try {
        const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ErvLLCGB8PcsVhOAGDFz/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item_id: detail.name,
            username,
            comment,
          }),
        });
        const result = await response.json();
        result.classList = 'style';
        commentsContainer.innerHTML += `
          <div>${username}: ${comment}</div>
        `;
        nameInput.value = '';
        commentInput.value = '';
      } catch (error) {
        console.error(error);
      }
    }
  });
  document.body.appendChild(popUp);
  countCom();
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
      <img class='cardImage' src='${detail.sprites.front_default}'>
      <div class='nameLikeBtn'>
        <div>${detail.name.toUpperCase()}</div>
        <button class='likeBtn'></button>
      </div>
      <p class='likeContainer'>${likes} likes</p>
      <button class='pop-up'>comment</button>
      </div>
      `;
      scoreContainer.innerHTML += pokemonCard;

      const popUpButton = scoreContainer.querySelectorAll('.pop-up');
      popUpButton.forEach((button, i) => {
        button.addEventListener('click', async () => {
          const pokemonDetails = await apiDataPokemonDetail(i + 1);
          display(pokemonDetails);
          countComments();
        });
      });

      const likeButton = scoreContainer.querySelectorAll('.likeBtn');
      likeButton.forEach((button, i) => {
        button.addEventListener('click', async () => {
          await postlikes(i + 1);
          const likeContainer = scoreContainer.querySelectorAll('.likeContainer');
          likeContainer[i].innerHTML = `${await getLikesApi(i + 1)} likes`;
        });
      });
    }
    countItemMain(scoreContainer);
  } catch (error) {
    return error;
  }
  return null;
};

renderMainCards();