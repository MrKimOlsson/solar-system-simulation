// src/services/planetService.ts
// ... (your existing imports)
// const NASA_IMAGE_API = 'https://images-api.nasa.gov/search';
const SOLAR_SYSTEM_API = 'https://api.le-systeme-solaire.net/rest/bodies/';

interface Planet {
  id: number;
  englishName: string;
  meanRadius: number; // Change to meanRadius
  description?: string; // Optional description field
  imageUrl?: string; // Optional image URL
}

export const fetchPlanets = async (): Promise<Planet[]> => {
    console.log("Starting fetchPlanets function..."); // Log to indicate function start
    try {
      const response = await fetch(SOLAR_SYSTEM_API);
      console.log("Fetching from Solar System API...");
  
      if (!response.ok) {
        console.log("Failed to fetch planets.");
        throw new Error(`Failed to fetch planets: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Fetched data:", data); // Log the entire response data
  
      const filteredPlanets = data.bodies.filter((body: any) => body.isPlanet);
      console.log("Filtered planets:", filteredPlanets); // Log filtered planets
  
    //   const planetsWithImages = await Promise.all(filteredPlanets.map(fetchPlanetImage));
    //   console.log("Planets with images:", planetsWithImages); // Log planets with images
  
    //   return planetsWithImages;
      return filteredPlanets;
    } catch (error) {
      console.error("Error fetching planets:", error);
      return [];
    }
  };
  





// // src/services/planetService.ts
// const NASA_IMAGE_API = 'https://images-api.nasa.gov/search';
// const SOLAR_SYSTEM_API = 'https://api.le-systeme-solaire.net/rest/bodies/';

// interface Planet {
//   id: number;
//   englishName: string;
//   diameter: number;
//   description?: string; // Optional description field
//   imageUrl?: string; // Optional image URL
// }

// export const fetchPlanets = async (): Promise<Planet[]> => {
//   console.log("Starting fetchPlanets function..."); // Log to indicate function start
//   try {
//     // Fetching data from the Solar System API
//     const response = await fetch(SOLAR_SYSTEM_API);
//     console.log("Fetching from Solar System API...");

//     // Check if the response is successful
//     if (!response.ok) {
//       console.log("Failed to fetch planets.");
//       throw new Error(`Failed to fetch planets: ${response.statusText}`);
//     }

//     // Parse the response data
//     const data = await response.json();
//     console.log("Fetched data:", data); // Log the entire response data

//     // Filter planets from the response
//     const filteredPlanets = data.bodies.filter((body: any) => body.isPlanet);
//     console.log("Filtered planets:", filteredPlanets); // Log filtered planets

//     // Map planets to include images
//     const planetsWithImages = await Promise.all(filteredPlanets.map(fetchPlanetImage));
//     console.log("Planets with images:", planetsWithImages); // Log planets with images

//     return planetsWithImages;
//   } catch (error) {
//     console.error("Error fetching planets:", error);
//     return []; // Return an empty array on error
//   }
// };

// // Helper function to fetch planet images
// const fetchPlanetImage = async (planet: any): Promise<Planet> => {
//   console.log(`Fetching image for ${planet.englishName}...`); // Log before fetching image
//   try {
//     const imageResponse = await fetch(`${NASA_IMAGE_API}?q=${planet.englishName}`);
    
//     // Check if the image response is successful
//     if (!imageResponse.ok) {
//       console.log(`Failed to fetch image for ${planet.englishName}.`);
//       throw new Error(`Failed to fetch image for ${planet.englishName}: ${imageResponse.statusText}`);
//     }
    
//     // Parse the image data
//     const imageData = await imageResponse.json();
//     const imageUrl = imageData.collection.items[0]?.links[0]?.href; // Get the first image URL if available

//     console.log(`Image URL for ${planet.englishName}: ${imageUrl}`); // Log the fetched image URL

//     return {
//       id: planet.id,
//       englishName: planet.englishName,
//       diameter: planet.diameter,
//       description: planet.description || 'No description available', // Default description
//       imageUrl,
//     };
//   } catch (imageError) {
//     console.error("Error fetching image:", imageError);
//     // Return planet data without image if there's an error fetching the image
//     return {
//       id: planet.id,
//       englishName: planet.englishName,
//       diameter: planet.diameter,
//       description: planet.description || 'No description available',
//       imageUrl: undefined, // No image URL available
//     };
//   }
// };
