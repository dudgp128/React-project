import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostViewer from '../../components/post/PostViewer';
import { readPost, unloadPost } from '../../modules/post';

const PostViewerContainer = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
  }));

  return <PostViewer post={post} error={error} loading={loading} />;
};

// URL 파라미터로 받은 id 값을 조회해야 하기 때문에 withRouter도 함께 사용
export default PostViewerContainer;
