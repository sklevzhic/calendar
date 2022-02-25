import {Badge, Button, Calendar, Modal, Row} from 'antd';
import React, {useEffect, useState} from 'react'
import moment, {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";

import {FormRefill} from "./FormRefill";
import {colors} from '../consts/status';
import {Select, Radio, Col} from 'antd';
import {IRefill} from "../models/Technics";
import {BadgeElem} from "./Badge";

const {Option} = Select;

interface ComponentProps {

}

export const EventCalendar: React.FC<ComponentProps> = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const {refills, printers} = useTypedSelector(state => state.technicReducer)
    const [filterRefills, setFilterRefills] = useState<IRefill[] | []>([])
    const [activePrinters, setActivePrinters] = useState<string>('')

    useEffect(() => {
        setFilterRefills(refills)
    }, [refills])

    useEffect(() => {
        setFilterRefills(refills.filter(el => el.techId === activePrinters))
    }, [activePrinters])

    function onChangeActivePrinter(value: string) {
        // setActivePrinters([...activePrinters, value])
        setActivePrinters(value)
    }

    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = filterRefills.filter(ev => ev.date === formatedDate);
        return (
            <div>
                {
                    currentDayEvents.map((ev) => {
                            if (ev.device) {
                                return <BadgeElem key={ev.id} status={colors[ev.status]} text={ev.device.user}/>
                            }
                        }
                    )}

            </div>
        );
    }

    function onSelect(value: any) {
        let a = value.format('YYYY-MM-DD')
        debugger

    };

    function monthCellRender(value: any) {
        const currentDayEvents = filterRefills.filter(el => {
            let date = new Date(el.date)
            let dateMoment = `${date.getMonth()}/${date.getFullYear()}`
            let dateRefill = `${value.month()}/${value.year()}`

            return dateMoment === dateRefill
        });
        return <>                {

            currentDayEvents.map((ev) => {
                    if (ev.device) {
                        return <Badge key={ev.id} status={colors[ev.status]} text={ev.device.user}/>
                    }
                }
            )}
        </>
    }

    return <>
        <Calendar
            onSelect={onSelect}
            headerRender={({value, type, onChange, onTypeChange}) => {
                const start = 0;
                const end = 12;
                const monthOptions = [];

                const current = value.clone();
                const localeData = value.localeData();
                const months = [];
                for (let i = 0; i < 12; i++) {
                    current.month(i);
                    months.push(localeData.monthsShort(current));
                }

                for (let index = start; index < end; index++) {
                    monthOptions.push(
                        <Select.Option className="month-item" key={`${index}`} value={index}>
                            {months[index]}
                        </Select.Option>,
                    );
                }
                const month = value.month();

                const year = value.year();
                const options = [];
                for (let i = year - 10; i < year + 10; i += 1) {
                    options.push(
                        <Select.Option key={i} value={i} className="year-item">
                            {i}
                        </Select.Option>,
                    );
                }
                // @ts-ignore
                // @ts-ignore
                return (
                    <div style={{padding: 8}}>
                        <Row gutter={8}>
                            <Col>
                                <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                                    <Radio.Button value="month">Month</Radio.Button>
                                    <Radio.Button value="year">Year</Radio.Button>
                                </Radio.Group>
                            </Col>
                            <Col>
                                <Select
                                    size="small"
                                    dropdownMatchSelectWidth={false}
                                    className="my-year-select"
                                    onChange={newYear => {
                                        // @ts-ignore
                                        const now = value.clone().year(newYear);
                                        onChange(now);
                                    }}
                                    value={String(year)}
                                >
                                    {options}
                                </Select>
                            </Col>
                            <Col>
                                <Select
                                    size="small"
                                    dropdownMatchSelectWidth={false}
                                    value={String(month)}
                                    onChange={selectedMonth => {
                                        const newValue = value.clone();
                                        newValue.month(parseInt(selectedMonth, 10));
                                        onChange(newValue);
                                    }}
                                >
                                    {monthOptions}
                                </Select>
                            </Col>
                            <Col>
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChangeActivePrinter}
                                    // onSearch={onSearch}
                                    // filterOption={(input, option) =>
                                    //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    // }
                                >

                                    {
                                        printers.map(el => {
                                            return <Select.Option
                                                value={el.id}>{`${el.name} ${el.user}`}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </div>
                );
            }}
            dateCellRender={dateCellRender} monthCellRender={monthCellRender}
        />

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