import React, { useState } from "react";

const useCustomFetch = (url: string, method: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const customFetch = async (token?: string, body?: Object) => {
    setLoading(true);
    console.log(url, body, method);
    try {
      const response = await fetch(url, {
        body: JSON.stringify(body),
        method: method,
        headers: {
          "Application-Type": "application/json",
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(errorMessage);
      }
      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error: any) {
      let errorObject;
      try {
        errorObject = JSON.parse(error.message);
      } catch (parseError) {
        errorObject = { message: error.message };
      }
      setError(errorObject);
      console.log(errorObject);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, customFetch };
};

export default useCustomFetch;
