import { useState } from 'react'; 
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AboutMe } from './components/AboutMe';
import { IncomeSection } from './components/IncomeSection';
import { Footer } from './components/Footer';
import { PropertyFormModal } from './components/PropertyFormModal';
import { VehicleFormModal } from './components/VehicleFormModal';
import { ServiceFormModal } from './components/ServiceFormModal';
import { OtherFormModal } from './components/OtherFormModal';
import { OpportunitiesModal } from './components/OpportunitiesModal';
import { AulasModal } from './components/AulasModal';
import { SpecialistFormModal } from './components/SpecialistFormModal';

function App() {
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);
  const [isOpportunitiesOpen, setIsOpportunitiesOpen] = useState(false);
  const [isAulasOpen, setIsAulasOpen] = useState(false);
  const [isSpecialistFormOpen, setIsSpecialistFormOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        onOpenOpportunities={() => setIsOpportunitiesOpen(true)}
        onOpenAulas={() => setIsAulasOpen(true)}
      />
      <main>
        <Hero onOpenSpecialistForm={() => setIsSpecialistFormOpen(true)} />
        <Features 
          onOpenPropertyForm={() => setIsPropertyModalOpen(true)} 
          onOpenVehicleForm={() => setIsVehicleModalOpen(true)}
          onOpenServiceForm={() => setIsServiceModalOpen(true)}
          onOpenOtherForm={() => setIsOtherModalOpen(true)}
        />
        <IncomeSection />
        <AboutMe />
      </main>
      <Footer />

      {/* Modais de Leads */}
      <PropertyFormModal 
        isOpen={isPropertyModalOpen} 
        onClose={() => setIsPropertyModalOpen(false)} 
      />
      <VehicleFormModal 
        isOpen={isVehicleModalOpen} 
        onClose={() => setIsVehicleModalOpen(false)} 
      />
      <ServiceFormModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)} 
      />
      <OtherFormModal 
        isOpen={isOtherModalOpen} 
        onClose={() => setIsOtherModalOpen(false)} 
      />
      <SpecialistFormModal 
        isOpen={isSpecialistFormOpen} 
        onClose={() => setIsSpecialistFormOpen(false)} 
      />
      
      {/* Modais de Conteúdo e Engajamento */}
      <OpportunitiesModal 
        isOpen={isOpportunitiesOpen} 
        onClose={() => setIsOpportunitiesOpen(false)} 
      />
      <AulasModal 
        isOpen={isAulasOpen} 
        onClose={() => setIsAulasOpen(false)} 
      />
    </div>
  );
}

export default App;