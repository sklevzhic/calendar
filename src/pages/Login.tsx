import {Button, Card, Col, Form, Input, Row} from 'antd';
import {Content} from 'antd/lib/layout/layout';
import React, {useState} from 'react'
import {IUser} from "../models/Auth";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {CopyText} from "../components/CopyText";


interface LoginProps {

}

export const Login: React.FC<LoginProps> = () => {
    const dispatch = useDispatch()
    const {error, isLoading} = useTypedSelector(state => state.authReducer)

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const onFinish = (data: IUser) => {
        dispatch(AuthActionCreators.login(username, password))
    }

    return <Content style={{padding: '0 50px'}}>
        <Row justify="center">
            <Col span={10}>
                <Card style={{marginTop: '20px'}}>

                    <Form
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Имя пользователя"
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input onChange={(e) => setUserName(e.target.value)}/>
                        </Form.Item>

                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Item>
                        {
                            error && <p style={{color: "red"}}>{error}</p>
                        }
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button loading={isLoading} type="primary" htmlType="submit">
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>

    </Content>
};