import { Content } from 'antd/lib/layout/layout';
import React, {useEffect} from 'react'
import {EventCalendar} from "../components/EventCalendar";
import {useDispatch} from "react-redux";
import {EventActionCreators} from "../store/reducers/events/action-creators";

interface EventProps {

}

export const Event: React.FC<EventProps> = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(EventActionCreators.fetchGuests())
        dispatch(EventActionCreators.fetchEvents())
    }, [])
    return <>
        <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
                <EventCalendar />
            </div>
        </Content>
    </>;
};