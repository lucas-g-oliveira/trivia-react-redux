export const fetchTokenLogin = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const myRequest = await fetch(URL);
  const data = await myRequest.json();
  return data;
};

export const fetchQuestions = async (token) => {
  try {
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const myRequest = await fetch(URL);
    const data = await myRequest.json();
    return data;
  } catch (error) {
    return error('token invalido');
  }
};
