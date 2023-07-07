import { useContext } from 'react'
import UploadHistoryContext from 'app/contexts/UploadHistoryContext';

const useUploadHistory = () => useContext(UploadHistoryContext);

export default useUploadHistory;
