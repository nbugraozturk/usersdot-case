import { Button, Tag, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export const getColumns = (handleEditClick) => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '8vw,',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color = role === 'ADMIN' ? 'blue' : 'green';
        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text) => !!text ? new Date(text).toLocaleString() : '',
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (text, record) => (
        <Tooltip title="Edit">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
            shape="circle"
            type="primary"
          >
          </Button></Tooltip>

      ),
    },
  ];
}