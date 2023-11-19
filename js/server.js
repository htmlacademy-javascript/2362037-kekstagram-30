const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  GET: '/data',
  POST: '/dg',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET: 'Не удалось загрузить данные',
  SEND: 'Не удалось отправить форму',
};

const load = (route, errorText, method = Method.GET, body) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

export const getData = () => load(Route.GET, ErrorText.GET);
export const sendData = (body) => load(Route.POST, ErrorText.SEND, Method.POST, body);

