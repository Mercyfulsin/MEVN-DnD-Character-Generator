<template>
  <div class="wrapper">
    <div class="stat-view">
      <div>
        <div class="absolute_center">
          <a class="stat-name">HP:</a>
          <a>{{information.hit_die}} + Con Mod</a>
        </div>
      </div>
      <div class="absolute_center">
        <a class="stat-name">Saving Throws:</a>
        <a v-for="(throws,index) in information.saving_throws" :key="index">{{throws.name}}</a>
      </div>
      <div class="absolute_center">
        <a
          class="stat-name"
          v-if="information.proficiency_choices[0]"
        >Proficiency Choices (Pick {{information.proficiency_choices[0].choose}}):</a>
        <a v-for="(choices,index) in information.proficiency_choices[0].from" :key="index+6*5">
          <br />
          {{choices.name}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// Import axios for API calls
import axios from "axios";

export default {
  // Expect characters array from parent
  name: "StatView",
  props: {
    information: Array
  },
  methods: {
    // This will trigger an event so the parent can re-submit the current list of characters
    reload_request: function() {
      this.$emit("reload");
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
  color: green;
  margin-left: 10px;
  font-size: 12px;
}
.wrapper {
  text-align: center;
}
.absolute_center {
  text-align: center;
  vertical-align: center;
  justify-content: center;
}
.stat-name {
  font-weight: bolder;
  font-size: 1.5rem;
  color: yellow;
}
.stat-view {
  background-color: black;
  border-width: 2px;
  border-style: solid;
  border-color: yellow;
  display: inline-block;
  text-align: left;
  align-content: center;
  width: 75vw;
}
</style>
