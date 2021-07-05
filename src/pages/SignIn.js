import { Grid, Text, Button, Input } from "../elements";
const SignIn = () => {
  return (
    <Grid>
      <Text header>로그인</Text>
      <Grid term>
        <Input
          label="아이디"
          id="sign-in__id-input"
          placeholder="아이디 입력"
        />
        <Input
          label="비밀번호"
          id="sign-in__pw-input"
          placeholder="비밀번호 입력"
        />
      </Grid>
      <Button full margin="1em 0">
        로그인 하기
      </Button>
    </Grid>
  );
};

export default SignIn;
