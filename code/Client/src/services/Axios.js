import axios from 'axios';

class AxiosService {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000', // Cambia esto por la URL de tu API
      timeout: 5000, // Cambia esto según tus necesidades
    });
  }

  get(url, params) {
    return this.instance.get(url, { params });
  }

  post(url, data) {
    return this.instance.post(url, data);
  }

  put(url, data) {
    return this.instance.put(url, data);
  }

  delete(url) {
    return this.instance.delete(url);
  }
}

export default new AxiosService();