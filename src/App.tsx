import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider";

function App() {
	return (
		<ThemeProvider defaultTheme="system">
			<Routes>
				<Route path="/" element={<IndexPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Toaster />
		</ThemeProvider>
	);
}

export default App;