export const apiDataPokemonDetail = async (number) => {
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

export const getLikesApi = async (index) => {
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

export const postlikes = async (id) => {
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