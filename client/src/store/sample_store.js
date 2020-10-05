// const GET_SAMPLE = 'sample/all';

// export const loadsample = (sample) => { 
//     return {
//         type: GET_SAMPLE,
//         sample: sample
//     }
// }


// export const getSample = () => {
//     return async dispatch => {
//         const res = await fetch('/api/sample_prefix/sample', {
//         method: "get"
//       })
//     res.data = await res.json()
//     if(res.ok){
//       dispatch(loadSample(res.data.sample))
//     }
//     return res;
//   }
// }


// export default function categoriesReducer(state={}, action) {
//     switch (action.type) {
//         case GET_SAMPLE:
//             return {...state, list: action.sample};
//         default:
//             return state;
//     }
// }