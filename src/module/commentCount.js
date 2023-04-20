const countComments = () => {
  const commentsCount = document.querySelector('.comments-count');
  const commentContainer = document.querySelector('.comments');
  if (commentsCount && commentContainer) {
    const countDivs = commentContainer.querySelectorAll('div');
    const count = countDivs.length;
    commentsCount.textContent = `Comments (${count})`;
  }
};

export default countComments;