import * as Location from "expo-location";

export const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status == "granted") {
    return status;
  } else {
    return "null";
  }
};
