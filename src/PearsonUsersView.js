import React from 'react';

const PearsonUsersView = (props) => {
    const {
        users,
        deleteUser
    } = props;

    const userView = users.length > 0 ? users.map(user => (
        <div key={user.id} className="user-content">
            <div className="avatar"><img src={user.avatar} alt={user.avatar} /></div>
            <h3>{`${user.first_name} ${user.last_name} `}</h3>
            <button
                className="delete"
                onClick={() => deleteUser(user.id)}
            >
                Delete
            </button>
        </div>
    )) : (
        <div className="no-user-content">
            No Users
        </div>
    );

    return (
        <div className="pearon-users">
            <h1>Pearson User Management</h1>
            <div className="user-container">
                {userView}
            </div>
        </div>
    )
};

export default PearsonUsersView;