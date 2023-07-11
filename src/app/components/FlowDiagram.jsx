import { Box } from '@mui/material';
import React from 'react';
import ReactFlow, { MarkerType } from 'reactflow';

import 'reactflow/dist/style.css';

const FlowDiagram = () => {
	const initialNodes = [
		{
			id: '1',
			position: { x: 10, y: 90 },
			data: { label: 'Upload in progress' },
			style: { background: '#1976d2', color: 'white' },
			sourcePosition: 'right',
			type: 'input',
			sourceHandle: 'out',
		},
		{
			id: '2',
			position: { x: 300, y: 90 },
			data: { label: 'Queued For Processing' },
			style: { background: '#FFAF38', color: 'white' },
			sourcePosition: 'right',
			targetPosition: 'left',
			sourceHandle: 'out',
			targetHandle: 'in',
		},
		{
			id: '3',
			position: { x: 600, y: 90 },
			data: { label: 'Processed' },
			style: { background: '#2e7d32', color: 'white' },
			sourcePosition: 'right',
			targetPosition: 'left',
			sourceHandle: 'out',
			targetHandle: 'in',
			type: 'output',
		},
	];

	const initialEdges = [
		{
			id: '1->2',
			source: '1',
			target: '2',
			animated: true,
			markerEnd: {
				type: MarkerType.ArrowClosed,
			},
		},
		{
			id: '2->3',
			source: '2',
			target: '3',
			animated: true,
			markerEnd: {
				type: MarkerType.ArrowClosed,
			},
		},
	];
	let isLocked = true;

	return (
		<Box width="100%" height={'150px'}>
			<ReactFlow
				nodes={initialNodes}
				edges={initialEdges}
				panOnDrag={false}
				fitView={true}
				// panningEnabled={false}
				// zoomingEnabled={false}
				zoomOnScroll={false}
				panOnScroll={false}
				zoomOnPinch={false}
				zoomOnDoubleClick={false}
				elementsSelectable={false}
				preventScrolling={true}
				multiSelectionKeyCode="Shift"
				edgesUpdatable={false}
				edgesFocusable={false}
				nodesDraggable={false}
				nodesConnectable={false}
				nodesFocusable={false}
			/>
		</Box>
	);
};

export default FlowDiagram;
