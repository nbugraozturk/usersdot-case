import React from 'react';
import { Modal, Form, Input, Button, Divider, Col, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import { formFields } from './formFields';
import { theme as antdTheme, Grid } from 'antd'

const { useBreakpoint } = Grid;


const AddUserModal = ({ visible, onClose, onFinish }) => {
    const { useToken } = antdTheme
    const { token: theme } = useToken()
    const screens = useBreakpoint();

    return (
        <Modal
            title="Add New User"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={!screens.xs ? 16 : 8}>
                    {formFields.map(({ name, label, rules, component, data }, index) => (
                        <Col span={!screens.xs ? 12 : 24} key={label}>
                            <Form.Item key={index} name={name} label={label} rules={rules}>
                                {component === 'Input' ? (
                                    <Input />
                                ) : component === 'Input.Password' ? (
                                    <Input.Password />
                                ) : component === 'Select' ? (
                                    <Select options={data} />
                                ) : null}
                            </Form.Item>
                        </Col>
                    ))}
                </Row>

                {/* Diğer form alanları eklenebilir */}
                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={onClose} style={{ marginRight: '8px' }}>
                            Cancel
                        </Button>
                        <Divider type="vertical"
                            style={theme.divider}
                        />
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

AddUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onUserAdded: PropTypes.func.isRequired,
};

export default AddUserModal;
