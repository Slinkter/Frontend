import React from "react";

const Header = () => {
    return (
        <header className="bg-lightTheme-veryPaleBlueTopBG h-[235px] rounded-b-[20px] pt-8 px-6 ">
            <h1 className="text-darkTheme-veryDarkBlueBG text-2xl font-bold mb-1">
                SOCIAL MEDIA DASHBOARD
            </h1>
            <p className="text-lightTheme-darkGrayishBlueText font-bold mb-6">
                Total Followers: 23,004
            </p>
            <hr className="bg-black mb-[19px]" />

            <div className="flex place-content-between ">
                <p className="text-lightTheme-darkGrayishBlueText font-bold">
                    Dark Mode
                </p>
                <label
                    htmlFor="darkmode"
                    className="border bg-lightTheme-toggle  w-12 h-6 rounded-full cursor-pointer flex items-center p-1 relative"
                >
                    <input
                        id="darkmode"
                        type="checkbox"
                        className="sr-only peer "
                    />
                    <div
                        className="  w-full h-full  overflow-hidden rounded-full
                    peer-checked:bg-toggle-gradient absolute top-0 left-0"
                    ></div>
                    <div className="w-[18px] h-[18px] bg-white   rounded-full peer-checked:translate-x-[24px] transition-all duration-100  absolute"></div>
                </label>
            </div>
        </header>
    );
};

export default Header;
