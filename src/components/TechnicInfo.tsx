import React, {Dispatch, SetStateAction, useState} from 'react'
import {Button, Modal, Row} from "antd";
import {IPrinter} from "../models/Technics";

import {Typography, Space} from 'antd';
import {CopyText} from "./CopyText";
import Link from 'antd/lib/typography/Link';

const {Text} = Typography;

interface TechnicInfoProps {
    activeElement: IPrinter
}

export const TechnicInfo: React.FC<TechnicInfoProps> = ({children, activeElement}) => {

    return <Row>
        <Text>
            Для заправки необходимо заполнить <Link target={"_blank"}
                                                    href={"https://docs.google.com/forms/d/e/1FAIpQLSfwyQfBoHyUEOBPXQfIfcq4CTGpxdW3SxuR842KNBWhLMqo_w/viewform"}>
            форму
        </Link>
        </Text>
        <Space direction="vertical">

            <Text>ФИО ответственного лица: <br/> <CopyText description={"Клевжиц Александр Юрьевич"}/> <CopyText
                description={"Маковчик Андрей Александрович"}/></Text>
            <Text>Адрес электронной почты: <CopyText description={"ipk@bspu.by"}/></Text>
            <hr/>
            {/*<Text>Факультет / Институт: <CopyText description={"Институт"}/></Text>*/}
            <Text>Структурное подразделение факультета: <CopyText description={activeElement.faculty}/></Text>
            <hr/>
            <Text>Номер кабинета: <CopyText description={`${activeElement.room}-${activeElement.build}`}/></Text>
            <Text>Вид оргтехники: <CopyText description={activeElement.type}/></Text>
            <Text>Год выпуска: <CopyText description={activeElement.year}/></Text>
            <Text>Инвентарный номер оргтехники: <CopyText description={activeElement.invent}/></Text>

            {
                activeElement.cartridge && <>
                    <Text>Номер картриджа: <CopyText
                        description={activeElement.cartridge === "057A" ? "-" : activeElement.cartridge}/></Text>
                    <Text>Модель оргтехники и номер картриджа: <CopyText
                        description={`${activeElement.name} (${activeElement.cartridge})`}/></Text>
                </>
            }
        </Space>
    </Row>;
};



