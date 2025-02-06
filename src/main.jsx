import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/components/index.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'wouter';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity, // Daten, die einmal im Cache sind, werden nicht nochmal geladen
			gcTime: Infinity, // Zeit, nach der unbenutzte Daten aus dem Cache gelöscht werden. Default sind 5 Minuten.
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Router>
				<App />
			</Router>
		</QueryClientProvider>
	</React.StrictMode>
);
