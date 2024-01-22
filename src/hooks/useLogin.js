import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

// useSignInWithEmailAndPassword from react-firebase-hooks: to login a user with email and password.
const useLogin = () => {
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    // check if no valid inputs for email and password, return error message using Toast from chakra.
    if (!inputs.email || !inputs.password) {
      showToast("Error", "Please fill all fields!", "error");
      return;
    }
    try {
      // if found matching user in our DB, fetch user doc and set local storage,
      // then log user in by updating user interface.
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { loading, error, login };
};

export default useLogin;
// then impliment the login logic in Login.jsx component.
