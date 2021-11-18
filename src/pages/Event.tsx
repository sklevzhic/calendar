import { Breadcrumb } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react'

interface EventProps {

}

export const Event: React.FC<EventProps> = () => {
    return <>
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">Content</div>
        </Content>
    </>;
};