import { useEffect, useState } from "react";

export default function useAsync({
  fn = () => {},
  onSuccess = () => {},
  onError = () => {},
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState({});
  const [success, setSuccess] = useState(false);
  async function main(data) {
    try {
      setLoading(true);
      const response = await fn(data);
      setResult(response);
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (success) onSuccess();
    if (error) onError();
    return () => reset();
  }, [success, error]);

  function reset() {
    setError(null);
    setLoading(false);
    setSuccess(false);
    setResult(null);
  }

  return { reset, loading, error, result, main, success };
}
