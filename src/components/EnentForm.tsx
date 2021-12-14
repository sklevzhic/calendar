import {Button, DatePicker, Form, Input, Select} from 'antd';
import React, {useState} from 'react'
import {IEvent} from "../models/Event";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useDispatch} from "react-redux";
import {EventActionCreators} from "../store/reducers/events/action-creators";

const {Option} = Select;

interface EventFormProps {

}

export const EventForm: React.FC<EventFormProps> = () => {
    const dispatch = useDispatch()
    const [event, setEvent] = useState<IEvent>({
        date: '',
        content: '',
        guest: ''
    })


    const handleSubmit = () => {
        dispatch(EventActionCreators.createEvent(event))
    }
    return <>
        <Form
            onFinish={handleSubmit}
        >
            <Form.Item label="Событие" name="event">
                <Input
                    value={event.content}
                    onChange={(e) => setEvent({...event, content: e.target.value})}/>
            </Form.Item>
            <Form.Item label="Событие" name="date">
                <DatePicker onChange={(date: Moment | null) => {
                    if (date) {
                        setEvent({...event, date: formatDate(date.toDate())})
                    }
                }
                }/>
            </Form.Item>
            <Form.Item label="Событие" name="guests">
                <Select
                    onChange={(guest: string) => setEvent({...event, guest})}
                    style={{width: 200}}
                    placeholder="Выбрать гостей"
                    optionFilterProp="children"
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
            </Form.Item>
            <Form.Item style={{textAlign: "center"}}>
                <Button type="primary" htmlType="submit">Primary Button</Button>
            </Form.Item>
        </Form>
    </>;
};