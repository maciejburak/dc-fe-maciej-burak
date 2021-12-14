<template>
  <div class="table">
    <div class="carts">
      <button
        style="width: 125px; margin-right: 20px"
        :class="{ active: activeCart === 'AllCharacters' }"
        class="cart-btn"
        @click="activeCart = 'AllCharacters'"
      >
        All Characters
      </button>
      <button
        :class="{ active: activeCart === 'Favourites' }"
        class="cart-btn"
        @click="activeCart = 'Favourites'"
      >
        Favourites
      </button>
    </div>
    <TableHeader />
    <div style="width: 100vw" v-if="characters.length === 0">
      <h1>Didn't find results for this phrase</h1>
    </div>
    <TableBody v-else :characters="characters" />
    <div class="page-container" v-if="pages !== 0 && activeCart === 'AllCharacters' ">
      <button class="arrow-button" @click="changePage('-')">
        <span class="material-icons"> arrow_left </span>
      </button>
      <div v-if="allPages">
        <button
          v-for="page of pages"
          v-bind:key="page"
          @click="prepareExactCharacters(`?page=${page}`)"
          class="page-button"
          :class="{
            activePage:
              apiCode.split('=')[1] == page ||
              apiCode.split('=')[1].replace('&name', '') == page,
          }"
        >
          {{ page }}
        </button>
      </div>
      <div v-else>
        <button
          v-for="page of [1, 2, 3, 4]"
          v-bind:key="page"
          @click="prepareExactCharacters(`?page=${page}`)"
          class="page-button"
          :class="{
            activePage:
              apiCode.split('=')[1] == page ||
              apiCode.split('=')[1].replace('&name', '') == page,
          }"
        >
          {{ page }}
        </button>
        <button class="page-button" @click="allPages = true">...</button>
        <button
          @click="prepareExactCharacters(`?page=${pages}`)"
          class="page-button"
          :class="{
            activePage:
              apiCode.split('=')[1] == pages ||
              apiCode.split('=')[1].replace('&name', '') == pages,
          }"
        >
          {{ pages }}
        </button>
      </div>
      <button class="arrow-button" @click="changePage('+')">
        <span class="material-icons"> arrow_right </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { Character } from "../../types";
import TableHeader from "../Table/TableHeader.vue";
import TableBody from "../Table/TableBody.vue";

@Component({
  components: {
    TableHeader,
    TableBody,
  },
})
export default class Table extends Vue {
  @Prop() searchedProperty!: { phrase: string; type: string };
  charactersFromEpisode: Array<Character> = [];
  characters: Array<Character> = [];
  activeCart = "AllCharacters";
  pages = 0;
  apiCode = `https://rickandmortyapi.com/api/character?page=1`;
  exactNumberOfCharacters = 0;
  allPages = false;
  prepareExactCharacters(page?: string): void {
    if (
      this.searchedProperty.phrase === "" ||
      this.searchedProperty.phrase === undefined
    ) {
      this.apiCode = `https://rickandmortyapi.com/api/character${page}`;
    }
    if (
      this.searchedProperty.type === "Name" &&
      this.searchedProperty.phrase !== ""
    ) {
      this.apiCode = `https://rickandmortyapi.com/api/character${page}${
        "&name=" + this.searchedProperty.phrase
      }`;
    }
  }
  prepareExactCharacterById(): void {
    if (this.searchedProperty.phrase !== "") {
      this.apiCode = `https://rickandmortyapi.com/api/character${
        "/" + this.searchedProperty.phrase
      }`;
      this.pages = 0;
    } else if (this.searchedProperty.phrase === "") {
      this.apiCode = `https://rickandmortyapi.com/api/character?page=1`;
    }
  }
  prepareExactCharacterByEpisode(): void {
    if (this.searchedProperty.phrase !== "") {
      this.apiCode = `https://rickandmortyapi.com/api/episode${
        "/" + this.searchedProperty.phrase
      }`;
    } else if (this.searchedProperty.phrase === "") {
      this.apiCode = `https://rickandmortyapi.com/api/character?page=1`;
    }
  }
  getCharactersFromEpisode(episodeCharacters: string[]): void {
    for (let episodeCharacter of episodeCharacters) {
      fetch(episodeCharacter)
        .then((response) => response.json())
        .then((characterData: Character) => {
          this.charactersFromEpisode.push(characterData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  changePage(property: string): void {
    const actualPage = this.apiCode.split("=")[1];
    if (this.searchedProperty.type === "Name") {
      if (property === "+") {
        if (parseInt(actualPage.replace("&name", "")) !== this.pages)
          this.apiCode =
            this.apiCode.split("=")[0] +
            "=" +
            (parseInt(actualPage.replace("&name", "")) + 1) +
            "&name=" +
            this.apiCode.split("=")[2];
      } else {
        if (parseInt(actualPage.replace("&name", "")) !== 1)
          this.apiCode =
            this.apiCode.split("=")[0] +
            "=" +
            (parseInt(actualPage.replace("&name", "")) - 1) +
            "&name=" +
            this.apiCode.split("=")[2];
      }
    } else {
      if (property === "+") {
        if (parseInt(actualPage) !== this.pages)
          this.apiCode =
            this.apiCode.split("=")[0] + "=" + (parseInt(actualPage) + 1);
      } else {
        if (parseInt(actualPage) !== 1)
          this.apiCode =
            this.apiCode.split("=")[0] + "=" + (parseInt(actualPage) - 1);
      }
    }
  }

  getData(): void {
    fetch(this.apiCode)
      .then((response) => response.json())
      .then((currentData) => {
        if (
          this.searchedProperty.type === "Name" ||
          this.searchedProperty.type === undefined
        ) {
          this.characters = currentData.results;
          this.pages = currentData.info.pages;
        } else if (this.searchedProperty.type === "Identifier") {
          this.characters = [currentData];
          if (this.searchedProperty.phrase === "") {
            this.pages = currentData.info.pages;
            this.characters = currentData.results;
          }
        } else if (
          this.searchedProperty.type === "Episode" &&
          this.searchedProperty.phrase !== ""
        ) {
          this.getCharactersFromEpisode(currentData.characters);
          this.characters = this.charactersFromEpisode;
          this.pages = 0;
        } else if (
          this.searchedProperty.type === "Episode" &&
          this.searchedProperty.phrase === ""
        ) {
          this.characters = currentData.results;
          this.pages = currentData.info.pages;
        }
        if (
          this.apiCode === "https://rickandmortyapi.com/api/character?page=1"
        ) {
          this.exactNumberOfCharacters = currentData.info.count;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  @Watch("searchedProperty")
  onSearchedProperty() {
    this.allPages = false;
    if (this.searchedProperty.type === "Identifier")
      this.prepareExactCharacterById();
    else if (this.searchedProperty.type === "Name")
      this.apiCode =
        this.apiCode = `https://rickandmortyapi.com/api/character?page=1${
          "&name=" + this.searchedProperty.phrase
        }`;
    else if (this.searchedProperty.type === "Episode") {
      this.prepareExactCharacterByEpisode();
    }
  }
  @Watch("apiCode")
  onApiCodeChanged() {
    this.getData();
  }
  @Watch("activeCart")
  onActiveCartWillChange() {
    if (this.activeCart === "Favourites") {
      this.characters = this.$store.state.favourites;
      this.pages = Math.ceil(this.$store.state.favourites.length / 20);
    } else this.getData();
  }
  mounted() {
    this.getData();
  }
}
</script>

<style scoped>
.table {
  font-family: Poppins;
  position: absolute;
  max-width: 1920px;
  left: 0px;
  top: 198px;
  max-width: 70vw;
}
.page-container {
  display: flex;
  justify-content: flex-start;
  width: calc(100vw - 80px);
  margin-left: 80px;
  margin-bottom: 76px;
  margin-top: 76px;
}
.page-button {
  width: 40px;
  height: 40px;
  border-color: #a9b1bd;
  color: #a9b1bd;
  background: inherit;
  margin-right: 4px;
  margin-left: 4px;
  border-radius: 5px;
}
.arrow-button {
  border-color: #a9b1bd;
  background: white;
  color: #11b0c8;
  width: 40px;
  height: 40px;
  padding: 0;
  margin-right: 4px;
  margin-left: 4px;
  border-radius: 5px;
}
.activePage {
  background: #11b0c8;
  color: white;
}
.carts {
  display: flex;
  margin-left: 120px;
  margin-bottom: 20px;
}
.cart-btn {
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  background: inherit;
  border: none;
  height: 24px;
  color: #a9b1bd;
  cursor: pointer;
}
.active {
  color: #11b0c8;
  border-bottom: solid 4px #11b0c8;
}
@media(max-width: 1100px){
  .table{
    max-width: 1100px;
    overflow-x: scroll;
  }
  .carts{
    margin-left: 40px;
  }
  .page-container{
    justify-content: center;
    margin-left:20px;
  }
}
@media(max-width: 950px){
  .page-container{
    width:100vw;
  }
}
@media(max-width: 850px){
  .page-container{
    width:120vw;
  }
}
@media(max-width: 700px){
  .page-container{
    width:140vw;
  }
}
@media(max-width: 570px){
  .page-container{
    width:180vw;
  }
}
@media(max-width: 440px){
  .page-container{
    width:220vw;
  }
}
</style>
