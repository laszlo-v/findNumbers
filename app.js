"use strict";
(() => {
  const numbers = document.querySelector(".numbers");
  const sum = document.querySelector(".sum");
  const results = document.querySelector(".result");
  const get = document.querySelector(".get");
  const reset = document.querySelector(".reset");
  let paragraph;

  get.addEventListener("click", () => {
    console.log(numbers.value);
    const numbersString = numbers.value.split(",");
    const numbersArray = [];
    for (let number of numbersString) {
      numbersArray.push(+number);
    }

    let targetNumber = +sum.value;
    const findNumber = (
      arr,
      target,
      startIndex,
      currentSum,
      currentCombination,
      result
    ) => {
      const tolerance = 0.0001;

      if (Math.abs(currentSum - target) < tolerance) {
        result.push([...currentCombination]);
        return;
      }

      for (let i = startIndex; i < arr.length; i++) {
        // Skip duplicate elements
        if (i > startIndex && arr[i] === arr[i - 1]) {
          continue;
        }

        currentCombination.push(arr[i]);
        findNumber(
          arr,
          target,
          i + 1,
          currentSum + arr[i],
          currentCombination,
          result
        );
        currentCombination.pop();
      }
    };

    const findAllCombinations = (arr, target) => {
      arr.sort((a, b) => a - b); // Sort the input array for handling duplicates
      const result = [];
      findNumber(arr, target, 0, 0, [], result);
      return result;
    };

    const result = findAllCombinations(numbersArray, targetNumber);
    // console.log("Combinations that add up to the target number:");
    // console.log(result);

    result.forEach((e, i) => {
      paragraph = document.createElement("p");
      paragraph.textContent = `Combination ${i + 1} is: ${e}`;
      if (!results.hasChildNodes(paragraph)) {
        results.appendChild(paragraph);
      }
    });
  });

  reset.addEventListener("click", () => {
    numbers.value = "";
    sum.value = "";
    if (results.hasChildNodes(paragraph)) {
      results.removeChild(paragraph);
    }
  });
})();
