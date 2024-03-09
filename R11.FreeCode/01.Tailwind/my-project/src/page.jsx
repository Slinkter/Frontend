import React from "react";

const Page = () => {
  return (
    <div className="">
      <div class="flex flex-col min-h-screen space-y-4">
        <div class="w-1/5  bg-red-700 min-h-min ">Sidebar</div>
        <div class="w-4/5  bg-green-900  ">Main content</div>
      </div>
    </div>
  );
};

export default Page;
