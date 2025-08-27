import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCategories,
  setPriceRange,
} from "../store/slices/filtersSlice";
import { Slider } from "./ui/slider";

const categories = ["All", "Electronics", "Clothing", "Home", "Accessories"];

const Sidebar = () => {
  const dispatch = useDispatch();
  const { selectedCategories, priceRange } = useSelector(
    (state) => state.filters
  );


  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategories(category));
  };

  const handlePriceChange = (value) => {
    dispatch(setPriceRange(value));
  };

  const containerVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-blue-600 text-white p-6 rounded-2xl shadow-xl h-fit sticky top-24"
    >
      {/* Filters Header */}
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-bold mb-6 text-center"
      >
        Filters
      </motion.h2>

      {/* Category Filter */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <motion.label
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategories === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-blue-400 border-2 border-blue-300 focus:ring-blue-400 focus:ring-2 bg-transparent"
                />
                {selectedCategories.includes(category) && (
                  <motion.div
                    layoutId="categorySelected"
                    className="absolute inset-0 w-4 h-4 bg-white rounded-full scale-50"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className="group-hover:text-blue-200 transition-colors duration-200">
                {category}
              </span>
            </motion.label>
          ))}
        </div>
      </motion.div>

      {/* Price Range Filter */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold mb-4">Price</h3>
        <div className="space-y-4 text-white">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={1000}
            step={10}
            className="w-full text-white"
          />
          <div className="flex justify-between text-sm text-blue-100">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          {categories.slice(1).map((brand) => (
            <motion.label
              key={brand}
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories === brand}
                onChange={() => handleCategoryChange(brand)}
                className="w-4 h-4 text-blue-400 border-2 border-blue-300 rounded focus:ring-blue-400 focus:ring-2 bg-transparent"
              />
              <span className="group-hover:text-blue-200 transition-colors duration-200">
                {brand}
              </span>
            </motion.label>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Price</h4>
          <input
            onChange={(e) =>
              handlePriceChange([0, parseInt(e.target.value) || 1000])
            }
            type="number"
            placeholder="5000"
            className="w-full bg-transparent border border-blue-300 rounded px-3 py-2 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
