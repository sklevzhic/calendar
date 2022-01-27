import React, {useEffect} from 'react'
import { Select } from 'antd';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useDispatch} from "react-redux";

const { Option } = Select;

interface NewRefillProps {

}

export const NewRefill: React.FC<NewRefillProps> = () => {
    const dispatch = useDispatch()
    const { printers } = useTypedSelector(state => state.technicReducer)

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchPrinters())
    }, [])
    function onChange(value: string) {
        // dispatch(TechnicsActionCreators.addRefill(value))
        console.log(`Отправить на заправку ${value}`);
    }

    function onSearch(val: string) {
        console.log('search:', val);
    }

    return <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
    >
        {
            printers.map(el => {
                return <Option value={el.id}>{el.name}</Option>
            })
        }
    </Select>;
};