import React from "react";
import { shallow } from "enzyme";
import { PearsonUsers } from "./PearsonUsers";
import axios from 'axios';
import PearsonUsersView from "./PearsonUsersView";

const defaultNewUserList = [
  { id: 1, name: "A" }, 
  { id: 2, name: "B" }, 
  { id: 3, name: "B" }, 
  { id: 4, name: "D" },
  { id: 5, name: "E" },
  { id: 6, name: "F" },
  { id: 7, name: "G" },
  { id: 8, name: "H" },
  { id: 9, name: "I" },
  { id: 10, name: "J" }
];

jest.mock('axios');
const result = {
  data: {
    data: defaultNewUserList
  }
};

describe("PearsonUsers", () => {
  axios.get.mockImplementation(() => Promise.resolve(result));
  let component;
  let instance;
  let viewWrapper;

  const usersList = [{ id: 1, name: "A" }, { id: 2, name: "B" }, { id: 2, name: "B" }, { id: 3, name: "D" }];

  beforeEach(() => {
    component = shallow(<PearsonUsers />);
    instance = component.instance();
  });

  it('should get the list of users', () => {
    const { state } = instance;
    expect(state.users.length).toEqual(defaultNewUserList.length);
  });

  it("renders a h1", () => {
    viewWrapper = shallow(<PearsonUsersView
      users={usersList}
      deleteUser={instance.deleteUser}
    />);
    const h1 = viewWrapper.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  it('should renders the list of the users', () => {
    viewWrapper = shallow(<PearsonUsersView
      users={usersList}
      deleteUser={instance.deleteUser}
    />);
    const listContainer = viewWrapper.find(".user-container").children();
    expect(listContainer.length).toEqual(usersList.length)
  });

  it('should display the user first name, last name and avatar', () => {
    const listUsers = [{
      id: 4,
      first_name: "Eve",
      last_name: "Holt",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
    }];
    viewWrapper = shallow(<PearsonUsersView
      users={listUsers}
      deleteUser={instance.deleteUser}
    />);
    const listContainer = viewWrapper.find(".user-container").children();
    const [user] = listUsers;
    const name = listContainer.find('h3');
    const img = listContainer.find('img');
    expect(name.text()).toEqual(`${user.first_name} ${user.last_name}`);
    expect(img.prop('src')).toEqual(user.avatar);
  });

  it("should remove the duplicate user from the users list", () => {
    const expectedUserList = [{ id: 1, name: "A" }, { id: 2, name: "B" }, { id: 3, name: "D" }];
    instance.removeDuplicateUsers(usersList);
    const { state } = instance;
    expect(state.users).toEqual(expectedUserList);
  });

  it("should delete the user from the users list", () => {
    const usersList = [{ id: 1, name: "A" }, { id: 2, name: "B" }, { id: 3, name: "C" }, { id: 4, name: "D" }];
    instance.state.users = usersList;
    const expectedUserList = [{ id: 1, name: "A" }, { id: 2, name: "B" }, { id: 4, name: "D" }];
    instance.deleteUser(3);
    const { state } = instance;
    expect(state.users).toEqual(expectedUserList);
  });
});
