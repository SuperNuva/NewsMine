import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticlesByCategory, fetchChoices, fetchArticlesByKeyword } from '../store/userArticles'
import axios from "axios";
import { UserNav } from "./userNav";
import { Link } from "react-router-dom";

class UserArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            categories: [],
            keywords: []
        }
    }
    componentDidMount() {
        this.getChoices();
    }
    

    getChoices() {
        axios.get(`/api/choices/users/${this.props.user.id}`)
            .then(res => res.data)
            .then(choices => this.setState({
                country: choices.country,
                categories: choices.categories,
                keywords: choices.keywords
            })
        )
    }

    render() {
        console.log("PROPS!!", this.props)
        console.log("STATE", this.state)
        

        return (
            <div>
            {
                this.state.categories.includes('health') && <button onClick={() => this.props.getArticlesByCategory('health', this.state.country)}>Get Top Headlines in health</button>
            }
            {
                this.state.categories.includes('entertainment') && <button onClick={() => this.props.getArticlesByCategory('entertainment', this.state.country)}>Get Top Headlines in entertainment</button>
            }
            {
                this.state.categories.includes('technology') && <button onClick={() => this.props.getArticlesByCategory('technology', this.state.country)}>Get Top Headlines in technology</button>
            }
            {
                this.state.categories.includes('science') && <button onClick={() => this.props.getArticlesByCategory('science', this.state.country)}>Get Top Headlines in science</button>
            }
            {
                this.state.categories.includes('sports') && <button onClick={() => this.props.getArticlesByCategory('sports', this.state.country)}>Get Top Headlines in sports</button>
            }
            {
                this.state.categories.includes('business') && <button onClick={() => this.props.getArticlesByCategory('business', this.state.country)}>Get Top Headlines in business</button>
            }
            
                {
                    this.props.articlesByCategory.map(article => {
                        return(
                            <div key={article.url}>
                            {
                                !article.urlToImage
                                ? <img src='https://s3.ap-south-1.amazonaws.com/iquppo-image-upload/assets/uploads/1515132916591/QW_BB_2002_1_3.png'/>
                                : <img src={article.urlToImage}/>
                            }
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            {
                                !article.author
                                ? <h5>{article.source.name}</h5>
                                : <h5>{article.author}, {article.source.name}</h5>
                            }
                            <a href={article.url}><h4>Read full article...</h4></a>
                        </div>
                        )
                    })
                }
                <hr />
                {
                    this.state.keywords[0] && <button onClick={() => this.props.getArticlesByKeyword(this.state.keywords[0])}>Get Top Headlines about {this.state.keywords[0]}</button>
                } 
                {
                    this.props.articlesByKeyword.map(article => {
                        return(
                            <div key={article.url}>
                            {
                                !article.urlToImage
                                ? <img src='https://s3.ap-south-1.amazonaws.com/iquppo-image-upload/assets/uploads/1515132916591/QW_BB_2002_1_3.png'/>
                                : <img src={article.urlToImage}/>
                            }
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            {
                                !article.author
                                ? <h5>{article.source.name}</h5>
                                : <h5>{article.author}, {article.source.name}</h5>
                            }
                            <a href={article.url}><h4>Read full article...</h4></a>
                        </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapState = state => {
    return {
        articlesByCategory: state.articlesByCategory,
        articlesByKeyword: state.articlesByKeyword,
        user: state.user
    }
}

const mapDispatch = dispatch => {
    return {
        getChoices: () => {
            dispatch(fetchChoices())
        },
        getArticlesByCategory: (category, country) => {
            dispatch(fetchArticlesByCategory(category, country))
        },
        getArticlesByKeyword: (keyword) => {
            dispatch(fetchArticlesByKeyword(keyword))
        }
    }
}

export default connect(mapState, mapDispatch)(UserArticles)