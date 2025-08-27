import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react'
import { addToCart } from '../store/slices/cartSlice'
import { Button } from '../components/ui/button'
import { formatCurrency } from '../lib/utils'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = useSelector(state => 
    state.products.items.find(item => item.id === parseInt(id))
  )

  useEffect(() => {
    if (!product) {
      navigate('/')
    }
  }, [product, navigate])

  if (!product) {
    return <div>Loading...</div>
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product))
    }
  }

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      )
    }

    return stars
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Thumbnail images - mockup for multiple images */}
            <div className="flex gap-2">
              {[...Array(3)].map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <img
                    src={product.image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <motion.h1 
                layoutId={`title-${product.id}`}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                {product.title}
              </motion.h1>
              
              <motion.div 
                layoutId={`price-${product.id}`}
                className="flex items-center gap-4 mb-4"
              >
                <span className="text-3xl font-bold text-blue-600">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatCurrency(product.price * 1.2)}
                </span>
              </motion.div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-gray-600">({product.rating})</span>
                  <span className="text-sm text-gray-500">• 124 reviews</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Category</h3>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <span className="text-gray-600">
                  Total: {formatCurrency(product.price * quantity)}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <Button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </Button>
            </motion.div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-800">Free Shipping</div>
                <div className="text-sm text-green-600">On orders over $50</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-800">30-Day Returns</div>
                <div className="text-sm text-blue-600">Easy returns policy</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <motion.div
                key={review}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: review * 0.1 }}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    U{review}
                  </div>
                  <div>
                    <div className="font-medium">User {review}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(5)}</div>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Great product! Exactly what I was looking for. Fast shipping and excellent quality.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProductDetailPage