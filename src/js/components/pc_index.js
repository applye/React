import React from 'react'
import PcHeader from './pc_header'
import PcFooter from './pc_footer'
import PcNewsContainer from './pc_news_container'
/**
 * pc端主页
 * 
 * @export
 * @class PcIndex
 * @extends {React.Component}
 */
export default class PcIndex extends React.Component {

    render() {
        return(
            <div>
                <PcHeader></PcHeader>
                <PcNewsContainer></PcNewsContainer>
                <PcFooter></PcFooter>
            </div>
        )
    }
}
