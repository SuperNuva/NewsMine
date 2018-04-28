import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllArticles } from "../store/allArticles";
import axios from "axios";

class AllArticles extends Component {

    componentDidMount() {
        this.props.getTopArticles();
    }

    render() {
        console.log("PROPS!!", this.props)
        console.log("state articles!!", this.props.articles)
        if(this.props.articles) {
            return(
                <div>
                    <h1>Top headlines in the US</h1>
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
        articles: state.articles
    }
}

const mapDispatch = dispatch => {
    return {
        getTopArticles: () => {
            dispatch(fetchAllArticles())
        }
    }
}

export default connect(mapState, mapDispatch)(AllArticles)