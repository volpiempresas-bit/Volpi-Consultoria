import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AboutMe } from './components/AboutMe';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
        <AboutMe />
      </main>
      <Footer />
    </div>
  );
}

export default App;