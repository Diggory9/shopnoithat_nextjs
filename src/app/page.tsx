"use client";

import Category from "./category/page";
import Footer from "./components/footer";
import NavHome from "./components/navhome";
import Product from "./product/page";

export default function Home() {
    return (
        <>
            
            <Product></Product>
            <Category></Category>
            <Footer/>
        </>
    );
}
