## Alien Invasion

[![Build Status](https://travis-ci.org/tarun1475/Alien-Invasion.svg?branch=master)](https://travis-ci.org/tarun1475/Alien-Invasion)

## Overview

Alien Invasion is an experimental simulation in which aliens are about to invade the earth and our goal is to
simulate the invasion. There will be N aliens which are randomly scattered on the world map and when more than one
alien meets in a specific city, they fight each other and destroy the city and each other in the process.

### Installation

Make sure you have node.js and npm installed.

Clone the repository and install the dependencies

```bash
git clone https://github.com/tarun1475/Alien-Invasion.git
cd Alien-Invasion
npm install
```

### Run

Run node index.js and pass map file and number of aliens as parameters.<br />
Format: `npm start -- --map=$PATH_TO_MAP_FILE --aliens=$NUMBER_OF_ALIENS`

```bash
npm start -- --map=maps/map --aliens=30
```

### Testing

Run the test suite with:

```bash
npm test
```

### Todo list

- Write unit test cases.
- Documentation for modules.
- CI CD
- Write down different possible scenarios which are not mentioned in the puzzle but good to have.

## Assumptions

- Atleast 2 aliens are required for simulation to take place.
- Aliens cannot travel diagonally on the map e.g (North-West).
- Aliens should not be assigned to empty spots on the map.
- The hardlimit for the iteration is 10,000 moves.
