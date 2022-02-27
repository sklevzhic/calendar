import List from "antd/lib/list";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { useState } from "react";
import { CheckOutlined, HighlightOutlined } from '@ant-design/icons';
import { Select, Switch } from 'antd';
import {names} from "../consts/names";

const { Option } = Select;

interface EditableTextProps {
    key: string
    value: string
}


const EditableText: React.FC<EditableTextProps> = ({key, value}) => {
    // @ts-ignore

    const [customEnterIconStr, setCustomEnterIconStr] = useState(value);

    function onChange(value: string) {
        console.log(`selected ${value}`);
    }

    function onChangeSwitch(checked: boolean) {
        console.log(`switch to ${checked}`);
    }
    //
    // if ((key == MATFYO) || (name == USER)|| (name == FACULTY)) {
    //     return    <List.Item>
    //         <List.Item.Meta
    //             title={      <Select
    //                 defaultValue={value}
    //                 placeholder="Select a person"
    //                 onChange={onChange}
    //             >
    //                 <Option value="jack">Jack</Option>
    //                 <Option value="lucy">Lucy</Option>
    //                 <Option value="tom">Tom</Option>
    //             </Select>}
    //             description={name}
    //         />
    //     </List.Item>
    // }
    //
    // if (name == PRINT) {
    //     return <List.Item>
    //         <List.Item.Meta
    //             title={      <Switch defaultChecked onChange={onChangeSwitch} />}
    //             description={name}
    //         />
    //     </List.Item>
    // }

    return (
        <List.Item>
            <List.Item.Meta
                title={      <Paragraph
                    editable={{
                        icon: <HighlightOutlined />,
                        tooltip: 'click to edit text',
                        onChange: setCustomEnterIconStr,
                        // enterIcon: <CheckOutlined />,
                    }}
                >
                    {customEnterIconStr}
                </Paragraph>}
                description={"name"}
            />
        </List.Item>
    )
}

export default EditableText
