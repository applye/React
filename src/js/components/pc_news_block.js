import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

/**
 * 
 * 
 * @export
 * @class PcNewsBlock
 * @extends {React.Component}
 */
export default class PcNewsBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        }
    }

    componentWillMount() {
        var myFetchOption = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count, myFetchOption)
        .then(respone=> respone.json())
        .then(json=>this.setState({news:json}));
    }

    render() {
        const {news} = this.state;
        const newList = news.length ? news.map((newItem, index)=> (
            <li key={index}>
                <Link to={`details/${newItem.uniquekey}`} target="_blank">
                    {newItem.title}
                </Link>
            </li>
        )) : '没有加载到任何新闻';

        return (
            <div class="topNewsList">
                <Card>
                    <ul>
                       {newList}
                    </ul>
                </Card>
            </div>
        );
    }
}