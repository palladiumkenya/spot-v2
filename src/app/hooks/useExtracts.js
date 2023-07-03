import { useContext } from 'react'
import ExtractContext from 'app/contexts/ExtractsContext';

const useExtracts = () => useContext(ExtractContext);

export default useExtracts;
