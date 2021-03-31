
import { degreeToRadian, computeGreatCircleDistance } from '../nearest-customers.mjs'

test('degress to radians util', () => {
  // 1 degree = 0.017453292519943295 radians
  const degree = '1';
  const radianValue = degreeToRadian(degree);
  expect(radianValue).toBe(0.017453292519943295);
});

test('Great circle distance', () => {
  // distance between India gate and London center =  6713 km
  const TAJ_MAHAL = {
    lat: 27.1751,
    lng: 78.0421,
  };
  const distance = computeGreatCircleDistance(
    TAJ_MAHAL.lat,
    TAJ_MAHAL.lng,
  );
  expect(distance).toBe(7252203.444561058);
});