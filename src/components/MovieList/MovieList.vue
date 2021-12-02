<template>
  <div>
    <h1>
      <ul>
        <li v-for="(movie, index) in movies" :key="index">
          {{ index }}-{{ movie.title }}
          <button @click="deleteMovie(index)">delete</button>
          <button @click="editMovie(index)">edit</button>
        </li>
      </ul>
      <input type="text" v-model="newMovie.title" />
      <button v-if="isEditing" @click="finishEditing">Edit</button>
      <button v-else @click="addMovie">Add</button>
      <p>{{ newMovie.title }}</p>
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      newMovie: {},
      movies: [{ title: "Foo" }, { title: "Bar" }],
    };
  },
  methods: {
    addMovie() {
      if (!this.newMovie.title) return;
      this.movies.push(this.newMovie);
      this.newMovie = {}; // basicament estoy asignandole otra direccion, ie hacer un malloc
      //this.movies = [...this.movies, this.newMovie];
    },
    deleteMovie(index) {
      this.movies.splice(index, 1);
    },
    editMovie(index) {
      this.newMovie = this.movies[index];
      this.isEditing = true;
    },
    finishEditing() {
      this.newMovie = {};
      this.isEditing = false;
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>
