import { Form, Input, Button, Checkbox, Select } from 'antd';


import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";

import { Card, Avatar } from 'antd';
import {IPrinter} from "../models/Technics";

const { Meta } = Card;

const { Option } = Select;


interface PrintersProps {

}

let obj = [
    { key: "userId", name: "ФИО"},
    { key: "name", name: "Наименование"},
    { key: "invent", name: "Интвентарный номер"},
    { key: "zavod", name: "Заводской номер"},
    { key: "matfyo", name: "МОЛ"},
    { key: "build", name: "Корпус"},
    { key: "room", name: "Кабинет"},
    { key: "print", name: "Наклейка"},
]

let builds = [
    { name: "1", address: "Советская"},
    { name: "9", address: "Голубева"},
    { name: "5", address: "Могилевская"},
]

let structures = [
    { key: "umo", name: "УМО"},
    { key: "fdpo", name: "ФДПО"},
    { key: "fuiprp", name: "ФУиПРП"},
    { key: "fdp", name: "ФДП"},
    { key: "cdo", name: "ЦДО"},
    { key: "firsted", name: "Первое образование"},
    { key: "spkis", name: "СПКиС"},
    { key: "sio", name: "СИО"},
    { key: "sp", name: "СП"},
]

export const Printers: React.FC<PrintersProps> = () => {
    const dispatch = useDispatch()
    const { printers, users, models } = useTypedSelector(state => state.technicReducer)

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchPrinters())
    }, [])

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchUsers())
    }, [])

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchModels())
    }, [])

    const onFinish = (printer: IPrinter) => {
        dispatch(TechnicsActionCreators.addPrinter(printer))
    };

    const deleteDevice = (id: string | number) => {
        dispatch(TechnicsActionCreators.deleteDevice(id))
    }


    function onChange(value: string) {
        console.log(`selected ${value}`);
    }

    function onSearch(val: string) {
        console.log('search:', val);
    }

    return <div  style={{padding: '0 50px'}}>

       <Card style={{ width: 600 }}>
           <Form
               name="basic"
               labelCol={{ span: 8 }}
               wrapperCol={{ span: 16 }}
               initialValues={{ remember: true }}
               onFinish={onFinish}
               autoComplete="off"
           >
               {
                   obj.map(el => {

                       if (el.key === 'print') {
                           return  <Form.Item name="print" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                               <Checkbox>{el.name}</Checkbox>
                           </Form.Item>
                       }
                       if (el.key === 'type') {
                           return  <Form.Item name={el.key} label="Тип">
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
                           return  <Form.Item name={el.key} label="Модель устройства">
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
                           return  <Form.Item name={el.key} label="Конпус">
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
                           return   <Form.Item name={el.key} label="ФИО">
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
                           <Input />
                       </Form.Item>
                   })
               }





               <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                   <Button type="primary" htmlType="submit">
                       Submit
                   </Button>
               </Form.Item>
           </Form>
       </Card>
        <hr/>

        {
            printers.filter(el => el.id).map(el => {
                return <Card>
                    <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={`[${el.device.name}]`}
                        description={el.userId}
                    />
                    <Button onClick={() => deleteDevice(el.id)} > dfsd </Button>
                </Card>
            })
        }
    </div>
}