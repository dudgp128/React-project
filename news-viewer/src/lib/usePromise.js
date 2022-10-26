import { useState, useEffect } from 'react';

export default function usePromise(promiseCreater, deps) {
  const [loading, setLoading] = useState('false');
  const [resolved, setResolve] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreater();
        setResolve(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}
