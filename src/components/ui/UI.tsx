import React, { useState } from 'react';
import './ui.scss';
import '../../App.scss';
import '../../styles.scss';
import YearCounter from './counter/YearCounter';
import PlanetList from '../planets/PlanetList';
import Modal from './modal/Modal';
import ModalContent from './modal/ModalContent';

interface PlanetData {
  id: number;
  englishName: string;
  avgTemp?: number;
  density?: number;
  discoveredBy?: string;
  discoveryDate?: string;
  meanRadius?: number;
  moons?: { name: string }[];
}

interface SolarSystemUIProps {
  appHeight: string;
  sunScale: number;
  distanceScale: number;
  setDistanceScale1x: () => void;
  setDistanceScaleDividedBy20: () => void;
  setDistanceScaleDividedBy40: () => void;
  toggleScale: () => void;
  sunSize: number;
  currentDistance: string;
  loading: boolean;
  showScrollMessage: boolean;
  showEndMessage: boolean;
  planets: PlanetData[];              
  nasaImages: { [key: string]: string };
}

const UI: React.FC<SolarSystemUIProps> = ({
  sunScale,
  setDistanceScale1x,
  setDistanceScaleDividedBy20,
  setDistanceScaleDividedBy40,
  toggleScale,
  currentDistance,
  showScrollMessage,
  showEndMessage,
  loading,
  planets,
  nasaImages
}) => {
  const [isUIVisible, setIsUIVisible] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  const openModal = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPlanet(null);
  };

  const toggleUIVisibility = () => {
    setIsUIVisible(!isUIVisible);
  };

  return (
    <div>
      <button onClick={toggleUIVisibility} className="toggle-ui-btn">
        {isUIVisible ? 'Hide UI' : 'Show UI'}
      </button>

      {isUIVisible && (
        <>
          <h1 className="siteTitle">Solar System Simulation</h1>
          <YearCounter />

          {loading && <div className="loading">Loading planet data...</div>}

          {showScrollMessage && !loading && (
            <div className="scroll-message">You better start scrolling</div>
          )}

          {showEndMessage && (
            <div className="end-message">
              <p>The planets are way too far away at this scale</p>
              <p className="sub-message">
                Try dividing the distance to make it short enough to reach
              </p>
            </div>
          )}

          <div className="scale-interface">
            <p className="current-scale">
              Scale: <span>{sunScale}X</span>
            </p>
            <p className="current-distance">
              Distance: <span>{currentDistance}</span>
            </p>
          </div>

          <div className="size-controls">
            <p className="distance-size-title">Size:</p>
            <button onClick={toggleScale}>
              {sunScale === 100 ? '1X' : '100X'}
            </button>

            <p className="distance-control-title">Distance:</p>
            <button onClick={setDistanceScale1x}>1X</button>
            <button onClick={setDistanceScaleDividedBy20}>/20</button>
            <button onClick={setDistanceScaleDividedBy40}>/40</button>
          </div>

          <PlanetList planets={planets} openModal={openModal} />

          {modalIsOpen && selectedPlanet && (
            <Modal isOpen={modalIsOpen} onClose={closeModal}>
              <ModalContent
                selectedPlanet={selectedPlanet}
                nasaImages={nasaImages}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default UI;
