import React, {useEffect, useState} from 'react'
import {List, message, Avatar, Skeleton, Divider, Button, Row, Tooltip} from "antd";
import {IPrinter} from "../models/Technics";

import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {ModalInfo} from "./Modal";
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';


interface AllTechnicsProps {

}

let schema = [
    {
        "address": "Голубева, 26",
        "build": "9",
        "blocks": [
            {
                "name": "1 блок",
                "rooms": [
                    "1",
                    "2",
                    "3",
                    "8",
                    "10"
                ]
            },
            {
                "name": "2 блок",
                "rooms": [
                    "11",
                    "14",
                    "15",
                    "16",
                    "17",
                    "Охрана"
                ]
            },
            {
                "name": "3 блок",
                "rooms": [
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26"
                ]
            },
            {
                "name": "4 блок",
                "rooms": [
                    "31",
                    "34",
                    "35",
                    "36",
                    "архив"
                ]
            },
            {
                "name": "Гостиница",
                "rooms": [
                    "Администратор",
                    "Заведующий",
                    "Гостиница"
                ]
            },
            {
                "name": "Первое образование",
                "rooms": [
                    "Администратор",
                    "Заведующий",
                    "Кабушкина",
                    "Могилевская"
                ]
            }
        ]
    },
    {
        "address": "Советская, 18",
        "build": "1",
        "blocks": [
            {
                "name": "14 этаж",
                "rooms": [
                    "142"
                ]
            },
            {
                "name": "8 этаж",
                "rooms": [
                    "81",
                    "82",
                    "83",
                    "84",
                    "85",
                    "88"
                ]
            },
            {
                "name": "10 этаж",
                "rooms": [
                    "101",
                    "101а",
                    "102",
                    "103",
                    "104",
                    "105",
                    "106",
                    "107",
                    "108",
                    "Кладовка",
                    "Лифтовая",
                    "Отдел ремонта"
                ]
            },
            {
                "name": "11 этаж",
                "rooms": [
                    "113",
                    "118"
                ]
            },
            {
                "name": "12 этаж",
                "rooms": [
                    "121",
                    "122",
                    "123",
                    "124",
                    "125"
                ]
            },
            {
                "name": "13 этаж",
                "rooms": [
                    "132"
                ]
            },
            {
                "name": "5 этаж",
                "rooms": [
                    "571"
                ]
            }
        ]
    }
]

export const AllTechnics: React.FC<AllTechnicsProps> = () => {
    const dispatch = useDispatch()

    const {printers, refills} = useTypedSelector(state => state.technicReducer)
    console.log(refills)
    const [activeElement, setActiveElement] = useState<IPrinter>({
        "id": "",
        "type": "",
        "name": "",
        "invent": "",
        "year": "",
        "build": "",
        "room": "",
        "user": "",
        "matfyo": "",
        "zavod": "",
        "print": false,
        "problem": "",
        "faculty":"",
        "desc":"",
        "cartridge": "",
        "date":"",
        "getdate": "",
        "isTrusted":"",
    })
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        console.log(printers)
    }, [printers])

    const deleteDevice = (id: string | number) => {
        dispatch(TechnicsActionCreators.deleteDevice(id))
    }

    const handleActiveElement = (printer: IPrinter) => {
        setActiveElement(printer)
        setIsModalVisible(true)
        // dispatch(TechnicsActionCreators.addRefill(printer.id))
    }

    return <List>
            <>
                {
                    activeElement && <ModalInfo activeElement={activeElement} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
                }
            </>
        <Row><Button onClick={() => dispatch(TechnicsActionCreators.fetchRefills())}>Показать все заправки</Button></Row>
        {
            schema.map(build => {
                if (printers.some(el => el.build === build.build)) {
                    return <>
                        <h2>{build.address}</h2>
                        {
                            build.blocks.map(block => {
                                return <>
                                    <h3>{block.name}</h3>
                                    {
                                        block.rooms.map(room => {
                                            if (printers.some(el => el.room === room)) {
                                                return  <div>
                                                    <h5>{room}</h5>
                                                    {
                                                        printers.filter(el => el.id).map(printer => {
                                                            if (printer.room === room)
                                                            return <List.Item key={printer.id}>
                                                                <List.Item.Meta
                                                                    avatar={<Avatar/>}
                                                                    // avatar={<Avatar src={item.picture.large} />}
                                                                    title={<>{`[${printer.type}] ${printer.name}`} { (printer.invent) ? printer.invent : <Button type="dashed" >Заполнить</Button> }</>}
                                                                    description={` ${printer.user}` }
                                                                />
                                                                {
                                                                    (printer.refills) && <>
                                                                    {
                                                                        printer.refills.length !== 0 &&
                                                                        <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                                                            {
                                                                                printer.refills.map(el => {
                                                                                            return <Tooltip title={el.date} placement="top">
                                                                                                <Avatar style={{ backgroundColor: '#87d068' }}>{ el.date }</Avatar>
                                                                                                </Tooltip>
                                                                                        })
                                                                            }


                                                                        </Avatar.Group>

                                                                    //     <>
                                                                    //     Заправок =
                                                                    //     </>
                                                                    }
                                                                    </>
                                                                }
                                                                <Button onClick={(e) => handleActiveElement(printer)}>Заправка</Button>
                                                                {/*<Button onClick={(e) => handleLastRefilling(printer)}>Last</Button>*/}
                                                            </List.Item>
                                                        })
                                                    }
                                                </div>
                                            }
                                        })
                                    }
                                </>

                            })
                        }
                    </>
                }

            })
        }
    </List>;
};
