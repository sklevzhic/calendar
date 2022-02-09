import {Image, Button, Col, Row, Card, List} from "antd"
import {useHistory, useParams} from "react-router-dom";
import {useEffect} from "react";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Content} from "antd/lib/layout/layout";
import {Typography} from 'antd';
import EditableText from "../components/EditableText";
import { names } from "../consts/names";


const {Title} = Typography;


interface PrinterProps {

}




// desc
// date
// getdate
// isTrusted
// cartridge

export const Printer: React.FC<PrinterProps> = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    let {id} = useParams<{ id: string }>()
    const {modelInfo} = useTypedSelector(state => state.technicReducer)


    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchModelInfo(id))
        return () => {
            dispatch(TechnicsActionCreators.deleteModelInfo())
        }
    }, [])
    return <div>
        <Content className="site-layout-background" style={{padding: '0 50px'}}>
            <Button onClick={() => history.goBack()}> Back </Button>

            {
                (Object.keys(modelInfo).length !== 0) ? <Row>
                        <Col xs={{span: 5, offset: 1}}>
                            <Card title={"Наименование"}>
                                <Image
                                    src={`https://raw.githubusercontent.com/sklevzhic/calendar/main/src/assets/img/technics/${modelInfo.name}.jpg`}/>
                                <Title level={5}>{modelInfo.name}</Title>
                                <List>
                                    {
                                        Object.keys(names).map((key) => {
                                            // @ts-ignore
                                            return <EditableText value={key} name={names[key]}/>
                                        })
                                    }
                                </List>
                            </Card>

                        </Col>
                        {/*<Col xs={{span: 8, offset: 1}}>*/}
                        {/*    <Card title={"Бухгалтерия"}>*/}
                        {/*        <List>*/}
                        {/*            {*/}
                        {/*                Object.keys(accounting).map((key) => {*/}
                        {/*                    // @ts-ignore*/}
                        {/*                    return <EditableText value={key} name={accounting[key]}/>*/}
                        {/*                })*/}
                        {/*            }*/}
                        {/*        </List>*/}

                        {/*    </Card>*/}
                        {/*</Col>*/}
                        {/*<Col xs={{span: 8, offset: 1}}>*/}
                        {/*    <Card title={"Местоположение"}>*/}
                        {/*        <List>*/}
                        {/*            {*/}
                        {/*                Object.keys(place).map((key) => {*/}
                        {/*                    // @ts-ignore*/}
                        {/*                    return <EditableText value={modelInfo[key]} name={place[key]}/>*/}
                        {/*                })*/}
                        {/*            }*/}
                        {/*        </List>*/}
                        {/*    </Card>*/}
                        {/*</Col>*/}
                    </Row>
                    : "Загрузка"
            }
        </Content>
    </div>
}