import { UserOutlined, UsergroupAddOutlined, SnippetsOutlined, ClockCircleOutlined, AlignCenterOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Link from 'next/link';

const menuItems = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: <Link href="/">Users</Link>,
    },
    {
        key: '2',
        icon: <UnorderedListOutlined />,
        label: <Link href="/">Mock Menu Item 1</Link>,
    },
    {
        key: '3',
        icon: <SnippetsOutlined />,
        label: <Link href="/">Mock Menu Item 2</Link>,
    },
    {
        key: '4',
        icon: <ClockCircleOutlined />,
        label: <Link href="/">Mock Menu Item 3</Link>,
    },
    {
        key: '5',
        icon: <AlignCenterOutlined />,
        label: <Link href="/">Mock Menu Item 4</Link>,
    },
]

export default menuItems;