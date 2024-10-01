export const formFields = [
    {
        name: 'name',
        label: 'Name',
        rules: [{ required: true, message: 'Please input the full name!' }],
        component: 'Input',
    },
    {
        label: 'Surname',
        name: 'surname',
        component: 'Input',
        rules: [{ required: true, message: 'Please input the surname!' }],
    },
    {
        name: 'email',
        label: 'Email Address',
        rules: [{ required: true, message: 'Please input the email address!' }],
        component: 'Input',
    },
    {
        name: 'password',
        label: 'Password',
        rules: [{ required: true, message: 'Please input the password!' }],
        component: 'Input.Password',
    },
    {
        label: 'Phone',
        name: 'phone',
        component: 'Input',
        rules: [{ required: true, message: 'Please input the phone!' }],
    },
    {
        label: 'Age',
        name: 'age',
        component: 'Input',
        rules: [{ required: true, message: 'Please input the age!' }],
    },
    {
        label: 'Country',
        name: 'country',
        component: 'Input',
        rules: [{ required: true, message: 'Please input the country!' }],
    },
    {
        label: 'District',
        name: 'district',
        component: 'Input',
        rules: [{ required: true, message: 'Please input the district!' }],
    },
    {
        label: 'Role',
        name: 'role',
        component: 'Select',
        rules: [{ required: true, message: 'Please select the role!' }],
        data: [{ value: 'ADMIN', label: 'Admin' }, { value: 'USER', label: 'User' }]
    },
];