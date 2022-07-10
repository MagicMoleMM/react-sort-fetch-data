import React, { useState, useEffect } from "react";
import axios from "axios";
import Detail from "./detail";

export default function App() {
  const [books, setBooks] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://www.anapioficeandfire.com/api/books?pageSize=30"
      );
      setBooks(response.data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <h1>Game of Thrones Books</h1>
      <h2>Fetch a list from an API and display it</h2>

      <select onChange={(event) => setValue(event.target.value)}>
        <option value="page">По страницам</option>
        <option value="name">По наименованию</option>
        <option valye="none" selected>
          Выберите сортировку
        </option>
      </select>

      {/* Display data from API */}
      <div className="books">
        {books &&
          books
            .sort((a, b) => {
              if (value === "page") {
                return b.numberOfPages - a.numberOfPages;
              } else if (value === "name") {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x < y) {
                  return -1;
                }
                return 0;
              }
              return true;
            })

            .map((book, index) => {
              const cleanedDate = new Date(book.released).toDateString();
              const authors = book.authors.join(", ");

              return (
                <div className="book" key={index}>
                  <h2>{book.name}</h2>
                  <div className="details">
                    <p>{authors}</p>
                    <p>{book.numberOfPages} pages</p>
                    {/* <p>🏘{book.country}</p>
                  <p>{cleanedDate}</p> */}
                  </div>
                  <Detail books={books} />
                </div>
              );
            })}
      </div>
    </div>
  );
}
