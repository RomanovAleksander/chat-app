import {useState, useCallback} from 'react';

interface IUseHttp {
  loading: boolean,
  request: (
      url: string, method?: string, body?: any,
      headers?: {Authorization?: string, "Content-Type"?: string}
  ) => Promise<any>
  error: string | null,
  clearError: () => void
}

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (url: string, method: string = 'GET', body: any = null,
                                     headers: { Authorization?: string, 'Content-Type'?: string } = {}) => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {method, body, headers});
      const data: any = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setLoading(false);
      return data;
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const values: IUseHttp = { loading, request, error, clearError };

  return values
};
