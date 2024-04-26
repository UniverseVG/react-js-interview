import { useEffect, useState } from "react";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );

      const incomingData = await response.json();
      setData((prev) => [...prev, ...incomingData.products]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      setIsLoading(true);
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#fff" }}>InfiniteScroll</h1>
      <div>
        {data &&
          data.map((item, index) => (
            <div key={index} className="card">
              <p className="title">{item.title}</p>
              {/* <p className="body">{item.body}</p> */}
            </div>
          ))}

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default InfiniteScroll;
