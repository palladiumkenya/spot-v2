import styled from "@emotion/styled";
import { SimpleCard } from ".";
import FlowDiagram from "./FlowDiagram";
import { Box } from "@mui/material";

const CircularSpan = styled('span')({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'red',
    marginRight: '2px',
  });
  
  const Legend = () =>{
  return (
		<Box>
			<SimpleCard title="Legend">
				<div style={{ width: '100%' }}>
					<span style={{ marginRight: '8px' }}>
						<CircularSpan style={{ background: '#a7caed' }}></CircularSpan>
						<span>On-starting</span>
					</span>
					<span style={{ marginRight: '8px' }}>
						<CircularSpan style={{ background: '#1976d2' }}></CircularSpan>
						<span>On-going</span>
					</span>
					<span style={{ marginRight: '8px' }}>
						<CircularSpan style={{ background: '#FFAF38' }}></CircularSpan>
						<span>On-queueing</span>
					</span>
					<span style={{ marginRight: '8px' }}>
						<CircularSpan style={{ background: '#FF3D57' }}></CircularSpan>
						<span>On-error</span>
					</span>
					<span style={{ marginRight: '8px' }}>
						<CircularSpan style={{ background: '#2e7d32' }}></CircularSpan>
						<span>On-succcess</span>
					</span>
				</div>
				<FlowDiagram />
			</SimpleCard>
		</Box>
  );
  }
  export default Legend;