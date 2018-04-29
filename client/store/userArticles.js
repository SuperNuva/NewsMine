import axios from 'axios';

//Action Types
const GET_ARTICLES_BY_CATEGORY = 'GET_ARTICLES_BY_CATEGORY';
const GET_ARTICLES_BY_KEYWORD =
'GET_ARTICLES_BY_KEYWORD'

//Action Creators
export function getArticlesByCategory(articlesByCategory) {
    return {type: GET_ARTICLES_BY_CATEGORY, articlesByCategory}
}

export function getArticlesByKeyword(articlesByKeyword) {
    return {type: GET_ARTICLES_BY_KEYWORD, articlesByKeyword}
}

//Helper Function
const newsByCategory = (category, country) => {
    return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b2d066ad12f9498a978d5ca82f692a55`
}

const newsByKeyword = (keyword) => {
    return `https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=b2d066ad12f9498a978d5ca82f692a55`
}

//Thunks
export const fetchArticlesByCategory = (category, country) => {
    return dispatch => {
        axios.get(newsByCategory(category, country))
        .then(response => {
            console.log("ALL_ARTICLES_BY_CATEGORY", response.data)
            return response.data
            })
        .then(data => {
            console.log("ARTICLES_ARRAY!!", data.articles)
            return dispatch(getArticlesByCategory(data.articles))
        })
        .catch(console.error)
        
    }
}

export const fetchArticlesByKeyword = (keyword) => {
    return dispatch => {
        axios.get(newsByKeyword(keyword))
        .then(res => res.data)
        .then(data => dispatch(getArticlesByKeyword(data.articles)))
        .catch(console.error)
    }
}

//Reducer
export function articlesByCatReducer(articlesByCategory=[], action) {
    switch(action.type) {
        case GET_ARTICLES_BY_CATEGORY:
            return action.articlesByCategory
        default:
            return articlesByCategory
    }
}

export function articlesByKeyReducer(articlesByKeyword=[], action) {
    switch(action.type) {
        case GET_ARTICLES_BY_KEYWORD:
            return action.articlesByKeyword
        default:
            return articlesByKeyword
    }
}