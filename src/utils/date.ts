import moment from "moment";

export const formatDateTime = (date?: DateTime): string => {
  return date === null || date === "" ? "" : moment().format("MM/DD/YYYY hh:mm A");
};

export const formatDate = (date?: DateTime, format: string = "MM/DD/YYYY"): string => {
  return date === null || date === "" ? "" : moment(date).format(format);
};

type DateTime = string | Date;
