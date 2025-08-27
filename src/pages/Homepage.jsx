import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { filterProducts } from '../store/slices/productsSlice'
import Sidebar from '../components/Sidebar'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const dispatch = useDispatch()
  const { filteredItems } = useSelector(state => state.products)
  const { searchTerm, selectedCategories, priceRange } = useSelector(state => state.filters)

  useEffect(() => {
    dispatch(filterProducts({ searchTerm, selectedCategories, priceRange }))
  }, [searchTerm, selectedCategories, priceRange, dispatch])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <motion.div variants={headingVariants} className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Product Listing
              </h1>
              <p className="text-gray-600">
                {filteredItems.length} products found
              </p>
            </motion.div>

            {/* Products Grid */}
            {filteredItems.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {filteredItems.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HomePage