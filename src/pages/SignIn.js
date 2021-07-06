import { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Text, Button, Input } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

const SignIn = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleClick = () => {
    dispatch(userActions.signInFB({ id, pw }));
  };
  return (
    <Grid>
      <Text header>로그인</Text>
      <Grid term>
        <Input
          label="아이디"
          id="sign-in__id-input"
          placeholder="아이디 입력"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="password"
          label="비밀번호"
          id="sign-in__pw-input"
          placeholder="비밀번호 입력"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </Grid>
      <Button full margin="1em 0" onClick={handleClick}>
        로그인 하기
      </Button>
    </Grid>
  );
};

export default SignIn;
