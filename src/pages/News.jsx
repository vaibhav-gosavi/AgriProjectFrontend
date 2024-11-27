import React, { useState, useEffect } from "react";
import axios from "../axios";
import { motion } from "framer-motion";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/news");
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        alert("Failed to fetch news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-blue-800"
      >
        Latest Agriculture News
      </motion.h1>

      {loading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center h-64"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </motion.div>
      ) : news.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {news.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {article.urlToImage && (
                <img 
                  src={article.urlToImage} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-blue-700 line-clamp-2">{article.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description || "No description available."}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Read Full Article
                  </a>
                  <p className="text-gray-500 text-sm">
                    {new Date(article.pubDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg text-gray-700"
        >
          No news articles found.
        </motion.p>
      )}
    </div>
  );
}

export default News;
