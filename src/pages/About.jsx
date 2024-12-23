import React from "react"
import Title from "../components/Title"
import { assets } from "../assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:tw-2/4 text-gray-600">
          <p>
            Welcome to Forever, where style meets quality and affordability.
            Explore our curated collection of timeless fashion and accessories
            designed to help you express yourself with confidence and ease.
          </p>
          <p>
            At Forever, we prioritize your satisfaction with enduring styles and
            exceptional value. Shop now to experience a seamless blend of
            fashion, quality, and affordability.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to empower individuals with timeless
            fashion, blending quality and affordability, while delivering
            exceptional value and confidence in every purchase.
          </p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At Forever, we guarantee premium quality, timeless style, and
            customer satisfaction in every purchase.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            At Forever, enjoy a seamless shopping experience with easy ordering,
            fast shipping, and reliable delivery. Your favorite styles arrive at
            your doorstep quickly and hassle-free.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            At Forever, we’re committed to exceptional customer service. Our
            team ensures a smooth experience with prompt, friendly support,
            helping you with everything from orders to returns for complete
            satisfaction.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
