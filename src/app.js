export default function App() {
  return (
    <FilterableProductTable/>
  );
}

function FilterableProductTable(){
  return(
    <div> 
      <SearchBar/>
      <br />
      <ProductTable/>
    </div>
  );
}

function SearchBar() {
  return (
    <div>
      <input type="text" placeholder="Search..." />
      <br/>
      <label>
        <input type="checkbox" />
        Only show products in stock
      </label>
    </div>
  )
}

function ProductTable() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <br />
        <tbody>
          <ProductCateGoryRow category="Sporting Goods" />
          <ProductRow name="Football" price="$49.99" />
          <ProductRow name="Baseball" price="$9.99" />
          <br />
          <ProductCateGoryRow category="Electronics" />
          <ProductRow name="iPod Touch" price="$99.99" />
          <ProductRow name="iPhone 5" price="$399.99" />
        </tbody>
      </table>
    </div>
  );
}

function ProductCateGoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ name, price }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
}