import React from 'react'
import {Row, Col, BackTop} from 'antd'

import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import PcNewsImgBlock from './pc_news_image_block'
import CommonComents from './common_comments'

/**
 * 
 * 
 * @export
 * @class PcNewsDetails
 * @extends {Component}
 */
export default class PcNewsDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            newItem: ''
        };
    }
    
    componentDidMount() {
        var myFetchOption = {
            method:"GET"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.params.uniquekey, myFetchOption)
        .then(response => response.json())
        .then(json => {
            this.setState({newItem: json});
            document.title = this.state.newItem.title + '-React News | News 新闻平台';
        });
    }

    createMarkup = () => {
        return {__html: this.state.newItem.pagecontent}
    }

    render() {
        return (
            <div id="mobileDetailsContainer">
                <MobileHeader></MobileHeader>
                <div id="ucmobileList">
                <Row>                
                    <Col span={24} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComents uniquekey={this.props.params.uniquekey}/>
                    </Col>                  
                </Row>
                </div>
                <MobileFooter></MobileFooter>
                <BackTop />
            </div>
        );
    }
}