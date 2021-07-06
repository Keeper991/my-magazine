import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = (props) => {
  const session = sessionStorage.getItem(
    `firebase:authUser:${apiKey}:[DEFAULT]`
  );
  const isSignIn = useSelector((store) => store.user.isSignIn);

  if (session && isSignIn) {
    return <>{props.children}</>;
  }
  return null;
};

export default Permit;
