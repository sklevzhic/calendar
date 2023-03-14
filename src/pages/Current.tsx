import {NavLink, useHistory} from "react-router-dom";

import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";

import {Avatar, Button, List, Row, Space, Tooltip, Typography} from 'antd';
import React, {useEffect, useState} from "react";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {IPrinter} from "../models/Technics";
import {ModalInfo} from "../components/Modal";
import Link from "antd/lib/typography/Link";
import {CopyText} from "../components/CopyText";
import {FormRefill} from "../components/FormRefill";


const {Title, Text} = Typography;


interface CurrentProps {

}

export const Current: React.FC<CurrentProps> = () => {



    const {refills} = useTypedSelector(state => state.technicReducer)
    const dispatch = useDispatch()

    const [activeElement, setActiveElement] = useState<IPrinter>({} as IPrinter)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleActiveElement = (printer: IPrinter | undefined) => {
        if (printer) {
            setActiveElement(printer)
            setIsModalVisible(true)
        }

    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchRefills())
    }, [])
    return <>
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

        <List>
            {
                refills.filter(el => el.status === "0").map(el => {
                    return  <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar
                                src={`https://raw.githubusercontent.com/sklevzhic/calendar/main/src/assets/img/technics/fds.jpg`}/>}
                            title={<NavLink to={`/technics/12`} href={"#"}>{el?.device?.name} ({el?.device?.cartridge})</NavLink>}
                            description={el?.device?.user}

                        />
                        <Button onClick={(e) => handleActiveElement(el?.device)}>Заправка</Button>
                    </List.Item>
                })
            }


        </List>

    </>;

    // useEffect(() => {
    //
    // }, [])
    //
    // const history = useHistory()
    // const dispatch = useDispatch()
    // const {printers} = useTypedSelector(state => state.technicReducer)
    //
    // return <div>
    //     <div>
    //         <h2>106</h2>
    //         <List>
    //             <List.Item>
    //                 <List.Item.Meta
    //                     avatar={<Avatar
    //                         src={`https://raw.githubusercontent.com/sklevzhic/calendar/main/src/assets/img/technics/fds.jpg`}/>}
    //                     title={<NavLink to={`/technics/12`} href={"#"}>"dcgvdf"</NavLink>}
    //                     description={"vhjmhg"}
    //                 />
    //             </List.Item>
    //             <List.Item>
    //                 <List.Item.Meta
    //                     avatar={<Avatar
    //                         src={`https://raw.githubusercontent.com/sklevzhic/calendar/main/src/assets/img/technics/fds.jpg`}/>}
    //                     title={<NavLink to={`/technics/12`} href={"#"}>"dcgvdf"</NavLink>}
    //                     description={"vhjmhg"}
    //                 />
    //             </List.Item>
    //         </List>
    //     </div>
    //     <div>
    //         <h2>На заправке</h2>

    //     </div>
    // </div>
}