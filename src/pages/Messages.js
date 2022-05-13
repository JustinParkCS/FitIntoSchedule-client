import React from "react";
import MsgPost from "../components/MsgPost";
import MsgPplList from "../components/MsgPplList";
import MsgTxtList from "../components/MsgTxtList";

const Messages = () => {
  return (
    <div className="relative border m-7 rounded-md h-full">
      <div className="flex flex-row gap-10 divide-x px-4">
        {/* people list view */}
        <div className="flex justify-center items-start p-4 h-full">
          <MsgPplList />
        </div>
        {/* right side -> msg text and post */}
        <div className="flex flex-col gap-y-4 divide-y-2 pl-4">
          {/* msg text list */}
          <div className="p-4">
            <MsgTxtList />
          </div>
          {/* msg post view */}
          <div className="p-4">
            <MsgPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
