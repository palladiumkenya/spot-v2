import { SimpleCard } from 'app/components';
import Loading from 'app/components/MatxLoading';
import { H2, Paragraph } from 'app/components/Typography';
import useFacility from 'app/hooks/useFacility';

const FacilityInfo = () => {
	const { facility } = useFacility();

	return (
		<SimpleCard sx={{ width: '100%' }}>
			{facility === undefined ? (
				<Loading />
			) : (
				<>
					<H2>{facility?.name}</H2>
					<Paragraph sx={{ m: 0 }}>Code: {facility?.mfl_code}</Paragraph>
				</>
			)}
		</SimpleCard>
	);
};

export default FacilityInfo;
