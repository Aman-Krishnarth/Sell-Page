import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BooksStore() {
  const [books, setBooks] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchedBooks, setSearchedBooks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/buyBooks").then((res) => {
      console.log(res.data);
      setBooks(res.data);
    });
  }, []);

  function handleBuy(e) {
    console.log(e.target.id);
    const data = { id: e.target.id };
    console.log(data);
    axios
      .post("http://localhost:8080/addToCart", { data })
      .then((res) => {
        console.log("handle buy ka res");
      })
      .catch((err) => {
        console.log("handle buy ka error");
      });
    // navigate("/buy", { state: { data } });
  }

  function handleSearch(e) {
    if (e.target.value.length === 0) {
      setSearching(false);
      setSearchedBooks([]);
      return;
    } else {
      setSearching(true);
    }

    console.log(e.target.value);
    console.log(e.target.value.length);
    const result = books.filter(
      (book) => book.name.indexOf(e.target.value) > -1
    );
    console.log(result);
    setSearchedBooks(result);
  }

  return (
    <div>

      {searching
        ? searchedBooks.map((b) => {
            return (
              <div className="flex bg-blue-400 w-1/2 justify-around items-center ">
                <div>
                  <img src={b.coverUrls[0]} alt="" className="h-16 w-16" />
                </div>

                <h3> {b.name} </h3>
                <h4> {b.mrp} </h4>
              </div>
            );
          })
        : ""}

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
                  <img
                    src={book.coverUrls[0]}
                    alt=""
                    className="h-full w-full"
                  />
                </div>
                <p>Name of book: {book.name}</p>
                <p>Amount: {book.mrp}</p>
                <p>{book.verified ? "Book verified" : "Under verification"}</p>
                <button
                  className="bg-green-500 hover:scale-110 px-4 py-3 m-auto block"
                  onClick={handleBuy}
                  id={book._id}
                >
                  Add to cart
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
