import { Provider } from "react-redux";
import { store } from "../redux/store";
export const withRedux = (Story: React.ComponentType) => (
  <Provider store={store}>
    <Story />
  </Provider>
);
