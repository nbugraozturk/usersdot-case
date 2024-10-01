import { Button, Divider, Input, Space, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { createUser, fetchUsers, updateUser } from '../../api/usersApi';
import { getColumns } from './columns';
import Spin from 'antd/es/spin';
import { theme as antdTheme } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons';
import AddUserModal from '../AddUserModal';
import Message from '../Notification';
import { MESSAGES } from '@/app/constants/messages';
import EditUserModal from '../EditUserModal';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const fetchUsersInside = async (page, pageSize, searchTerm) => {
  try {
    const response = await fetchUsers({ page, pageSize, searchTerm });
    return { items: response?.users, total: response?.totalCount }
  } catch (error) {
    message[MESSAGES.ERROR_FETCH_USER.type](MESSAGES.ERROR_FETCH_USER.text);
    console.error('Error fetching users:', error);
    return { items: [], total: 0 }
  }
};

const UserTable = () => {
  const screens = useBreakpoint();
  const { useToken } = antdTheme
  const { token: theme } = useToken()

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState({});
  const [fireNotification, setFireNotification] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const loadData = async (page, pageSize, searchTerm) => {
    setLoading(true);
    const data = await fetchUsersInside(page, pageSize, searchTerm);
    setUsers(data.items);
    setTotal(data.total);
    setLoading(false);
  };

  useEffect(() => {
    loadData(currentPage, pageSize, searchTerm);
  }, [currentPage, pageSize, searchTerm]);

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    setCurrentPage(current);
    setPageSize(pageSize);
    loadData(current, pageSize, searchTerm);
  };

  const handleSearch = (e) => {
    setSearchTerm(e);
    setCurrentPage(1);
  };

  const showAddUserModal = () => {
    setIsModalVisible(true);
  };

  const handleUserAdded = () => {
    setMessage(MESSAGES.USER_ADDED);
    setFireNotification(true);
    loadData(currentPage, pageSize, searchTerm);
  };

  const handleEditClick = (record) => {
    setEditingUser(record);
  }

  const onEditUser = async (id, values) => {
    try {
      await updateUser({ ...values, id: id })
      setFireNotification(true);
      loadData(currentPage, pageSize, searchTerm);
      setMessage(MESSAGES.USER_UPDATED);
    } catch (error) {
      console.error('Error updating user:', error?.response?.data?.message || MESSAGES.ERROR_ADD_USER);
      setMessage(error?.response?.data?.message ? {
        text: error?.response?.data?.message,
        type: 'error'
      } : MESSAGES.ERROR_ADD_USER);
      setFireNotification(true);
    } finally {
      setTimeout(() => {
        setFireNotification(false);
      }, 500)
    }
  }

  const onFinishAddUser = async (values) => {
    try {
      await createUser(values);
      handleUserAdded();
      setIsModalVisible(null);
    } catch (error) {
      console.error('Error adding user:', error?.response?.data?.message || MESSAGES.ERROR_ADD_USER);
      setMessage(error?.response?.data?.message ? {
        text: error?.response?.data?.message,
        type: 'error'
      } : MESSAGES.ERROR_ADD_USER);
      setFireNotification(true);
    } finally {
      setTimeout(() => {
        setFireNotification(false);
      }, 500)
    }
  };

  return (
    <><div style={{ width: '100%', overflowX: 'auto' }}>
      <Space split={<Divider type="vertical"
        style={{ height: "3vh", borderWidth: 1 }}
      />}
        align="end"
        size="small">
        <Input.Search
          onSearch={handleSearch}
          style={{ width: '24vw' }}
          variant="filled"
          enterButton={!screens.xs ? "Search" : true}
          loading={loading}
          allowClear
        />
        <Button
          onClick={showAddUserModal}
          type="secondary"
        >
          <UsergroupAddOutlined />{!screens.xs ? 'Add New User' : ''}
        </Button>
      </Space>

      {loading ? (
        <Spin tip="Loading..." size="large" />
      ) : (
        <Table
          scroll={{ x: true }}
          columns={getColumns(handleEditClick)}
          dataSource={users}
          rowKey={(record) => record.id}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            position: ["topRight", "bottomRight"],
            showTotal: ((total) => `Total Users: ${total}`)
          }}
          onChange={handleTableChange}
          style={{
            backgroundColor: theme.colorBg,
            borderRadius: theme.table.borderRadius,
            padding: theme.table.padding,
          }}
        />
      )}
      {isModalVisible && <AddUserModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(null)}
        onFinish={onFinishAddUser}
      />}
      {editingUser && (
        <EditUserModal
          visible={!!editingUser}
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onEditUser={onEditUser}
        />
      )}
      <Message message={message} fireNotification={fireNotification} />
    </div>
    </>
  );
};

export default UserTable;
