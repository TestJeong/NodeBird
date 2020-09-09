import { useState, useCallback } from "react";

export default (init = null) => {
  const [value, setValue] = useState(init);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};
