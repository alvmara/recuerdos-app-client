const memoriesReducer = (state = { memories: [], searchedMemories: null }, action) => {
   switch (action.type) {
      case 'ADD_MEMORY': return { ...state, memories: [action.memory, ...state.memories] };
      case 'SET_MEMORIES': return { ...state, memories: action.memories };
      case 'SET_SEARCHED_MEMORIES': return { ...state, searchedMemories: action.memories };
    default: return state
   }
}

export default  memoriesReducer;