"use client";

import Banner from "./banner/page";
import Category from "./category/page";
import Footer from "./components/footer";
import NavHome from "./components/navhome";
import Contact from "./contact/page";
import Product from "./product/page";

export default function Home() {
    return (
        <>
            <Banner/>
            <Category></Category>
            <Product></Product>
            <Contact/>
            <Footer/>
        </>
    );
}
