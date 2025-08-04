/**
 * Returns progressive encouragement message key based on completion percentage
 */
export function getProgressMessageKey(percentage: number): string {
  if (percentage === 0) {
    return "dashboard.encouragement.justStarting";
  } else if (percentage <= 10) {
    return "dashboard.encouragement.greatStart";
  } else if (percentage <= 25) {
    return "dashboard.encouragement.buildingMomentum";
  } else if (percentage <= 50) {
    return "dashboard.encouragement.halfwayThere";
  } else if (percentage <= 75) {
    return "dashboard.encouragement.strongProgress";
  } else if (percentage <= 90) {
    return "dashboard.encouragement.almostThere";
  } else if (percentage < 100) {
    return "dashboard.encouragement.finalStretch";
  } else {
    return "dashboard.encouragement.completed";
  }
}