import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Image, Text, Input, Button, Select } from "../elements";
import Upload from "../shared/Upload";
import Reject from "../shared/Reject";
import { actionCreators as postActions } from "../redux/modules/post";

const PostForm = () => {
  const isSignIn = useSelector((store) => store.user.isSignIn);
  const dispatch = useDispatch();
  const preview = useSelector((store) => store.image.preview);
  const [content, setContent] = useState("");
  const [layout, setLayout] = useState("Bottom");
  const options = ["Bottom", "Right", "Left"];

  if (!isSignIn) {
    return <Reject />;
  }

  const handleClick = () => {
    const newPost = {
      content,
      layout,
    };

    dispatch(postActions.addPostFB(newPost));
  };
  return (
    <Grid>
      <Text header>게시글 작성</Text>
      <Upload />
      <Text header>미리보기</Text>
      {layout === "Bottom" ? (
        <Grid>
          <Text>{content}</Text>
          <Image url={preview} />
        </Grid>
      ) : layout === "Right" ? (
        <Grid flex>
          <Text half>{content}</Text>
          <Image half url={preview} />
        </Grid>
      ) : (
        <Grid flex flexDirection="row-reverse">
          <Text half>{content}</Text>
          <Image half url={preview} />
        </Grid>
      )}
      <Grid flex>
        <Select
          label="레이아웃"
          options={options}
          onChange={(e) => setLayout(e.target.value)}
        />
      </Grid>
      <Grid>
        <Input
          label="게시글 내용"
          id="content-input"
          multiLine
          placeholder="게시글 작성"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Grid>
      {preview && content ? (
        <Button full onClick={handleClick}>
          게시글 작성
        </Button>
      ) : (
        <Button full onClick={handleClick} disabled>
          게시글 작성
        </Button>
      )}
    </Grid>
  );
};

export default PostForm;
