const FundingIndex = ({ fundings }) => {
  const fundingList = fundings.map((funding) => {
    return (
      <tr key={funding.id}>
        <td>{funding.dreamticket.title}</td>
        <td>{funding.dreamticket.userName}</td>
        <td>{funding.status === 'created' ? 'canceled' : funding.status}</td>
      </tr>
    );
  });

  if (fundingList.length > 0) {
    return (
      <div className="mx-auto mt-4" style={{ width: 1000 + 'px' }}>
        <h1>My Fundings</h1>
        <div className="mx-auto mt-2" style={{ width: 1000 + 'px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Dreamer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{fundingList}</tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto mt-4">
        <h1>You have not made any fundings yet</h1>
      </div>
    );
  }
};

FundingIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/fundings');

  return { fundings: data };
};

export default FundingIndex;
