import React from 'react';
import {Row, Col} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
import Tloader from 'react-touch-loader';
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
            news: '',
            count: 5,
            hasMore:0,
            initializing:1,
            refreshedAt: Date.now()
        }
    }

    componentWillMount() {
        var myFetchOption = {
            method: 'GET'
        };
        fetch("//newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count, myFetchOption)
        .then(respone=> respone.json())
        .then(json=>this.setState({news:json}));
    }

    
    componentDidMount() {
        setTimeout(()=> {
            this.setState({
                hasMore: 1,
                initializing:2
            })
        }, 2e3);
    }
    

    loadMore = (resolve) => {      
        setTimeout(()=> {
            let count = this.state.count + 5;
            this.setState({count: count});
            var myFetchOption = {
                method: 'GET'
            };
            fetch("//newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.state.count, myFetchOption)
            .then(response =>  response.json())
            .then(json => {
                this.setState({news:json});
            });
            this.setState({
                hasMore: count>0 && count <50
            });
            resolve();
        }, 2e3);
    }

    render() {
        const {news, hasMore, initializing, refreshedAt} = this.state;
    
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
                        <Tloader className="main" onLoadMore={this.loadMore} hasMore={hasMore} initializing={initializing}>
                            {newList}
                        </Tloader>                    
                    </Col>
                </Row>
            </div>
        );
    }
}