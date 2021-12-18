import {Avatar, Col, Dropdown, Menu, Row} from 'antd';
import {Header} from 'antd/lib/layout/layout';
import React from 'react'
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useHistory} from "react-router-dom";

interface HeaderProps {

}



export const NavBar: React.FC<HeaderProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { isAuth, user } = useTypedSelector(state => state.authReducer)
    const logout = () => {
        dispatch(AuthActionCreators.logout())
    }

    const menu = (
        <Menu>
            <Menu.Item  onClick={() => history.push("/profile")} key="main1">
                {user.username}
            </Menu.Item>
            <Menu.Item  onClick={() => history.push("/profile")} key="main1">
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
                            <Menu.Item onClick={() => history.push("/")} key="main">Главная</Menu.Item>
                            <Menu.Item onClick={() => history.push("/events")} key="calendar">Календарь</Menu.Item>
                            <Menu.Item onClick={() => history.push("/profile")} key="profile">Профиль</Menu.Item>
                            <Menu.Item onClick={() => history.push("/printers")} key="printers">printers</Menu.Item>
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