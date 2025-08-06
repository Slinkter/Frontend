const urlimg =
    "https://images.pexels.com/photos/7723354/pexels-photo-7723354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const Page = () => {
    return (
        <div className="h-dvh border-4 border-red-600 p-4 flex justify-center items-center  ">
            <div className="container-border ">
                <img className=" container-img " src={urlimg} alt="" />
                <h1>Hello</h1>
                <p className="mb-4 bg-[#9acd67] ">this is my div</p>
                <button className="container-btn ">Say Hello</button>
            </div>
        </div>
    );
};

export default Page;
