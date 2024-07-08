"use client";
import Banner from "./(route)/banner/page";
import Category from "./(route)/category/page";
import Footer from "../components/layout/footer";
import Contact from "./(route)/contact/page";
import Product from "./product/page";
import StoreProvider from "@/app/StoreProvider";
export default function Home() {
    return (
        <>
            <Banner />
            <Category></Category>
            <Product></Product>
            <Contact />
            <Footer />
        </>



    );
}
