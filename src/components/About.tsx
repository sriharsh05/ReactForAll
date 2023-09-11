import { navigate } from "raviger";
import React, { useEffect, useRef } from "react";

export default function About() {
  const documentRef = useRef(document);
  const onKeyPressHandler = (event: KeyboardEvent) => {
    if (event.shiftKey === true) {
      if (event.key === "H") {
        navigate("/");
      }
      if (event.key === "L") {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    documentRef.current.addEventListener("keydown", onKeyPressHandler);
    documentRef.current.addEventListener("keyup", onKeyPressHandler);
    return () => {
      documentRef.current.removeEventListener("keydown", onKeyPressHandler);
      documentRef.current.removeEventListener("keyup", onKeyPressHandler);
    };
  }, [onKeyPressHandler]);

  return (
    <div>
      <h2>About Page</h2>
    </div>
  );
}
