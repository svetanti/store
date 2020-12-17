class Api {
  constructor(baseUrl) {
    this._url = baseUrl;
  }

  _sendRequest(path, parameters) {
    return fetch(`${this._url}${path}`).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  getProducts() {
    return this._sendRequest(`products`);
  }

  getCurrentProduct(id) {
    return this._sendRequest(`products/${id}`);
  }
}

export const api = new Api('https://fakestoreapi.com/');