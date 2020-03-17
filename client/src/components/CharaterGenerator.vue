<template>
  <div class="character-generator">
    <h1>Character Generator</h1>
    <label for="character-name">Character Name:</label>
    <input type="text" id="character-name" v-model="name" placeholder="Enter a name" />
    <br />
    <br />
    <label for="job-list">Character Class:</label>
    <select id="job-list" v-model="job" @change="onChange($event)">
      <option value="Barbarian">Barbarian</option>
      <option value="Bard">Bard</option>
      <option value="Cleric">Cleric</option>
      <option value="Druid">Druid</option>
      <option value="Fighter">Fighter</option>
      <option value="Monk">Monk</option>
      <option value="Paladin">Paladin</option>
      <option value="Ranger">Ranger</option>
      <option value="Rogue">Rogue</option>
      <option value="Sorcerer">Sorcerer</option>
      <option value="Warlock">Warlock</option>
      <option value="Wizard">Wizard</option>
    </select>
    <h4>Name:</h4> <p>{{name}}</p>
    <h4>Class:</h4> <p>{{job}}</p>
    <div id="stats" v-if="display">
      <h4>HP:</h4> <p>{{information.hit_die}} + Con Mod</p>
      <h4>Saving Throws:</h4>
      <p v-for="(throws,index) in information.saving_throws" :key="index">
        {{throws.name}}
        <br />
      </p>
      <h4
        v-if="information.proficiency_choices[0]"
      >Proficiency Choices (Pick {{information.proficiency_choices[0].choose}}):</h4>
      <p v-for="(choices,index) in information.proficiency_choices[0].from" :key='index+6*5'>{{choices.name}}<br></p>
    </div>
    <button v-on:click="postCharacter">Create Character</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CharacterGenerator",
  data: function() {
    return {
      display: false,
      name: "",
      job: "",
      information: {}
    };
  },
  methods: {
    postCharacter: function() {
      axios
        .post("http://localhost:3000/characters", {
          name: this.name,
          job: this.job
        })
        .then(reply => {
          console.log("Success! Created: " + reply);
          this.name = "";
          this.job = "";
          this.display = false;
        });
    },
    onChange(event) {
      console.log(event.target.value);
      axios
        .get(
          "https://www.dnd5eapi.co/api/classes/" +
            event.target.value.toLowerCase()
        )
        .then(reply => {
          this.display = true;
          this.information = reply.data;
          console.log(reply.data);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
