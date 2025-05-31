export default function App() {
  return <FilterableProductTable products={PRODUCTS}/>;
}

function FilterableProductTable({products}) {
  return(
    <div> 
      <SearchBar/>
      <br />
      <ProductTable products = {products}/>
    </div>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <br/>
      <label>
        <input type="checkbox" />
        Only show products in stock
      </label>
    </form>
  )
}

function ProductTable({ products }) {
  // Group products by category
  const categoryMap = {};

  products.forEach(product => {
    if (!categoryMap[product.category]) {
      categoryMap[product.category] = [];
    }
    categoryMap[product.category].push(product);
  });

  // Build rows grouped by category
  const rows = [];
  Object.keys(categoryMap).forEach(category => {
    rows.push(
      <ProductCateGoryRow
        category={category}
        key={category}
      />
    );
    categoryMap[category].forEach(product => {
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
    });
    rows.push(<br key={`${category}-break`} />);
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <br/>
        <tbody>{rows}</tbody>
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

function ProductRow({ product }) {
  const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];