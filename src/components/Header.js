import styled from "styled-components";

import { Button, Image, Grid } from "../elements";
import { history } from "../redux/configStore";

const Header = () => {
  // return (
  //   <Grid flex>
  //     <Image avatar />
  //     <Grid flex term>
  //       <Button>내정보</Button>
  //       <Button onClick={() => history.push("/notice")}>알림</Button>
  //       <Button>로그아웃</Button>
  //     </Grid flex term>
  //   </Grid>
  // );
  return (
    <Grid flex>
      <Image avatar />
      <Grid flex term>
        <Button onClick={() => history.push("/signin")}>로그인</Button>
        <Button onClick={() => history.push("/signup")}>회원가입</Button>
      </Grid>
    </Grid>
  );
};

export default Header;
