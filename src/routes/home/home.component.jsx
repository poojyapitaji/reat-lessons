import Categories from '../../components/categories/categories.component';
import categoriesData from './categories.json';

const Home = () => {
  return <Categories categories={categoriesData} />;
};

export default Home;
