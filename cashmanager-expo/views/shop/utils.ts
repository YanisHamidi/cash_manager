import { GestureResponderEvent } from "react-native";

const onPressUpdateState = (setState: React.Dispatch<React.SetStateAction<boolean>>, state: boolean): ((event: GestureResponderEvent) => void) => {
  const onPressHandler = (event: GestureResponderEvent) => {
    if (event) {
      setState(!state);
    }
  };

  return onPressHandler;
};

export { onPressUpdateState };
