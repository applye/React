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
export default class PcNewsImage extends React.Component {
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
        const styleImage = {
            display:"black",
            width: this.props.imageWidth,
            height: "90px"
        };
        const styleH3 = {
            width: this.props.imageWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow:"ellipsis" 
        };

        const {news} = this.state;
        const newList = news.length ? news.map((newItem, index)=> (
            <div key={index} class="imageblock">
                <Link to={`details/${newItem.uniquekey}`} target="_blank">
                    <div class="custom-image">
                        <img alt={newItem.title} src={newItem.thumbnail_pic_s} style={styleImage}/>
                    </div>
                    <div class="custom-card">
                        <h3 style={styleH3}>{newItem.title}</h3>
                        <p>{newItem.author_name}</p>
                    </div>
                </Link>
            </div>
        )) : '没有加载到任何新闻';

        return (
            <div class="imgBlockList">
                <Card title={this.props.cardTitle} bordered={true} style={{width:this.props.width}}>
                      {newList}                  
                </Card>
            </div>
        );
    }
}