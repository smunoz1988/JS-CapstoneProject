export const countComments = () => {
  const commentsCount = document.querySelector('.comments-count');
  const commentContainer = document.querySelector('.comments');
  if (commentsCount && commentContainer) {
    const countDivs = commentContainer.querySelectorAll('div');
    const count = countDivs.length;
    commentsCount.textContent = `Comments (${count})`;
  }
};

export const countCom = () => {
  const countCommentTest = document.getElementById('commentContainer');
  const countCome = countCommentTest.children.length;
  const resultCount = document.getElementById('commentCount');
  resultCount.innerHTML = `Comments(${countCome})`;
};

export const countItemMain = (scoreContainer) => {
  const direcChildren = scoreContainer.children.length;
  const count = document.getElementById('count');
  count.innerHTML = `Pokemons(${direcChildren})`;
};