import axios from "axios";
const url = "http://localhost:3000/peliculas";

export const moviesApiService = {
  create(movie) {
    axios.post(url, movie);
  },
  deleteById(id) {
    axios.delete(url + `/${id}`);
  },
  fetchAll() {
    const data = axios.get(url).then((res) => res.data);
    return data;
  },
  update(movie) {
    axios.patch(url + `/${movie.id}`, movie);
  },
};
