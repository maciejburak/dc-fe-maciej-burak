import { Character, State } from "@/types";
import Vue from "vue";
import Vuex, { Commit } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: [],
  },
  mutations: {
    newFav: function (state: State, payload: Character) {
      state.favourites.push(payload);
    },
    removeFromFav: function (state: State, payload: Character) {
      state.favourites = state.favourites.filter(
        (character) => character.id !== payload.id
      );
    },
  },
  actions: {
    addToFav({ commit }: { commit: Commit }, payload: Character) {
      commit("newFav", payload);
    },
    deleteFromFav({ commit }: { commit: Commit }, payload: Character) {
      commit("removeFromFav", payload);
    },
  },
});
