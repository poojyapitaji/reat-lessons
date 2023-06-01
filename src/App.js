import categoriesData from './categories.json'
import Categories from './components/categories/categories.component';

const App = () => {
  return <Categories categories={categoriesData} />;
}

export default App;
