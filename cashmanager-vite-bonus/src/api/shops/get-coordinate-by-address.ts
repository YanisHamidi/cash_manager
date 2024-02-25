import axios from 'axios';

const getCoordinatesByAddress = async (address: string) => {
  try {
    const result = await axios.get(
      `https://api-adresse.data.gouv.fr/search/?q=${address}`,
    );
    if (result.data.features.length > 0) {
      return result.data.features[0].geometry.coordinates;
    } else {
      console.error('Adresse non trouvée');
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la recherche d'adresse :", error);
    return null;
  }
};

export { getCoordinatesByAddress };
