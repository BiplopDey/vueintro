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
    return axios.get(url).then((res) => res.data);
  },
  update(movie) {
    axios.patch(url + `/${movie.id}`, movie);
  },
};
