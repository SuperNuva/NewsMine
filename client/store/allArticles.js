import axios from 'axios';
// import newsapi from 'newsapi';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('b2d066ad12f9498a978d5ca82f692a55');

//Action Types
const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';


//Action Creators
export function getTopArticles(articles) {
    return {type: GET_ALL_ARTICLES, articles}
}

//Helper Function
const newsByCountry = (country) => {
    return `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=b2d066ad12f9498a978d5ca82f692a55`
}

// const newsByCategory = (country, category) => {
//     return 
//     `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b2d066ad12f9498a978d5ca82f692a55`
// }

//Thunks
export const fetchAllArticles = () => {
    return dispatch => {
        axios.get(newsByCountry('us'))
            .then(response => 
                {
                    console.log("response data!!", response.data)
                    return response.data
                })
            .then(data => {
                    console.log("Articles!!", data.articles )
                return dispatch(getTopArticles(data.articles))
            })
            .catch(console.error)
    }
}

//Reducer
export function newsReducer(articles=[], action) {
    switch(action.type) {
        case GET_ALL_ARTICLES:
            articles = action.articles
            return articles
        default:
            return articles
    }
}