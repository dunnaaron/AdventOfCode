const fs = require('fs');
const { exec } = require('node:child_process');
const lines = fs
  .readFileSync(__dirname + '/input.txt', 'utf8')
  .split('\n\n')
  .filter((x) => x)
  .map((block) => block.split('\n'));

// const lines = [
// 	['seeds: 79 14 55 13'],
// 	// ['seeds: 79 14'],
// 	['seed-to-soil map:', '50 98 2', '52 50 48'],
// 	['soil-to-fertilizer map:', '0 15 37', '37 52 2', '39 0 15'],
// 	['fertilizer-to-water map:', '49 53 8', '0 11 42', '42 0 7', '57 7 4'],
// 	['water-to-light map:', '88 18 7', '18 25 70'],
// 	['light-to-temperature map:', '45 77 23', '81 45 19', '68 64 13'],
// 	['temperature-to-humidity map:', '0 69 1', '1 0 69'],
// 	['humidity-to-location map:', '60 56 37', '56 93 4'],
// ];

let startTime = performance.now();

const splitMapLine = (line) => {
  const mappings = line.split(' ');

  return {
    destinationMin: parseInt(mappings[0]),
    destinationMax: parseInt(mappings[0]) + parseInt(mappings[2]),
    sourceMin: parseInt(mappings[1]),
    sourceMax: parseInt(mappings[1]) + parseInt(mappings[2]),
  };
};

const parseMapLine = (searchString) =>
  lines
    .find((line) => line.includes(searchString))
    .slice(1)
    .map((line) => splitMapLine(line));

const seeds = [
  ...lines[0][0].substring(lines[0].indexOf(':')).matchAll(/\d+/g),
].map((seed) => parseInt(seed));

const getSeedsRange = () => {
  let res = [];

  for (let i = 0; i < seeds.length - 1; i += 2) {
    res.push({ seedMin: seeds[i], seedMax: seeds[i] + seeds[i + 1] });
  }

  return res;
};

const seedRange = getSeedsRange();

const seedToSoil = parseMapLine('seed-to-soil map:');
const soilToFert = parseMapLine('soil-to-fertilizer map:');
const fertToWater = parseMapLine('fertilizer-to-water map:');
const waterToLight = parseMapLine('water-to-light map:');
const lightToTemp = parseMapLine('light-to-temperature map:');
const tempToHumid = parseMapLine('temperature-to-humidity map:');
const humidToLoc = parseMapLine('humidity-to-location map:');

const res = seedRange.reduce((acc, curr, index) => {
  let smallest = 0;

  for (let i = curr.seedMin; i <= curr.seedMax; i++) {
    let soil = 0;
    let fert = 0;
    let water = 0;
    let light = 0;
    let temp = 0;
    let humid = 0;
    let loc = 0;

    // Seed to Soil
    const soilMap = seedToSoil.find(
      (mapping) => i <= mapping.sourceMax && i >= mapping.sourceMin
    );

    if (!soilMap) {
      soil = i;
    } else {
      soil = soilMap.destinationMin + (i - soilMap.sourceMin);
    }

    // Soil to Fertilizer
    const fertMap = soilToFert.find(
      (mapping) => soil <= mapping.sourceMax && soil >= mapping.sourceMin
    );

    if (!fertMap) {
      fert = soil;
    } else {
      fert = fertMap.destinationMin + (soil - fertMap.sourceMin);
    }

    // Fert to Water
    const waterMap = fertToWater.find(
      (mapping) => fert <= mapping.sourceMax && fert >= mapping.sourceMin
    );

    if (!waterMap) {
      water = fert;
    } else {
      water = waterMap.destinationMin + (fert - waterMap.sourceMin);
    }

    // Water to Light
    const lightMap = waterToLight.find(
      (mapping) => water <= mapping.sourceMax && water >= mapping.sourceMin
    );

    if (!lightMap) {
      light = water;
    } else {
      light = lightMap.destinationMin + (water - lightMap.sourceMin);
    }

    // Light to Temp
    const tempMap = lightToTemp.find(
      (mapping) => light <= mapping.sourceMax && light >= mapping.sourceMin
    );

    if (!tempMap) {
      temp = light;
    } else {
      temp = tempMap.destinationMin + (light - tempMap.sourceMin);
    }

    // Temp to Humid
    const humidMap = tempToHumid.find(
      (mapping) => temp <= mapping.sourceMax && temp >= mapping.sourceMin
    );

    if (!humidMap) {
      humid = temp;
    } else {
      humid = humidMap.destinationMin + (temp - humidMap.sourceMin);
    }

    // Humid to Loc
    const locMap = humidToLoc.find(
      (mapping) => humid <= mapping.sourceMax && humid >= mapping.sourceMin
    );

    if (!locMap) {
      loc = humid;
    } else {
      loc = locMap.destinationMin + (humid - locMap.sourceMin);
    }

    if (i === curr.seedMin) {
      smallest = loc;
    }

    if (smallest > loc) {
      smallest = loc;
    }
  }

  if (index === 0 || acc > smallest) {
    console.log(smallest);
    return smallest;
  }

  return acc;
}, 0);

let endTime = performance.now();
let timeDiff = endTime - startTime; //in ms
// strip the ms
timeDiff /= 1000;

// get seconds
let seconds = Math.round(timeDiff);
console.log(seconds + ' seconds');
console.log(res);
exec('say done');
