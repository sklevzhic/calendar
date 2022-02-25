import {NavLink, useHistory} from "react-router-dom";

import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";

import {Avatar, Button, List, Tooltip, Typography} from 'antd';
import React, {useEffect} from "react";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";


const {Title} = Typography;


interface CurrentProps {

}

export const Current: React.FC<CurrentProps> = () => {


    useEffect(() => {

    }, [])

    const history = useHistory()
    const dispatch = useDispatch()
    const {printers} = useTypedSelector(state => state.technicReducer)

    return <div>
        <div>
            <h2>106</h2>
            <List>
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar
                            src={`https://raw.githubusercontent.com/sklevzhic/calendar/main/src/assets/img/technics/fds.jpg`}/>}
                        title={<NavLink to={`/technics/12`} href={"#"}>"dcgvdf"</NavLink>}
                        description={"vhjmhg"}
                    />
                </List.Item>
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar
                            src={`https://raw.githubusercontent.com/sklevzhic/calendar/main/src/assets/img/technics/fds.jpg`}/>}
                        title={<NavLink to={`/technics/12`} href={"#"}>"dcgvdf"</NavLink>}
                        description={"vhjmhg"}
                    />
                </List.Item>
            </List>
        </div>
        <div>
            <h2>На заправке</h2>
            <List>
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar
                            src={`https://raw.githubusercontent.com/sklevzhic/calendar/main/src/assets/img/technics/fds.jpg`}/>}
                        title={<NavLink to={`/technics/12`} href={"#"}>"dcgvdf"</NavLink>}
                        description={"vhjmhg"}
                    />
                </List.Item>
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar
                            src={`https://raw.githubusercontent.com/sklevzhic/calendar/main/src/assets/img/technics/fds.jpg`}/>}
                        title={<NavLink to={`/technics/12`} href={"#"}>"dcgvdf"</NavLink>}
                        description={"vhjmhg"}
                    />
                </List.Item>
            </List>
        </div>
    </div>
}