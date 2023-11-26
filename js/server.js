const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Routes = {
  GET: '/data',
  POST: '/dg',
};
const Methods = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorsText = {
  GET: 'Не удалось загрузить данные',
  SEND: 'Не удалось отправить форму',
};

const load = (route, errorText, method = Methods.GET, body) =>
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

export const getData = () => load(Routes.GET, ErrorsText.GET);
export const sendData = (body) => load(Routes.POST, ErrorsText.SEND, Methods.POST, body);

