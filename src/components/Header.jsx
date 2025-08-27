import React from 'react'
import { motion } from 'framer-motion'
import { Search, ShoppingCart } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setSearchTerm } from '../store/slices/filtersSlice'
import { Badge } from './ui/badge'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { totalQuantity } = useSelector(state => state.cart)
  const { searchTerm } = useSelector(state => state.filters)

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-blue-600 text-white shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="text-2xl font-bold">
              Lazy
            </Link>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-1 max-w-md mx-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-500 bg-blue-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Cart Icon */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCartClick}
            className="relative bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            {totalQuantity > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[1.25rem] h-5 text-xs flex items-center justify-center"
                >
                  {totalQuantity}
                </Badge>
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header