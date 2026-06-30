import { useState } from "react";

export function useToggle(): [boolean, () => void] {
  const [state, setState] = useState(false);

  const toggle: () => void = () => setState(!state);

  return [state, toggle];
}
