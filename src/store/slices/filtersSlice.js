import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    searchTerm: '',
    selectedCategories: ['All'],
    priceRange: [0, 1000],
    sortBy: 'name'
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setSelectedCategories:  (state, action) => {
      state.selectedCategories = action.payload
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    clearFilters: (state) => {
      state.searchTerm = ''
      state.selectedCategories = ['All']
      state.priceRange = [0, 1000]
      state.sortBy = 'name'
    }
  }
})

export const {
  setSearchTerm,
  setSelectedCategories,
  setPriceRange,
  setSortBy,
  clearFilters
} = filtersSlice.actions

export default filtersSlice.reducer