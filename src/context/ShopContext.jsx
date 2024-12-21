import { createContext, useState } from "react"
import { products } from "../assets/assets"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const currency = "$"
  const delivery_fee = 10
  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  // Updated cart structure to better handle multiple items and sizes
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  const addToCart = (product, size) => {
    if (!size) {
      toast.error("Please select a product size")
      return
    }

    if (!product) {
      toast.error("Invalid product")
      return
    }

    setCartItems((prevCart) => {
      // Find if the item already exists in the cart
      const existingItem = prevCart.find(
        (item) => item.productId === product.id && item.size === size
      )

      if (existingItem) {
        // Update the quantity of the existing item
        return prevCart.map((item) =>
          item.productId === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add a new item to the cart
        return [
          ...prevCart,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            size: size,
            quantity: 1
          }
        ]
      }
    })
  }

  const removeFromCart = (productId, size) => {
    setCartItems((prevCart) => {
      const itemExists = prevCart.some(
        (item) => item.productId === productId && item.size === size
      )

      if (!itemExists) {
        toast.error("Item not found in cart")
        return prevCart // Return the cart unchanged if the item doesn't exist
      }

      const updatedCart = prevCart.filter(
        (item) => !(item.productId === productId && item.size === size)
      )

      toast.success("Item removed from cart")
      return updatedCart
    })
  }
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems((prevCart) =>
        prevCart.filter(
          (item) => !(item.productId === productId && item.size === size)
        )
      )
    } else {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  const clearCart = () => {
    setCartItems([])
    toast.success("Cart cleared")
  }

  const getCartAmount = () => {
    let totalAmount = Object.keys(cartItems)
      .map((itemId) => {
        // Convert itemId to number if necessary
        let numericItemId = Number(itemId) // or parseInt(itemId, 10);
        // Find the product with the matching id
        let itemInfo = products.find((product) => product.id === numericItemId)
        // If the product exists, calculate the total for this item
        if (itemInfo) {
          return itemInfo.price * cartItems[itemId]
        }
        return 0 // If no matching product is found, add 0 to the total
      })
      .reduce((acc, curr) => acc + curr, 0) // Sum up all item totals
    return totalAmount
  }

  // console.log("Item ID:", itemId, "Type:", typeof itemId)
  // console.log("Products:", products)
  // console.log("Cart Items:", cartItems)

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal,
    clearCart,
    getCartAmount,
    navigate
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export default ShopContextProvider
