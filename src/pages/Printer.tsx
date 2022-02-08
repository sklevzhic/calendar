import {Image, Button, Col, Row, Card, List} from "antd"
import {useHistory, useParams} from "react-router-dom";
import {useEffect} from "react";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import { Content } from "antd/lib/layout/layout";
import { Typography } from 'antd';
import EditableText from "../components/EditableText";
const { Title } = Typography;


interface PrinterProps {

}

interface INames {
    [key: string]: string
}

let names: INames =  {
    type: "Тип",
    name: "Наименование",
}
let accounting = {
    invent: "Тип",
    matfyo: "Мат.отв. лицо",
    zavod: "Заводской номер",
    print: "Наклейка",
    year: "Год выпуска",
}
let place = {
    build: "Корпус",
    room: "Кабинет",
    user: "Сотрудник",
    faculty: "Факультет"
}



// desc
// date
// getdate
// isTrusted
// cartridge

export const Printer: React.FC<PrinterProps> = () => {

    const history = useHistory()
    let { id } = useParams<{id: string}>()
    const { modelInfo } = useTypedSelector(state => state.technicReducer)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchModelInfo(id))
    }, [])
    return <div>
        <Content  className="site-layout-background" style={{ padding: '0 50px' }}>
            <Button onClick={() => history.goBack()}> Back </Button>

        {
            (Object.keys(modelInfo).length !== 0) ? <Row>
                    <Col xs={{ span: 5, offset: 1 }}>
                        <Card title={"Местоположение"}>
                            <Image src={`https://raw.githubusercontent.com/sklevzhic/calendar/main/src/assets/img/technics/${modelInfo.name}.jpg`} />
                            <Title level={5}>{modelInfo.name}</Title>
                        </Card>

                    </Col>
                    <Col xs={{ span: 5, offset: 1 }}>
                        <Card title={"Местоположение"}>
                             <List>
                                 {
                                     Object.keys(names).map((key) => {
                                         return <EditableText value={"modelInfo[key]"} name={names[key]}  />
                                     })
                                 }
                             </List>

                        </Card>
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }}>
                        <Card title={"Местоположение"}>
                            {
                                Object.keys(names).map((key) => {
                                    return <EditableText value={"modelInfo[key]"} name={names[key]}  />
                                })
                            }
                        </Card>
                    </Col>
                </Row>
 : "Загрузка"
        }
        </Content>
    </div>
}