import { useState } from "react";

export const useLoading = () => {
  const [loading, setLoading] = useState(true);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return { loading, startLoading, stopLoading };
};
