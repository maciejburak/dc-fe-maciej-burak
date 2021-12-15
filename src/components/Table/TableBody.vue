<template>
  <div class="tableBody">
    <ul
      class="table-values"
      v-for="character of characters"
      v-bind:key="makeId(character.id)"
    >
      <li class="value">
        <img
          :src="character.image"
          :alt="character.name"
          class="characterPhoto"
        />
      </li>
      <li class="value">{{ character.id }}</li>
      <li class="value">{{ character.name }}</li>
      <li class="value" v-if="character.gender === 'Female'">
        <span class="material-icons"> female </span> {{ character.gender }}
      </li>
      <li class="value" v-if="character.gender === 'Male'">
        <span class="material-icons"> male </span> {{ character.gender }}
      </li>
      <li class="value" v-if="character.gender === 'Genderless'">
        <span class="material-icons"> close </span> {{ character.gender }}
      </li>
      <li class="value" v-if="character.gender === 'unknown'">
        <span class="material-icons"> remove </span> {{ character.gender }}
      </li>
      <li class="value">{{ character.species }}</li>
      <li class="value">{{ getLastEpisode(character.episode) }}</li>
      <li class="value">
        <div
          :class="{ starActive: favouritesCharacters.includes(character.id) }"
          class="star-desactive"
          @click="addToFavourites(character)"
        >
          <span class="material-icons"> star </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Character } from "../../types";

@Component
export default class TableBody extends Vue {
  @Prop() characters!: Array<Character>;
  favouritesCharacters: number[] = [];

  getLastEpisode(episodesList: string[]): string | undefined {
    const lastEpisodeNumber = episodesList[episodesList.length - 1].slice(40);
    if (parseInt(lastEpisodeNumber) < 12 && parseInt(lastEpisodeNumber) < 10)
      return "S01E0" + lastEpisodeNumber;
    else if (
      parseInt(lastEpisodeNumber) < 12 &&
      parseInt(lastEpisodeNumber) > 9
    )
      return "S01E" + lastEpisodeNumber;
    else if (parseInt(lastEpisodeNumber) > 11) {
      return `S0${
        Math.floor((parseInt(lastEpisodeNumber) - 11) / 10 + 1) +
        ((parseInt(lastEpisodeNumber) - 11) % 10 !== 0
          ? "E0" + (parseInt(lastEpisodeNumber) % 10)
          : "E10")
      }`;
    }
  }
  addToFavourites(exactCharacter: Character): void {
    if (this.favouritesCharacters.includes(exactCharacter.id)) {
      this.$store.dispatch("deleteFromFav", exactCharacter);
      this.favouritesCharacters = this.favouritesCharacters.filter(
        (character) => character !== exactCharacter.id
      );
    } else {
      this.$store.dispatch("addToFav", exactCharacter);
      this.favouritesCharacters.push(exactCharacter.id);
    }
  }
  makeId(length: number): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
</script>

<style>
.tableBody {
  width: calc(100vw - 160px);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.table-values {
  font-family: Poppins;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  height: 76px;
  padding-left: 80px;
  padding-right: 80px;
  border-bottom: solid 1px #a9b1bd;
}
.value {
  color: #a9b1bd;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  width: 134px;
}
.characterPhoto {
  width: 43px;
  height: 68px;
}
.star-desactive {
  width: 36px;
  height: 36px;
  color: #11b0c8;
  border: 3px solid #11b0c8;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.starActive {
  color: white;
  background: #11b0c8;
}
@media (max-width: 1100px) {
  .tableBody {
    width: 1100px;
  }
  .table-values {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
