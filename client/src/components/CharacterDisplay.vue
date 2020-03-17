<template>
  <div class="character-display">
    <h1>Character Display</h1>
    <!-- Create 'p' tags for each character in characters. Will display everything returned by the DB -->
    <p v-for="(character, index) in characters" v-bind:key="index">
      {{character.name}} is a {{character.job}}!
      <!-- Create anchor tags to delete each item by passing the unique id into a function on click -->
      <a
        v-bind:id="character._id"
        v-on:click="char_delete(character._id)"
        href="#"
      >Delete</a>
    </p>
  </div>
</template>

<script>
// Import axios for API calls
import axios from "axios";

export default {
  // Expect characters array from parent
  name: "CharacterDisplay",
  props: {
    characters: Array
  },
  methods: {
    // This will trigger an event so the parent can re-submit the current list of characters
    reload_request: function(){
      this.$emit('reload');
    },
    // We attempt to delete a character from DB and if successful, resulsts in calling a reload request
    char_delete: function(id) {
      axios
        .delete("http://localhost:3000/characters", { data: { _id: id } })
        .then(reply => {
          reply.data.ok ? this.reload_request() : console.log("What do i do?");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: purple;
}
</style>
