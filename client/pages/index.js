import Link from 'next/link';

const LandingPage = ({ currentUser, dreamtickets }) => {
  const dreamticketList = dreamtickets.map((dreamticket) => {
    if (!dreamticket.fundingId) {
      return (
        <tr key={dreamticket.id}>
          <td>{dreamticket.title}</td>
          <td>{dreamticket.price}</td>
          <td>{dreamticket.userName}</td>
          <td>
            {currentUser.userName != dreamticket.userName && (
              <Link
                href="/dreamtickets/[dreamticketId]"
                as={`/dreamtickets/${dreamticket.id}`}
              >
                <a>fund</a>
              </Link>
            )}
          </td>
          <td>
            {currentUser.userName === dreamticket.userName && (
              <Link
                href="/dreamtickets/update/[dreamticketId]"
                as={`/dreamtickets/update/${dreamticket.id}`}
              >
                <a>Update</a>
              </Link>
            )}
          </td>
          <td>
            {currentUser.userName === dreamticket.userName && (
              <Link
                href="/dreamtickets/delete/[dreamticketId]"
                as={`/dreamtickets/delete/${dreamticket.id}`}
              >
                <a>Delete</a>
              </Link>
            )}
          </td>
        </tr>
      );
    }
  });

  return (
    <div className="mx-auto mt-4" style={{ width: 1000 + 'px' }}>
      <h1>Dreamtickets</h1>
      <div className="mx-auto mt-2" style={{ width: 1000 + 'px' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Dreamer</th>
              <th>Fund</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{dreamticketList}</tbody>
        </table>
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/dreamtickets');

  return { dreamtickets: data };
};

export default LandingPage;
