import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticlesByCategory, fetchArticlesByKeyword, fetchAllArticles } from '../store/userArticles'
import { fetchChoices } from '../store/form'

class UserArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCountryClicked: false,
            isCategoryClicked: false,
            isKeywordClicked: false,
        }
    }
    componentDidMount() {
        this.props.getChoices(this.props.user.id);
    }

    render() {
        console.log('PROPS!', this.props)
        const country = this.props.country;
        const categories = this.props.categories;
        const keywords = this.props.keywords;

        return (
            <div>
            {
                country && <button className="newsButton" onClick={() => {this.props.getTopArticles(country); this.setState({isCategoryClicked: false, isCountryClicked: true, isKeywordClicked: false})}}>Get Top Headlines in Your Country</button>
            }
            {
                categories.includes('Health') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Health', country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Health</button>
            }
            {
                categories.includes('Entertainment') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Entertainment', country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Entertainment</button>
            }
            {
                categories.includes('Technology') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Technology', country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Technology</button>
            }
            {
                categories.includes('Science') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Science', country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Science</button>
            }
            {
                categories.includes('Sports') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Sports', country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Sports</button>
            }
            {
                categories.includes('Business') && <button className="newsButton" onClick={() => {this.props.getArticlesByCategory('Business', country); this.setState({isCategoryClicked: true, isCountryClicked: false, isKeywordClicked: false})}}>Get Top Headlines in Business</button>
            }
            {/*{
                keywords[0] && <button className="newsButton" onClick={() => {this.props.getArticlesByKeyword(keywords[0]); this.setState({isCategoryClicked: false, isCountryClicked: false, isKeywordClicked: true})}}>Get Top Headlines about {keywords[0]}</button>
            } */}

            {
                keywords && keywords.map(keyword => {
                    return (
                        <button className="newsButton" onClick={() => {this.props.getArticlesByKeyword(keyword); this.setState({isCategoryClicked: false, isCountryClicked: false, isKeywordClicked: true})}} key={keyword}>Get Top Headlines about {keyword}</button>
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
        country: state.choices.country,
        categories: state.choices.categories,
        keywords: state.choices.keywords,
        articles: state.articles,
        articlesByCategory: state.articlesByCategory,
        articlesByKeyword: state.articlesByKeyword,
        user: state.user
    }
}

const mapDispatch = dispatch => {
    return {
        getChoices: (userID) => {
            dispatch(fetchChoices(userID))
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
