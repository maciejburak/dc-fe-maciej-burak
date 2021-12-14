<template>
  <div id="app">
    <SearchBar @searchedProperty="(payload) => (searchedProperty = payload)" />
    <Table :searchedProperty="searchedProperty"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchBar from "./components/SearchBar/SearchBar.vue";
import Table from './components/Table/Table.vue'

@Component({
  components: {
    SearchBar,
    Table,
  },
})
export default class App extends Vue {
    searchedProperty = {};
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
