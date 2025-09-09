import Body from "./Body.jsx";
import Header from "./Header/Header.jsx";
import AnalyticsBI from "./AnalyticsBI/AnalyticsBI.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="roteiro/" element={<Body />} />
        <Route path="roteiro/analyticsbi" element={<AnalyticsBI />} />
      </Routes>
    </>
  );
}

export default App;
