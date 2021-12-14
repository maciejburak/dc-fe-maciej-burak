<template>
  <div class="searchBarContainer">
    <img
      src="../SearchBar/rick_and_morty.png"
      alt="Rick and Morty Image"
      class="project-logo"
    />
    <div class="searchBar">
      <p class="searchBar-text">Search by</p>
      <p class="searchBar-select" @click="options = !options">
        {{ selectedProperty }}
        <span class="material-icons"> keyboard_arrow_down </span>
      </p>
      <div v-if="options" class="options">
        <p
          class="searchBar-select-option"
          @click="(selectedProperty = 'Name'), (options = false)"
        >
          Name
        </p>
        <p
          class="searchBar-select-option"
          @click="(selectedProperty = 'Identifier'), (options = false)"
        >
          Identifier
        </p>
        <p
          class="searchBar-select-option"
          @click="(selectedProperty = 'Episode'), (options = false)"
        >
          Episode
        </p>
      </div>
      <input type="text" v-model="searchedPhrase" class="searchBar-input" />
      <button @click="search" class="searchBar-button">
        <span class="material-icons"> search </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SearchBar extends Vue {
  options = false;
  selectedProperty = "Name";
  searchedPhrase = "";
  search() {
    if (
      this.searchedPhrase.match(/^[a-zA-Z]+$/) &&
      this.selectedProperty === "Identifier"
    ) {
      alert("When you search identifier you need to pass number");
      this.searchedPhrase = "";
    } else if (
      this.searchedPhrase.match(/^[a-zA-Z]+$/) &&
      this.selectedProperty === "Episode"
    ) {
      alert("When you search episode you need to pass number");
      this.searchedPhrase = "";
    } else {
      this.$emit("searchedProperty", {
        phrase: this.searchedPhrase,
        type: this.selectedProperty,
      });
    }
  }
}
</script>

<style>
.searchBarContainer {
  display: flex;
  padding-left: 80px;
  align-items: center;
  font-family: Poppins;
}
.searchBar {
  margin-left: 88px;
  width: 505px;
  height: 50px;
  display: flex;
  color: #a9b1bd;
  border: 3px solid #a9b1bd;
  border-radius: 5px;
  font-size: 16px;
  position: relative;
}
.project-logo {
  width: 240px;
  height: 70px;
}
.searchBar-text {
  margin: 0;
  height: 100%;
  width: 125px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.searchBar-select {
  border: none;
  border-left: 3px solid #a9b1bd;
  height: 100%;
  font-family: Poppins;
  width: 126px;
  padding-left: 16px;
  margin-right: 13px;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
}
.options {
  position: absolute;
  left: 105px;
  top: 50px;
  border: 3px solid #a9b1bd;
  border-top: none;
  height: 170px;
  width: 132px;
  z-index: 99;
  background:white;
}
.searchBar-select-option {
  width: 132px;
  border-top: 3px solid #a9b1bd;
  margin: 0;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.searchBar-select:focus {
  outline: none;
}
.searchBar-input {
  width: 255px;
  border: none;
  border-left: 3px solid #a9b1bd;
}
.searchBar-button {
  border: none;
  background: inherit;
  padding-right: 16px;
  color: #11b0c8;
  cursor: pointer;
}
.searchBar-input:focus {
  outline: none;
}
</style>
