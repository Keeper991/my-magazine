import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button, Input } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configStore";

const SignUp = () => {
  const dispatch = useDispatch();
  const isSigning = useSelector((store) => store.user.isSigning);
  const isSignIn = useSelector((store) => store.user.isSignIn);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [pwc, setPwc] = useState("");
  const isAble = useRef(true);

  useEffect(() => {
    if (isSignIn) {
      history.replace("/");
    }
  }, [isSignIn]);

  useEffect(() => {
    if (!id.includes("@")) {
      isAble.current = false;
    } else if (!id.split("@")[1].includes(".")) {
      isAble.current = false;
    } else {
      isAble.current = true;
    }
  }, [id]);

  const handleClick = () => {
    if (pw !== pwc) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isAble) {
      alert("이메일 형식에 맞지 않습니다.");
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
      {isSigning || !id || !name || !pw || !pwc ? (
        <Button full margin="1em 0" onClick={handleClick} disabled>
          회원가입 하기
        </Button>
      ) : (
        <Button full margin="1em 0" onClick={handleClick}>
          회원가입 하기
        </Button>
      )}
    </Grid>
  );
};

export default SignUp;
