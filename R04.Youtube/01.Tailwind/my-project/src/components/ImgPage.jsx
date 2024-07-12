const urlimg =
    "https://images.pexels.com/photos/7723354/pexels-photo-7723354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const Page = () => {
    return (
        <div className="border-4 border-red-600   p-4   flex justify-center items-center h-screen ">
            <div className="container-border ">
                <img
                    className=" w-full h-64 md:w-64 object-cover blur-sm hover:blur-none hover:scale-105 hover:rounded-lg hover:h-max  delay-150 duration-300  overflow-hidden hover:overflow-hidden"
                    src={urlimg}
                    alt=""
                />
                <h1 className="text-2xl">Hello</h1>
                <p className="mb-4 bg-[#1e8fc7] ">this is my div</p>
                <button className="container-btn ">Say Hello</button>
            </div>
        </div>
    );
};

export default Page;
