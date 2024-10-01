import { useEffect } from 'react';
import { Modal, Form, Input, Button, Row, Col, Select, Divider } from 'antd';
import PropTypes from 'prop-types';
import { formFields } from './formFields';
import { theme as antdTheme, Grid} from 'antd'

const { useBreakpoint } = Grid;


const EditUserModal = ({ visible, user, onClose, onEditUser }) => {
    const [form] = Form.useForm();
    const { useToken } = antdTheme
    const { token: theme } = useToken()
    const screens = useBreakpoint();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: user.password,
                phone: user.phone,
                age: user.age,
                country: user.country,
                district: user.district,
                role: user.role,
            });
        }
    }, [user, form]);

    const handleSubmit = (values) => {
        onEditUser(user.id, values);
        onClose();
    };

    return (
        <Modal
            title="Edit User"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={onClose} style={{ marginRight: '8px' }}>
                        Cancel
                    </Button>
                    <Divider type="vertical"
                        style={theme.divider}
                    />
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

EditUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onEditUser: PropTypes.func.isRequired,
};

export default EditUserModal;
