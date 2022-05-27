const userLikesReducer = (state = { memoriesLiked: [] }, action) => {
   switch (action.type) {
      case 'ADD_MEMORY_LIKED': return { ...state, memoriesLiked: [...state.memoriesLiked, action.memoryId] };
      case 'SET_MEMORIES_LIKED': return { ...state, memoriesLiked: action.memoryIds };
      case 'TOGGLE_MEMORY_LIKE': {
         const exists = !!state.memoriesLiked.find(memoryId => memoryId === action.memoryId);

         const memoriesLiked = exists
            ? state.memoriesLiked.filter(memoryId => memoryId !== action.memoryId)
            : [...state.memoriesLiked, action.memoryId];

         return { ...state, memoriesLiked }
      };
    default: return state
   }
}

export default  userLikesReducer;