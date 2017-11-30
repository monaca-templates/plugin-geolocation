// Note: when run by webdriver.io, `browser` is a global object

const LOCATION_TOKYO  = { latitude: 35.67, longitude: 139.77, altitude: 20 };
const LOCATION_LONDON = { latitude: 51.52, longitude: -0.1, altitude: 20 };

describe('Geolocation Plugin Demo', () => {

	beforeEach(() => {
		browser.pause(5000);
	});

	afterEach(() => {
		browser.reload();
	});

	it('should show raw location data in table', () => {
		browser.setGeoLocation(LOCATION_TOKYO);

		browser.click('.position-button');

		const lat = browser.getText('.position-data-table .latitude td');
		expect(parseFloat(lat)).toEqual(LOCATION_TOKYO.latitude);

		const lon = browser.getText('.position-data-table .longitude td');
		expect(parseFloat(lon)).toEqual(LOCATION_TOKYO.longitude);

		// Altitude is not reliably faked by webdriver.io, so it's best to leave out
		// this test.
		// const alt = browser.getText('.position-data-table .altitude td');
		// expect(parseFloat(alt)).toEqual(FAKE_LOCATIONS[0].altitude);
	});

	it('should show an image from Google Maps when location is found', () => {
		browser.setGeoLocation(LOCATION_TOKYO);

		const originalImgSrc = browser.getAttribute('img.map', 'src');
		expect(originalImgSrc).toBeFalsy();

		browser.click('.position-button');

		const newImgSrc = browser.getAttribute('img.map', 'src');
		expect(newImgSrc).toContain('maps.googleapis.com');
		expect(newImgSrc).toContain(`${LOCATION_TOKYO.latitude},${LOCATION_TOKYO.longitude}`);
	});

	it('should show an alert if no position is returned within 10s', () => {
		browser.click('.position-button');
		browser.pause(10000);

		browser.alertText(); // this will throw an error if there is no alert
	});

	it('should not update raw data on new position received when watching', () => {
		browser.setGeoLocation(LOCATION_TOKYO);

		browser.click('.watch-button');

		const lat1 = browser.getText('.position-data-table .latitude td');
		expect(parseFloat(lat1)).toEqual(LOCATION_TOKYO.latitude);

		const lon1 = browser.getText('.position-data-table .longitude td');
		expect(parseFloat(lon1)).toEqual(LOCATION_TOKYO.longitude);

		browser.setGeoLocation(LOCATION_LONDON);

		browser.pause(1000);

		const lat2 = browser.getText('.position-data-table .latitude td');
		expect(parseFloat(lat2)).toEqual(LOCATION_LONDON.latitude);

		const lon2 = browser.getText('.position-data-table .longitude td');
		expect(parseFloat(lon2)).toEqual(LOCATION_LONDON.longitude);
	});

	it('should not update raw data on new position received when watch has been stopped', () => {
		browser.setGeoLocation(LOCATION_TOKYO);

		browser.click('.watch-button');

		const lat1 = browser.getText('.position-data-table .latitude td');
		expect(parseFloat(lat1)).toEqual(LOCATION_TOKYO.latitude);

		const lon1 = browser.getText('.position-data-table .longitude td');
		expect(parseFloat(lon1)).toEqual(LOCATION_TOKYO.longitude);

		browser.click('.stop-watch-button');

		browser.setGeoLocation(LOCATION_LONDON);

		browser.pause(1000);

		const lat2 = browser.getText('.position-data-table .latitude td');
		expect(parseFloat(lat2)).toEqual(LOCATION_TOKYO.latitude);

		const lon2 = browser.getText('.position-data-table .longitude td');
		expect(parseFloat(lon2)).toEqual(LOCATION_TOKYO.longitude);
	});

	it('should calculate distances correctly', () => {
		browser.setGeoLocation(LOCATION_TOKYO);

		browser.click('.position-button');

		const tokyoDist = browser.getText('.cities-table .Tokyo td');
		expect(parseFloat(tokyoDist)).toEqual(0);

		const londonDist = browser.getText('.cities-table .London td');
		expect(parseFloat(londonDist)).toEqual(9561.3);
	})

});