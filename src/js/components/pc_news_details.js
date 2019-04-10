import React from 'react'
import {Row, Col, BackTop} from 'antd'

import PcHeader from './pc_header'
import PcFooter from './pc_footer'
import PcNewsImgBlock from './pc_news_image_block'
import CommonComments from './common_comments'
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
        fetch("//newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.params.uniquekey, myFetchOption)
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
            <div>
                <PcHeader></PcHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <hr/>
                        <CommonComments uniquekey={this.props.params.uniquekey}></CommonComments>
                    </Col>
                    <Col span={6}>
                        <PcNewsImgBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="140px"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PcFooter></PcFooter>
                <BackTop />
            </div>
        );
    }
}