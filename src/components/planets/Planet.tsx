import React from 'react';
import '../../styles.scss';

// Importy planet images
import mercuryImage from '../../assets/mercury.png';
import venusImage from '../../assets/venus.png';
import earthImage from '../../assets/earth.png';
import marsImage from '../../assets/mars.png';
import jupiterImage from '../../assets/jupiter.png';
import saturnImage from '../../assets/saturn.png';
import uranusImage from '../../assets/uranus.png';
import neptuneImage from '../../assets/neptune.png';
import sunImage from '../../assets/sun.png';

interface PlanetProps {
  planet: {
    englishName: string;
    meanRadius?: number;
    imageUrl?: string;
    sunScale: number;
  };
}

// Planet images
const planetImages: Record<string, string> = {
  Sun: sunImage,
  Mercury: mercuryImage,
  Venus: venusImage,
  Earth: earthImage,
  Mars: marsImage,
  Jupiter: jupiterImage,
  Saturn: saturnImage,
  Uranus: uranusImage,
  Neptune: neptuneImage,
};

// Planet diameter converted to vw in 1:1 scale
const planetDiameters: Record<string, number> = {
  Sun: 1391000,
  Mercury: 4880,
  Venus: 12104,
  Earth: 12742,
  Mars: 6779,
  Jupiter: 139822,
  Saturn: 116464,
  Uranus: 50724,
  Neptune: 49244,
};

// Default scaling factor for the sun's size
const SUN_SCALE = 5;

// Export the constants
export { planetDiameters, SUN_SCALE };

const Planet: React.FC<PlanetProps> = ({ planet }) => {
  const imageUrl = planetImages[planet.englishName] || '';

  // Calculate the planet size based on the mean radius of the planet converted to vw and the scale factor of our sun
  const size = ((planet.meanRadius || 0) / planetDiameters['Sun']) * SUN_SCALE * planet.sunScale;

  return (
    <div className="planet-container">
      <div
        className={`planet ${planet.englishName.toLowerCase()}`} // Assign class based on planet name
        style={{
          backgroundImage: `url(${imageUrl})`,
          width: `${size}vw`,
          height: `${size}vw`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <span className="planet-name">{planet.englishName}</span>
    </div>
  );
};

export default Planet;
