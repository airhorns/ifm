import * as later from "later";
import { Recurrence } from "../types";

export const laterize = (input: Recurrence): later.ScheduleData => {
  let schedule = later.parse.recur();

  if (input) {
    schedule = schedule.on(1).dayOfWeek();
  }

  return {schedules: schedule.schedules, exceptions: schedule.exceptions, error: 0};
};
