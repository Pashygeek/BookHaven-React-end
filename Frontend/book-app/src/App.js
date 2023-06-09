import React from "react";
import { BrowserRouter as Router, Route, Routes, Link as RouterLink } from "react-router-dom";
import logo from './logo.png'

import {
  ChakraProvider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Favorites from "./components/Favorites";
import BookDetails from "./components/BookDetails";
import BookForm from "./components/BookForm";
import "./components/popupsearch.css";
import "./components/App.css";
import About from "./components/About";

function App() {
  return (
    <ChakraProvider>
      <Router>
          <div className="title-logo-container">
            <ChakraLink as={RouterLink} to="/">
              <img src={logo} alt="Logo" />
            </ChakraLink>
            <h1 className="title">BookHaven</h1>
          <div className="nav">
            <ul>
              <li>
                <ChakraLink as={RouterLink} to="/">
                   Home
                </ChakraLink>
              </li>
              <li>
                <ChakraLink as={RouterLink} to="/categories">
                  Categories
                </ChakraLink>
              </li>
              <li>
                <ChakraLink as={RouterLink} to="/favorites">
                  Favorites
                </ChakraLink>
              </li>
              <li>
                <ChakraLink as={RouterLink} to="/add-book">
                  Add Book
                </ChakraLink>
              </li>
            </ul>
            </div>
          </div>

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/categories/*" element={<Categories />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/add-book" element={<BookForm />} />
            <Route path="/about" element={<About />} />

          </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
