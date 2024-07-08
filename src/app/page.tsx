"use client";
import Banner from "./(route)/banner/page";
import Category from "./(route)/category/page";
import Footer from "../components/layout/footer";
import Contact from "./(route)/contact/page";
import ProductComponent from "./(route)/product/page";

export default function Home() {
    return (
        <>
            <Banner />
            <Category></Category>
            <ProductComponent></ProductComponent>
            <Contact />
            <Footer />
        </>
    );
}
