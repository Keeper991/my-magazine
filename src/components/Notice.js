import { Grid, Image, Text } from "../elements";

const Notice = () => {
  return (
    <>
      <Grid flex term justifyContent="flex-start">
        <Image avatar url="https://i.imgur.com/vlFwCsZ.jpg" />
        <Grid>
          <Text bold>breadman</Text>
          <Text>님이 게시글에 좋아요를 눌렀습니다.</Text>
        </Grid>
      </Grid>
    </>
  );
};

export default Notice;
