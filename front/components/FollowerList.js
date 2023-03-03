import React from 'react';
import { Button, List, Card } from 'antd';
import styled from 'styled-components';
import { StopOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types';


const ListWrapper = styled(List)`
margin-bottom: 20px ;


`;

const Load = styled.div`
    text-align: center;
    margin: 10px 0;

`

const Listitem = styled(List)`
margin-top: 20px;

`;

const FollowerList = ({ header, data }) => {
    return (
        <ListWrapper
            grid={{ gutter: 4, xs: 2, md: 3 }}
            size='small'
            header={<div>{header}</div>}
            loadMore={<Load><Button>더보기</Button></Load>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <Listitem>
                    <Card actions={[<StopOutlined key='stop' />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>

                </Listitem>

            )}
        />
    )
};

FollowerList.prototypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.arrayOf.isRequired,
};


export default FollowerList
