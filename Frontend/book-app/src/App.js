import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link as RouterLink, NavLink } from "react-router-dom";
import logo from './logo.png';
import { ChakraProvider, Link as ChakraLink, Spinner } from "@chakra-ui/react";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Favorites from "./components/Favorites";
import BookDetails from "./components/BookDetails";
import BookForm from "./components/BookForm";
import About from "./components/About";
import Contact from "./components/Contact";
import "./components/popupsearch.css";
import "./components/App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the delay time as needed
  };

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
              <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className="nav-link"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/favorites"
                  className="nav-link"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  Favorites
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-book"
                  className="nav-link"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  Add Book
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {isLoading && (
          <div className="loading-overlay">
            <Spinner size="xl" color="blue.500" thickness="4px" />
          </div>
        )}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/categories/*" element={<Categories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<BookForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;