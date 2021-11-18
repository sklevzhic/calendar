import {Breadcrumb, Button, Form, Input} from 'antd';
import {Content} from 'antd/lib/layout/layout';
import React from 'react'
import {IUser} from "../models/Auth";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";
import { notification } from 'antd';


interface LoginProps {

}
const openNotification = (type: any) => {
    notification.open({
        message: 'Notification Title',
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};

export const Login: React.FC<LoginProps> = () => {
    const dispatch = useDispatch()
    const {error} = useTypedSelector(state => state.authReducer)
    const onFinish = (data: IUser) => {
        dispatch(AuthActionCreators.login(data.username, data.password))
    }

    return <Content style={{padding: '0 50px'}}>
        <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">

            <Form
                onFinish={onFinish}
            >
                <Form.Item
                    label="Имя пользователя"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
            <Button type="primary" onClick={() => openNotification('error')}>
                Open the notification box
            </Button>,
        </div>
    </Content>
};