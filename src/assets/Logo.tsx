import { Icon, IconProps } from '@chakra-ui/react';

type LogoProps = {
	iconProps?: IconProps;
};

const Logo = ({ iconProps }: LogoProps) => {
	return (
		<Icon
			version="1.1"
			id="logo"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 807 373"
			{...iconProps}
		>
			<path
				d="M592.4,346.6c-16.1-39-32.2-78.1-48.3-117.1c-3-7.2-6-14.4-8.9-21.6c-0.9-2.4-2.4-3.5-5-3.4c-2,0.1-4,0.1-6,0
		c-2.4-0.1-3.8,0.9-4.7,3.2c-4.1,10-8.3,20-12.5,30c-2.4,5.8-4.9,11.7-7.4,17.8c-0.4-0.9-0.7-1.4-1-2c-6.3-15.3-12.6-30.5-18.8-45.8
		c-0.8-2-2.1-3.1-4.3-3.1c-2.3,0-4.7,0-7,0c-2.1,0-3.2,1.1-4,2.9c-14.9,35.8-29.8,71.7-44.7,107.5c-4.6,11.1-9.2,22.1-13.8,33.2
		c-1.7,4.1-0.9,5.4,3.7,5.4c3,0,6,0,8.9,0c3.2,0,4.2-0.7,5.4-3.7c14.2-35.1,28.4-70.3,42.6-105.4c1.7-4.2,3.5-8.4,5.4-13
		c0.4,0.9,0.6,1.4,0.8,1.9c5.7,14,11.3,28,16.9,42c0.4,1.1,0.3,2.7-0.1,3.8c-9.4,22.9-18.9,45.7-28.4,68.5c-1.9,4.6-1,6,3.9,6
		c22.7,0,45.4,0,68.1,0c5.4,0,6.1-1.1,4.1-6.2c-9.3-22.7-18.7-45.3-28-68c-0.7-1.6-0.7-3,0-4.6c2.3-5.3,4.4-10.6,6.6-15.9
		c3.7-9,7.4-18.1,11.3-27.5c0.4,0.8,0.6,1.3,0.8,1.7c10.3,25.6,20.7,51.2,31,76.9c5.2,13.1,10.4,26.2,15.5,39.3
		c0.7,1.9,1.5,4,3.9,4.1c4.5,0.2,8.9,0.1,13.4,0c1.4,0,2.2-1.1,1.9-2.5C593.4,349.5,593,348,592.4,346.6z M515.6,339.2
		c-10.7,0-21.2,0-32,0c5.3-13.2,10.5-26.4,16-40C505,312.8,510.3,325.9,515.6,339.2z"
			/>
			<path
				d="M150.9,204.6c-3-0.1-6-0.1-8.9,0c-3.1,0.1-4,1.1-4,4.2c0,11.9,0,23.8,0,35.8c0,0.8,0,1.6,0,2.5c-29.5,0-58.6,0-88.2,0
		c0-1,0-1.7,0-2.5c0-11.8,0-23.6,0-35.3c0-3.7-1-4.6-4.7-4.7c-2.5,0-5,0-7.5,0c-4.6,0-5.2,0.6-5.2,5.1c0,46.3,0,92.5,0,138.8
		c0,0.5,0,1,0,1.5c0.1,2.7,0.9,3.6,3.6,3.6c3.1,0,6.2,0,9.4,0c3.5,0,4.3-0.9,4.3-4.4c0-13,0-26,0-39c0-0.8,0-1.6,0-2.4
		c29.6,0,58.8,0,88.2,0c0,1,0,1.8,0,2.7c0,13.1,0,26.3,0,39.4c0,2.6,0.7,3.6,2.8,3.7c4,0.1,7.9,0.1,11.9,0c1.5,0,2.4-0.9,2.5-2.4
		c0.1-0.9,0.1-1.8,0.1-2.8c0-26.3,0-52.7,0-79c0-20.1,0-40.2,0-60.3C155.2,205.6,154.3,204.7,150.9,204.6z M137.8,290
		c-29.3,0-58.6,0-88,0c0-8.5,0-16.9,0-25.4c29.3,0,58.5,0,88,0C137.8,273.1,137.8,281.5,137.8,290z"
			/>
			<path
				d="M685.2,221.8c26.8,0,53.6,0,80.5,0c3.1,0,4.1-0.9,4.1-4c0-3,0-6,0-8.9c0-3.5-0.8-4.3-4.3-4.3c-32.1,0-64.2,0-96.2,0
		c-3.9,0-4.4,0.5-4.4,4.5c0,46.6,0,93.1,0,139.7c0,4.4,0.5,4.9,4.9,4.9c31.6,0,63.2,0,94.7,0c0.6,0,1.1,0,1.7,0
		c2.3-0.2,3.2-1,3.2-3.3c0.1-2.9,0-5.8,0-8.7c0-4.3-0.9-5.2-5.3-5.2c-26.4,0-52.8,0-79.2,0c-0.8,0-1.6,0-2.5,0c0-9.7,0-19.1,0-28.7
		c1,0,1.9,0,2.8,0c20.9,0,41.7,0,62.6,0c3.1,0,4.2-1.1,4.3-4.2c0-2.7,0-5.4,0-8.1c0-4.4-0.8-5.2-5.2-5.2c-20.6,0-41.2,0-61.7,0
		c-0.9,0-1.8,0-2.7,0c0-8.7,0-17.2,0-25.8c1,0,1.9,0,2.7,0c20.9,0,41.7,0,62.6,0c3.2,0,4.4-1.1,4.4-4.3c0-2.9,0-5.8,0-8.7
		c0-3.4-1-4.4-4.5-4.4c-20.9,0-41.9,0-62.8,0c-0.8,0-1.6,0-2.5,0c0-8.5,0-16.7,0-25.1C683.5,221.8,684.3,221.8,685.2,221.8z"
			/>
			<path
				d="M408.8,25.5c12.5,20.8,25.1,41.7,37.6,62.5c1.9,3.2,3.9,6.4,6,10c-1.2,0-2,0-2.7,0c-11.8,0-23.6,0-35.3,0
		c-3.5,0-4.5,1-4.5,4.6c0,21.1,0,42.2,0,63.2c0,3.8,0.8,4.6,4.7,4.6c2.7,0,5.4,0,8.1,0c3.7,0,4.5-0.8,4.5-4.5c0-16,0-32.1,0-48.1
		c0-0.8,0-1.7,0-2.7c1,0,1.8,0,2.5,0c8.7,0,17.3,0.4,26-0.1c5.4-0.3,8.2,1.5,10.9,6.2c8.7,15.3,18.1,30.2,27.1,45.3
		c1.7,2.8,3.7,4.2,7.1,4c4.4-0.2,8.8,0,13.2-0.1c0.7,0,1.5-0.1,2.9-0.2c-11.3-19-22.4-37.6-33.5-56.3c0.9-0.3,1.6-0.6,2.4-0.8
		c17.5-5.6,31.4-22.9,32.6-41.2c1.8-28.1-20.1-51-46.7-50.7c-20.1,0.3-40.2,0.1-60.2,0.1c-0.6,0-1.1,0-1.7,0c-2,0.2-2.4,0.9-1.5,2.6
		C408.2,24.5,408.5,25,408.8,25.5z M473.9,38.6c10.7,0.5,18.4,6.5,23.4,15.8c11.3,20.8-5.4,41.2-21.7,43.4c-1.1,0.2-1.9,0.2-2.6-1
		c-11.3-19.1-22.7-38.2-34.1-57.3c-0.1-0.2-0.2-0.5-0.5-1C450.3,38.5,462.1,38.1,473.9,38.6z"
			/>
			<path
				d="M311.1,204.6c-41.1-0.3-73.7,32.2-75,71.6c-1.4,42.9,31.9,77.1,74.2,77.4c41.1,0.3,74.8-32.9,75-73.8
		C385.6,238.5,352.5,204.9,311.1,204.6z M310.4,336.7c-32.9-0.3-58.4-27.1-57.5-59.7c0.7-29.4,25.2-55.7,57.7-55.8
		c31.9,0,57.9,26.2,57.7,58.1C368.1,310.9,342,336.7,310.4,336.7z"
			/>
			<path
				d="M242.3,170.4c3.8,0,4.6-0.8,4.6-4.6c0-16,0-32.1,0-48.1c0-0.8,0-1.6,0-2.5c1.2,0,2.1,0,2.9,0c13.8,0,27.5,0,41.3,0
		c3.2,0,6.4-0.1,9.5-0.7c24.9-4.8,39.5-29,37.2-50.5c-2.5-22.9-21.5-42.9-46.6-42.6c-20.1,0.2-40.3,0-60.5,0.1c-0.7,0-1.4,0-2.1,0.1
		c-1.2,0.2-1.7,1-1.1,2.1c0.3,0.6,0.7,1.2,1.1,1.8c8.7,14.7,17.5,29.4,26.2,44c5.6,9.4,11.2,18.7,17,28.5c-1.2,0-1.9,0-2.7,0
		c-11.8,0-23.6,0-35.3,0c-2.9,0-4.1,1.1-4.1,3.9c0,21.6,0,43.1,0,64.7c0,2.7,1,3.7,3.8,3.8C236.4,170.5,239.4,170.4,242.3,170.4z
		 M259,40.6c-0.4-0.6-0.7-1.2-1.2-2.1c12,0,23.6-0.3,35.2,0.1c14,0.5,26,12.8,27.5,27c1.5,14-9.4,29.4-24.9,32.4
		c-1.7,0.3-2.9,0.1-3.9-1.7C281,77.7,270,59.1,259,40.6z"
			/>
			<path
				d="M685,104.7c2.6-0.4,3.4-1.3,3.4-4c0-2.9,0-5.8,0-8.7c0-3.5-1.1-4.6-4.6-4.6c-8.7,0-17.5,0-26.2,0c-0.7,0-1.5,0-2.2,0
		c0-16.4,0-32.5,0-48.8c1,0,1.8,0,2.6,0c12.9,0,25.8,0,38.7,0c0.8,0,1.6,0,2.3-0.1c2.4-0.3,3.4-1.3,3.5-3.7c0.1-2.8,0-5.5,0-8.3
		c0-4.2-1-5.2-5.1-5.2c-33.9,0-67.8,0-101.8,0c-0.6,0-1.1,0-1.7,0c-2.5,0.1-3.5,1.1-3.5,3.6c0,2.8,0,5.7,0,8.5c0,4.3,0.8,5.1,5,5.1
		c13.1,0,26.3,0,39.4,0c0.8,0,1.7,0,2.7,0c0,16.4,0,32.5,0,48.8c-1.1,0-2.1,0-3.1,0c-9.1,0-18.2,0-27.2,0c-2.8,0-4.3,1-4.3,3.3
		c-0.1,3.6-0.1,7.2,0,10.9c0,1.5,0.9,2.5,2.4,2.8c1.1,0.2,2.2,0.4,3.4,0.4c8.9,0,17.7,0,26.6,0c0.8,0,1.5,0,2.5,0c0,1.1,0,1.9,0,2.7
		c0,19.3,0,38.6,0,57.9c0,4,1.1,5,5.1,5c2.4,0,4.8,0,7.2,0c4,0,5-1.1,5-5c0-19.3,0-38.6,0-57.9c0-0.8,0-1.7,0-2.7c1,0,1.7,0,2.5,0
		c8.3,0,16.6,0,24.9,0C683.5,104.8,684.3,104.8,685,104.7z"
			/>
			<path
				d="M157,24.7c-0.1-2.4-1.4-3.7-3.8-3.3c-4.7,0.7-9.5,1.3-13.8,2.9c-29.5,10.7-41.2,45.3-20.7,69.2c4.1,4.8,8.5,9.5,12.5,14.4
		c5.1,6.3,7.5,13.5,5.2,21.4c-3.9,13.5-12.5,22.6-27.4,25.3c-2,0.4-3,1.5-3,3.4c0,1.4,0,2.9,0,4.3c0,1.4,0,2.7,0,4.1
		c0.1,3.1,1.5,4.3,4.7,3.9c5.2-0.6,10.1-1.8,14.9-3.8c19.9-8.2,31.2-28.5,27.4-48.8c-1.8-9.4-6.5-17.2-12.9-24.4
		c-3.5-3.9-7-7.8-10.3-11.9c-3.8-4.7-5.4-10.1-4.6-16.1c1.9-14.3,15.2-26.9,28.9-28.2c1.8-0.2,2.9-1.2,2.9-3
		C157.1,31.1,157.1,27.9,157,24.7z"
			/>
			<path
				d="M195.7,99.7c-3.5-4.8-7.8-9.2-11.7-13.7c-4-4.6-7.7-9.3-8.2-15.5c-1.1-15.3,12.4-31.1,28.4-33.1c1.8-0.2,3.3-0.9,3.3-2.8
		c0.1-3.5,0.1-6.9-0.1-10.4c-0.1-1.9-1.4-2.7-3.3-2.8c-0.8,0-1.6,0-2.3,0.1c-9.5,1.1-17.9,4.4-25.3,10.2
		c-19.4,15.1-24,42.3-7.4,61.7c4,4.7,8.3,9.3,12.2,14.1c6.5,7.9,8.3,16.8,4.2,26.2c-4.9,11.1-13,18.8-25.9,21
		c-2.1,0.3-3.1,1.4-3.1,3.5c0,1.4,0,2.9,0,4.3c0,1.4,0,2.9,0,4.3c0.1,2.8,1.4,4,4.3,3.7c6.4-0.6,12.5-2.2,18.2-5.1
		C205.7,151.6,211.4,121.2,195.7,99.7z"
			/>
			<path
				d="M552.8,170.4c3.1,0,6.1,0,9.2,0c3-0.1,3.9-1.1,3.9-4c0-47,0-93.9,0-140.9c0-2.9-1.1-4-4-4.1c-3-0.1-6,0-8.9,0
		c-3.8,0-4.6,0.8-4.6,4.6c0,23.3,0,46.5,0,69.8c0,23.4,0,46.8,0,70.2C548.4,169.6,549.2,170.4,552.8,170.4z"
			/>
			<path
				d="M358.5,165.9c0,3.7,0.8,4.6,4.5,4.6c2.8,0,5.5,0,8.3,0c4,0,4.7-0.8,4.7-4.7c0-23.2,0-46.4,0-69.6c0-23.5,0-47,0-70.5
		c0-3.2-1-4.2-4.2-4.3c-3.3,0-6.5,0-9.8,0c-2.4,0-3.5,1.1-3.5,3.5c0,2.2,0,4.4,0,6.6C358.5,76.3,358.5,121.1,358.5,165.9z"
			/>
			<path
				d="M619.4,263.8c-6.9,0-12.5,5.7-12.5,12.6c0,6.8,5.9,12.6,12.7,12.5c7,0,12.6-5.6,12.5-12.6
		C632,269.2,626.6,263.8,619.4,263.8z"
			/>
			<path
				d="M195.6,263.8c-7.1,0-12.6,5.5-12.6,12.7c0,6.8,5.6,12.4,12.4,12.5c7,0.1,12.8-5.6,12.8-12.6
		C208.1,269.4,202.6,263.8,195.6,263.8z"
			/>
			<path d="M310.7,263c-7.6,0-14,6.3-14,13.7c0,7.9,6.1,14.2,13.9,14.2c7.9,0,14.2-6,14.2-13.6C324.8,269.4,318.5,263,310.7,263z" />
		</Icon>
	);
};

export default Logo;
