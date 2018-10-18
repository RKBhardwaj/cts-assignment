import React, { Component } from "react";
import axios from 'axios';
import PearsonUsersView from './PearsonUsersView';

const compare = (a,b) => {
  if(a.id < b.id) {
    return -1;
  }
  if(a.id > b.id) {
    return 1;
  }
  return 0;
};

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ]
    };
    this.displayUsers = this.displayUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.removeDuplicateUsers = this.removeDuplicateUsers.bind(this);
  }

  componentWillMount() {
    this.displayUsers();
  }

  displayUsers() {
    const self = this;
    axios
        .get("https://reqres.in/api/users?page=1&per_page=10")
        .then(function(result) {
          const users = [...self.state.users, ...result.data.data];
          self.removeDuplicateUsers(users);
        })  
  }

  deleteUser(id) {
    const { users } = this.state;
    users.splice(users.findIndex((el) => {
      return el.id === id;
    }), 1);
    this.setState({ users });
  }

  removeDuplicateUsers(users) {
    users = users.filter((user, index, self) =>
      index === self.findIndex((t) => (
        t.id === user.id
      ))
    );
    users.sort(compare);
    this.setState({ users });
  }

  render() {
    return (
      <PearsonUsersView
        { ...this.state }
        deleteUser={this.deleteUser}
      />
    );
  }
}
