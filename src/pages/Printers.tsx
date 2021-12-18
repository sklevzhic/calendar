import { Form, Input, Button, Checkbox } from 'antd';


import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";

import { Card, Avatar } from 'antd';
import {IPrinter} from "../models/Technics";

const { Meta } = Card;

interface PrintersProps {

}

let obj = [
    { key: "userId", name: "ФИО"},
    { key: "type", name: "Тип"},
    { key: "name", name: "Наименование"},
    { key: "year", name: "Год выпуска"},
    { key: "invent", name: "Интвентарный номер"},
    { key: "zavod", name: "Заводской номер"},
    { key: "matfyo", name: "МОЛ"},
    { key: "build", name: "Корпус"},
    { key: "room", name: "Кабинет"},
    { key: "user", name: "ФИО (запас)"},
    { key: "print", name: "Наклейка"},
]


export const Printers: React.FC<PrintersProps> = () => {
    const dispatch = useDispatch()
    const { printers } = useTypedSelector(state => state.technicReducer)

    console.log(printers)
    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchPrinters())
    }, [])



    const onFinish = (printer: IPrinter) => {
        dispatch(TechnicsActionCreators.addPrinter(printer))
    };



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
                       return <Form.Item
                           label={el.name}
                           name={el.key}
                           rules={[{ required: true, message: 'Please input your username!' }]}
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
            printers.map(el => {
                return <Card>
                    <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={`[${el.invent}] ${el.name}`}
                        description={el.userId}
                    />
                </Card>
            })
        }
    </div>
};