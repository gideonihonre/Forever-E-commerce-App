import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import { assets } from "../assets/assets"
import { useEffect } from "react"
import { useState } from "react"
import CartTotal from "../components/CartTotal"

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    removeFromCart,
    navigate
  } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const updatedCartData = cartItems.map((item) => ({
      id: item.productId,
      size: item.size,
      quantity: item.quantity
    }))
    setCartData(updatedCartData)
  }, [cartItems])

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            const productData = products.find(
              (product) => product.id === item.productId
            )
            if (!productData) return null // Skip if no product found

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item.productId,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                />
                <img
                  onClick={() => removeFromCart(item.productId, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            )
          })
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
