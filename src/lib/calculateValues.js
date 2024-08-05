export function calculateScore(xp) {
  if (xp >= 0) {
    return Math.floor(xp / 100);
  } else {
    return Math.ceil(xp / 100);
  }
}

export function calculateLevel(xp) {
  const xpThresholds = [30, 50, 80, 120, 170, 230, 300, 380, 470, 570];
  let level = 0;

  for (let i = 0; i < xpThresholds.length; i++) {
    if (xp >= xpThresholds[i]) {
      level = i + 1;
    } else {
      break;
    }
  }

  return level;
}

export function calculateLink(xp) {
  if (xp >= 1000) return 2;
  if (xp >= 700) return 1;
  if (xp >= 400) return 0;
  if (xp >= 200) return -1;
  if (xp >= 100) return -2;
  if (xp >= 0) return -4;
  return null;
}
