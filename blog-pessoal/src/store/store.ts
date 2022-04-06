import { createStore } from "redux";
import { userReducer } from "./tokens/tokensReducer";

const store = createStore(userReducer)

export default store 