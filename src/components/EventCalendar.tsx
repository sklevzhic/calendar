import {Badge, Button, Calendar, Modal, Row, Tag} from 'antd';
import React, {useState} from 'react'
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";

import {FormRefill} from "./FormRefill";

interface ComponentProps {

}

export const EventCalendar: React.FC<ComponentProps> = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { refills } = useTypedSelector(state => state.technicReducer)
    console.log(refills)


    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = refills.filter( ev => ev.date === formatedDate );
        return (
            <div>
                {
                    currentDayEvents.map((ev, index) => {
                        if (ev.device) {
                            return <Badge status={"warning"} text={ev.device.user} />
                        }
                    }
                )}

            </div>
        );
    }

    function monthCellRender(value: any) {
        const currentDayEvents = refills.filter( el => {
            let date = new Date(el.date)
            let dateMoment = `${date.getMonth()}/${date.getFullYear()}`
            let dateRefill = `${value.month()}/${value.year()}`

            return dateMoment === dateRefill
        } );
        debugger
        return <>                {

            currentDayEvents.map((ev, index) => {
                    if (ev.device) {
                        return <Badge status={"warning"} text={ev.device.user} />
                    }
                }
            )}
        </>
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
            <FormRefill/>
        </Modal>
    </>;
};