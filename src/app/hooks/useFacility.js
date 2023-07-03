import { useContext } from 'react'
import FacilityContext from 'app/contexts/FacilityContext';

const useFacility = () => useContext(FacilityContext);

export default useFacility;
