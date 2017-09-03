import React, { Component } from 'react'

/**
 * 
 * 
 * @class Body
 * @extends {Component}
 */
class Body extends Component {
    constructor() {
        super();  //调用基类的所有初始化方法
        this.state= {userName:'Join'}
    }

    render() {
        setTimeout(function() {
            this.setState({userName: 'IMomc'});
        }.bind(this), 4000);

        return(
            <section>
             <h3>内容区域</h3> 
             <p>{this.state.userName}</p>
             <p>{this.props.name}</p>
            </section>
        )
    }
}

export default Body;