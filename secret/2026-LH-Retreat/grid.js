// battleship-grid.js
//
// 10x10 Minesweeper-style grid labeled A-J and 1-10.
//
// Features:
// - All cells start covered.
// - Clicking a cell reveals it.
// - Flagged cells require the player to choose Red, Blue, or Green.
// - The scoreboard tracks how many flags of each color have been found.
// - Non-flagged cells display the number of adjacent flags.
// - Empty cells display nothing.
// - Adjacent includes all 8 surrounding cells, including diagonals.


// ==================================================
// GAME DATA
// ==================================================

// Coordinates containing hidden flags.
const flaggedCoordinates = [
  "A3",
  "B10",
  "C4",
  "C9",
  "D4",
  "D7",
  "D8",
  "E4",
  "F1",
  "F5",
  "G8",
  "I9"
];


// Score for each flag color.
const scores = {
  red: 0,
  blue: 0,
  green: 0,
};


// Grid labels.
const columnLabels = "ABCDEFGHIJ".split("");

const rowLabels = Array.from(
  { length: 10 },
  (_, i) => i + 1
);


// Colors used by the game.
const flagColors = {
  red: "#e53935",
  blue: "#1e88e5",
  green: "#43a047",
};

// Colors used by the game.
const flagBackgroundColors = {
  red: "#ff8785",
  blue: "#89c8ff",
  green: "#91eb96",
};


// ==================================================
// COORDINATE HELPERS
// ==================================================

// Convert a coordinate such as "C7" into a row/column position.
//
// C7 becomes:
// {
//   row: 6,
//   column: 2
// }

function coordinateToPosition(coordinate) {
  const letter = coordinate[0];

  const number = parseInt(
    coordinate.substring(1),
    10
  );

  return {
    column: columnLabels.indexOf(letter),
    row: number - 1,
  };
}


// Convert a row/column position back into a coordinate.
//
// row 6, column 2 becomes "C7".

function positionToCoordinate(row, column) {
  return `${columnLabels[column]}${row + 1}`;
}


// ==================================================
// COUNT NEARBY FLAGS
// ==================================================

// Counts the number of flags surrounding a cell.
//
// The 8 surrounding positions are checked:
//
//       X X X
//       X C X
//       X X X
//
// C = current cell
// X = cells being checked

function countNearbyFlags(row, column) {

  let flagCount = 0;


  // Check the rows above, current, and below.
  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {

    // Check the columns to the left, current, and right.
    for (
      let columnOffset = -1;
      columnOffset <= 1;
      columnOffset++
    ) {

      // Don't count the current cell itself.
      if (
        rowOffset === 0 &&
        columnOffset === 0
      ) {
        continue;
      }


      const nearbyRow = row + rowOffset;

      const nearbyColumn =
        column + columnOffset;


      // Make sure the position is inside the grid.
      if (
        nearbyRow < 0 ||
        nearbyRow >= 10 ||
        nearbyColumn < 0 ||
        nearbyColumn >= 10
      ) {
        continue;
      }


      const nearbyCoordinate =
        positionToCoordinate(
          nearbyRow,
          nearbyColumn
        );


      // Check whether this position contains a flag.
      if (
        flaggedCoordinates.includes(
          nearbyCoordinate
        )
      ) {
        flagCount++;
      }
    }
  }


  return flagCount;
}


// ==================================================
// SCOREBOARD
// ==================================================

// Creates the scoreboard.

function createScoreboard(container) {

  if (!container) {
    throw new Error(
      "Scoreboard container was not found."
    );
  }


  const scoreboard =
    document.createElement("div");


  scoreboard.className = "scoreboard";


  // Basic scoreboard styling.
  scoreboard.style.display = "flex";

  scoreboard.style.justifyContent =
    "center";

  scoreboard.style.gap = "30px";

  scoreboard.style.marginBottom =
    "15px";

  scoreboard.style.padding =
    "10px";

  scoreboard.style.fontFamily =
    "Arial, sans-serif";

  scoreboard.style.fontSize =
    "20px";

  scoreboard.style.fontWeight =
    "bold";


  // ----------------------------------------------
  // Red score
  // ----------------------------------------------

  const redScore =
    document.createElement("div");

  redScore.id = "score-red";

  redScore.style.color =
    flagColors.red;


  // ----------------------------------------------
  // Blue score
  // ----------------------------------------------

  const blueScore =
    document.createElement("div");

  blueScore.id = "score-blue";

  blueScore.style.color =
    flagColors.blue;


  // ----------------------------------------------
  // Green score
  // ----------------------------------------------

  const greenScore =
    document.createElement("div");

  greenScore.id = "score-green";

  greenScore.style.color =
    flagColors.green;


  scoreboard.appendChild(redScore);

  scoreboard.appendChild(blueScore);

  scoreboard.appendChild(greenScore);


  container.replaceChildren(
    scoreboard
  );


  updateScoreboard();
}


// ==================================================
// UPDATE SCOREBOARD
// ==================================================

function updateScoreboard() {

  const redScore =
    document.getElementById(
      "score-red"
    );

  const blueScore =
    document.getElementById(
      "score-blue"
    );

  const greenScore =
    document.getElementById(
      "score-green"
    );


  if (redScore) {
    redScore.textContent =
      `Red: ${scores.red}`;
  }


  if (blueScore) {
    blueScore.textContent =
      `Blue: ${scores.blue}`;
  }


  if (greenScore) {
    greenScore.textContent =
      `Green: ${scores.green}`;
  }
}


// ==================================================
// FLAG COLOR SELECTION
// ==================================================

// Displays the Red / Blue / Green choices
// when the player discovers a flag.

function chooseFlagColor(cell) {

  // Create the color selection area.
  const colorContainer =
    document.createElement("div");


  colorContainer.className =
    "flag-color-picker";


  colorContainer.style.display =
    "flex";

  colorContainer.style.gap =
    "4px";

  colorContainer.style.position =
    "absolute";

  colorContainer.style.zIndex =
    "10";

  colorContainer.style.backgroundColor =
    "white";

  colorContainer.style.padding =
    "5px";

  colorContainer.style.border =
    "1px solid #333";

  colorContainer.style.borderRadius =
    "4px";

  colorContainer.style.boxShadow =
    "0 2px 6px rgba(0, 0, 0, 0.3)";


  // Make sure the cell can contain the picker.
  cell.style.position =
    "relative";


  // ----------------------------------------------
  // Color definitions
  // ----------------------------------------------

  const colors = [
    {
      name: "red",
      label: "Red",
    },

    {
      name: "blue",
      label: "Blue",
    },

    {
      name: "green",
      label: "Green",
    },
  ];


  // ----------------------------------------------
  // Create a button for each color
  // ----------------------------------------------

  colors.forEach((color) => {

    const button =
      document.createElement("button");


    button.textContent =
      color.label;


    button.style.backgroundColor =
      flagColors[color.name];


    button.style.color =
      "white";


    button.style.border =
      "none";


    button.style.borderRadius =
      "4px";


    button.style.padding =
      "5px 8px";


    button.style.cursor =
      "pointer";


    button.style.fontWeight =
      "bold";


    // --------------------------------------------
    // Color selected
    // --------------------------------------------

    button.addEventListener(
      "click",
      (event) => {

        // Prevent the click from propagating
        // to the cell.
        event.stopPropagation();


        // Increase the selected color's score.
        scores[color.name]++;


        // Update the scoreboard.
        updateScoreboard();


        // Remove the color picker.
        colorContainer.remove();


        // Display the flag.
        cell.textContent =
          "⚑";


        // Set the flag color.
        cell.style.color =
          flagColors[color.name];


        // Store the selected color on the cell.
        cell.dataset.flagColor =
          color.name;
        
        // Give the cell a slightly different
        cell.style.backgroundColor =
          flagBackgroundColors[color.name];


        // Mark the flag as completely revealed.
        cell.dataset.colorSelected =
          "true";
      }
    );


    colorContainer.appendChild(
      button
    );
  });


  cell.appendChild(
    colorContainer
  );
}


// ==================================================
// REVEAL CELL
// ==================================================

function revealCell(cell) {

  // Don't reveal a cell twice.
  if (
    cell.classList.contains(
      "revealed"
    )
  ) {
    return;
  }


  const coordinate =
    cell.dataset.coordinate;


  // ----------------------------------------------
  // Mark the cell as revealed
  // ----------------------------------------------

  cell.classList.remove(
    "covered"
  );

  cell.classList.add(
    "revealed"
  );


  // Change the appearance of the cell.
  cell.style.backgroundColor =
    "#eeeeee";

  cell.style.cursor =
    "default";


  // ----------------------------------------------
  // Check for a flag
  // ----------------------------------------------

  if (
    flaggedCoordinates.includes(
      coordinate
    )
  ) {


    // Tell the player to choose a color.
    chooseFlagColor(cell);


    return;
  }


  // ----------------------------------------------
  // Normal cell
  // ----------------------------------------------

  const {
    row,
    column,
  } = coordinateToPosition(
    coordinate
  );


  const nearbyFlags =
    countNearbyFlags(
      row,
      column
    );


  // ----------------------------------------------
  // Display nearby flag count
  // ----------------------------------------------

  if (nearbyFlags > 0) {

    cell.textContent =
      nearbyFlags;

  } else {

    // No nearby flags.
    cell.textContent =
      "";
  }
}


// ==================================================
// CREATE GRID
// ==================================================

function createGrid(container) {

  if (!container) {
    throw new Error(
      "Grid container was not found."
    );
  }


  const grid =
    document.createElement("div");


  grid.className =
    "battle-grid";


  // ----------------------------------------------
  // Grid layout
  // ----------------------------------------------

  // 11 columns:
  // - 1 column for row numbers
  // - 10 columns for A-J

  grid.style.display =
    "grid";


  grid.style.gridTemplateColumns =
    "40px repeat(10, 1fr)";


  // 11 rows:
  // - 1 row for column letters
  // - 10 rows for the grid

  grid.style.gridTemplateRows =
    "40px repeat(10, 1fr)";


  grid.style.maxWidth =
    "600px";


  grid.style.aspectRatio =
    "1 / 1";


  grid.style.border =
    "1px solid #333";


  grid.style.margin =
    "0 auto";


  // ----------------------------------------------
  // Top-left corner
  // ----------------------------------------------

  const corner =
    document.createElement("div");


  corner.className =
    "grid-corner";


  corner.style.backgroundColor =
    "#ddd";


  corner.style.border =
    "1px solid #999";


  grid.appendChild(
    corner
  );


  // ----------------------------------------------
  // Column headers A-J
  // ----------------------------------------------

  columnLabels.forEach(
    (letter) => {

      const header =
        document.createElement("div");


      header.className =
        "grid-header";


      header.textContent =
        letter;


      header.style.display =
        "flex";


      header.style.alignItems =
        "center";


      header.style.justifyContent =
        "center";


      header.style.fontWeight =
        "bold";


      header.style.border =
        "1px solid #999";


      header.style.backgroundColor =
        "#ddd";


      grid.appendChild(
        header
      );
    }
  );


  // ----------------------------------------------
  // Create rows
  // ----------------------------------------------

  rowLabels.forEach(
    (number) => {

      // ------------------------------------------
      // Row number
      // ------------------------------------------

      const rowHeader =
        document.createElement("div");


      rowHeader.className =
        "grid-header";


      rowHeader.textContent =
        number;


      rowHeader.style.display =
        "flex";


      rowHeader.style.alignItems =
        "center";


      rowHeader.style.justifyContent =
        "center";


      rowHeader.style.fontWeight =
        "bold";


      rowHeader.style.border =
        "1px solid #999";


      rowHeader.style.backgroundColor =
        "#ddd";


      grid.appendChild(
        rowHeader
      );


      // ------------------------------------------
      // Cells A-J
      // ------------------------------------------

      columnLabels.forEach(
        (letter) => {

          const coordinate =
            `${letter}${number}`;


          const cell =
            document.createElement("div");


          cell.className =
            "grid-cell covered";


          cell.dataset.coordinate =
            coordinate;


          // --------------------------------------
          // Covered appearance
          // --------------------------------------

          cell.style.display =
            "flex";


          cell.style.alignItems =
            "center";


          cell.style.justifyContent =
            "center";


          cell.style.border =
            "1px solid #999";


          cell.style.backgroundColor =
            "#555";


          cell.style.color =
            "#080808";


          cell.style.cursor =
            "pointer";


          cell.style.userSelect =
            "none";


          cell.style.fontWeight =
            "bold";


          cell.style.fontSize =
            "18px";


          // --------------------------------------
          // Reveal on click
          // --------------------------------------

          cell.addEventListener(
            "click",
            (event) => {

              event.stopPropagation();

              revealCell(cell);
            }
          );


          grid.appendChild(
            cell
          );
        }
      );
    }
  );


  // Add the grid to the page.
  container.replaceChildren(
    grid
  );
}


// ==================================================
// INITIALIZE GAME
// ==================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const scoreboard =
      document.getElementById(
        "scoreboard"
      );


    const grid =
      document.getElementById(
        "grid"
      );


    createScoreboard(
      scoreboard
    );


    createGrid(
      grid
    );
  }
);