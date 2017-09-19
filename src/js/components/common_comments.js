import React from 'react';
import { Row, Col } from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Card,
    Input,
    Button,
    notification,
    CheckBox,
    Modal
} from 'antd'

const FormItem = Form.Item;
const subMenu = Menu.subMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: ''
        }
    }

    
    componentDidMount() {
        let myFetchOption = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey, myFetchOption)
        .then(response => response.json())
        .then(json => {
            this.setState({
                comments: json
            });
        });
    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        let myFetchOption = {
            method: 'GET'
        };
        var forData = this.props.form.getFieldsValue();
        console.log(forData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey+"&commnet="+forData.remark, myFetchOption)
        .then(response => response.json())
        .then(json => {
            message.success("提交评论成功!");
            this.componentDidMount();
        });
    }

    handleUserColltion =() => {
        let myFetchOption = {
            method: 'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+ this.props.uniquekey, myFetchOption)
        .then(response => response.json())
        .then(json => {
            //收藏成功
            notification['success']({message:'react news 提醒', description:'收藏文章成功'}); 
        });
    }

    render() {

        let {getFieldProps} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length ?  comments.map((comment, index)=>(
            <Card key={index} title={comment.UserName} extra={<a href="#">发布于{comment.datetime}</a>}>
                <p>{comment.Comments}</p>
            </Card>
        )) : '没有任何评论'; 
        return (
            <div>
                <Row>
                    <Col span={24}>  
                        {commentList}                      
                        <Form onSubmit={this.handleSubmit} layout="horizontal">
                            <FormItem label="您的评论">
                                <Input type="textarea" placeholder="请输入您的评论" {...getFieldProps('remark', {initialValue: ''})}/>
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="button" onClick={this.handleUserColltion}>收藏该文章</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CommonComments = Form.create({})(CommonComments);

