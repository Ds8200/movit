import { Route } from '@/store/atoms';

export function calculateTotalDistance(route: Route): number {
  return Math.round(route.distance / 1000); // Convert meters to kilometers
}

export function calculateEstimatedTime(route: Route): number {
  return Math.round(route.duration / 60); // Convert seconds to minutes
} 