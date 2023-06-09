import React from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';

function BookDetails({ book, favorites, handleFavoriteToggle }) {
  if (!book) {
    return null;
  }

  const { id, title, description, image_url, category } = book;

  const addToFavorites = () => {
    handleFavoriteToggle(book);
  };

  const isBookInFavorites = favorites.some((favBook) => favBook.id === id);

  return (
    <Box>
      <Text as="p">{description}</Text>
      <Image src={image_url} alt={title} />
      <Text as="p">Category: {category ? category.name : 'Unknown'}</Text>
      <Button onClick={addToFavorites}>
        {isBookInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </Box>
  );
}

export default BookDetails;
