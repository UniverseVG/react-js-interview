import React from "react";
import { useTheme } from "../themeContext";

const Blog = () => {
  const { theme } = useTheme();

  return (
    <div className={`page ${theme}`}>
      <h1>Blog Page</h1>
      <p>Read our latest blog posts!</p>
    </div>
  );
};

export default Blog;
