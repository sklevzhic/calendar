import {Avatar, Col, Dropdown, Menu, Row} from 'antd';
import {Header} from 'antd/lib/layout/layout';
import React from 'react'
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";

interface HeaderProps {

}



export const NavBar: React.FC<HeaderProps> = () => {
    const dispatch = useDispatch()
    const { isAuth, user } = useTypedSelector(state => state.authReducer)
    const logout = () => {
        dispatch(AuthActionCreators.logout())
    }

    const menu = (
        <Menu>
            <Menu.Item  key="main1">
                Настройки
            </Menu.Item>
            <Menu.Item  key="main2" onClick={() => logout()}>
                Выйти
            </Menu.Item>
        </Menu>
    );
    return <Header>
        {
            isAuth
                ? <Row>
                    <Col span={20}>

                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item key="main">Главная</Menu.Item>
                            <Menu.Item key="2">Календарь</Menu.Item>
                            <Menu.Item key="3">{user.username}</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={4}>
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" arrow>
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                        </Dropdown>
                    </Col>
                </Row>
                : <Row>
                    <Col span={20}>
                    </Col>
                    <Col span={4}>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item key="login">Логин</Menu.Item>
                        </Menu>
                    </Col>
                </Row>
        }

    </Header>
};