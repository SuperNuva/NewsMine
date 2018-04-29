import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticlesByCategory, fetchChoices, fetchArticlesByKeyword, fetchAllArticles } from '../store/userArticles'
import axios from "axios";
import { Link } from "react-router-dom";

class UserArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            categories: [],
            keywords: [],
            isCountryClicked: false,
            isCategoryClicked: false,
            isKeywordClicked: false,
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
                this.state.country && <button className="newsButton" onClick={() => {this.props.getTopArticles(this.state.country); this.setState({isCategoryClicked: false, isCountryClicked: true, isKeywordClicked: false})}}>Get Top Headlines in Your Country</button>
            }
            {
                this.state.categories.includes('health') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('health', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Health</button>
            }
            {
                this.state.categories.includes('entertainment') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('entertainment', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Entertainment</button>
            }
            {
                this.state.categories.includes('technology') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('technology', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Technology</button>
            }
            {
                this.state.categories.includes('science') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('science', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Science</button>
            }
            {
                this.state.categories.includes('sports') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('sports', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Sports</button>
            }
            {
                this.state.categories.includes('business') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('business', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Business</button>
            }
            {
                this.state.keywords[0] && <button className="newsButton" onClick={() => {this.props.getArticlesByKeyword(this.state.keywords[0]); this.setState({isCategoryClicked: false, isCountryClicked: false, isKeywordClicked: true})}}>Get Top Headlines about {this.state.keywords[0]}</button>
            } 
            
                {
                    this.state.isCountryClicked &&
                    this.props.articles.map(article => {
                        return (
                        <div className="articles" key={article.url}>
                            {
                                !article.urlToImage
                                ? <img src='https://s3.ap-south-1.amazonaws.com/iquppo-image-upload/assets/uploads/1515132916591/QW_BB_2002_1_3.png'/>
                                : <img src={article.urlToImage}/>
                            }
                            <h3 style={{color: 'maroon'}}>{article.title}, {article.source.name}</h3>
                            <p>{article.description}</p>
                            <a className="newsLink" href={article.url}><h4>Read full article...</h4></a>
                        </div>
                        )
                    })
                }
            
                {
                    this.state.isCategoryClicked &&
                    this.props.articlesByCategory.map(article => {
                        return(
                            <div className="articles" key={article.url}>
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
                            <a className="newsLink" href={article.url}><h4>Read full article...</h4></a>
                        </div>
                        )
                    })
                }
                
                {
                    this.state.isKeywordClicked &&
                    this.props.articlesByKeyword.map(article => {
                        return(
                            <div className="articles" key={article.url}>
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
                            <a className="newsLink" href={article.url}><h4>Read full article...</h4></a>
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
        articles: state.articles,
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
        getTopArticles: (country) => {
            dispatch(fetchAllArticles(country))
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