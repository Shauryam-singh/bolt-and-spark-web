
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeApp } from '@emailjs/browser';

// Initialize EmailJS with user ID
initializeApp('F_gtW51ngLRCqT0_K');

createRoot(document.getElementById("root")!).render(<App />);
