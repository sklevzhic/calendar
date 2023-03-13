import React, {useEffect, useState} from 'react'
import {List, Avatar, Button, Row, Tooltip, Space, Typography} from "antd";
import {IPrinter} from "../models/Technics";

import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {ModalInfo} from "./Modal";
import Link from 'antd/lib/typography/Link';
import { CopyText } from './CopyText';
import {NavLink, useHistory} from 'react-router-dom';
import {FormRefill} from "./FormRefill";
import {status} from "../consts/status";


const { Text } = Typography;

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
    const history = useHistory()
    const {printers, refills} = useTypedSelector(state => state.technicReducer)

    const [activeElement, setActiveElement] = useState<IPrinter>({} as IPrinter)
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchRefills())
    }, [])

    const handleActiveElement = (printer: IPrinter) => {
        setActiveElement(printer)
        setIsModalVisible(true)
    }

    return <List>
            <>
                {
                    activeElement && <ModalInfo
                        activeElement={activeElement}
                        isModalVisible={isModalVisible}
                        setIsModalVisible={setIsModalVisible}

                    ><Row>
                        <Text>
                            Для заправки необходимо заполнить                 <Link target={"_blank"} href={"https://docs.google.com/forms/d/e/1FAIpQLSfwyQfBoHyUEOBPXQfIfcq4CTGpxdW3SxuR842KNBWhLMqo_w/viewform"}>
                            форму
                        </Link>
                        </Text>
                        <Space direction="vertical">

                            <Text>ФИО ответственного лица: <br/> <CopyText description={"Клевжиц Александр Юрьевич"}/> <CopyText description={"Маковчик Андрей Александрович"}/></Text>
                            <Text>Адрес электронной почты: <CopyText description={"ipk@bspu.by"}/></Text>
                            <hr/>
                            <Text>Структурное подразделение факультета: <CopyText description={activeElement.faculty}/></Text>
                            <hr/>
                            <Text>Номер кабинета: <CopyText description={`${activeElement.room}-${activeElement.build}`}/></Text>
                            <Text>Вид оргтехники: <CopyText description={activeElement.type}/></Text>
                            <Text>Год выпуска: <CopyText description={activeElement.year}/></Text>
                            <Text>Инвентарный номер оргтехники: <CopyText description={activeElement.invent}/></Text>
                            { activeElement.cartridge && <>
                                <Text>Номер картриджа: <CopyText description={activeElement.cartridge === "057A" ? "-" : activeElement.cartridge}/></Text>
                                <Text>Модель оргтехники и номер картриджа: <CopyText description={`${activeElement.name} (${activeElement.cartridge})`}/></Text>

                            </>}
                        </Space>

                        <FormRefill />
                    </Row>

                    </ModalInfo>
                }
            </>
        <Row><Button onClick={() => history.push("/technics/current")}>На заправке</Button></Row>
        {
            schema.map(build => {
                if (printers.some(el => el.build === build.build)) {
                    return <div key={build.build}>
                        <h2>{build.address}</h2>
                        {
                            build.blocks.map(block => {
                                return <div key={block.name}>
                                    <h3>{block.name}</h3>
                                    {
                                        block.rooms.map(room => {
                                            if (printers.some(el => el.room === room)) {
                                                return  <div key={room}>
                                                    <h5>{room}</h5>
                                                    {
                                                        printers.filter(el => el.id).map(printer => {
                                                            if (printer.room === room)
                                                            return <List.Item key={printer.id}>
                                                                <List.Item.Meta
                                                                    // avatar={<Avatar src={`https://raw.githubusercontent.com/sklevzhic/calendar/main/src/assets/img/technics/${printer.name}.jpg`}/>}
                                                                    title={<NavLink to={`/technics/${printer.id}`} href={"#"}>{`[${printer.type}] ${printer.name}`}</NavLink>}
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
                                                                                                {/*<Avatar style={{ backgroundColor: status[el.status].color  }}>{ el.date }</Avatar>*/}
                                                                                                </Tooltip>
                                                                                        })
                                                                            }


                                                                        </Avatar.Group>
                                                                    }
                                                                    </>
                                                                }
                                                                <Button onClick={(e) => handleActiveElement(printer)}>Заправка</Button>
                                                            </List.Item>
                                                        })
                                                    }
                                                </div>
                                            }
                                        })
                                    }
                                </div>

                            })
                        }
                    </div>
                }

            })
        }
    </List>;
};
