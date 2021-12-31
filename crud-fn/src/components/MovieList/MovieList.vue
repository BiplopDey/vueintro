<template>
  <div>
    <h1>
      <div v-if="isLoading">Is loading</div>
      <ul v-else>
        <li v-for="(movie, index) in movies" :key="index">
          {{ index }}-{{ movie.nombre }}
          <button @click="deleteMovie(index)">delete</button>
          <button @click="editMovie(index)">edit</button>
        </li>
      </ul>
      <input type="text" v-model="newMovie.nombre" />
      <button v-if="isEditing" @click="update">Update</button>
      <button v-else @click="addMovie">Add</button>
      <p>{{ newMovie.nombre }}</p>
    </h1>
  </div>
</template>

<script>
import axios from "axios";
import { moviesApiService } from "@/services/moviesApiService.js";
export default {
  data() {
    return {
      isEditing: false,
      isLoading: true,
      newMovie: {},
      movies: [],
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    addMovie() {
      if (!this.newMovie.nombre) return;
      moviesApiService.create(this.newMovie);
      this.getAll();
    },
    deleteMovie(index) {
      const id = this.movies[index].id;
      moviesApiService.deleteById(id);
      this.getAll();
    },
    editMovie(index) {
      this.newMovie = this.movies[index];
      this.isEditing = true;
    },
    update() {
      moviesApiService.update(this.newMovie);
      this.isEditing = false;
      this.getAll();
    },
    getAll() {
      this.isLoading = true;
      // this.movies = await moviesApiService.fetchAll();
      // this.isLoading = false;

      axios.get("http://localhost:3000/peliculas")
      .then((res) => {
        this.movies = res.data; 
      })
      .then(() => {
        this.isLoading = false;
      });
       
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>
