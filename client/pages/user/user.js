import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useRequest from '../../hooks/use-request';

const UserInfo = ({ currentUser }) => {
  const [data, setData] = useState([]);

  const { doRequest, errors } = useRequest({
    url: 'mail/',
    method: 'get',
    onSuccess: () =>
      setData(
        doRequest.data.filter((item) => item.name == currentUser.userName)
      ),
  });

  return (
    <div>
      <div className="mx-auto mt-5">
        <h1>User info</h1>
        <h3>User Name: {currentUser.userName}</h3>
        <h3>Email: {currentUser.email}</h3>
      </div>
      <div className="mx-auto mt-4" style={{ width: 1000 + 'px' }}>
        <h1>My Sessions</h1>
        <div className="mx-auto mt-2" style={{ width: 1000 + 'px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Session time and date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {errors}
      </div>
    </div>
  );
};
export default UserInfo;
