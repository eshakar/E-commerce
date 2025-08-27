import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { removeFromCart, updateQuantity, clearCart, calculateTotals } from '../store/slices/cartSlice'
import { Button } from '../components/ui/button'
import { formatCurrency } from '../lib/utils'

const CartPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(calculateTotals())
  }, [items, dispatch])

  // Safe number conversion helper
  const safeNumber = (value, defaultValue = 0) => {
    const num = parseFloat(value)
    return isNaN(num) ? defaultValue : num
  }

  // Safe calculation for item total price
  const calculateItemTotal = (price, quantity) => {
    const safePrice = safeNumber(price, 0)
    const safeQuantity = safeNumber(quantity, 0)
    return safePrice * safeQuantity
  }

  // Safe totals with fallbacks
  const safeTotalAmount = safeNumber(totalAmount, 0)
  const safeTotalQuantity = safeNumber(totalQuantity, 0)
  const taxAmount = safeTotalAmount * 0.08
  const grandTotal = safeTotalAmount + taxAmount

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3 }
    }
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-8xl mb-6"
          >
            🛒
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </motion.button>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8" />
              Shopping Cart
            </h1>
            <p className="text-gray-600">{safeTotalQuantity} items in cart</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Items in Cart</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-800 font-medium transition-colors duration-300"
              >
                Clear Cart
              </motion.button>
            </div>
            
            <AnimatePresence>
              {items.map((item) => {
                // Calculate safe item total
                const itemTotal = calculateItemTotal(item.price, item.quantity)
                
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    exit="exit"
                    layout
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-blue-600">
                            {formatCurrency(safeNumber(item.price))}
                          </span>
                          <span className="text-sm text-gray-500">
                            Total: {formatCurrency(itemTotal)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            className="p-2 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="px-4 py-2 font-medium">{safeNumber(item.quantity, 1)}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            className="p-2 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({safeTotalQuantity} items)</span>
                  <span>{formatCurrency(safeTotalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                  Proceed to Checkout
                </Button>
              </motion.div>

              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500">🔒 Secure checkout guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartPage