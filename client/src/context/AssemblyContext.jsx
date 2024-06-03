import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const AssemblyContext = createContext();

const assemblyReducer = (state, action) => {
  switch (action.type) {
    case 'START_ASSEMBLY':
      return {
        ...state,
        currentAssembly: action.payload,
        error: null, // Clear error on successful operation
      };
    case 'END_ASSEMBLY':
      return {
        ...state,
        currentAssembly: null,
        error: null, // Clear error on successful operation
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AssemblyProvider = ({ children }) => {
  const initialState = {
    currentAssembly: null,
    error: null,
  };

  const [state, dispatch] = useReducer(assemblyReducer, initialState);

  const getToken = () => localStorage.getItem('token');

  const startAssembly = async (bikeType) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      
      const res = await axios.post(
        'http://localhost:4000/api/assembly/start', // Use relative URL
        { bikeType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      dispatch({
        type: 'START_ASSEMBLY',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err.response ? err.response.data.msg : err.message, // Include error message
      });
    }
  };

  const endAssembly = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      
      await axios.post(
        'http://localhost:4000/api/assembly/end', // Use relative URL
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      dispatch({
        type: 'END_ASSEMBLY',
      });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err.response ? err.response.data.msg : err.message, // Include error message
      });
    }
  };

  return (
    <AssemblyContext.Provider
      value={{
        ...state,
        startAssembly,
        endAssembly,
      }}
    >
      {children}
    </AssemblyContext.Provider>
  );
};

export const useAssembly = () => useContext(AssemblyContext);

export default AssemblyContext;
