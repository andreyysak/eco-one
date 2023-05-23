// Home.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  // const products = useSelector((state: { products: { products: any[] } }) => state.products.products) as any[];
  const error = useSelector((state: any) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts()); // Виправлений виклик функції fetchProducts
  }, [dispatch]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         await dispatch(fetchProducts()).unwrap();
  //       } catch (error) {
  //         console.log('Error fetching products:', error);
  //       }
  //     };

  //     fetchData();
  //   }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Product Catalog</h1>
      <div className="grid grid-cols-4 max-w-screen-lg mx-auto">
        {products.map((product: any) => (
          <div className="flex mr-4">
            <div key={product.id}>
              <img src={product.images} alt="" />
              <h3>{product.title}</h3>
              <p>{product.price}$</p>
              <button className="border border-black">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
