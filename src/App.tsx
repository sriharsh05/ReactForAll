import React, {useEffect, useState} from "react";
import AppRouter from "./router/AppRouter";
import { me } from "./utils/apiUtils";
import { User } from "./types/userTypes";
import LoginRouter from "./router/LoginRouter";
import AppContainer from "./components/AppContainer";

const  getCurrentUser = async (setCurrentUser:(currentUser: User) => void ) => {
  const currentUser = await me();
  if (currentUser.username === "") {
    localStorage.removeItem("token");
  }
  setCurrentUser(currentUser);
}

function App() {
  const [currentUser, setCurrentUser] = useState<User>({
    username: null,
    url: "",
    name: "",
  });

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <AppContainer currentUser={currentUser}>
      {currentUser.username && currentUser.username?.length > 0 ? (
        <AppRouter />
      ) : (
        <LoginRouter />
      )}
    </AppContainer>
  );
}


export default App;
 