import React, { useState } from "react";

const useCustomFetch = (url: string, method: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const customFetch = async (token?: string, body?: Object) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        body: JSON.stringify(body),
        method: method,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, customFetch };
};

export default useCustomFetch;
