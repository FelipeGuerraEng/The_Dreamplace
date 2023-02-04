import Router from 'next/router';
import Link from 'next/link';
import useRequest from '../../../hooks/use-request';

const DeleteDreamticket = ({ dreamticket }) => {
  const { doRequest, errors } = useRequest({
    url: `/api/dreamtickets/${dreamticket.id}`,
    method: 'delete',
    onSuccess: () => Router.push('/'),
  });

  return (
    <div className="mx-auto mt-5" style={{ width: 1000 + 'px' }}>
      <div className="text-left">
        <h1>Delete {dreamticket.title} Dreamticket?</h1>
      </div>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary mt-2">
        yes
      </button>
      <Link href="/">
        <button type="button" className="btn btn-primary mt-2 ms-2">
          no
        </button>
      </Link>
    </div>
  );
};

DeleteDreamticket.getInitialProps = async (context, client) => {
  const { dreamticketId } = context.query;
  const { data } = await client.get(`/api/dreamtickets/${dreamticketId}`);

  return { dreamticket: data };
};

export default DeleteDreamticket;
