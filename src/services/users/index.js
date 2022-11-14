import { request } from '../../api';
import { setUsers, removeUser } from '../../store/users';

export function fetchUsers(query) {
  return async (dispatch) => {
    return request('/users', null, query).then((res) =>
      dispatch(setUsers(res)),
    );
  };
}

export function deleteUser(id) {
  return async (dispatch) => {
    return request(`/users/${id}`).then((res) => dispatch(removeUser(res)));
  };
}
