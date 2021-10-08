const POPULAR = "popularity/POPULAR";
const PREDICABLE = "popularity/PREDICABLE";
const SIMILAR = "popularity/SIMILAR";

export const popular = (popularList) => ({ type: POPULAR, popularList });
export const predictable = (predictableList) => ({
  type: PREDICABLE,
  predictableList,
});
export const similar = (similarList) => ({ type: SIMILAR, similarList });

const initialState = {
  popularList: "",
  predictableList: "",
  similarList: "",
};

function catchOn(state = initialState, action) {
  switch (action.type) {
    case POPULAR:
      return {
        ...state,
        popularList: action.popularList,
      };
    case PREDICABLE:
      return {
        ...state,
        predictableList: action.predictableList,
      };
    case SIMILAR:
      return {
        ...state,
        similarList: action.similarList,
      };
    default:
      return state;
  }
}

export default catchOn;
