import { createSlice } from '@reduxjs/toolkit'

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  } catch {
    return []
  }
}

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch {
    // Handle localStorage errors silently
  }
}

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0
}

// Helper function to safely convert to number
const safeNumber = (value, defaultValue = 0) => {
  const num = parseFloat(value)
  return isNaN(num) ? defaultValue : num
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      
      if (existingItem) {
        existingItem.quantity += 1
        existingItem.totalPrice = safeNumber(existingItem.price) * existingItem.quantity
      } else {
        const price = safeNumber(newItem.price, 0)
        const quantity = safeNumber(newItem.quantity, 1)
        
        state.items.push({
          ...newItem,
          price: price,
          quantity: quantity,
          totalPrice: price * quantity
        })
      }
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(item => item.id !== id)
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item && quantity > 0) {
        item.quantity = safeNumber(quantity, 1)
        item.totalPrice = safeNumber(item.price, 0) * item.quantity
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
    },
    
    calculateTotals: (state) => {
      let totalQuantity = 0
      let totalAmount = 0
      
      state.items.forEach(item => {
        const itemPrice = safeNumber(item.price, 0)
        const itemQuantity = safeNumber(item.quantity, 0)
        const itemTotal = itemPrice * itemQuantity
        
        // Update item's totalPrice to ensure consistency
        item.totalPrice = itemTotal
        
        totalQuantity += itemQuantity
        totalAmount += itemTotal
      })
      
      state.totalQuantity = totalQuantity
      state.totalAmount = totalAmount
    }
  }
})

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  calculateTotals 
} = cartSlice.actions

export default cartSlice.reducer