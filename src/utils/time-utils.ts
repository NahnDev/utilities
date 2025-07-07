import { TTime } from "@/types/time";

export default class TimeUtils {
  static format(time: TTime) {
    const { hours, minutes, seconds } = time;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
}
