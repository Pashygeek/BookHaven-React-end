import React, { useState, useEffect } from 'react';
import { Box, 
   Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [addedBook, setAddedBook] = useState(null);
  
    useEffect(() => {
      const storedBook = localStorage.getItem('addedBook');
      if (storedBook) {
        setAddedBook(JSON.parse(storedBook));
      }
    }, []);
  
    useEffect(() => {
      if (addedBook) {
        localStorage.setItem('addedBook', JSON.stringify(addedBook));
      }
    }, [addedBook]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const bookData = {
        title: title,
        author: author,
        description: description,
        category: category,
        image: image,
      };
  
      fetch('http://localhost:9292/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('New book created:', data);
          setAddedBook(data);
          // Reset the form fields
          setTitle('');
          setAuthor('');
          setDescription('');
          setCategory('');
          setImage('');
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    };
  
    const handleRemove = () => {
      if(addedBook) {
        const bookId = addedBook.id;

        fetch(`http://localhost:9292/books/${bookId}`, {
          method: 'DELETE',
        })

        .then((response)=> {
          if(response.status === 200) {
            console.log("Book deleted successfully!");
            localStorage.removeItem('addedBook');
            setAddedBook(null);
          } else {
            console.log("Failed to delete the book.")
          }
        })
        .catch((error)=> {
          console.log("Error:", error);
        })
      }
    };
  
    return (
      <div className="form-page">
        <h2 className="book-form-title">Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <h3 className="form-title">Book Details</h3>
            <div className="form-input">
              <FormLabel>Title:</FormLabel>
              <Input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className="form-input">
              <FormLabel>Author:</FormLabel>
              <Input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
            </div>
            <div className="form-input">
              <FormLabel>Description:</FormLabel>
              <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div className="form-input">
              <FormLabel>Category:</FormLabel>
              <Input type="text" value={category} onChange={(event) => setCategory(event.target.value)} />
            </div>
            <div className="form-input">
              <FormLabel>Image URL:</FormLabel>
              <Input type="text" value={image} onChange={(event) => setImage(event.target.value)} />
            </div>
          </div>
  
          <Button colorScheme="purple" type="submit" className="form-button">
            Add Book
          </Button>
        </form>
  
        {addedBook && (
          <div>
            <h3>Added Book:</h3>
            <p>Title: {addedBook.title}</p>
            <p>Author: {addedBook.author}</p>
            <p>Description: {addedBook.description}</p>
            <p>Category: {addedBook.category}</p>
            <p>Image: {addedBook.image}</p>
            <Button colorScheme='Red' onClick={handleRemove}>Remove Book</Button>
          </div>
        )}
      </div>
    );
  };

export default BookForm;
