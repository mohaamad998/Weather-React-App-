import { useCallback, useReducer } from 'react';
import { CustomeError } from '../libs/error';

const reqReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { data: [], error: null, isLoading: action.isLoading };

    case 'error':
      return { ...state, error: action.customError, isLoading: false };

    case 'data':
      return { error: null, data: action.data, isLoading: false };
  }
};

const useHttp = () => {
  const [req, dispatchReq] = useReducer(reqReducer, {
    isLoading: false,
    error: null,
    data: [],
  });

  const sendReq = useCallback(async (request) => {
    console.log('sent');
    dispatchReq({ type: 'loading', isLoading: true });
    try {
      const data = await request();
      dispatchReq({ type: 'data', data });
    } catch (error) {
      let customError = { message: error.message };
      if (error instanceof CustomeError)
        customError = { message: error.message, status: error.status };

      dispatchReq({ type: 'error', customError });
    }
  }, []);

  return { sendReq, ...req };
};

export default useHttp;
