import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import "./Categories.css"; // Import the CSS file for custom styles

function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9292/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (categoryName) {
      fetch(`http://localhost:9292/categories/${categoryName}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSelectedCategory(data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [categoryName]);

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categories-container">
      <h2 className="categories-title">Categories</h2>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {categories.map((cat) => (
          <Box
            className="cat-links"
            key={cat.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            cursor="pointer"
            onClick={() => setCategoryName(cat.name)}
            _hover={{ backgroundColor: "gray" }}
          >
            <Link to={`/categories/${cat.name}`}>
              <Flex direction="column" align="center">
                <Text mt={2} fontWeight="bold">
                  {cat.name}
                </Text>
              </Flex>
            </Link>
          </Box>
        ))}
      </Grid>

      {selectedCategory && (
        <div>
          <h2 className="cat-book-tt">{selectedCategory.name}</h2>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {selectedCategory.books.map((book) => (
              <Box
                key={book.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md"
                _hover={{ backgroundColor: "#fff" }}
              >
                <Box className="cat-book-card">
                  <Image src={book.image_url} alt={book.title} boxSize="200px" />
                  <Text mt={2} fontWeight="bold">
                    {book.title}
                  </Text>
                  <Text>{book.description}</Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Categories;
