import React from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import axios from "axios";
// import moment from "moment";
// import "moment-timezone";
import moment from "moment-timezone";

const Calendar = ({ userData, isMeetup }) => {
  const [meetings, setMeetings] = React.useState([]);
  const [data, setData] = React.useState({
    events: [],
    resources: [],
  });
  const [user] = React.useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  // console.log("user -> ", user);
  const getMeetings = async () => {
    await axios
      .get("/meeting/get-all/")
      .then((res) => {
        let aux_data = [];
        res.data.forEach((item) => {
          item.start = moment(item.start, "YYYY-MM-DD HH:mm:ss")
            .tz("US/Alaska")
            .format()
            .slice(0, 19);
          item.end = moment(item.end, "YYYY-MM-DD HH:mm:ss")
            .tz("US/Alaska")
            .format()
            .slice(0, 19);
          if (!isMeetup) {
            // if (false) {
            if (!item.user_b_agree) {
              aux_data.push(item);
            }
          } else {
            if (item.user_b_agree && user.email === item.resource) {
              aux_data.push(item);
            }
          }
        });
        setMeetings(aux_data);
      })
      .catch((err) => {
        console.log("error getting meetings from /meeting/get-all, -> ", err);
      });
  };
  const postMeeting = async (meetup) => {
    await axios
      .post("/meeting/post", meetup)
      .then((res) => {
        console.log(res.data);
        getMeetings();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteEvent = async (eventData) => {
    await axios
      .delete(`/meeting/delete/?id=${eventData.id}`)
      .then((res) => {
        console.log("Delete event -> ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editEvent = async (eventData) => {
    await axios
      .put(`/meeting/put/?id=${eventData.id}`, eventData)
      .then((res) => {
        console.log("Edit event -> ", res.data);
        getMeetings();
      })
      .catch((err) => {
        console.log("Edit event error -> ", err);
      });
  };

  React.useEffect(() => {
    getMeetings();
  }, []);
  React.useEffect(() => {
    setData({
      events: meetings,
      resources: userData,
    });
  }, [meetings, userData]);

  return (
    <div className="relative mx-10 my-4">
      <DayPilotScheduler
        timeHeaders={[
          {
            groupBy: "Day",
            format: "dddd, d MMMM yyyy",
          },
          {
            groupBy: "Hour",
          },
          {
            groupBy: "Cell",
            format: "mm",
          },
        ]}
        scale={"CellDuration"}
        cellDuration={15}
        days={14}
        eventHeight={50}
        startDate={DayPilot.Date.today().firstDayOfWeek()}
        businessBeginsHour={0}
        businessEndsHour={24}
        businessWeekends={true}
        timeRangeSelectedHandling={"Enabled"}
        onTimeRangeSelected={async (args) => {
          const dp = args.control;
          const modal = await DayPilot.Modal.prompt(
            "Create a new event:",
            "Event 1"
          );
          dp.clearSelection();
          if (modal.canceled) {
            return;
          }
          dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: modal.result,
          });

          postMeeting({
            date_start: args.start,
            date_end: args.end,
            id: DayPilot.guid(),
            user_a_email: args.resource,
            title: modal.result,
          });
        }}
        eventMoveHandling={"Update"}
        // onEventClick={(args) => {
        //   console.log("Event clicked -> ", args);
        // }}

        // onEventMoved={(args) => {
        //   args.control.message("Event moved: " + args.e.text());
        //   console.log("Moved event -> ", args);
        // }}

        // eventResizeHandling={"Update"}
        // onEventResized={(args) => {
        //   args.control.message("Event resized: " + args.e.text());
        // }}

        eventDeleteHandling={"Update"}
        onEventDeleted={(args) => {
          args.control.message("Event deleted: " + args.e.text());
          console.log("Event deleted clicked: -> ", args.e.data);
          if (isMeetup) {
            editEvent({
              id: args.e.data.id,
              user_b_agree: false,
            });
          } else {
            if (
              // args.e.data.user_a_email &&
              user.email === args.e.data.resource
            ) {
              deleteEvent(args.e.data);
              // aux_data.push(item);
            } else {
              console.log("clicked delete event when not the event creator.");
            }
          }
        }}
        eventClickHandling={"Enabled"}
        onEventClicked={async (args) => {
          args.control.message("Event clicked: " + args.e.text());
          console.log("Event clicked: -> ", args.e.data);
          const dp = args.control;
          const modal = await DayPilot.Modal.confirm(
            "Will you be joining this session?"
          );
          if (modal.result) {
            editEvent({
              id: args.e.data.id,
              user_b_agree: true,
            });
          } else {
            console.log("not confirmed -> ", args);
          }
          // const modal = await DayPilot.Modal.prompt(
          //   "Would you like to:",
          //   "Event 1"
          // );
          // dp.clearSelection();
          // if (modal.canceled) {
          //   return;
          // }
          // dp.events.add({
          //   start: args.start,
          //   end: args.end,
          //   id: DayPilot.guid(),
          //   resource: args.resource,
          //   text: modal.result,
          // });
        }}
        onBeforeEventRender={(args) => {
          args.data.areas = [
            {
              top: 3,
              left: 3,
              html: `
              <div>
              <p>${args.data.resource}</p>
              </div>`,
            },
          ];
        }}
        eventHoverHandling={"Bubble"}
        bubble={
          new DayPilot.Bubble({
            onLoad: (args) => {
              // if event object doesn't specify "bubbleHtml" property
              // this onLoad handler will be called to provide the bubble HTML
              args.html = "Event details";
            },
          })
        }
        treeEnabled={true}
        resources={data.resources}
        events={data.events}
      />
    </div>
  );
};

export default Calendar;
