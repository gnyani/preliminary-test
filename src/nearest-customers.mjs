
import fs from 'fs';


export const degreeToRadian = (degree) => {
    return (Number.parseFloat(degree) * Math.PI) / 180;
};

const DUBLIN_CENTER = {
  lat: degreeToRadian('53.339428'),
  lng: degreeToRadian('-6.257664'),
};

const EARTH_RADIUS = 6371e3; // in meters

const MAX_RADIUS = 100 * 1000; // 100km in meters

export const loadCustomersDataAndSort = () => {
  const rawCustomerData = fs.readFileSync('./resources/customers.txt').toString().split("\n");
  const customerList = rawCustomerData.map(cutomer => JSON.parse(cutomer));
  return customerList.sort((customerA, customerB) => customerA.user_id - customerB.user_id);
};

export const computeGreatCircleDistance = (lat, lng) => {
  const radianLat = degreeToRadian(lat);
  const radianLng = degreeToRadian(lng);
  const latDelta = DUBLIN_CENTER.lat - radianLat;
  const lngDelta = DUBLIN_CENTER.lng - radianLng;

  // The formula: https://en.wikipedia.org/wiki/Great-circle_distance#Formulae

  const centralAngle = Math.acos((Math.sin(DUBLIN_CENTER.lat) * Math.sin(radianLat)) + 
                       (Math.cos(DUBLIN_CENTER.lat) * Math.cos(radianLat) * Math.cos(lngDelta)));

  return EARTH_RADIUS * centralAngle;
};

export const checkCustomerOfficeWithInRadius = (customer) => {
    const distance = computeGreatCircleDistance(customer.latitude, customer.longitude);
    return distance < MAX_RADIUS;
};

export const nearestCustomers = () => {
  const sortedCustomers = loadCustomersDataAndSort();
  const invitableCustomers = sortedCustomers.filter(customer => checkCustomerOfficeWithInRadius(customer)).map((customer) => ({user_id: customer.user_id, name: customer.name}));
  console.log('List of invitable partners is', invitableCustomers);
};

nearestCustomers();