import React from "react";

const Footer = () => (
    <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Contact</span>
                <span className="block text-indigo-600">keep in touch.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <svg width="48" height="48" fill="#0d61a9">
                    {/* SVG Code */}
                </svg>
                <svg width="48" height="48" fill="#03A9F4">
                    {/* SVG Code */}
                </svg>
            </div>
        </div>
    </div>
);

export default Footer;
