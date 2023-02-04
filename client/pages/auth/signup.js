import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import useSecondRequest from '../../hooks/use-Secondrequest';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      userName,
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });
  const { doSecondRequest, error } = useSecondRequest({
    url: '/mail/credentials',
    method: 'post',
    body: {
      to: email,
      name: userName,
      username: userName,
      password,
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const result = await doRequest();

    if (result) {
      await doSecondRequest();
    }
  };

  return (
    <div className="mx-auto mt-5" style={{ width: 1000 + 'px' }}>
      <div className="text-center">
        <h1>Sign Up</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>User Name</label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        {errors}
        {error}
        <button className="btn btn-primary mt-2">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
