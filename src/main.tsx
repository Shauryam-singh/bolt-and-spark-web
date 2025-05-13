
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import emailjs from '@emailjs/browser';

// Initialize EmailJS with user ID
emailjs.init('F_gtW51ngLRCqT0_K');

createRoot(document.getElementById("root")!).render(<App />);
