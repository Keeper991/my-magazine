import { useDispatch, useSelector } from "react-redux";

import { Button, Image, Grid } from "../elements";
import { history } from "../redux/configStore";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = () => {
  const isSignIn = useSelector((store) => store.user.isSignIn);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(userActions.signOutFB());
  };

  if (isSignIn) {
    return (
      <Grid flex>
        <Image avatar />
        <Grid flex term>
          <Button>내정보</Button>
          <Button onClick={() => history.push("/notice")}>알림</Button>
          <Button onClick={handleSignOut}>로그아웃</Button>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid flex>
        <Image avatar />
        <Grid flex term>
          <Button onClick={() => history.push("/signin")}>로그인</Button>
          <Button onClick={() => history.push("/signup")}>회원가입</Button>
        </Grid>
      </Grid>
    );
  }
};

export default Header;
