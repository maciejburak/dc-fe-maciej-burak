export interface Character {
  created: string;
  episode: [];
  gender: string;
  id: number;
  image: string;
  name: string;
  species: string;
  status: string;
  type: string;
  url: string;
}
export interface State {
  favourites: Array<Character>;
}
