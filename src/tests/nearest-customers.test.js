
import { checkCustomerOfficeWithInRadius, loadCustomersDataAndSort, degreeToRadian, computeGreatCircleDistance } from '../nearest-customers.mjs'

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

test('load customers data', () => {
  const customersData = loadCustomersDataAndSort();
  expect(customersData[0].name).toBe('Alice Cahill')
  expect(customersData[customersData.length-1].user_id).toBe(39);
});

test('check if customer office near dublin center', () => {
   const testCustomerFar = {latitude: 27.1751, longitude: 78.0421};
   const testCustomerNear = {latitude: 53.2451022, longitude: -6.238335};
   let isNear = checkCustomerOfficeWithInRadius(testCustomerFar);
   expect(isNear).toBe(false);
   isNear = checkCustomerOfficeWithInRadius(testCustomerNear);
   expect(isNear).toBe(true);
})