import {Button, DatePicker, Form, Input, Select} from 'antd';
import React, {useEffect, useState} from 'react'
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useDispatch} from "react-redux";

import {useTypedSelector} from "../hooks/useTypedSelector";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {IRefill} from "../models/Technics";

const {Option} = Select;

interface FormRefillProps {

}

export const FormRefill: React.FC<FormRefillProps> = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchPrinters())
    }, [])

    const [event, setEvent] = useState<IRefill>({
        date: '',
        techId: ''
    })
    const { printers } = useTypedSelector(state => state.technicReducer)



    const handleSubmit = () => {
        console.log(event)
           dispatch(TechnicsActionCreators.addRefill(event))
    }

    return <>
        <Form
            onFinish={handleSubmit}
        >
            <Form.Item label="Дата" name="date">
                <DatePicker onChange={(date: Moment | null) => {
                    if (date) {
                        setEvent({...event, date: formatDate(date.toDate())})
                    }
                }
                }/>
            </Form.Item>
            <Form.Item label="Устройства" name="guests">
                <Select
                    onChange={(techId: string) => setEvent({...event, techId})}
                    style={{width: 200}}
                    placeholder="Выбрать принтер для заправки"
                    optionFilterProp="children"
                >
                    {
                        printers.map(el => {
                            return <Option value={el.id}>{el.user}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item style={{textAlign: "center"}}>
                <Button type="primary" target={"_blank"} href={"https://docs.google.com/forms/d/e/1FAIpQLSfwyQfBoHyUEOBPXQfIfcq4CTGpxdW3SxuR842KNBWhLMqo_w/viewform"}>Открыть форму ЦРИТ</Button>
            </Form.Item>

            <Form.Item style={{textAlign: "center"}}>
                <Button type="primary" htmlType="submit">Форма отправлена</Button>
            </Form.Item>
        </Form>
    </>;
};