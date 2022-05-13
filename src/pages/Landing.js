import React from "react";

const Landing = () => {
  // const [user] = React.useState(
  //   JSON.parse(window.localStorage.getItem("user"))
  // );

  return (
    <div className="flex justify-center">
      <div className="font-serif py-32 text-center">
        <div className="text-5xl whitespace-normal pb-4 flex flex-col gap-y-4">
          <p>If you're looking to find a fitness buddy</p>
          <p>you've come to the right place</p>
        </div>
        {/* <p className="text-4xl whitespace-normal">
            Browse our menu and see what others think.
          </p> */}
      </div>
    </div>
  );
};

export default Landing;
