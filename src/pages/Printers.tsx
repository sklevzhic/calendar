import {Form, Input, Button, Checkbox, Select} from 'antd';


import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";

import {Card} from 'antd';
import {IPrinter} from "../models/Technics";
import {AllTechnics} from "../components/AllTechnics";
import {Refills} from '../components/Refills';
import {FormRefill} from "../components/FormRefill";

// const {Meta} = Card;

const {Option} = Select;


interface PrintersProps {

}

let obj = [
    {key: "userId", name: "ФИО"},
    {key: "name", name: "Наименование"},
    {key: "invent", name: "Интвентарный номер"},
    {key: "zavod", name: "Заводской номер"},
    {key: "matfyo", name: "МОЛ"},
    {key: "build", name: "Корпус"},
    {key: "room", name: "Кабинет"},
    {key: "print", name: "Наклейка"},
]

let builds = [
    {name: "1", address: "Советская"},
    {name: "9", address: "Голубева"},
    {name: "5", address: "Могилевская"},
]

// let structures = [
//     {key: "umo", name: "УМО"},
//     {key: "fdpo", name: "ФДПО"},
//     {key: "fuiprp", name: "ФУиПРП"},
//     {key: "fdp", name: "ФДП"},
//     {key: "cdo", name: "ЦДО"},
//     {key: "firsted", name: "Первое образование"},
//     {key: "spkis", name: "СПКиС"},
//     {key: "sio", name: "СИО"},
//     {key: "sp", name: "СП"},
// ]

// let stages = {
//     1: "Пустой",
//     2: "Докладная на заправку",
//     3: "Передача в ЦРИТ",
//     4: "Получение из ЦРИТ"
// }

export const Printers: React.FC<PrintersProps> = () => {
    const dispatch = useDispatch()
    const [isVisibleRefills, setVisibleRefills] = useState(true)
    const { users, models } = useTypedSelector(state => state.technicReducer)


    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchUsers())
    }, [])
    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchModels())
    }, [])



    const onFinish = (printer: IPrinter) => {
        dispatch(TechnicsActionCreators.addPrinter(printer))
    };


    function onChange(value: string) {
        console.log(`selected ${value}`);
    }

    function onSearch(val: string) {
        console.log('search:', val);
    }

    return <div style={{padding: '0 50px'}}>


        {
            isVisibleRefills
                ? <Refills />
                : <AllTechnics />
        }

        <hr/>
        <Card style={{width: 600}}>
            <FormRefill />
        </Card>

        <Card style={{width: 600}}>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >
                {
                    obj.map(el => {

                        if (el.key === 'print') {
                            return <Form.Item key={el.key} name="print" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                                <Checkbox>{el.name}</Checkbox>
                            </Form.Item>
                        }
                        if (el.key === 'type') {
                            return <Form.Item key={el.key} name={el.key} label="Тип">
                                <Select
                                    showSearch
                                    placeholder="Тип"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                >
                                    <Option key={"printer"} value={"Принтер"}>Принтер</Option>
                                    <Option key={"printer"} value={"МФУ"}>МФУ</Option>
                                    <Option key={"printer"} value={"Ксерокс"}>Ксерокс</Option>
                                </Select>
                            </Form.Item>
                        }
                        if (el.key === 'name') {
                            return <Form.Item key={el.key} name={el.key} label="Модель устройства">
                                <Select
                                    showSearch
                                    placeholder="Модель устройства"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                >
                                    {
                                        models.map(el => {
                                            return <Option key={el.id} value={el.id}>{el.name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        }
                        if (el.key === 'build') {
                            return <Form.Item key={el.key} name={el.key} label="Конпус">
                                <Select
                                    showSearch
                                    placeholder="Корпус"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                >
                                    {
                                        builds.map(el => {
                                            return <Option key={el.name} value={el.name}>{el.address}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        }

                        if ((el.key === 'userId') || (el.key === 'matfyo')) {
                            return <Form.Item key={el.key} name={el.key} label="ФИО">
                                <Select
                                    showSearch
                                    placeholder="ФИО"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                >
                                    {
                                        users.map(el => {
                                            return <Option key={el.id} value={el.id}>{el.name}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        }
                        return <Form.Item
                            label={el.name}
                            name={el.key}
                            // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input/>
                        </Form.Item>
                    })
                }


                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>


    </div>
}