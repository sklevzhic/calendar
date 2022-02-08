import List from "antd/lib/list";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { useState } from "react";
import { CheckOutlined, HighlightOutlined } from '@ant-design/icons';

interface EditableTextProps {
    name: string
    value: string
}

const EditableText: React.FC<EditableTextProps> = ({name, value}) => {
    const [customEnterIconStr, setCustomEnterIconStr] = useState(value);
    return (

        <List.Item>
            <List.Item.Meta
                title={      <Paragraph
                    editable={{
                        icon: <HighlightOutlined />,
                        tooltip: 'click to edit text',
                        onChange: setCustomEnterIconStr,
                        enterIcon: <CheckOutlined />,
                    }}
                >
                    {customEnterIconStr}
                </Paragraph>}
                description={name}
            />
        </List.Item>
    )
}

export default EditableText
