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
        return (
            <div>
            {
                this.state.country && <button className="newsButton" onClick={() => {this.props.getTopArticles(this.state.country); this.setState({isCategoryClicked: false, isCountryClicked: true, isKeywordClicked: false})}}>Get Top Headlines in Your Country</button>
            }
            {
                this.state.categories.includes('Health') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Health', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Health</button>
            }
            {
                this.state.categories.includes('Entertainment') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Entertainment', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Entertainment</button>
            }
            {
                this.state.categories.includes('Technology') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Technology', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Technology</button>
            }
            {
                this.state.categories.includes('Science') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Science', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Science</button>
            }
            {
                this.state.categories.includes('Sports') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Sports', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Sports</button>
            }
            {
                this.state.categories.includes('Business') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Business', this.state.country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Business</button>
            }
            {/*{
                this.state.keywords[0] && <button className="newsButton" onClick={() => {this.props.getArticlesByKeyword(this.state.keywords[0]); this.setState({isCategoryClicked: false, isCountryClicked: false, isKeywordClicked: true})}}>Get Top Headlines about {this.state.keywords[0]}</button>
            } */}

            {
                this.state.keywords && this.state.keywords.map(keyword => {
                    return (
                        <button className="newsButton" onClick={() => {this.props.getArticlesByKeyword(keyword); this.setState({isCategoryClicked: false, isCountryClicked: false, isKeywordClicked: true})}}>Get Top Headlines about {keyword}</button>
                    )
                })
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