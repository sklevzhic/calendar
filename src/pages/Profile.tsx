import {Button, Checkbox, Col, List, Row} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Title from 'antd/lib/typography/Title';
import axios from "axios"
import React, {useEffect, useState} from 'react'


interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = () => {
    let [specialities, setSpecialities] = useState([])
    useEffect(() => {
        axios.get("https://printersipkip.herokuapp.com/dates").then(res => setSpecialities(res.data.map((el: any, i: any) => ({
        // axios.get("http://localhost:1337/dates").then(res => setSpecialities(res.data.map((el: any, i: any) => ({
            ...el,
            checked: (i <= 2) ? true : false
        }))))
    }, [])

    let code = specialities.filter((el: any) => el.checked === true).map((el1: any) => {

        return ` <div class="modal-body item">
        <div class="dimming_effect">
            <figure class="picture_caption">
            <a class="modal_link" href=${el1.link}>
            <img alt="1" class="modal_picture" src=${el1.image}>
            </a>
                <figcaption class="start_date">
                <a class="modal_link modal_span" href=${el1.link}>
                начало обучения:<br/>
                    ${el1.date.dateText}</a>
                    </figcaption>
            </figure>


            <div class="flx_cont">
                <p class="speciality_name"><a class="modal_link"
                                                  href=${el1.link}>${el1.speciality}</a></p>
            </div>
        </div>
    </div>`
    }).join(" ")

    let changeSpeciality = (id: string, value: boolean) => {
        let arr: any = specialities.map((el: any) => {
            if (el.speciality === id) {
                return {...el, checked: value}
            } else {
                return el
            }
        })
        setSpecialities(arr)

    };

    return <div style={{padding: '0 50px'}}>
        {/*<Empty description={"Profile"}/>*/}
        <Row gutter={12}>
            <Col span={16}>
                <Title level={4}>Специальности</Title>
                <List
                    size="small"
                    bordered
                    dataSource={specialities}
                    renderItem={(item: any) => <Speciality item={item} changeSpeciality={(val: boolean) => changeSpeciality(item.speciality,val)}/>}
                />
            </Col>
            <Col span={8}>
                <Title level={4}>Code</Title>
                <TextArea value={code as any} autoSize={{minRows: 15, maxRows: 6}}/>
                <Button>
                    Copy
                </Button>
            </Col>
        </Row>
    </div>
};


const Speciality: React.FC<{ item: any, changeSpeciality: any }> = ({item, changeSpeciality}: any) => {

    return <List.Item>
        <Checkbox checked={item.checked}
                  onChange={(e: any) => changeSpeciality(e.target.checked)}
        >
            {item.date.dateText}
        </Checkbox>
        {item.speciality}
    </List.Item>
};

