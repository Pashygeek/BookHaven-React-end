import React from 'react'
import { useEffect, useState } from 'react'

const BookList=()=> {
  const [books, setBooks] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:9292/books")
    .then((response)=> response.json())
    .then((data)=> setBooks(data));
  }, []);

  return (
    <div>
        <h2>BookList</h2>
        {books.map((book)=> (
            <div key={book.id}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Description: {book.description}</p>
            </div>
        ))}
        </div>
  )
}

export default BookList