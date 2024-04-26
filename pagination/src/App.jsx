import { useEffect, useState } from "react";

import "./App.css";

function App() {
  //frontend driven approach
  // const [products, setProducts] = useState([]);
  // const [page, setPage] = useState(1);
  // const fetchProducts = async () => {
  //   const response = await fetch("https://dummyjson.com/products?limit=100");
  //   const data = await response.json();
  //   if (data && data.products) {
  //     setProducts(data.products);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const selectPageHandler = (selectedPage) => {
  //   if (
  //     selectedPage >= 1 &&
  //     selectedPage <= products.length / 10 &&
  //     selectedPage !== page
  //   ) {
  //     setPage(selectedPage);
  //   }
  // };
  // return (
  //   <div>
  //     {products.length > 0 && (
  //       <div className="products">
  //         {products.slice(page * 10 - 10, page * 10).map((product) => {
  //           return (
  //             <span key={product.id} className="products__single">
  //               <img src={product.thumbnail} alt={product.title} />
  //               <span>{product.title}</span>
  //             </span>
  //           );
  //         })}
  //       </div>
  //     )}
  //     {products.length > 0 && (
  //       <div className="pagination">
  //         <span
  //           onClick={() => selectPageHandler(page - 1)}
  //           className={page > 1 ? "" : "pagination__disable"}
  //         >
  //           ⏪
  //         </span>
  //         {[...Array(products.length / 10)].map((_, index) => {
  //           return (
  //             <span
  //               className={page === index + 1 ? "pagination__selected" : ""}
  //               onClick={() => selectPageHandler(index + 1)}
  //               key={index}
  //             >
  //               {index + 1}
  //             </span>
  //           );
  //         })}

  //         <span
  //           onClick={() => selectPageHandler(page + 1)}
  //           className={page < products.length / 10 ? "" : "pagination__disable"}
  //         >
  //           ⏩
  //         </span>
  //       </div>
  //     )}
  //   </div>
  // );

  //backend driven approach

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await response.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return (
              <span key={product.id} className="products__single">
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ⏪
          </span>
          {[...Array(totalPages)].map((_, index) => {
            return (
              <span
                className={page === index + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(index + 1)}
                key={index}
              >
                {index + 1}
              </span>
            );
          })}

          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disable"}
          >
            ⏩
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
