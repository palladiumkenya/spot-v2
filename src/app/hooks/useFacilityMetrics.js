import { useContext } from 'react'
import FacilityMetricsContext from 'app/contexts/FacilityMetricsContext';

const useFacilityMetrics = () => useContext(FacilityMetricsContext);

export default useFacilityMetrics;
