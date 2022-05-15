import React from "react";

const messages = [
  {
    id: 1,
    subject: "",
    sender: "Gloria Roberston",
    time: "12m ago",
    datetime: "2021-01-27T16:35",
    preview: "Hey, Cant wait to join you at the gym later!",
  },
  {
    id: 2,
    subject: "",
    sender: "Calvin Hawkins",
    time: "1m ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Hey, yeah! likewise, I found this new exercise regimen that I would love your opinion on.",
  },
];

const MsgTxtList = () => {
  return (
    <div className="relative">
      <ul className="w-full flex flex-col relative border px-10 pt-4 pb-10 h-auto gap-y-4">
        {messages.map((message, indx) => (
          //   {/* justify end here if user.email == message.user */}
          <div
            className={`w-full flex ${indx % 2 === 0 ? "justify-end" : ""}`}
            key={indx}
          >
            {/* console.log(message) */}

            <li
              key={message.id}
              className={`relative py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 border rounded-lg w-2/3 flex flex-col ${
                indx % 2 === 0 ? "bg-blue-200" : "bg-green-200"
              }`}
            >
              <div className="flex justify-between space-x-3">
                <div className="min-w-0 flex-1">
                  {/* <a href="#" className="block focus:outline-none"> */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {message.sender}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {message.subject}
                  </p>
                  {/* </a> */}
                </div>
                <time
                  dateTime={message.datetime}
                  className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                >
                  {message.time}
                </time>
              </div>
              <div className="mt-1">
                <p className="line-clamp-2 text-sm text-gray-600">
                  {message.preview}
                </p>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MsgTxtList;
