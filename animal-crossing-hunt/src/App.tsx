import "./App.css";
import React, { useState, useEffect } from "react";

enum AnimalType {
  BUG = "Bug",
  FISH = "Fish",
}

enum Month {
  JAN = 0,
  FEB = 1,
  MAR = 2,
  APR = 3,
  MAY = 4,
  JUN = 5,
  JUL = 6,
  AUG = 7,
  SEP = 8,
  OCT = 9,
  NOV = 10,
  DEC = 11,
}

interface Animal {
  type: AnimalType;
  name: string;
  months: Month[];
  hours: number[];
  location: string;
  notes?: string;
  island?: boolean;
  isJellyfish?: boolean;
}

interface Availability {
  type: AnimalType;
  name: string;
  location: string;
  notes?: string;
}

const animals: Animal[] = [
  {
    type: AnimalType.BUG,
    name: "Ant",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "candy or rotten turnips",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Bagworm",
    months: [Month.JAN, Month.FEB, Month.MAR, Month.OCT, Month.NOV, Month.DEC],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "trees",
  },
  {
    type: AnimalType.BUG,
    name: "Banded dragonfly",
    months: [Month.JUL, Month.AUG],
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16],
    location: "everywhere",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Bee",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Bell cricket",
    months: [Month.SEP, Month.OCT],
    hours: [0, 1, 2, 3, 19, 20, 21, 22, 23],
    location: "grass",
  },
  {
    type: AnimalType.BUG,
    name: "Brown cicada",
    months: [Month.JUL, Month.AUG],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Clouded yellow butterfly",
    months: [Month.APR, Month.MAY, Month.JUN],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "everywhere",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Cockroach",
    months: [
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "candy or rotten turnips",
  },
  {
    type: AnimalType.BUG,
    name: "Common butterfly",
    months: [Month.APR, Month.MAY, Month.JUN],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "everywhere",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Common dragonfly",
    months: [Month.MAY, Month.JUN],
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16],
    location: "everywhere",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Cricket",
    months: [Month.SEP],
    hours: [0, 1, 2, 19, 20, 21, 22, 23],
    location: "grass",
  },
  {
    type: AnimalType.BUG,
    name: "Darner dragonfly",
    months: [Month.JUN],
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16],
    location: "everywhere",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Drone beetle",
    months: [Month.JUL, Month.AUG],
    hours: [4, 5, 6, 7, 17, 18],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Dynastid beetle",
    months: [Month.JUL, Month.AUG],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 19, 20, 21, 22, 23],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Evening cicada",
    months: [Month.JUL, Month.AUG],
    hours: [16, 17, 18],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Firefly",
    months: [Month.JUN],
    hours: [19, 20, 21, 22],
    location: "near water",
  },
  {
    type: AnimalType.BUG,
    name: "Flat stag beetle",
    months: [Month.JUN, Month.JUL, Month.AUG],
    hours: [19],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Giant beetle",
    months: [Month.JUL, Month.AUG],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 23],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Grasshopper",
    months: [Month.AUG, Month.SEP],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "grass",
  },
  {
    type: AnimalType.BUG,
    name: "Jewel beetle",
    months: [Month.JUL, Month.AUG],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Ladybug",
    months: [Month.MAR, Month.APR, Month.MAY],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "flowers",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Long horned beetle",
    months: [Month.JUN, Month.JUL, Month.AUG],
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16],
    location: "everywhere",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Long locust",
    months: [Month.SEP],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "grass",
  },
  {
    type: AnimalType.BUG,
    name: "Mantis",
    months: [Month.SEP, Month.OCT],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "flowers",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Migratory locust",
    months: [Month.SEP, Month.OCT],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "grass",
  },
  {
    type: AnimalType.BUG,
    name: "Mole cricket",
    months: [Month.JAN, Month.FEB, Month.MAR, Month.APR, Month.DEC],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "underground",
  },
  {
    type: AnimalType.BUG,
    name: "Mosquito",
    months: [Month.JUL, Month.AUG],
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    location: "everywhere",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Mountain stag beetle",
    months: [Month.JUL, Month.AUG],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 19, 20, 21, 22, 23],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Pill bug",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "rocks",
  },
  {
    type: AnimalType.BUG,
    name: "Pine cricket",
    months: [Month.SEP, Month.OCT],
    hours: [0, 1, 2, 3, 19, 20, 21, 22, 23],
    location: "grass",
  },
  {
    type: AnimalType.BUG,
    name: "Pond skater",
    months: [Month.JUN, Month.JUL, Month.AUG, Month.SEP],
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    location: "ponds",
  },
  {
    type: AnimalType.BUG,
    name: "Purple butterfly",
    months: [Month.JUN, Month.JUL, Month.AUG],
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    location: "everywhere",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Red dragonfly",
    months: [Month.SEP, Month.OCT],
    hours: [16],
    location: "everywhere",
  },
  {
    type: AnimalType.BUG,
    name: "Robust cicada",
    months: [Month.JUL, Month.AUG],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Saw stag beetle",
    months: [Month.JUL, Month.AUG],
    hours: [19],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Seven-spotted ladybug",
    months: [Month.MAR, Month.APR, Month.MAY],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "flowers",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Snail",
    months: [Month.APR, Month.MAY, Month.JUN, Month.JUL, Month.AUG, Month.SEP],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "flowers",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Spider",
    months: [Month.APR, Month.MAY, Month.JUN, Month.JUL, Month.AUG, Month.SEP],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "trees",
  },
  {
    type: AnimalType.BUG,
    name: "Tiger butterfly",
    months: [Month.MAY, Month.JUN],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "everywhere",
    island: true,
  },
  {
    type: AnimalType.BUG,
    name: "Walker cicada",
    months: [Month.JUL, Month.AUG, Month.SEP],
    hours: [8, 9, 10, 11, 12, 13, 14, 15],
    location: "trees",
    island: true,
  },
  {
    type: AnimalType.FISH,
    name: "Angelfish",
    months: [Month.MAY, Month.JUN, Month.JUL, Month.AUG, Month.SEP, Month.OCT],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 19, 20, 21, 22, 23],
    location: "river",
    notes: "small",
  },
  {
    type: AnimalType.FISH,
    name: "Arapaima",
    months: [Month.JUL, Month.AUG, Month.SEP],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 19, 20, 21, 22, 23],
    location: "river",
    notes: "huge",
  },
  {
    type: AnimalType.FISH,
    name: "Arowana",
    months: [Month.JUN, Month.JUL, Month.AUG, Month.SEP],
    hours: [4, 5, 6, 7, 8, 16, 17, 18, 19, 20],
    location: "river",
    notes: "medium",
  },
  {
    type: AnimalType.FISH,
    name: "Barbel steed",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "large",
  },
  {
    type: AnimalType.FISH,
    name: "Barred knifejaw",
    months: [
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
    ],
    hours: [4, 5, 6, 7, 8, 16, 17, 18, 19, 20],
    location: "ocean",
    notes: "large",
    island: true,
  },
  {
    type: AnimalType.FISH,
    name: "Bass",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "medium",
  },
  {
    type: AnimalType.FISH,
    name: "Bitterling",
    months: [Month.JAN, Month.FEB, Month.DEC],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "tiny",
  },
  {
    type: AnimalType.FISH,
    name: "Bluegill",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [9, 10, 11, 12, 13, 14, 15],
    location: "river",
    notes: "small",
  },
  {
    type: AnimalType.FISH,
    name: "Brook trout",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "medium",
  },
  {
    type: AnimalType.FISH,
    name: "Carp",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "large",
  },
  {
    type: AnimalType.FISH,
    name: "Catfish",
    months: [Month.MAY, Month.JUN, Month.JUL, Month.AUG, Month.SEP, Month.OCT],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 19, 20, 21, 22, 23],
    location: "river",
    notes: "large",
  },
  {
    type: AnimalType.FISH,
    name: "Cherry salmon",
    months: [Month.MAR, Month.APR, Month.MAY, Month.JUN],
    hours: [4, 5, 6, 7, 8, 16, 17, 18, 19, 20],
    location: "river",
    notes: "small",
  },
  {
    type: AnimalType.FISH,
    name: "Coelacanth",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 19, 20, 21, 22, 23],
    location: "ocean",
    notes: "very large, only if raining",
    island: true,
  },
  {
    type: AnimalType.FISH,
    name: "Crawfish",
    months: [Month.APR, Month.MAY, Month.JUN, Month.JUL, Month.AUG, Month.SEP],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "ponds",
    notes: "tiny",
  },
  {
    type: AnimalType.FISH,
    name: "Crucian carp",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "small",
  },
  {
    type: AnimalType.FISH,
    name: "Dace",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 19, 20, 21, 22, 23],
    location: "river",
    notes: "medium",
  },
  {
    type: AnimalType.FISH,
    name: "Eel",
    months: [Month.JUN, Month.JUL, Month.AUG, Month.SEP],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 19, 20, 21, 22, 23],
    location: "river",
    notes: "medium",
  },
  {
    type: AnimalType.FISH,
    name: "Freshwater goby",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "small",
  },
  {
    type: AnimalType.FISH,
    name: "Frog",
    months: [Month.MAY, Month.JUN, Month.JUL, Month.AUG],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "ponds",
    notes: "tiny",
  },
  {
    type: AnimalType.FISH,
    name: "Giant catfish",
    months: [Month.JUN, Month.JUL, Month.AUG],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 19, 20, 21, 22, 23],
    location: "lake",
    notes: "very large",
  },
  {
    type: AnimalType.FISH,
    name: "Giant snakehead",
    months: [Month.JUN, Month.JUL, Month.AUG],
    hours: [9, 10, 11, 12, 13, 14, 15],
    location: "lake",
    notes: "very large",
  },
  {
    type: AnimalType.FISH,
    name: "Goldfish",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "tiny",
  },
  {
    type: AnimalType.FISH,
    name: "Guppy",
    months: [
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
    ],
    hours: [9, 10, 11, 12, 13, 14, 15],
    location: "river",
    notes: "tiny",
  },
  {
    type: AnimalType.FISH,
    name: "Jellyfish",
    months: [Month.AUG],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "ocean",
    notes: "medium",
    isJellyfish: true,
  },
  {
    type: AnimalType.FISH,
    name: "Killifish",
    months: [Month.APR, Month.MAY, Month.JUN, Month.JUL, Month.AUG],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "ponds",
    notes: "tiny",
  },
  {
    type: AnimalType.FISH,
    name: "Koi",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "large",
  },
  {
    type: AnimalType.FISH,
    name: "Large bass",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "large",
  },
  {
    type: AnimalType.FISH,
    name: "Large char",
    months: [
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.SEP,
      Month.OCT,
      Month.NOV,
    ],
    hours: [4, 5, 6, 7, 8, 16, 17, 18, 19, 20],
    location: "waterfall",
    notes: "large",
  },
  {
    type: AnimalType.FISH,
    name: "Loach",
    months: [Month.MAR, Month.APR, Month.MAY],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "tiny",
  },
  {
    type: AnimalType.FISH,
    name: "Pale chub",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [9, 10, 11, 12, 13, 14, 15],
    location: "river",
    notes: "small",
  },
  {
    type: AnimalType.FISH,
    name: "Piranha",
    months: [Month.JUN, Month.JUL, Month.AUG, Month.SEP],
    hours: [0, 1, 2, 3, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23],
    location: "river",
    notes: "small",
  },
  {
    type: AnimalType.FISH,
    name: "Pond smelt",
    months: [Month.JAN, Month.FEB, Month.DEC],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "tiny",
  },
  {
    type: AnimalType.FISH,
    name: "Popeyed goldfish",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [9, 10, 11, 12, 13, 14, 15],
    location: "river",
    notes: "tiny",
  },
  {
    type: AnimalType.FISH,
    name: "Rainbow trout",
    months: [
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.SEP,
      Month.OCT,
      Month.NOV,
    ],
    hours: [4, 5, 6, 7, 8, 16, 17, 18, 19, 20],
    location: "river",
    notes: "medium",
  },
  {
    type: AnimalType.FISH,
    name: "Red snapper",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 19, 20, 21, 22, 23],
    location: "ocean",
    notes: "large",
    island: true,
  },
  {
    type: AnimalType.FISH,
    name: "Salmon",
    months: [Month.SEP],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "medium",
  },
  {
    type: AnimalType.FISH,
    name: "Sea bass",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "ocean",
    notes: "large",
    island: true,
  },
  {
    type: AnimalType.FISH,
    name: "Small bass",
    months: [
      Month.JAN,
      Month.FEB,
      Month.MAR,
      Month.APR,
      Month.MAY,
      Month.JUN,
      Month.JUL,
      Month.AUG,
      Month.SEP,
      Month.OCT,
      Month.NOV,
      Month.DEC,
    ],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "small",
  },
  {
    type: AnimalType.FISH,
    name: "Stringfish",
    months: [Month.JAN, Month.FEB, Month.DEC],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 17, 18, 19, 20, 21, 22, 23],
    location: "river",
    notes: "very large",
  },
  {
    type: AnimalType.FISH,
    name: "Sweetfish",
    months: [Month.JUL, Month.AUG, Month.SEP],
    hours: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    location: "river",
    notes: "medium",
  },
];

const jellyfishRestriction = (animal: Animal, d: Date): boolean => {
  if (!animal.isJellyfish) return false;
  const month = d.getMonth();
  if (month !== Month.AUG) return false;
  const day = d.getDay();
  return day < 16;
};

const isAvailableNow = (animal: Animal, d: Date): boolean => {
  const month = d.getMonth();
  const hour = d.getHours();
  return (
    !jellyfishRestriction(animal, d) &&
    animal.months.includes(month) &&
    animal.hours.includes(hour)
  );
};

const isAvailableNowOnIsland = (animal: Animal, d: Date): boolean => {
  const hour = d.getHours();
  return (
    !jellyfishRestriction(animal, d) &&
    !!animal.island &&
    animal.hours.includes(hour)
  );
};

const isAvailableLater = (animal: Animal, d: Date): boolean => {
  const month = d.getMonth();
  const hour = d.getHours();
  return (
    !jellyfishRestriction(animal, d) &&
    animal.months.includes(month) &&
    !animal.hours.includes(hour)
  );
};

const isAvailableLaterIsland = (animal: Animal, d: Date): boolean => {
  const hour = d.getHours();
  return (
    !jellyfishRestriction(animal, d) &&
    !!animal.island &&
    !animal.hours.includes(hour)
  );
};

const availabilityString = (av: Availability): JSX.Element => (
  <p style={{ marginBlockEnd: 0, marginBlockStart: 0 }}>
    {av.type === AnimalType.FISH ? "🐟" : "🐛"} <b>{av.name}</b> @ {av.location}
    {!!av.notes ? ` (${av.notes})` : ""}
  </p>
);

const getCurrentAvailabilities = (
  d: Date
): {
  now: Availability[];
  island: Availability[];
  later: Availability[];
  laterIsland: Availability[];
} => {
  let now: Availability[] = [];
  let island: Availability[] = [];
  let later: Availability[] = [];
  let laterIsland: Availability[] = [];

  for (let a of animals) {
    if (isAvailableNow(a, d)) {
      now.push({
        type: a.type,
        name: a.name,
        location: a.location,
        notes: a.notes,
      });
    } else if (isAvailableNowOnIsland(a, d)) {
      island.push({
        type: a.type,
        name: a.name,
        location: a.location,
        notes: a.notes,
      });
    } else if (isAvailableLater(a, d)) {
      later.push({
        type: a.type,
        name: a.name,
        location: a.location,
        notes: a.notes,
      });
    } else if (isAvailableLaterIsland(a, d)) {
      laterIsland.push({
        type: a.type,
        name: a.name,
        location: a.location,
        notes: a.notes,
      });
    }
  }

  return {
    now: now.sort((a, b) => a.name.localeCompare(b.name)),
    island: island.sort((a, b) => a.name.localeCompare(b.name)),
    later: later.sort((a, b) => a.name.localeCompare(b.name)),
    laterIsland: laterIsland.sort((a, b) => a.name.localeCompare(b.name)),
  };
};

function App() {
  const [date, setDate] = useState(new Date());
  const availabilities = getCurrentAvailabilities(new Date());
  const [availableNow, setAvailableNow] = useState<Availability[]>(
    availabilities.now
  );
  const [availableOnIsland, setAvailableOnIsland] = useState<Availability[]>(
    availabilities.island
  );
  const [availableLater, setAvailableLater] = useState<Availability[]>(
    availabilities.later
  );
  const [availableLaterIsland, setAvailableLaterIsland] = useState<
    Availability[]
  >(availabilities.laterIsland);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
      const availabilitiesNow = getCurrentAvailabilities(date);
      setAvailableNow(availabilitiesNow.now);
      setAvailableOnIsland(availabilitiesNow.island);
      setAvailableLater(availabilitiesNow.later);
      setAvailableLaterIsland(availabilitiesNow.laterIsland);
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(interval);
  }, [date]); // Empty dependency array means this effect runs only once after initial render

  return (
    <div>
      <p>
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
        <br />
        {date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <div style={{ display: "flex", flexDirection: "row", gap: 25 }}>
        <div>
          <h3>Available Now In Town</h3>
          {availableNow.map((av) => availabilityString(av))}
        </div>
        <div>
          <h3>Available Now On Island</h3>
          {availableOnIsland.map((av) => availabilityString(av))}
        </div>
        <div>
          <h3>Available Later In Town</h3>
          {availableLater.map((av) => availabilityString(av))}
        </div>
        <div>
          <h3>Available Later On Island</h3>
          {availableLaterIsland.map((av) => availabilityString(av))}
        </div>
      </div>
    </div>
  );
}

export default App;
