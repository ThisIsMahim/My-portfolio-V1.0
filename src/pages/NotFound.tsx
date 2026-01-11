import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-gold">404</h1>
        <p className="text-xl text-gray-400 mb-8">Oops! Page not found</p>
        <Link
          to="/"
          className="text-gold hover:text-white underline transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
