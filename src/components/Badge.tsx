import React from 'react'
import {Tag, Popover, Button, Rate} from 'antd';
import {Typography} from 'antd';
import {
    LinkOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import {status} from "../consts/status";
import {useDispatch} from "react-redux";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useHistory} from "react-router-dom";


const {Text} = Typography;


interface BadgeElemProps {
    id: string | number,
    statusRef: string | number,
    text: string | number,
    deviceId: string | number
}

export const BadgeElem: React.FC<BadgeElemProps> = ({id, statusRef, deviceId, text}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleDeleteRefill = () => {
        dispatch(TechnicsActionCreators.deleteRefill(id))
    }

    const handleChangeRate = (value: number) => {
        dispatch(TechnicsActionCreators.updateStatusCartridge(id, value))
    };
    return <Popover
        title={<>{status[statusRef].name}
            <Button onClick={handleDeleteRefill}><DeleteOutlined/></Button>
            <Button onClick={() => history.push(`/technics/${deviceId}`)}><LinkOutlined/></Button>
        </>}
        trigger="click"
        content={
            <div>
                <Rate onChange={handleChangeRate} defaultValue={+statusRef} count={5}/>
            </div>
        }
    >
        <Tag key={id} color={status[statusRef].color}>
            {text}</Tag>
    </Popover>
};