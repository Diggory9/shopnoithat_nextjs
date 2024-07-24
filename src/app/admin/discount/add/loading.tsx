"use client";

import { Spin } from "antd";
import React from "react";

export default function RootLoading() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Spin size="large" />
        </div>
    );
}
