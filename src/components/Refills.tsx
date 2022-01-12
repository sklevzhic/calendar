import React, {useEffect, useState} from 'react'
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import { List, Avatar, Button } from 'antd';
import {NewRefill} from "../pages/NewRefill";
import { ModalInfo } from './Modal';
import { useHistory } from 'react-router-dom';
interface RefillsProps {

}

export const Refills: React.FC<RefillsProps> = () => {
    const dispatch = useDispatch()
    let history = useHistory();
    const [visible, setVisible] = useState(true)

    const {refills} = useTypedSelector(state => state.technicReducer)

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchRefills())
    }, [])

    return <>
        <List
            itemLayout="horizontal"
            dataSource={refills}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={` [${item.device.cartridge}] ${item.device.name}`}
                        description={` [${item.userId}] `}
                    />
                    <Button onClick={() => history.push(`/printers/${item.printerId}`)} type="primary">More</Button>
                    <ModalInfo ></ModalInfo>
                </List.Item>
            )}
        />
        {
            visible ? <Button onClick={() => setVisible(false)}>dfd</Button> : <NewRefill />
        }


    </>;
};