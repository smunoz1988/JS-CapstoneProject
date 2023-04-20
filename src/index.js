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

const postlikes = async (id) => {
  try {
    const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/t2cJ7KaFhU2NhoHQVMnI/likes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: `item${id}`,
      }),
    });
    const responseReceived = await response.json();
    return responseReceived;
  } catch (error) {
    return error;
  }
};

const display = async (detail) => {
  const body = document.querySelector('body');
  body.classList.add('popup-open');
  const popUp = document.createElement('div');
  popUp.classList.add('pop-up-container');

  const popUpContent = `
    <div class="top">
    <img src='${detail.sprites.front_default}'>
    <button class="close"><i class="fa fa-window-close" aria-hidden="true"></i></button>
    </div>
    <div>${detail.name}</div>
    <p>Height: ${detail.height}</p>
    <p>Weight: ${detail.weight}</p>
    <p>Abilities: ${detail.abilities.map((ability) => ability.ability.name).join(', ')}</p>
    <h2>Add Your Comment.</h2>
    <div class="comments-count">comments (8)</div>
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
};

const countItemMain = (scoreContainer) => {
  const direcChildren = scoreContainer.children.length;
  const count = document.getElementById('count');
  count.innerHTML = `Pokemons(${direcChildren})`;
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