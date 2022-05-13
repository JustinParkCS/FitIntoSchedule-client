import React from "react";

const MsgPost = () => {
  const [message, setMessage] = React.useState("");
  const postHandler = () => {
    console.log(message);
  };
  return (
    <div className="flex flex-col relative gap-y-2">
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700"
      >
        Add a message
      </label>
      <div
      //   className="mt-1"
      >
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
          defaultValue={""}
          placeholder={"Post your message here."}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="border text-sm p-1 rounded-md bg-blue-600 text-white flex justify-center w-28 hover:bg-blue-800"
          type="button"
          onClick={postHandler}
        >
          Send message
        </button>
      </div>
    </div>
  );
};

export default MsgPost;
