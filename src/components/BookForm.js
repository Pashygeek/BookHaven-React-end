import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Image,
  Select,
} from '@chakra-ui/react';
import './App.css';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [addedBook, setAddedBook] = useState(null);
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    // Fetch the list of categories from the backend
    fetch('http://localhost:9292/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const bookData = {
      title: title,
      author: author,
      description: description,
      category_id: category,
      image_url: image,
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
    if (addedBook) {
      const bookId = addedBook.id;

      fetch(`http://localhost:9292/books/${bookId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.status === 200) {
            console.log('Book deleted successfully!');
            localStorage.removeItem('addedBook');
            setAddedBook(null);

            fetch('http://localhost:9292/categories')
            .then((response)=> response.json())
            .then((data)=> {
              setCategories(data);
            })
            .catch((error)=> {
              console.log("Error:", error)
            })
          } else {
            console.log('Failed to delete the book.');
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  };

  return (
    <div className="form-page">
      <h2 className="book-form-title">Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="title">
            <FormLabel className="form-c">Title:</FormLabel>
            <Input
              className="form-input"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormControl>
          <FormControl id="author">
            <FormLabel className="form-c">Author:</FormLabel>
            <Input
              className="form-input"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel className="form-c">Description:</FormLabel>
            <Textarea
              className="form-input"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormControl>
          <FormControl id="category">
          <FormLabel className="form-c">Category:</FormLabel>
          {categories.length > 0 ? (
            <Select
              className="form-input"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          ) : (
            <div>Loading categories...</div>
          )}
        </FormControl>
          <FormControl id="image">
            <FormLabel className="form-c">Image URL:</FormLabel>
            <Input
              className="form-input"
              type="string"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </FormControl>
          <Button colorScheme="purple" type="submit">
            Add Book
          </Button>
        </VStack>
      </form>

      {addedBook && (
        <Box
          className="added-book"
          maxW="250px"
          boxShadow="md"
          borderRadius="md"
          p="1rem"
          cursor="pointer"
          transition="transform 0.3s ease"
          _hover={{ transform: 'scale(1.05)' }}
        >
          <h3>Added Book:</h3>
          <p>Title: {addedBook.title}</p>
          <p>Author: {addedBook.author}</p>
          <p>Description: {addedBook.description}</p>
          <p>Category: {addedBook.category}</p> {/* Updated to display the category name */}
          <Box>
            <FormLabel className="form-c">Image:</FormLabel>
            <Image src={addedBook.image_url} alt="Book Image" maxH="200px" />
          </Box>
          <Button colorScheme="red" onClick={handleRemove}>
            Remove Book
          </Button>
        </Box>
      )}
    </div>
  );
};

export default BookForm;
