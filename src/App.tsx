import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/Index";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
