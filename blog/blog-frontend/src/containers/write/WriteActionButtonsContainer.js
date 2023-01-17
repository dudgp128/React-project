import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { writePost } from '../../modules/write';
import { useEffect } from 'react';

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, body, tags, post, postError } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
  }));

  const onPublish = () => {
    dispatch(writePost({ title, body, tags }));
  };

  const onCancel = () => {
    navigate(-1);
  };

  // post success/failure
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      console.log(user.username, _id);
      navigate(`/${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [postError, post, navigate]);

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};
export default WriteActionButtonsContainer;
