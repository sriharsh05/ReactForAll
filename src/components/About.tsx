import { navigate } from "raviger";
import React, {  useCallback, useEffect } from "react";

export default function About() { 

  const onKeyPressHandler = useCallback((event: KeyboardEvent) => {
    if (event.shiftKey === true) {
      if (event.key === "H") {
        navigate("/");
      }
      if (event.key === "L") {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener("keydown", onKeyPressHandler);
    document.addEventListener("keyup", onKeyPressHandler);
    return () => {
      document.removeEventListener("keydown", onKeyPressHandler);
      document.removeEventListener("keyup", onKeyPressHandler);
    };
  }, [onKeyPressHandler]);
  
  return (
    <div>
      <h2>About Page</h2>
    </div>
  );
}
