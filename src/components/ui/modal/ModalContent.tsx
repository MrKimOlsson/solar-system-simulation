import React from 'react';
import './modal.scss';

interface ModalContentProps {
  selectedPlanet: any;
  nasaImages: { [key: string]: string };
}

const ModalContent: React.FC<ModalContentProps> = ({ selectedPlanet, nasaImages }) => (
  <>
    <h2>{selectedPlanet.englishName}</h2>
    <img
      src={nasaImages[selectedPlanet.englishName]}
      alt={`${selectedPlanet.englishName} NASA`}
      className="modal-image"
    />
    <ul>
      <li><strong>Average Temperature:</strong> {selectedPlanet.avgTemp ? `${selectedPlanet.avgTemp} °C` : 'N/A'}</li>
      <li><strong>Density:</strong> {selectedPlanet.density ? `${selectedPlanet.density} g/cm³` : 'N/A'}</li>
      <li><strong>Discovered By:</strong> {selectedPlanet.discoveredBy || 'Unknown'}</li>
      <li><strong>Discovery Date:</strong> {selectedPlanet.discoveryDate || 'Unknown'}</li>
      <li><strong>Diameter:</strong> {selectedPlanet.meanRadius ? `${selectedPlanet.meanRadius * 2} km` : 'N/A'}</li>
      <li><strong>Moons:</strong> {selectedPlanet.moons?.length || 0} {selectedPlanet.moons?.length === 1 ? 'moon' : 'moons'}</li>
    </ul>
  </>
);

export default ModalContent;
