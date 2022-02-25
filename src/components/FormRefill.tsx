import {Button, DatePicker, Form, Input, Select} from 'antd';
import React, {useEffect, useState} from 'react'
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useDispatch} from "react-redux";

import {useTypedSelector} from "../hooks/useTypedSelector";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {IPrinter, IRefill} from "../models/Technics";
import {TechnicInfo} from "./TechnicInfo";

const {Option} = Select;

interface FormRefillProps {

}

export const FormRefill: React.FC<FormRefillProps> = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchPrinters())
    }, [])

    const [event, setEvent] = useState<IRefill>({
        "date": "",
        "id": "",
        "techId": "",
        "status": "",
    })
    const { printers } = useTypedSelector(state => state.technicReducer)



    const handleSubmit = () => {
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
                            return <Option value={el.id}>{el.cartridge} {el.user} {el.room}</Option>
                        })
                    }
                </Select>
            </Form.Item>

            <Form.Item label="Устройства" name="status">
                <Select
                    onChange={(status: string) => setEvent({...event, status})}
                    style={{width: 200}}
                    placeholder="Статус"
                    optionFilterProp="children"
                >
                    <Option value={"0"}>106</Option>
                    <Option value={"2"}>Выдан новый</Option>
                    <Option value={"1"}>На заправке</Option>
                    <Option value={"3"}>Заправлен</Option>
                </Select>
            </Form.Item>
        {/* <TechnicInfo activeElement={}/>*/}

            <Form.Item style={{textAlign: "center"}}>
                <Button type="primary" target={"_blank"} href={"https://docs.google.com/forms/d/e/1FAIpQLSfwyQfBoHyUEOBPXQfIfcq4CTGpxdW3SxuR842KNBWhLMqo_w/viewform"}>Открыть форму ЦРИТ</Button>
            </Form.Item>

            <Form.Item style={{textAlign: "center"}}>
                <Button type="primary" htmlType="submit">Форма отправлена</Button>
            </Form.Item>
        </Form>
    </>;
};