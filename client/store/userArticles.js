import axios from 'axios';

//Action Types
const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
const GET_ARTICLES_BY_CATEGORY = 'GET_ARTICLES_BY_CATEGORY';
const GET_ARTICLES_BY_KEYWORD =
'GET_ARTICLES_BY_KEYWORD'

//Action Creators
export function getTopArticles(articles) {
    return {type: GET_ALL_ARTICLES, articles}
}

export function getArticlesByCategory(articlesByCategory) {
    return {type: GET_ARTICLES_BY_CATEGORY, articlesByCategory}
}

export function getArticlesByKeyword(articlesByKeyword) {
    return {type: GET_ARTICLES_BY_KEYWORD, articlesByKeyword}
}

//Helper Functions
const newsByCategory = (category, country) => {
    return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=b2d066ad12f9498a978d5ca82f692a55`
}

const newsByKeyword = (keyword) => {
    return `https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=b2d066ad12f9498a978d5ca82f692a55`
}

const newsByCountry = (country) => {
    return `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=b2d066ad12f9498a978d5ca82f692a55`
}

//Thunks
export const fetchArticlesByCategory = (category, country) => {
    return dispatch => {
        axios.get(newsByCategory(category, country))
        .then(response => response.data)
        .then(data => dispatch(getArticlesByCategory(data.articles)))
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

export const fetchAllArticles = (country) => {
    return dispatch => {
        axios.get(newsByCountry(country))
            .then(response => response.data)
            .then(data => dispatch(getTopArticles(data.articles)))
            .catch(console.error)
    }
}

//Reducer
export function newsReducer(articles = [], action) {
    switch (action.type) {
        case GET_ALL_ARTICLES:
            articles = action.articles
            return articles
        default:
            return articles
    }
}

export function articlesByCatReducer(articlesByCategory = [], action) {
    switch (action.type) {
        case GET_ARTICLES_BY_CATEGORY:
            return action.articlesByCategory
        default:
            return articlesByCategory
    }
}

export function articlesByKeyReducer(articlesByKeyword = [], action) {
    switch (action.type) {
        case GET_ARTICLES_BY_KEYWORD:
            return action.articlesByKeyword
        default:
            return articlesByKeyword
    }
}
