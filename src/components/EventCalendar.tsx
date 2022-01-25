import {Badge, Button, Calendar, Modal, Row, Tag} from 'antd';
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
    const { refills } = useTypedSelector(state => state.technicReducer)

    const deleteEvent = (item: IEvent) => {
        console.log(item)
    }

    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = refills.filter( ev => ev.date === formatedDate );

        return (
            <div>
                {
                    currentDayEvents.map((ev, index) => {
                        return <Badge status={"warning"} text={ev.techId} />
                    }
                )}

            </div>
        );
    }

    function getMonthData(value: any) {
        if (value.month() === 6) {
            return 1394;
        }
    }

    function monthCellRender(value: any) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    return <>
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>
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