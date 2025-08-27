import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// lib/utils.js

export const formatCurrency = (amount) => {
  // Handle undefined, null, NaN, or non-numeric values
  const numAmount = parseFloat(amount)
  
  if (isNaN(numAmount)) {
    return '$0.00'
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numAmount)
}

// Alternative simpler version if you prefer:
export const formatCurrencySimple = (amount) => {
  const num = parseFloat(amount)
  if (isNaN(num)) return '$0.00'
  return `$${num.toFixed(2)}`
}