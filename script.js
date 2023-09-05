const cupGoalEl = document.getElementById("water-cup-goal");
const cupFillEl = document.getElementById("water-cup-large-fill");
const cupRemainedEl = document.getElementById("cup-remained");
const stepCupsContainer = document.getElementById("cup-small-container");

const GOAL_IN_ML = 2000;
const STEPS_NUMBER = 8;
const STEPS_IN_ML = Math.ceil(GOAL_IN_ML / STEPS_NUMBER);

const getLiters = (ml) => ml / 1000;
const getPercentage = (value, goal) => (value * 100) / goal;

for (let n = 0; n < STEPS_NUMBER; n++) {
  stepCupsContainer.innerHTML += `<button data-water-cup-index="${n}" class="water-cup water-cup-small">${STEPS_IN_ML} ml</button>`;
}

cupGoalEl.textContent = `Goal: ${getLiters(GOAL_IN_ML)}L`;
cupRemainedEl.textContent = `${getLiters(GOAL_IN_ML)}L`;

stepCupsContainer.addEventListener("click", function ({ target }) {
  const waterCupIndex = target.dataset.waterCupIndex;
  if (!waterCupIndex) return;

  const restWaterCups = [...this.querySelectorAll(".water-cup")];

  const remainedMl = restWaterCups.reduce((remainedLt, waterCupEl, i) => {
    if (waterCupEl === target) waterCupEl.classList.toggle("water-cup-full");
    else if (i < waterCupIndex) waterCupEl.classList.add("water-cup-full");
    else waterCupEl.classList.remove("water-cup-full");

    return waterCupEl.classList.contains("water-cup-full")
      ? remainedLt - STEPS_IN_ML
      : remainedLt;
  }, GOAL_IN_ML);

  const waterPercentage = 100 - getPercentage(remainedMl, GOAL_IN_ML);
  cupFillEl.style.height = `${waterPercentage}%`;

  setTimeout(() => {
    cupRemainedEl.textContent = `${getLiters(remainedMl)}L`;
    cupFillEl.textContent = `${waterPercentage}%`;
  }, 300);
});
