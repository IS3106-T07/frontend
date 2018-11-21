import config from 'config';

import { authHeader } from '../_helpers';
import {
    generateToken
} from '../_helpers/authorization';
import { handleUpdateResponse, handleCreateResponse } from '../_helpers/handleResponse';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
  const user = {
    email: email,
    password: password
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/webresources/customers/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      console.log('#######');
      console.log(JSON.stringify(user, undefined, 2));

      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/webresources/customers`, requestOptions)
      .then(handleResponse)
      .then(
        users => {
            console.log(JSON.stringify(users,undefined,2));
            return users;
        }
      );
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  fetch(`${config.apiUrl}/webresources/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email:user.email, password:user.password, active:true, userType:user.userType})
  })
    .then(handleCreateResponse)
    .then(
      user => {
        console.log(JSON.stringify(user, undefined, 2));
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
    )
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        if (!response.ok) {
            console.log("OK OK");
            if (response.status === 401) {
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        const data = JSON.parse(text);
        return data;
    });
}
