import React from 'react'
import ReactDom from 'react-dom'
import Header  from './components/header'
import Footer  from './components/footer'
import Body from './components/body'

/**
 * 
 * 
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
    render() {
        return(
            <div>
                <Header />
                <Body name = '小佳'/>
                <Footer />
            </div>
        )
    }
}

ReactDom.render(
    <Index />,
    document.getElementById('root')
);