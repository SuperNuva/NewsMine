import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllArticles } from "../store/allArticles";
import axios from "axios";

class AllArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            categories: [],
            keywords: []
        }
    }
    // componentWillMount() {
        
    // }
    componentDidMount() {
        this.getChoices();
        console.log("STATE!!!", this.state)
        
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
        // console.log("PROPS!!", this.props)
        console.log("ALL-NEWS STATE", this.state)
        // console.log("articles!!", this.props.articles)
        // console.log("COUNTRY", this.state.country)
        if(this.props.articles) {
            return(
                <div>
                    <h1>Top headlines in the US</h1>
                    <button onClick={() => this.props.getTopArticles(this.state.country)}>click me!</button>
                    {
                        this.props.articles.map(article => {
                            return (
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
        } else {
            return <p>Loading ...</p>
        }
    }
}

const mapState = state => {
    return {
        articles: state.articles,
        user: state.user
    }
}

const mapDispatch = dispatch => {
    return {
        getTopArticles: (country) => {
            dispatch(fetchAllArticles(country))
        }
    }
}

export default connect(mapState, mapDispatch)(AllArticles)