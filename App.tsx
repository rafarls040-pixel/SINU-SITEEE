import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BackgroundText from './components/BackgroundText';

// Lazy load committee pages
const CSNU = lazy(() => import('./pages/CSNU'));
const CN = lazy(() => import('./pages/CN'));
const UNODC = lazy(() => import('./pages/UNODC'));
const PNUMA = lazy(() => import('./pages/PNUMA'));
const UNIFEM = lazy(() => import('./pages/UNIFEM'));
const CDH = lazy(() => import('./pages/CDH'));
const Historic = lazy(() => import('./pages/Historic'));
const CI = lazy(() => import('./pages/CI'));
const OPEP = lazy(() => import('./pages/OPEP'));
const TO = lazy(() => import('./pages/TO'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-un-dark">
    <div className="w-12 h-12 border-4 border-un-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-white">
        <BackgroundText />
        <div className="relative z-10">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/comite/csnu" element={<CSNU />} />
              <Route path="/comite/cn" element={<CN />} />
              <Route path="/comite/unodc" element={<UNODC />} />
              <Route path="/comite/pnuma" element={<PNUMA />} />
              <Route path="/comite/unifem" element={<UNIFEM />} />
              <Route path="/comite/cdh" element={<CDH />} />
              <Route path="/comite/historico" element={<Historic />} />
              <Route path="/comite/ci" element={<CI />} />
              <Route path="/comite/opep" element={<OPEP />} />
              <Route path="/comite/to" element={<TO />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;