import React, { useEffect, useState } from "react";
import { Box, ListItem, UnorderedList, Text, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import SearchBar from "./SearchBar";
import BookDetails from "./BookDetails";
import LoadingAnimation from "./LoadingAnimation";
import Footer from "./footer";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let typingTimeout = null;

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    fetch("http://localhost:9292/favorites")
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
        setIsLoading(false);
      });
  };

  const addToFavorites = (book) => {
    fetch(`http://localhost:9292/books/${book.id}/favorite`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        setFavorites([...favorites, data]);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const removeFromFavorites = (book) => {
    fetch(`http://localhost:9292/books/${book.id}/unfavorite`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedFavorites = favorites.filter(
          (favBook) => favBook.id !== book.id
        );
        setFavorites(updatedFavorites);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:9292/books?title=${searchQuery}`);
      const data = await response.json();

      if (searchQuery.trim() === "") {
        setSearchResults([]);
      } else {
        const filteredResults = data.filter((book) =>
          book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    clearTimeout(typingTimeout);

    if(query.trim() === "" || searchResults.length > 0) {
      setSearchResults([]);
    } else {
      typingTimeout = setTimeout(() => {
        handleSearch();
      }, 300);
    }
 
    setSelectedBook(null);
    setIsOpen(false);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const handleFavoriteToggle = (updatedBook) => {
    const isBookInFavorites = favorites.some((book) => book.id === updatedBook.id);

    if (isBookInFavorites) {
      removeFromFavorites(updatedBook);
    } else {
      addToFavorites(updatedBook);
    }
  };

  const handleModalClose = () => {
    setSelectedBook(null);
    setIsOpen(false);
  };

  return (
    <div className="home-container">
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="content-wrapper">
          <SearchBar
            searchQuery={searchQuery}
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
          />
          <Box className="search-results-container" style={{ listStyleType: 'none' }}>
            <UnorderedList>
              {searchResults.map((book) => (
                <ListItem key={book.id}>
                  <Box className="book-container" onClick={() => handleBookClick(book)}>
                    <Text className="book-title" as="h4">{book.title}</Text>
                    <Image className="book-image" src={book.image_url} alt={book.title} boxSize="100px" />
                  </Box>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          {selectedBook && (
            <Modal isOpen={isOpen} onClose={handleModalClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{selectedBook.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <BookDetails
                    book={selectedBook}
                    favorites={favorites}
                    handleFavoriteToggle={handleFavoriteToggle}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" ml={3} onClick={handleModalClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          {selectedBook && (
            <Box mt={4}>
              <BookDetails
                book={selectedBook}
                favorites={favorites}
                handleFavoriteToggle={handleFavoriteToggle}
              />
            </Box>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
     }
  

export default Home
