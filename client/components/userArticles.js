import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticlesByCategory, fetchChoices } from '../store/userArticles'
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
        // this.state.categories.forEach(category => {
        //     return this.props.getArticlesByCategory(category, this.state.country)
        // })
        // this.props.getArticlesByKeyword();
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
        // return(
        //     <div>
        //     {
        //         this.state.categories.forEach(category => {
        //             return (
        //                 <Link to={`/home/${category}`}>{category}</Link>
        //             )
        //         })
        //     }
        //     </div>
        // )
        

        if(this.props.articlesByCategory){
            return (
                <div>
                <button onClick={() => this.props.getArticlesByCategory(this.state.categories[0], this.state.country)}>Get Top Headlines in {this.state.categories[0]}</button>
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
                    <h1>Articles By Keyword</h1> 
                </div>
            )
        }
    }
}

const mapState = state => {
    return {
        articlesByCategory: state.articlesByCategory,
        articlesByKeyword: state.articlesByKeyword,
        user: state.user
        // categories: state.categories,
        // Keywords: state.Keywords
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
        // getArticlesByKeyword: () => {
        //     dispatch(fetchArticlesByKeyword())
        // }
    }
}

export default connect(mapState, mapDispatch)(UserArticles)