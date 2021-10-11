const MOVIE = "potatoes/MOVIE";
const TV = "potatoes/TV";

export const moviePotatoes = (moviePotatoList) => ({
  type: MOVIE,
  moviePotatoList,
});
export const tvPotatoes = (tvPotatoList) => ({ type: TV, tvPotatoList });

const initialState = {
  moviePotatoList: "",
  tvPotatoList: "",
};

function catchPotato(state = initialState, action) {
  switch (action.type) {
    case MOVIE:
      return {
        ...state,
        moviePotatoList: action.moviePotatoList,
      };
    case TV:
      return {
        ...state,
        tvPotatoList: action.tvPotatoList,
      };
    default:
      return state;
  }
}

export default catchPotato;
