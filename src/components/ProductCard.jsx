import React from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../store/slices/cartSlice'
import { Button } from './ui/button'
import { formatCurrency } from '../lib/utils'

const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart(product))
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      )
    }

    return stars
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <motion.h3 
            className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300"
            layoutId={`title-${product.id}`}
          >
            {product.title}
          </motion.h3>
          
          <motion.div 
            className="flex items-center mb-3"
            layoutId={`price-${product.id}`}
          >
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
          </motion.div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">({product.rating})</span>
            </div>
          )}

          {/* Add to Cart Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard