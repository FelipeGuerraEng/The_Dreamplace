import axios from 'axios';
import { useState } from 'react';

const useSecondRequest = ({ url, method, body, onSuccess }) => {
  const [error, setError] = useState(null);

  const doSecondRequest = async (props = {}) => {
    try {
      setError(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setError(
        <div className="alert alert-danger">
          <h4>Something happened...</h4>
          <ul className="my-0"></ul>
        </div>
      );
    }
  };

  return { doSecondRequest, error };
};

export default useSecondRequest;
