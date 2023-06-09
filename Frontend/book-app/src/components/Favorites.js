import React, { useEffect, useState } from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { IconName } from "react-icons/ai";
import './App.css'

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    fetch("http://localhost:9292/favorites")
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => {
        console.log("Error:", error);
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

  return (
    <div className="favorites-page">
       <Text className="favorites-title" >
        Favorites
      </Text>
      <Box display="flex" flexWrap="wrap" gap="1rem">
        {favorites.map((book) => (
          <Box
          className="fav-card"
            key={book.id}
            maxW="250px"
            boxShadow="md"
            borderRadius="md"
            p="1rem"
            cursor="pointer"
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.05)" }}
            onClick={() => (favorites.some((favBook) => favBook.id === book.id)
              ? removeFromFavorites(book)
              : addToFavorites(book))}
          >
            <Image src={book.image_url} alt={book.title} />
            <Text fontWeight="bold" mt="1rem">{book.title}</Text>
            <Text>{book.description}</Text>
            <Text>Category: {book.category.name}</Text>
            <Button mt="1rem">
              {favorites.some((favBook) => favBook.id === book.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </Button>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Favorites;
