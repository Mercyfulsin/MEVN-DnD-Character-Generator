<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <br />

    <!-- On click change the variable toggle and call getCharacters function -->
    <button v-on:click="toggle='character-display'; getCharacters()">View all characters</button>
    <!-- On click change the variable toggle -->
    <button v-on:click="toggle='character-generator'">Create a character</button>
    <!-- Conditional, depending on toggle value, 'show' different components -->
    <!-- CharacterDisplay: Pass it the characters variable as a prop and listen for a 'reload' event where you then call getCharacters function -->
    <CharacterDisplay v-show="toggle==='character-display'" :characters="characters" @reload="getCharacters" />
    <CharacterGenerator v-show="toggle==='character-generator'" />
  </div>
</template>

<script>
import axios from 'axios';
import CharacterDisplay from "./components/CharacterDisplay.vue";
import CharacterGenerator from "./components/CharaterGenerator.vue";

export default {
  name: "App",
  components: {
    CharacterDisplay,
    CharacterGenerator
  },
  data: function() {
    return {
      toggle: "character-viewer",
      characters: null
    }
  },
  methods: {
    getCharacters: function() {
      axios
        .get("http://localhost:3000/characters")
        .then(response => (this.characters = response.data));
    }
  },
  mounted: function() {
    this.getCharacters();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5c97d1;
  margin-top: 60px;
}
</style>
