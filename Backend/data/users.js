import bcrypt from 'bcryptjs';

const users =[
    {name: 'Admin User',
     email: 'admin@email.com',
     password: bcrypt.hashSync('12345', 10),
     isAdmin: true,
    },

    {name: 'jo jo',
     email: 'jo@email.com',
     password: bcrypt.hashSync('12345', 10),
     isAdmin: false,
    } ,

    {name: 'Bob Bob',
     email: 'bob@email.com',
     password: bcrypt.hashSync('12345', 10),
     isAdmin: false,
    },
];


export default users;