import { Grid, Text, Button, Input } from "../elements";

const SignUp = () => {
  return (
    <Grid>
      <Text header>회원가입</Text>
      <Grid term>
        <Input
          label="아이디"
          id="sign-up__id-input"
          placeholder="아이디 입력"
        />
        <Input
          label="닉네임"
          id="sign-up__nick-input"
          placeholder="닉네임 입력"
        />
        <Input
          label="비밀번호"
          id="sign-up__pw-input"
          placeHolder="비밀번호 입력"
        />
        <Input
          label="비밀번호 확인"
          id="sign-up__pwc-input"
          placeholder="비밀번호 확인 입력"
        />
      </Grid>
      <Button full margin="1em 0">
        회원가입 하기
      </Button>
    </Grid>
  );
};

export default SignUp;
