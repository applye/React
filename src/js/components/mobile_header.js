import React from 'react';
import { Row, Col } from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Modal
} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
   

/**
 * 移动端头部
 * 
 * @export
 * @class MobileHeader
 * @extends {React.Component}
 */
class MobileHeader extends React.Component {

     constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userId: 0
        }
    }

    //设置点击登录注销和Menu
    handleClick = (e) => {
        if(e.key === 'register') {
            this.setState({current:'register'});
            this.setModalVisible(true); 
        }else {
            this.setState({
                current: e.key
            })
        }
    };

    //是否显示或者隐藏Modal
    setModalVisible = (val) => {
        this.setState({
            modalVisible: val
        })
    };
    
    //注册或者登录
    handleSubmit = (e) => {
        e.preventDefault();
        var myFetchOptions = {
            method:'GET'
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword, myFetchOptions)
        .then(respone=>respone.json()).then(json=>{
            this.setState({userNickName:json.NickUserName, userId: json.userId});
        });
        if(this.state.action == "login") {
            this.setState({hasLogined: true});
        }
        message.success("请求成功!");
        this.setModalVisible(false);
    }

    //显示弹框
    login =() => {
        this.setModalVisible(true);
    }

    //tabs改变，更改对应的action
    callBack = (key) => {
        if(key ==1) {
            this.setState({action: 'login'});
        }else if(key == 2) {
            this.setState({action: 'register'});
        }
    }

    render() {
        let {getFieldProps} = this.props.form;
        const userShow = this.state.hasLogined ?
        <Link target="_blank" to={'/usercenter'}>
            <Icon type="inbox" />
        </Link>
         : 
        <Icon type="setting" onClick={this.login}/>;
        return(
            <div id="mobileHeader">
                <header>
                    <img src="./src/images/logo.png" alt="logo"/>
                    <span>ReactNews</span>
                    {userShow}
                </header>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                onCancel={()=> this.setModalVisible(false)} okText="关闭" onOk={()=> {this.setModalVisible(false)}}>
                    <Tabs type="card" onChange={this.callBack}>
                        <TabPane tab="登录" key="1">
                            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                <FormItem label="账号">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                <FormItem label="账号">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>

                    </Tabs>
                </Modal>   
            </div>
        )
    }
}
export default MobileHeader = Form.create()(MobileHeader);