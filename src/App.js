import {useState, useEffect} from 'react';
import Collection from './components/Collection';
import './index.scss';
function App() {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ];

  useEffect(() => {
    setIsLoading(true);

    const categoryId = category ? `category=${category}` : '';
    const pageId = `page=${page}`;

    fetch(`https://63ce48376d27349c2b6a7c52.mockapi.io/photo_collections?${pageId}&limit=3&${categoryId}`)
          .then(res => res.json())
          .then(json => {
            setCollections(json);
          })
          .catch(err => {
            console.warn(err);
          })
          .finally(() => {
            setIsLoading(false);
          })
  }, [category, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((item, index) => {
            return (
              <li onClick={() => setCategory(index)} className={category === index ? 'active' : ''} 
                  key={item.name}>{item.name}</li>
            )
          })}
        </ul>
        <input value={searchValue} 
               onChange={e => setSearchValue(e.target.value)} 
               className="search-input" 
               placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? <h2>Идет загрузка...</h2> : 
        collections.filter(item => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        }).map((item, index) => {
          return (
            <Collection key={index} name={item.name} images={item.photos}/>
          )
        })}
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((item, i) => {
            return ( 
              <li onClick={() => setPage(i + 1)}
                  key={i + 1} 
                  className={page === (i + 1) ? 'active' : ''}>
                {i + 1}
              </li> 
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
