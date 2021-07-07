import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Image, Text, Input, Button, Select } from "../elements";
import Upload from "../shared/Upload";
import Reject from "../components/Reject";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostForm = (props) => {
  const dispatch = useDispatch();
  const isSignIn = useSelector((store) => store.user.isSignIn);
  const isUploading = useSelector((store) => store.post.isUploading);
  const preview = useSelector((store) => store.image.preview);
  const postList = useSelector((store) => store.post.list);
  const [content, setContent] = useState("");
  const [layout, setLayout] = useState("Bottom");
  const options = ["Bottom", "Right", "Left"];
  const page = props.match.path;
  const id = props.match.params.id;

  useEffect(() => {
    if (page === "/edit/:id") {
      const postIdx = postList.findIndex((post) => post.id === id);
      if (postIdx !== -1) {
        const post = postList[postIdx];
        setContent(post.content);
        setLayout(post.layout);

        dispatch(imageActions.setPreview(post.imgUrl));
      }
    }
  }, [page, postList, dispatch, id]);

  if (!isSignIn) {
    return <Reject />;
  }

  const handleClick = () => {
    const newPost = {
      content,
      layout,
    };

    if (page === "/edit/:id") {
      dispatch(postActions.editPostFB(id, newPost));
    } else {
      dispatch(postActions.addPostFB(newPost));
    }
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
          value={layout}
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
      {preview && content && !isUploading ? (
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
