const fetchTokenLogin = async () => {
  const myRequest = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await myRequest.json();
  return data;
};

export default fetchTokenLogin;
