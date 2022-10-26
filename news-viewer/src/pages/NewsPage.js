import { useParams } from 'react';
import { Router } from 'react-router-dom';
import NewsList from '../components/NewsList';

const NewsPage = () => {
  const params = useParams;
  const category = params.category || 'all';

  return (
    <Router>
      <Router path="/" element={<NewsList />} />
      <Router path="/:category" element={<NewsList />} />
    </Router>
  );
};

export default NewsPage;
