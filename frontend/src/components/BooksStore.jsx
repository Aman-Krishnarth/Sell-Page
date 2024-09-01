import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BooksStore() {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/buyBooks").then((res) => {
      console.log(res.data);
      setBooks(res.data);
    });
  }, []);

  function handleBuy(e) {
    console.log(e.target.id);
    const data = {id: e.target.id}
    navigate("/buy", {state: {data}})
  }

  return (
    <div>
      <h1 className="text-5xl text-center">Buy book ka page</h1>
      <div className="flex flex-wrap gap-7 p-2">
        {books.length > 0 ? (
          books.map((book) => {
            console.log("book aayi hai");
            console.log(book);
            return (
              <div
                id={book._id}
                key={book._id}
                className="text-center bg-blue-400"
              >
                <div className="h-32 w-32">
                  <img src={book.coverUrl} alt="" className="h-full w-full" />
                </div>
                <p>Name of book: {book.name}</p>
                <p>Amount: {book.amount}</p>
                <p>
                  {book.verified ? "Book verified" : "Under verification"}
                </p>
                <button
                  className="bg-green-500 hover:scale-110 px-4 py-3 m-auto block"
                  onClick={handleBuy}
                  id={book._id}
                >
                  Buy
                </button>
              </div>
            );
          })
        ) : (
          <p>nothing to display</p>
        )}
      </div>
    </div>
  );
}

export default BooksStore;
