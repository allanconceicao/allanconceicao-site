/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import Question from './components/Question';
import Habits from './components/Habits';
import Book from './components/Book';
import About from './components/About';
import Reflections from './components/Reflections';
import Social from './components/Social';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-cream-50 font-sans min-h-screen selection:bg-cream-200 selection:text-charcoal-900 overflow-x-hidden antialiased">
      {/* Editorial Floating Header */}
      <Header />

      <main>
        {/* Fullscreen Hero Splash with Portrait & Mission statement */}
        <Hero />

        {/* Quiet contemplate opening question with high-contrast pause */}
        <Question />

        {/* Cognitive Habitudes card board for reader self-identification */}
        <Habits />

        {/* Full Book Mockup & benefit chapter analysis */}
        <Book />

        {/* High-end Storytelling Biography about Allan's values */}
        <About />

        {/* The Expandable "Só Percebi Depois" Philosophical Journal */}
        <Reflections />

        {/* Social connections and podcast/YT upcoming placeholders */}
        <Social />
      </main>

      {/* Minimal premium contact footer */}
      <Footer />
    </div>
  );
}

