import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Dreamticketshow = ({ dreamticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/fundings',
    method: 'post',
    body: {
      dreamticketId: dreamticket.id,
    },
    onSuccess: (funding) =>
      Router.push('/fundings/[fundingId]', `/fundings/${funding.id}`),
  });

  return (
    <div className="mx-auto mt-5">
      <h1>{dreamticket.title}</h1>
      <h4>Price: {dreamticket.price}</h4>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary">
        Fund
      </button>
    </div>
  );
};

Dreamticketshow.getInitialProps = async (context, client) => {
  const { dreamticketId } = context.query;
  const { data } = await client.get(`/api/dreamtickets/${dreamticketId}`);

  return { dreamticket: data };
};

export default Dreamticketshow;
