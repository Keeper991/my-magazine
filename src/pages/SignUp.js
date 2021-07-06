import { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Text, Button, Input } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

const SignUp = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [pwc, setPwc] = useState("");

  const handleClick = () => {
    if (pw !== pwc) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    dispatch(userActions.signUpFB({ id, pw, name }));
  };
  return (
    <Grid>
      <Text header>회원가입</Text>
      <Grid term>
        <Input
          label="아이디"
          id="sign-up__id-input"
          placeholder="아이디 입력"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          label="닉네임"
          id="sign-up__name-input"
          placeholder="닉네임 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          label="비밀번호"
          id="sign-up__pw-input"
          placeholder="비밀번호 입력"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <Input
          type="password"
          label="비밀번호 확인"
          id="sign-up__pwc-input"
          placeholder="비밀번호 확인 입력"
          value={pwc}
          onChange={(e) => setPwc(e.target.value)}
        />
      </Grid>
      <Button full margin="1em 0" onClick={handleClick}>
        회원가입 하기
      </Button>
    </Grid>
  );
};

export default SignUp;
