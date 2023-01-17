import { useDispatch, useSelector } from 'react-redux';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { writePost } from '../../modules/write';

const WriteActionButtonsContainer = () => {
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

  return <WriteActionButtons onPublish={onPublish} />;
};
export default WriteActionButtonsContainer;
