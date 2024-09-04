import React, { useState } from "react";
import axios from "axios";

function Sell() {
  const [files, setFiles] = useState([]);

  const [bookDetails, setBookDetails] = useState({
    name: "",
    address: "",
    author: "",
    language: "",
    publisher: "",
    publicationDate: "",
    mrp: 0,
    retailPrice: 0,
    discountedPrice: 0,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("handle submit hua hai bro");
    console.log(bookDetails);
    console.log(files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file); // 'file' is the key name for the backend
    });
    formData.append("bookDetails", JSON.stringify(bookDetails));
    console.log(formData);
    console.log(formData.file);

    await axios
      .post("http://localhost:8080/upload", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("file upload ke post mein error hai brother");
      });

    setFiles([]);
    setBookDetails({
      name: "",
      address: "",
      author: "",
      language: "",
      publisher: "",
      publicationDate: "",
      mrp: 0,
      retailPrice: 0,
      discountedPrice: 0,
    });
  }

  function handleChange(e) {
    const { id, value } = e.target;
    // console.log(id, value);
    setBookDetails({
      ...bookDetails,
      [id]: value,
    });
  }

  function handleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);
    // Update the state with the selected files
    setFiles(selectedFiles);
  }

  return (
    <div>
      <h1 className="text-5xl text-center py-4 bg-gray-500">
        Sell Book ka page
      </h1>
      <form
        onSubmit={handleSubmit}
        className=" h-full p-4
	 	flex flex-col text-white lg:w-3/4 lg:m-auto"
      >
        <div className="">
          <label
            htmlFor="name"
            className="text-2xl font-semibold tracking-wider"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Name of Book"
            className="block mb-4 text-2xl py-2 px-4 bg-[white] text-black outline-none font-semibold w-full"
            id="name"
            value={bookDetails.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="text-2xl font-semibold tracking-wider"
          >
            Address:
          </label>
          <input
            type="text"
            placeholder="Address"
            className="block mb-4 text-2xl py-2 px-4 bg-[white] text-black outline-none font-semibold w-full"
            id="address"
            value={bookDetails.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="author"
            className="text-2xl font-semibold tracking-wider"
          >
            Author:
          </label>
          <input
            type="text"
            placeholder="Author"
            className="block mb-4 text-2xl py-2 px-4 bg-[white] text-black outline-none font-semibold w-full"
            id="author"
            value={bookDetails.author}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="language"
            className="text-2xl font-semibold tracking-wider"
          >
            Language:
          </label>
          <input
            type="text"
            placeholder="Language of the book"
            className="block mb-4 text-2xl py-2 px-4 bg-[white] text-black outline-none font-semibold w-full"
            id="language"
            value={bookDetails.language}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="publisher"
            className="text-2xl font-semibold tracking-wider"
          >
            Publisher:
          </label>
          <input
            type="text"
            placeholder="Publisher"
            className="block mb-4 text-2xl py-2 px-4 bg-[white] text-black outline-none font-semibold w-full"
            id="publisher"
            value={bookDetails.publisher}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="publicationDate"
            className="text-2xl font-semibold tracking-wider"
          >
            Publication Date:
          </label>
          <input
            type="date"
            placeholder="Publication date"
            className="block mb-4 text-2xl py-2 px-4 bg-[white] text-black outline-none font-semibold w-full"
            id="publicationDate"
            value={bookDetails.publicationDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="mrp"
            className="text-2xl font-semibold tracking-wider"
          >
            MRP of Book:{" "}
          </label>
          <input
            type="number"
            placeholder="MRP of Book"
            className="block mb-4 text-2xl py-2 px-4 bg-[white] text-black outline-none font-semibold w-full"
            id="mrp"
            value={bookDetails.mrp ? bookDetails.mrp : ""}
            onChange={(e) => {
              setBookDetails({
                ...bookDetails,
                mrp: parseInt(e.target.value),
              });
            }}
          />
        </div>

        <div>
          <label
            htmlFor="discountedPrice"
            className="text-2xl font-semibold tracking-wider"
          >
            Discounted Price
          </label>
          <input
            type="number"
            placeholder="Discounted price of Book"
            className="block mb-4 text-2xl py-2 px-4 bg-[white] text-black outline-none font-semibold w-full"
            id="discountedPrice"
            value={
              bookDetails.discountedPrice > 0 ? bookDetails.discountedPrice : ""
            }
            onChange={(e) => {
              setBookDetails({
                ...bookDetails,
                discountedPrice: parseInt(e.target.value),
              });
            }}
          />
        </div>

        <div>
          <label
            htmlFor="retailPrice"
            className="text-2xl font-semibold tracking-wider"
          >
            Retail Price
          </label>

          <input
            type="number"
            placeholder="Retail price of Book"
            className="block mb-4 text-2xl py-2 px-4 bg-[white] text-black outline-none font-semibold w-full"
            id="retailPrice"
            value={bookDetails.retailPrice ? bookDetails.retailPrice : ""}
            onChange={(e) => {
              setBookDetails({
                ...bookDetails,
                retailPrice: parseInt(e.target.value),
              });
            }}
          />
        </div>

        <div className="">
          <label
            htmlFor="coverImage"
            className="text-2xl font-semibold tracking-wider"
          >
            Upload book's cover page
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            multiple
            onChange={handleFileChange}
            className="block mb-4 text-2xl outline-none font-semibold w-1/2 hover:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="block m-auto bg-[#ff1010] px-7 py-5 rounded-xl hover:scale-110 duration-300 ease-in-out mt-2 font-bold text-2xl"
        >
          Sell Book
        </button>
      </form>
    </div>
  );
}

export default Sell;
