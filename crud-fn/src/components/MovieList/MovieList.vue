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
    this.getAll();
  },
  methods: {
    addMovie() {
      if (!this.newMovie.nombre) return;
      moviesApiService.create(this.newMovie);
      this.getAll();
      // this.movies.push(this.newMovie);// //this.movies = [...this.movies, this.newMovie];
      // this.newMovie = {}; // basicament estoy asignandole otra direccion, ie hacer un malloc
    },
    deleteMovie(index) {
      const id = this.movies[index].id;
      moviesApiService.deleteById(id);
      // this.movies.splice(index, 1);
      this.getAll();
    },
    editMovie(index) {
      this.newMovie = this.movies[index]; // aqui el apuntador newMovie guarda la direccion de la peli
      this.isEditing = true;
    },
    update() {
      moviesApiService.update(this.newMovie);
      //console.log(this.newMovie);
      // this.newMovie = {}; // asignar otra direccion para que no apunte al elemento que hemos editado del movie
      this.isEditing = false;
      this.getAll();
    },
    async getAll() {
      this.movies = await moviesApiService.fetchAll();
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>
