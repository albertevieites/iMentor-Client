import AppRoutes from "../../routes/AppRoutes";

import Layout from "../Layout/Layout";

import "./App.css";
import "./variables.css";

const App = () => {
  return (
      <Layout>
        <AppRoutes />
      </Layout>
  );
};

export default App;
