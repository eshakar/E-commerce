import { createSlice } from '@reduxjs/toolkit'

const initialProducts = [
  {
    id: 1,
    title: 'Running Shoes',
    price: 99,
    category: 'Clothing',
    image: 'https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/9394353/2022/5/18/bb83cc3b-c550-4459-87dd-70f73249d3c41652863728185CampusMenNavyBlueRunningShoes1.jpg',
    description: 'Comfortable running shoes perfect for your daily workout routines.',
    rating: 4.5,
    reviews: 120
  },
  {
    id: 2,
    title: 'Wireless Headphones',
    price: 149,
    category: 'Electronics',
    image: 'https://images.stockcake.com/public/b/7/0/b7047247-e333-4ec5-b823-f1e3befc6931_large/floating-premium-headphones-stockcake.jpg',
    description: 'Premium wireless headphones with noise cancellation and superior sound quality.',
    rating: 4.3,
    reviews: 89
  },
  {
    id: 3,
    title: 'Backpack',
    price: 129,
    category: 'Clothing',
    image: 'https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/10293735/2023/12/15/9c818262-8adf-4d19-86d5-7e7476d12ffd1702641212613-Wildcraft-Women-Blue-Graphic-Backpack-2081702641212455-14.jpg',
    description: 'Durable and spacious backpack ideal for travel and everyday use.',
    rating: 4.7,
    reviews: 203
  },
  {
    id: 4,
    title: 'Smartwatch',
    price: 249,
    category: 'Electronics',
    image: 'https://www.jiomart.com/images/product/original/rvmgd48v4x/beatxp-nexus-1-78-inch-super-amoled-display-bluetooth-calling-smart-watch-metal-body-rotary-crown-368-448px-1000-nits-60hz-refresh-rate-100-sports-modes-24-7-health-tracking-ip68-persian-blue-product-images-orvmgd48v4x-p606880332-0-202312232020.jpg?im=Resize=(1000,1000)',
    description: 'Advanced smartwatch with fitness tracking and smart notifications.',
    rating: 4.2,
    reviews: 156
  },
  {
    id: 5,
    title: 'Sunglasses',
    price: 149,
    category: 'Clothing',
    image: 'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/FEBRUARY/22/Qi54vtLr_4a252b6a0e6c460d9f6ff18805a22353.jpg',
    description: 'Stylish sunglasses with UV protection and premium frame quality.',
    rating: 4.4,
    reviews: 78
  },
  {
    id: 6,
    title: 'Digital Camera',
    price: 499,
    category: 'Electronics',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQjt2b2QuCn1dX3wOO4bPl-6jo3bweQmtUbw&s',
    description: 'Professional digital camera with high-resolution imaging capabilities.',
    rating: 4.8,
    reviews: 267
  },
  {
    id: 7,
    title: 'T-shirt',
    price: 29,
    category: 'Clothing',
    image: 'https://files.cdn.printful.com/o/upload/bfl-image/d1/w258/20345_l_9__600.png',
    description: 'Comfortable cotton t-shirt perfect for casual wear.',
    rating: 4.1,
    reviews: 45
  },
  {
    id: 8,
    title: 'Smartphone',
    price: 699,
    category: 'Electronics',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKQdum61Rz3Czxk-gY30xwTGYot3-ZH7TqcQ&s',
    description: 'Lorem ipsum dolor amet, consectetur euisagend.',
    rating: 4.5,
    reviews: 342
  }
]

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: initialProducts,
    filteredItems: initialProducts,
    selectedProduct: null,
    loading: false,
    error: null
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
      state.filteredItems = action.payload
    },
    setFilteredProducts: (state, action) => {
      state.filteredItems = action.payload
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    filterProducts: (state, action) => {
      const { searchTerm, selectedCategories, priceRange } = action.payload
      
      let filtered = state.items
      
      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      // Filter by categories
      if (selectedCategories.length > 0 && !selectedCategories.includes('All')) {
        filtered = filtered.filter(product =>
          selectedCategories.includes(product.category)
        )
      }
      
      // Filter by price range
      if (priceRange) {
        filtered = filtered.filter(product =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
        )
      }
      
      state.filteredItems = filtered
    }
  }
})

export const { 
  setProducts, 
  setFilteredProducts, 
  setSelectedProduct, 
  filterProducts 
} = productsSlice.actions

export default productsSlice.reducer