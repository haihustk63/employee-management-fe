import { useCallback, useState } from "react";

export const useCallbackWithRef = () => {
  const [customRef, setCustomRef] = useState<any>();

  const ref = useCallback((node: any) => {
    setCustomRef(node);
  }, []);

  return { ref, customRef };
};
