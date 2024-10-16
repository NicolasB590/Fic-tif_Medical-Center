import moment from "moment";

const generateReservationSlot = () => {
  const events = [];
  const startDate = moment();
  const endDate = moment().add(6, "months");
  const today = moment().startOf("day");

  for (let m = startDate.clone(); m.isBefore(endDate); m.add(1, "days")) {
    if (m.isoWeekday() <= 5) {
      if (m.isSame(today, "day")) {
        for (let hour = 8; hour < 18; hour++) {
          if (hour > moment().hours()) {
            events.push({
              id: `${m.format("YYYY-MM-DD")}-${hour}-0`,
              title: `Créneau ${hour}:00`,
              start: m.clone().hour(hour).minute(0).toDate(),
              end: m.clone().hour(hour).minute(30).toDate(),
            });
            events.push({
              id: `${m.format("YYYY-MM-DD")}-${hour}-30`,
              title: `Créneau ${hour}:30`,
              start: m.clone().hour(hour).minute(30).toDate(),
              end: m
                .clone()
                .hour(hour + 1)
                .minute(0)
                .toDate(),
            });
          }
          if (hour === moment().hours() && moment().minutes() < 30) {
            events.push({
              id: `${m.format("YYYY-MM-DD")}-${hour}-30`,
              title: `Créneau ${hour}:30`,
              start: m.clone().hour(hour).minute(30).toDate(),
              end: m
                .clone()
                .hour(hour + 1)
                .minute(0)
                .toDate(),
            });
          }
        }
      } else {
        for (let hour = 8; hour < 18; hour++) {
          events.push({
            id: `${m.format("YYYY-MM-DD")}-${hour}-0`,
            title: `Créneau ${hour}:00`,
            start: m.clone().hour(hour).minute(0).toDate(),
            end: m.clone().hour(hour).minute(30).toDate(),
          });
          events.push({
            id: `${m.format("YYYY-MM-DD")}-${hour}-30`,
            title: `Créneau ${hour}:30`,
            start: m.clone().hour(hour).minute(30).toDate(),
            end: m
              .clone()
              .hour(hour + 1)
              .minute(0)
              .toDate(),
          });
        }
      }
    }
  }

  return events;
};

export default generateReservationSlot;
