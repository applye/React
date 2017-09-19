import React from 'react';
import {Row, Col} from 'antd';
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
            <section key={index} className="m_article list-item special_section clearfix">
                <Link to={`details/${newItem.uniquekey}`}>
                    <div className="m_article_img">
                        <img src={newItem.thumbnail_pic_s} alt={newItem.title} />
                    </div>
                    <div className="m_article_info">
                        <div className="m_article_title">
                            <span>{newItem.title}</span>
                        </div>
                        <div className="m_atricle_desc clearfix">
                            <div className="m_atricle_desc_l">
                                <span className="m_atricle_channel">{newItem.realtype}</span>
                                <span className="m_atricle_time">{newItem.date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>
        )) : '没有加载到任何新闻';

        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newList}
                    </Col>
                </Row>
            </div>
        );
    }
}