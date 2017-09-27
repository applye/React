import React from 'react'
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import MobileList from './mobile_list'
import MobileListPullRefresh from './mobile_list_pull_refresh'
import {Tabs, Carousel} from 'antd'
const TabPane = Tabs.TabPane;
/**
 * pc端主页
 * 
 * @export
 * @class PcIndex
 * @extends {React.Component}
 */
export default class MobileIndex extends React.Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow:1,
            autoplay: true
        }
        return(
            <div>
                <MobileHeader></MobileHeader>
                <Tabs>
                    <TabPane key="1" tab="头条">
                        <Carousel {...settings}>
                            <div><img src="./src/images/carousel_1.jpg"/></div>
                            <div><img src="./src/images/carousel_2.jpg"/></div>
                            <div><img src="./src/images/carousel_3.jpg"/></div>
                            <div><img src="./src/images/carousel_4.jpg"/></div>                                   
                        </Carousel>
                        <MobileList count={5} type="top"/>
                    </TabPane>
                    <TabPane key="2" tab="社会">
                        <MobileList count={20} type="shehui"/>
                    </TabPane>
                    <TabPane key="3" tab="国内">
                        <MobileListPullRefresh count={20} type="guonei"/>
                    </TabPane>
                    <TabPane key="4" tab="国际">
                        <MobileList count={20} type="guoji"/>
                    </TabPane>
                    <TabPane key="5" tab="娱乐">
                        <MobileList count={20} type="yule"/>
                    </TabPane>
                </Tabs>
                <MobileFooter></MobileFooter>
            </div>
        )
    }
}
