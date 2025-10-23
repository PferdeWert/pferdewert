/**
 * MongoDB Module Barrel Export
 * Provides clean imports for MongoDB utilities
 */

export { connectToDatabase, closeConnection } from './client';
export { getRatgeberRepository } from './ratgeber-repository';
export type { RatgeberRepository } from './ratgeber-repository';
