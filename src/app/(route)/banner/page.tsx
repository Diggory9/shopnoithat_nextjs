import React from "react";
import { Carousel } from "antd";

const Banner: React.FC = () => (
    <>
        <Carousel arrows infinite={false}>
            <div className="w-full h-1/3">
                <img src="/img/banner4.png" />
            </div>
            <div className="w-full h-1/3">
                <img src="/img/banner4.png" />
            </div>
            <div className="w-full h-1/3">
                <img src="/img/banner4.png" />
            </div>
        </Carousel>
    </>
);

export default Banner;
