import React from "react";
import axios from "axios";
import Calendar from "../components/Calendar";
// import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";

const MeetingView = ({ isMeetup }) => {
  // const [meetings, setMeetings] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [user] = React.useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  // const getMeetings = async () => {
  //   await axios
  //     .get("/meeting/get-all/")
  //     .then((res) => {
  //       res.data.forEach((item) => {
  //         // console.log("item -> ", item);
  //         item.start = item.start.split(".")[0];
  //         item.end = item.end.split(".")[0];
  //       });
  //       // console.log("res.data -> ", res.data);
  //       setMeetings(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("error getting meetings from /meeting/get-all, -> ", err);
  //     });
  // };

  const getUsers = async () => {
    await axios
      .get("/user/get-all/")
      .then((res) => {
        let aux_userData = [];
        res.data.forEach((item) => {
          console.log("get user -> ", item);
          let aux_obj = {
            name: item.name,
            id: item.email,
          };
          if (!isMeetup) {
            aux_userData.push(aux_obj);
          } else {
            if (user.email === item.email) {
              aux_userData.push(aux_obj);
            }
          }
        });
        // console.log("userData -> ", userData);
        setUserData(aux_userData);
      })
      .catch((err) => {
        console.log("Error while gathering data from /user/get-all, -> ", err);
      });
  };

  React.useEffect(() => {
    // getMeetings();
    getUsers();
  }, []);
  return (
    <div>
      <Calendar
        // meetings={meetings}
        userData={userData}
        isMeetup={isMeetup}
      />
    </div>
  );
};

export default MeetingView;
