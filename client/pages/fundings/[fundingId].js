import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Link from 'next/link';

const FundingShow = ({ funding, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      fundingId: funding.id,
    },
    onSuccess: () => Router.push('/fundings'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(funding.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [funding]);

  if (timeLeft < 0) {
    return (
      <div className="mx-auto mt-5" style={{ width: 1000 + 'px' }}>
        <h1>Funding Timeout</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-5" style={{ width: 1000 + 'px' }}>
      <h1>Time left to pay: {timeLeft} seconds</h1>
      <div className="mx-auto mt-2">
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_51MK94cD8sVmuO7eNAfymQHljIgAZrmeJYNCUaFRjpC4GrLIURGw8jwp47EB1YCQQ0VV2mqc28MBIIs761ZBU4xyw00I7fClfcy"
          amount={funding.dreamticket.price * 100}
          email={currentUser.email}
        />
        <Link href="/fundings">
          <button
            type="button"
            onClick={() => setTimeLeft(0)}
            variant="contained"
            className="btn btn-primary ms-2"
          >
            Cancel
          </button>
        </Link>
      </div>
      {errors}
    </div>
  );
};

FundingShow.getInitialProps = async (context, client) => {
  const { fundingId } = context.query;
  const { data } = await client.get(`/api/fundings/${fundingId}`);

  return { funding: data };
};

export default FundingShow;
