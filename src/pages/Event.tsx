import { Content } from 'antd/lib/layout/layout';
import React, {useEffect} from 'react'
import {EventCalendar} from "../components/EventCalendar";
import {useDispatch} from "react-redux";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";

interface EventProps {

}

export const Event: React.FC<EventProps> = () => {
    const dispatch = useDispatch()
    // const { refills } = useTypedSelector(state => state.technicReducer)
    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchRefills())
    }, [])
    return <>
        <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
                <EventCalendar />
            </div>
        </Content>
    </>;
};