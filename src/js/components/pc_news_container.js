import React from 'react';
import {
    Row,
    Col,
    Tabs,
    Carousel
} from 'antd';
import PcNewsBlock from './pc_news_block';
import PcNewsImageBlock from './pc_news_image_block';
import PcProduct from './pc_product';
const TabPane = Tabs.TabPane;

export default class PcNewsContainer extends React.Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow:1,
            autoplay: true
        }

        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="container">
                        <div class="leftContainer">
                            <div class="carous">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg"/></div>
                                    <div><img src="./src/images/carousel_2.jpg"/></div>
                                    <div><img src="./src/images/carousel_3.jpg"/></div>
                                    <div><img src="./src/images/carousel_4.jpg"/></div>                                   
                                </Carousel>
                            </div>
                            <PcNewsImageBlock count={6} type="guoji" width="400px" cardTitle="国际头条" imageWidth="112px"/>                          
                        </div>
                        <Tabs class="tabs_news">
                            <TabPane tab="头条新闻" key={1}>
                                <PcNewsBlock count="20" type="top" width="100%" bordered="false"/>
                            </TabPane>
                             <TabPane tab="国际" key={2}>
                                <PcNewsBlock count="20" type="guoji" width="100%" bordered="false"/>
                            </TabPane>
                        </Tabs>
                        <Tabs class="tabs_product">
                            <TabPane tab="reactNews" key={1}>
                                <PcProduct></PcProduct>
                            </TabPane>
                        </Tabs>
                        <div>
                            <PcNewsImageBlock count={8} type="guoji" width="100%" cardTitle="国内新闻" imageWidth="126px"/>
                            <PcNewsImageBlock count={16} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="126px"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}


