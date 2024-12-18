import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function BigCalendar(props) {
  return <Calendar {...props} localizer={localizer} />;
}
