<template>
  <div>
    <h1>
      <ul>
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
      newMovie: {},
      movies: [],
    };
  },
  mounted() {
    this.fetchAll();
  },
  methods: {
    addMovie() {
      if (!this.newMovie.nombre) return;
      moviesApiService.create(this.newMovie);
      this.fetchAll();
      // this.movies.push(this.newMovie);// //this.movies = [...this.movies, this.newMovie];
      this.newMovie = {}; // basicament estoy asignandole otra direccion, ie hacer un malloc
    },
    deleteMovie(index) {
      const id = this.movies[index].id;
      moviesApiService.deleteById(id);
      // this.movies.splice(index, 1);
      this.fetchAll();
    },
    editMovie(index) {
      this.newMovie = this.movies[index]; // aqui el apuntador newMovie guarda la direccion de la peli
      this.isEditing = true;
    },
    update() {
      this.newMovie = {}; // asignar otra direccion para que no apunte al elemento que hemos editado del movie
      this.isEditing = false;
    },
    fetchAll() {
      axios
        .get("http://localhost:3000/peliculas")
        .then((res) => (this.movies = res.data));
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>
