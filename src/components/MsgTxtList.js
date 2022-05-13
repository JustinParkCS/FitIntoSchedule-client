import React from "react";

const messages = [
  {
    id: 1,
    subject: "Velit placeat sit ducimus non sed",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  // More messages...
];

const MsgTxtList = () => {
  return (
    <div>
      <ul className="divide-y divide-gray-200 w-full flex relative border px-10 pt-4 pb-10 h-auto overflow-auto">
        {messages.map((message, indx) => (
          //   {/* justify end here if user.email == message.user */}
          <div className={`flex justify-end`} key={indx}>
            {/* console.log(message) */}

            <li
              key={message.id}
              className="relative py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 border rounded-lg w-2/3 flex flex-col bg-blue-200"
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
