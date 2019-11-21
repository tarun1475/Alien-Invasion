## Alien Invasion

[![Build Status](https://travis-ci.org/tarun1475/Alien-Invasion.svg?branch=master)](https://travis-ci.org/tarun1475/Alien-Invasion)

## Overview

Alien Invasion is an experimental simulation in which aliens are about to invade the earth and our goal is to
simulate the invasion. There will be N aliens which are randomly scattered on the world map and when more than one
alien meets in a specific city, they fight each other and destroy the city and each other in the process.

## Input

Bremen south=Delmenhorst east=Luneburg north=Bremerhaven west=Oldenburg

We can say that world map is a directed graph having cities are its vertices and directions are its edges. We have
represented this graph using adjacency list because of the benefits it offer over other representations like adjacency matrix
and edge list.

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

## Designing a finite state machine in Javascript

Designing a alien invasion simulation is a great example of finite state machine where we have different types of events
which drive change of state in a program.

For a good finite machine there are couple of points which are taken into consideration:-

- Whether the event can possibly happen in that state
- What actions should be taken to handle the event
- Which state to transition to after the event
- What variables need to be remembered between events

In Aliens invasion simulation there are mainly two events which changes the behavior or state of the world map.

### Aliens Fight

This event is triggered when we have more than alien in a city in a single iteration of the simulation.

### City Destroyed

This event is triggered along with the aligns fight event.

State machines are generally represented with either Directed graphs or Two-dimensional tables.

## Assumptions

- Atleast 2 aliens are required for simulation to take place.
- Aliens cannot travel diagonally on the map e.g (North-West).
- Aliens should not be assigned to empty spots on the map.
- The hardlimit for the iteration is 10,000 moves.

## Possible Scenarios

- In a real world scenario we will have weights attached to each city as distances and it will help the alien whenever it
  wants to move to new city, we can run different operations on the weighted graphs for choosing the next best city to move and
  optimize the aliens movements.

- We can have some strategy for placing aliens on the map rather than a random function. Like there can be a list of
  strategies which can be loaded while we are starting the simulation and aliens can optimize their invasion efficiently.

- Rather than aliens fighting each other and kill, we can have some units of energy attached to each alien and they die according to the energy consumption. Energy consumption could be calculated by the distance travelled by an alien for the maximum flow in a network.
