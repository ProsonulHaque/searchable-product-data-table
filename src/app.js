import { useState } from "react";

export default function App() {
  return <FilterableProductTable products={PRODUCTS}/>;
}

function FilterableProductTable({products}) {
  const [searchText, setSearchText] = useState('');
  const [inStockOnly, setInStockOnlyValue] = useState(false);

  return(
    <div> 
      <SearchBar 
        searchText = {searchText} 
        inStockOnly = {inStockOnly} 
        onSearchTextChange= {setSearchText} 
        onCheckboxChange={setInStockOnlyValue}/>
      <br />
      <ProductTable products = {products} searchText = {searchText} inStockOnly = {inStockOnly}/>
    </div>
  );
}



function SearchBar({searchText, inStockOnly, onSearchTextChange, onCheckboxChange}) {
  return (
    <form>
      <input type="text" value={searchText} placeholder="Search..." onChange={(e) => onSearchTextChange(e.target.value)}/>
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onCheckboxChange(e.target.checked)}/>
        Only show products in stock
      </label>
    </form>
  )
}

function ProductTable({ products, searchText, inStockOnly }) {
  // Group products by category
  const categoryMap = {};

  products.forEach(product => {
    if(inStockOnly && !product.stocked) {
      return; // Skip products that are not in stock
    }
    
    if (searchText && !product.name.toLowerCase().includes(searchText.toLowerCase())) {
      return; // Skip products that do not match the search text
    }

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