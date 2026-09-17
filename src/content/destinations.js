/**
 * Curated, static destination catalogue (pt-BR).
 *
 * Pure data: must not import React, Three.js, DOM or browser APIs.
 * The content model is enforced by validateCatalogue.
 */
import { deepSkyDestinations } from './destinations/deepSky.js'
import { solarSystemDestinations } from './destinations/solarSystem.js'

export const destinations = [...solarSystemDestinations, ...deepSkyDestinations]
