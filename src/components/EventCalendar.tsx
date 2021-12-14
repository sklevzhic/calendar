import { Button, Calendar, Modal, Row, Tag} from 'antd';
import React, {useState} from 'react'
import {EventForm} from "./EnentForm";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/Event";

interface ComponentProps {

}

export const EventCalendar: React.FC<ComponentProps> = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const {events} = useTypedSelector(state => state.eventReducer)

    const deleteEvent = (item: IEvent) => {
        console.log(item)
    }

    function dateCellRender(value: Moment) {

        const formatedDate = formatDate(value.toDate())

        const obj = events.filter(el => {
            return el.date === formatedDate
        })
        return (
            <div className="events">
                {obj.map((item, i) => {
                    return <Tag key={i} closable onClose={() => deleteEvent(item)}>
                        {item.content}
                    </Tag>
                })}
            </div>
        );
    }

    return <>
        <Calendar dateCellRender={dateCellRender}/>
        <Row justify={"center"}>
            <Button type={"primary"} onClick={() => setIsModalVisible(true)}>Добавить событие</Button>
        </Row>

        <Modal
            title={"Добавить событие"}
            visible={isModalVisible}
            footer={null}
            onCancel={() => setIsModalVisible(false)}
        >
            <EventForm/>
        </Modal>
    </>;
};