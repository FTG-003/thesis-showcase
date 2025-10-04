import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;