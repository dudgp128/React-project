import { useDispatch, useSelector } from 'react-redux';
import TagBox from '../../components/write/TagBox';
import { changeField } from '../../modules/write';

const TagBoxContainer = () => {
  const tags = useSelector((state) => state.write.tags);
  const dispatch = useDispatch();

  const onChangeTags = (nextTags) =>
    dispatch(changeField({ key: 'tags', value: nextTags }));

  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};
export default TagBoxContainer;
