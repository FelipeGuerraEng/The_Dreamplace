import { useState } from 'react';
import { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import useRequest from '../../../hooks/use-request';

const UpdateDreamticket = ({ dreamticket }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: `/api/dreamtickets/${dreamticket.id}`,
    method: 'put',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  useEffect(() => {
    setTitle(dreamticket.title);
    setPrice(dreamticket.price);
  }, []);

  return (
    <div className="mx-auto mt-5" style={{ width: 1000 + 'px' }}>
      <div className="text-center">
        <h1>Update a Dreamticket</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        {errors}
        <button className="btn btn-primary mt-2">Submit</button>
        <Link href="/">
          <button type="button" className="btn btn-primary mt-2 ms-2">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

UpdateDreamticket.getInitialProps = async (context, client) => {
  const { dreamticketId } = context.query;
  const { data } = await client.get(`/api/dreamtickets/${dreamticketId}`);

  return { dreamticket: data };
};

export default UpdateDreamticket;
