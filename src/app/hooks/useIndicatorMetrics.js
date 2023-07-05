import { useContext } from 'react'
import IndicatorMetricsContext from 'app/contexts/IndicatorMetricsContext';

const useIndicatorMetrics = () => useContext(IndicatorMetricsContext);

export default useIndicatorMetrics;
