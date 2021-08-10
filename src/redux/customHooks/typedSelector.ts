import { TypedUseSelectorHook, useSelector } from "react-redux";
import { state } from "../reducers";

const useTypedSelector: TypedUseSelectorHook<state> = useSelector;

export default useTypedSelector;
