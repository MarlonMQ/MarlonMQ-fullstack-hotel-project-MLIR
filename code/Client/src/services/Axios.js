import axios from 'axios';

class AxiosService {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000', // Change this to your API URL
      timeout: 5000, // Change this according to your needs      
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  setToken(token) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  get(url, params) {
    console.log("get axios");
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
