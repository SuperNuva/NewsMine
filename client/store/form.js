import axios from 'axios'

//action types
const SET_CHOICES = 'SET_CHOICE';
const GET_CHOICES = 'GET_CHOICES';

//action creators
export function setChoices(choices) {
  return {type: SET_CHOICES, choices}
}

export function getChoices(choices) {
  return {type: GET_CHOICES, choices}
}

//thunks

export const fetchChoices = (userId) => {
  return dispatch => {
    axios.get(`/api/choices/users/${userId}`)
      .then(res => res.data)
      .then(data => dispatch(getChoices(data)))
      .catch(console.error)
  }
}

export const addChoices = (choices, props) => {
  return dispatch => {
    axios.post(`/api/choices/users/${props.user.id}`, choices)
      .then(res => res.data)
      .then(data => {
        dispatch(setChoices(data));
        alert('Your choices are saved successfully!');
        props.history.push('/home')
      })
  }
}

//reducer
export function choiceReducer(state = {country: '', categories: [], keywords: [], userdID: ''}, action) {
  switch (action.type) {
      case GET_CHOICES:
          return action.choices
      case SET_CHOICES:
          return {...state, country: action.choices.country, categories: action.choices.categories, keywords: action.choices.keywords, userdID: action.choices.userID}
      default:
          return state
  }
}
