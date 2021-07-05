import { Grid, Image, Text, Input, Button } from "../elements";
import Upload from "../shared/Upload";

const PostForm = () => {
  return (
    <Grid>
      <Text header>게시글 작성</Text>
      <Upload />
      <Text header>미리보기</Text>
      <Image />
      <Grid>
        <Input
          label="게시글 내용"
          id="content-input"
          multiLine
          placeholder="게시글 작성"
        />
      </Grid>
      <Button full>게시글 작성</Button>
    </Grid>
  );
};

export default PostForm;
