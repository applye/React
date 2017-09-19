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
 * 
 * pc头部
 * @export
 * @class PcHeader
 * @extends {React.Component}
 */
class PcHeader extends React.Component {
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

    
    componentDidMount() {
        if(localStorage.userid!='') {
            this.setState({hasLogined: true});
            this.setState({userNickName: localStorage.userNickName, userid: localStorage.userid});
        }
    }

    //点击注册或者menu
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

    //设置显示隐藏modal
    setModalVisible = (val) => {
        this.setState({
            modalVisible: val
        })
    };

    //改变tabs更改tabs
    callBack = (key) => {
        if(key ==1) {
            this.setState({action: 'login'});
        }else if(key == 2) {
            this.setState({action: 'register'});
        }
    }

    logout = () => {
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({hasLogined: false});
    }
    
    //登录或者注册
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
            localStorage.userid = json.UserId;
            localStorage.userNickName = json.NickUserName;
        });

        if(this.state.action == "login") {
            this.setState({hasLogined: true});
        }
        message.success("请求成功!");
        this.setModalVisible(false);
    }

    render() {
        let {getFieldProps} = this.props.form;
        const userShow = this.state.hasLogined
         ? <Menu.Item key="logout" class="logout">
            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
            &nbsp;&nbsp;
            <Link target="_blank" to={`/usercenter`}>
                <Button type="dashed" htmlType="button">个人中心</Button>
            </Link>
             &nbsp;&nbsp;
             <Button type="ghost" htmlType="button" onClick={this.logout}>退出</Button>
        </Menu.Item>
        :
        <Menu.Item key="register" class="register">
            <Icon type="appstore"/>注册/登录
        </Menu.Item>;
        return (
            <header class="headerTop">
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="#" class="logo">
                            <img src="src/images/logo.png" alt="logo" />
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick}>
                            <Menu.Item key="top">
                                <Icon type="appstore" />今日头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore" />社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore" />国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore" />国际
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore" />体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore" />科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore" />时尚
                            </Menu.Item>
                             {userShow}
                        </Menu>


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
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}

export default PcHeader = Form.create()(PcHeader);