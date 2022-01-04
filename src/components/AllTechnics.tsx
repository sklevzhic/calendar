import React, {useEffect} from 'react'
import {Avatar, Button, Card, Tooltip} from "antd";
import {IPrinter} from "../models/Technics";
import { Meta } from 'antd/lib/list/Item';
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface AllTechnicsProps {

}

export const AllTechnics: React.FC<AllTechnicsProps> = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchPrinters())
    }, [])

    const { printers } = useTypedSelector(state => state.technicReducer)
    const deleteDevice = (id: string | number) => {
        dispatch(TechnicsActionCreators.deleteDevice(id))
    }

    return <>
        {
            printers.filter(el => el.id).map(el => {
                return <Card>
                    <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={`[${el.device.name}]`}
                        description={el.userId}
                    />
                    <Button onClick={() => deleteDevice(el.id)} > Удалить </Button>
                </Card>
            })
        }
    </>;
};