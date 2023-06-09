import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import "./Categories.css"; // Import the CSS file for custom styles

function Categories() {
  const { name } = useParams();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState();

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
          setCategory(data);
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
        {categories.map((category) => (
          <Box className="cat-links"
            key={category.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            cursor="pointer"
            onClick={() => setCategoryName(category.name)}
            _hover={{ backgroundColor: "gray" }}
          >
            <Link to={`/categories/${category.name}`}>
              <Flex direction="column" align="center">
                <Text mt={2} fontWeight="bold">
                  {category.name}
                </Text>
              </Flex>
            </Link>
          </Box>
        ))}
      </Grid>

      {category && (
        <div>
          <h2 className="cat-book-tt">{category.name}</h2>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {category.books.map((book) => (
              <Box
                key={book.id}
                
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md"
                _hover={{ backgroundColor: "#fff" }
              } 
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
