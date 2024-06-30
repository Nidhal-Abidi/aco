import type { City } from "../algorithms/acoAlgorithms"

export const cities5: City[] = [
  {
    x: 30,
    y: 20,
    name: "c_0",
    isVisited: false,
    distanceTo: { c_1: 590.8, c_2: 557.6, c_3: 280.7, c_4: 685.1 },
    pheromoneTo: { c_1: 0, c_2: 0, c_3: 0, c_4: 0 },
    lineWidthTo: { c_1: 0.3, c_2: 0.3, c_3: 0.3, c_4: 0.3 },
    edgeAntFlow: { c_1: 0, c_2: 0, c_3: 0, c_4: 0 },
  },
  {
    x: 620,
    y: 50,
    name: "c_1",
    isVisited: false,
    distanceTo: { c_0: 590.8, c_2: 527, c_3: 622.4, c_4: 350.6 },
    pheromoneTo: { c_0: 0, c_2: 0, c_3: 0, c_4: 0 },
    lineWidthTo: { c_0: 0.3, c_2: 0.3, c_3: 0.3, c_4: 0.3 },
    edgeAntFlow: { c_0: 0, c_2: 0, c_3: 0, c_4: 0 },
  },
  {
    x: 330,
    y: 490,
    name: "c_2",
    isVisited: false,
    distanceTo: { c_0: 557.6, c_1: 527, c_3: 338.4, c_4: 284.6 },
    pheromoneTo: { c_0: 0, c_1: 0, c_3: 0, c_4: 0 },
    lineWidthTo: { c_0: 0.3, c_1: 0.3, c_3: 0.3, c_4: 0.3 },
    edgeAntFlow: { c_0: 0, c_1: 0, c_3: 0, c_4: 0 },
  },
  {
    x: 50,
    y: 300,
    name: "c_3",
    isVisited: false,
    distanceTo: { c_0: 280.7, c_1: 622.4, c_2: 338.4, c_4: 559 },
    pheromoneTo: { c_0: 0, c_1: 0, c_2: 0, c_4: 0 },
    lineWidthTo: { c_0: 0.3, c_1: 0.3, c_2: 0.3, c_4: 0.3 },
    edgeAntFlow: { c_0: 0, c_1: 0, c_2: 0, c_4: 0 },
  },
  {
    x: 600,
    y: 400,
    name: "c_4",
    isVisited: false,
    distanceTo: { c_0: 685.1, c_1: 350.6, c_2: 284.6, c_3: 559 },
    pheromoneTo: { c_0: 0, c_1: 0, c_2: 0, c_3: 0 },
    lineWidthTo: { c_0: 0.3, c_1: 0.3, c_2: 0.3, c_3: 0.3 },
    edgeAntFlow: { c_0: 0, c_1: 0, c_2: 0, c_3: 0 },
  },
]

export const cities7: City[] = [
  {
    x: 40,
    y: 60,
    name: "c_0",
    isVisited: false,
    distanceTo: {
      c_1: 580.1,
      c_2: 518.7,
      c_3: 345.3,
      c_4: 649,
      c_5: 275.1,
      c_6: 728,
    },
    pheromoneTo: { c_1: 0, c_2: 0, c_3: 0, c_4: 0, c_5: 0, c_6: 0 },
    lineWidthTo: { c_1: 0.3, c_2: 0.3, c_3: 0.3, c_4: 0.3, c_5: 0.3, c_6: 0.3 },
    edgeAntFlow: { c_1: 0, c_2: 0, c_3: 0, c_4: 0, c_5: 0, c_6: 0 },
  },
  {
    x: 620,
    y: 70,
    name: "c_1",
    isVisited: false,
    distanceTo: {
      c_0: 580.1,
      c_2: 510.4,
      c_3: 615.9,
      c_4: 352.3,
      c_5: 329.8,
      c_6: 430,
    },
    pheromoneTo: { c_0: 0, c_2: 0, c_3: 0, c_4: 0, c_5: 0, c_6: 0 },
    lineWidthTo: { c_0: 0.3, c_2: 0.3, c_3: 0.3, c_4: 0.3, c_5: 0.3, c_6: 0.3 },
    edgeAntFlow: { c_0: 0, c_2: 0, c_3: 0, c_4: 0, c_5: 0, c_6: 0 },
  },
  {
    x: 330,
    y: 490,
    name: "c_2",
    isVisited: false,
    distanceTo: {
      c_0: 518.7,
      c_1: 510.4,
      c_3: 247,
      c_4: 259.6,
      c_5: 341.3,
      c_6: 290.2,
    },
    pheromoneTo: { c_0: 0, c_1: 0, c_3: 0, c_4: 0, c_5: 0, c_6: 0 },
    lineWidthTo: { c_0: 0.3, c_1: 0.3, c_3: 0.3, c_4: 0.3, c_5: 0.3, c_6: 0.3 },
    edgeAntFlow: { c_0: 0, c_1: 0, c_3: 0, c_4: 0, c_5: 0, c_6: 0 },
  },
  {
    x: 100,
    y: 400,
    name: "c_3",
    isVisited: false,
    distanceTo: {
      c_0: 345.3,
      c_1: 615.9,
      c_2: 247,
      c_4: 480.4,
      c_5: 320.2,
      c_6: 529.5,
    },
    pheromoneTo: { c_0: 0, c_1: 0, c_2: 0, c_4: 0, c_5: 0, c_6: 0 },
    lineWidthTo: { c_0: 0.3, c_1: 0.3, c_2: 0.3, c_4: 0.3, c_5: 0.3, c_6: 0.3 },
    edgeAntFlow: { c_0: 0, c_1: 0, c_2: 0, c_4: 0, c_5: 0, c_6: 0 },
  },
  {
    x: 580,
    y: 420,
    name: "c_4",
    isVisited: false,
    distanceTo: {
      c_0: 649,
      c_1: 352.3,
      c_2: 259.6,
      c_3: 480.4,
      c_5: 389,
      c_6: 89.4,
    },
    pheromoneTo: { c_0: 0, c_1: 0, c_2: 0, c_3: 0, c_5: 0, c_6: 0 },
    lineWidthTo: { c_0: 0.3, c_1: 0.3, c_2: 0.3, c_3: 0.3, c_5: 0.3, c_6: 0.3 },
    edgeAntFlow: { c_0: 0, c_1: 0, c_2: 0, c_3: 0, c_5: 0, c_6: 0 },
  },
  {
    x: 300,
    y: 150,
    name: "c_5",
    isVisited: false,
    distanceTo: {
      c_0: 275.1,
      c_1: 329.8,
      c_2: 341.3,
      c_3: 320.2,
      c_4: 389,
      c_6: 474.2,
    },
    pheromoneTo: { c_0: 0, c_1: 0, c_2: 0, c_3: 0, c_4: 0, c_6: 0 },
    lineWidthTo: { c_0: 0.3, c_1: 0.3, c_2: 0.3, c_3: 0.3, c_4: 0.3, c_6: 0.3 },
    edgeAntFlow: { c_0: 0, c_1: 0, c_2: 0, c_3: 0, c_4: 0, c_6: 0 },
  },
  {
    x: 620,
    y: 500,
    name: "c_6",
    isVisited: false,
    distanceTo: {
      c_0: 728,
      c_1: 430,
      c_2: 290.2,
      c_3: 529.5,
      c_4: 89.4,
      c_5: 474.2,
    },
    pheromoneTo: { c_0: 0, c_1: 0, c_2: 0, c_3: 0, c_4: 0, c_5: 0 },
    lineWidthTo: { c_0: 0.3, c_1: 0.3, c_2: 0.3, c_3: 0.3, c_4: 0.3, c_5: 0.3 },
    edgeAntFlow: { c_0: 0, c_1: 0, c_2: 0, c_3: 0, c_4: 0, c_5: 0 },
  },
]

export const cities10: City[] = [
  {
    x: 100,
    y: 100,
    name: "c_0",
    isVisited: false,
    distanceTo: {
      c_1: 170,
      c_2: 471.7,
      c_3: 650,
      c_4: 500.9,
      c_5: 454.9,
      c_6: 370,
      c_7: 281.6,
      c_8: 294.1,
      c_9: 256.1,
    },
    pheromoneTo: {
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
    edgeAntFlow: {
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
  },
  {
    x: 180,
    y: 250,
    name: "c_1",
    isVisited: false,
    distanceTo: {
      c_0: 170,
      c_2: 302.3,
      c_3: 501.2,
      c_4: 436.8,
      c_5: 316.2,
      c_6: 271.7,
      c_7: 269.1,
      c_8: 130.4,
      c_9: 120.4,
    },
    pheromoneTo: {
      c_0: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
  },
  {
    x: 350,
    y: 500,
    name: "c_2",
    isVisited: false,
    distanceTo: {
      c_0: 471.7,
      c_1: 302.3,
      c_3: 270.2,
      c_4: 446.5,
      c_5: 198.5,
      c_6: 297.3,
      c_7: 431,
      c_8: 200,
      c_9: 245.2,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
  },
  {
    x: 620,
    y: 490,
    name: "c_3",
    isVisited: false,
    distanceTo: {
      c_0: 650,
      c_1: 501.2,
      c_2: 270.2,
      c_4: 360.6,
      c_5: 198,
      c_6: 319.1,
      c_7: 483.7,
      c_8: 443.8,
      c_9: 394.1,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
  },
  {
    x: 600,
    y: 130,
    name: "c_4",
    isVisited: false,
    distanceTo: {
      c_0: 500.9,
      c_1: 436.8,
      c_2: 446.5,
      c_3: 360.6,
      c_5: 250.6,
      c_6: 174.9,
      c_7: 228,
      c_8: 480.2,
      c_9: 327,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
  },
  {
    x: 480,
    y: 350,
    name: "c_5",
    isVisited: false,
    distanceTo: {
      c_0: 454.9,
      c_1: 316.2,
      c_2: 198.5,
      c_3: 198,
      c_4: 250.6,
      c_6: 133.4,
      c_7: 297.3,
      c_8: 291.5,
      c_9: 201.2,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
  },
  {
    x: 450,
    y: 220,
    name: "c_6",
    isVisited: false,
    distanceTo: {
      c_0: 370,
      c_1: 271.7,
      c_2: 297.3,
      c_3: 319.1,
      c_4: 174.9,
      c_5: 133.4,
      c_7: 165.5,
      c_8: 305.3,
      c_9: 155.2,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
  },
  {
    x: 380,
    y: 70,
    name: "c_7",
    isVisited: false,
    distanceTo: {
      c_0: 281.6,
      c_1: 269.1,
      c_2: 431,
      c_3: 483.7,
      c_4: 228,
      c_5: 297.3,
      c_6: 165.5,
      c_8: 363.6,
      c_9: 206.2,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_8: 0,
      c_9: 0,
    },
  },
  {
    x: 190,
    y: 380,
    name: "c_8",
    isVisited: false,
    distanceTo: {
      c_0: 294.1,
      c_1: 130.4,
      c_2: 200,
      c_3: 443.8,
      c_4: 480.2,
      c_5: 291.5,
      c_6: 305.3,
      c_7: 363.6,
      c_9: 162.8,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_9: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_9: 0,
    },
  },
  {
    x: 300,
    y: 260,
    name: "c_9",
    isVisited: false,
    distanceTo: {
      c_0: 256.1,
      c_1: 120.4,
      c_2: 245.2,
      c_3: 394.1,
      c_4: 327,
      c_5: 201.2,
      c_6: 155.2,
      c_7: 206.2,
      c_8: 162.8,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
    },
  },
]

export const cities15: City[] = [
  {
    x: 50,
    y: 400,
    name: "c_0",
    isVisited: false,
    distanceTo: {
      c_1: 353.6,
      c_2: 141.4,
      c_3: 291.5,
      c_4: 206.2,
      c_5: 291.5,
      c_6: 424.3,
      c_7: 353.6,
      c_8: 447.2,
      c_9: 570.1,
      c_10: 500,
      c_11: 206.2,
      c_12: 158.1,
      c_13: 430.1,
      c_14: 430.1,
    },
    pheromoneTo: {
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 100,
    y: 50,
    name: "c_1",
    isVisited: false,
    distanceTo: {
      c_0: 353.6,
      c_2: 255,
      c_3: 141.4,
      c_4: 427.2,
      c_5: 282.8,
      c_6: 255,
      c_7: 424.3,
      c_8: 380.8,
      c_9: 400,
      c_10: 570.1,
      c_11: 150,
      c_12: 316.2,
      c_13: 200,
      c_14: 316.2,
    },
    pheromoneTo: {
      c_0: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 150,
    y: 300,
    name: "c_2",
    isVisited: false,
    distanceTo: {
      c_0: 141.4,
      c_1: 255,
      c_3: 158.1,
      c_4: 180.3,
      c_5: 158.1,
      c_6: 282.8,
      c_7: 255,
      c_8: 316.2,
      c_9: 430.1,
      c_10: 412.3,
      c_11: 111.8,
      c_12: 70.7,
      c_13: 291.5,
      c_14: 291.5,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 200,
    y: 150,
    name: "c_3",
    isVisited: false,
    distanceTo: {
      c_0: 291.5,
      c_1: 141.4,
      c_2: 158.1,
      c_4: 304.1,
      c_5: 141.4,
      c_6: 158.1,
      c_7: 282.8,
      c_8: 255,
      c_9: 316.2,
      c_10: 430.1,
      c_11: 111.8,
      c_12: 200,
      c_13: 141.4,
      c_14: 200,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 250,
    y: 450,
    name: "c_4",
    isVisited: false,
    distanceTo: {
      c_0: 206.2,
      c_1: 427.2,
      c_2: 180.3,
      c_3: 304.1,
      c_5: 206.2,
      c_6: 364,
      c_7: 180.3,
      c_8: 320.2,
      c_9: 471.7,
      c_10: 304.1,
      c_11: 291.5,
      c_12: 111.8,
      c_13: 403.1,
      c_14: 335.4,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 300,
    y: 250,
    name: "c_5",
    isVisited: false,
    distanceTo: {
      c_0: 291.5,
      c_1: 282.8,
      c_2: 158.1,
      c_3: 141.4,
      c_4: 206.2,
      c_6: 158.1,
      c_7: 141.4,
      c_8: 158.1,
      c_9: 282.8,
      c_10: 291.5,
      c_11: 206.2,
      c_12: 141.4,
      c_13: 200,
      c_14: 141.4,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 350,
    y: 100,
    name: "c_6",
    isVisited: false,
    distanceTo: {
      c_0: 424.3,
      c_1: 255,
      c_2: 282.8,
      c_3: 158.1,
      c_4: 364,
      c_5: 158.1,
      c_7: 255,
      c_8: 141.4,
      c_9: 158.1,
      c_10: 360.6,
      c_11: 269.3,
      c_12: 291.5,
      c_13: 70.7,
      c_14: 70.7,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 400,
    y: 350,
    name: "c_7",
    isVisited: false,
    distanceTo: {
      c_0: 353.6,
      c_1: 424.3,
      c_2: 255,
      c_3: 282.8,
      c_4: 180.3,
      c_5: 141.4,
      c_6: 255,
      c_8: 158.1,
      c_9: 316.2,
      c_10: 158.1,
      c_11: 335.4,
      c_12: 200,
      c_13: 316.2,
      c_14: 200,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 450,
    y: 200,
    name: "c_8",
    isVisited: false,
    distanceTo: {
      c_0: 447.2,
      c_1: 380.8,
      c_2: 316.2,
      c_3: 255,
      c_4: 320.2,
      c_5: 158.1,
      c_6: 141.4,
      c_7: 158.1,
      c_9: 158.1,
      c_10: 223.6,
      c_11: 350,
      c_12: 291.5,
      c_13: 212.1,
      c_14: 70.7,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 500,
    y: 50,
    name: "c_9",
    isVisited: false,
    distanceTo: {
      c_0: 570.1,
      c_1: 400,
      c_2: 430.1,
      c_3: 316.2,
      c_4: 471.7,
      c_5: 282.8,
      c_6: 158.1,
      c_7: 316.2,
      c_8: 158.1,
      c_10: 353.6,
      c_11: 427.2,
      c_12: 424.3,
      c_13: 200,
      c_14: 141.4,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 550,
    y: 400,
    name: "c_10",
    isVisited: false,
    distanceTo: {
      c_0: 500,
      c_1: 570.1,
      c_2: 412.3,
      c_3: 430.1,
      c_4: 304.1,
      c_5: 291.5,
      c_6: 360.6,
      c_7: 158.1,
      c_8: 223.6,
      c_9: 353.6,
      c_11: 492.4,
      c_12: 353.6,
      c_13: 430.1,
      c_14: 291.5,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 100,
    y: 200,
    name: "c_11",
    isVisited: false,
    distanceTo: {
      c_0: 206.2,
      c_1: 150,
      c_2: 111.8,
      c_3: 111.8,
      c_4: 291.5,
      c_5: 206.2,
      c_6: 269.3,
      c_7: 335.4,
      c_8: 350,
      c_9: 427.2,
      c_10: 492.4,
      c_12: 180.3,
      c_13: 250,
      c_14: 304.1,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_12: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_12: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 200,
    y: 350,
    name: "c_12",
    isVisited: false,
    distanceTo: {
      c_0: 158.1,
      c_1: 316.2,
      c_2: 70.7,
      c_3: 200,
      c_4: 111.8,
      c_5: 141.4,
      c_6: 291.5,
      c_7: 200,
      c_8: 291.5,
      c_9: 424.3,
      c_10: 353.6,
      c_11: 180.3,
      c_13: 316.2,
      c_14: 282.8,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_13: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_13: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_13: 0,
      c_14: 0,
    },
  },
  {
    x: 300,
    y: 50,
    name: "c_13",
    isVisited: false,
    distanceTo: {
      c_0: 430.1,
      c_1: 200,
      c_2: 291.5,
      c_3: 141.4,
      c_4: 403.1,
      c_5: 200,
      c_6: 70.7,
      c_7: 316.2,
      c_8: 212.1,
      c_9: 200,
      c_10: 430.1,
      c_11: 250,
      c_12: 316.2,
      c_14: 141.4,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_14: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_14: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_14: 0,
    },
  },
  {
    x: 400,
    y: 150,
    name: "c_14",
    isVisited: false,
    distanceTo: {
      c_0: 430.1,
      c_1: 316.2,
      c_2: 291.5,
      c_3: 200,
      c_4: 335.4,
      c_5: 141.4,
      c_6: 70.7,
      c_7: 200,
      c_8: 70.7,
      c_9: 141.4,
      c_10: 291.5,
      c_11: 304.1,
      c_12: 282.8,
      c_13: 141.4,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
      c_10: 0.3,
      c_11: 0.3,
      c_12: 0.3,
      c_13: 0.3,
    },
    edgeAntFlow: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
      c_10: 0,
      c_11: 0,
      c_12: 0,
      c_13: 0,
    },
  },
]
