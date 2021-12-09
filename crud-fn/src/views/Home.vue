<template>
  <div class="home">
    <MovieList />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MovieList from "../components/MovieList/MovieList.vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
    MovieList,
  },
};
</script>
