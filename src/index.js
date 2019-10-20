module.exports = function solveSudoku(matrix) {

  const nullAdresses = [];

  // Define empty cells
  for(let i = 0; i < matrix.length; i++) {

    for(let j = 0; j < matrix[i].length; j++) {

      if (matrix[i][j] === 0) {

        nullAdresses.push([i, j]);

      }
      
    }

  }

  // Try numbers if no match look at previous 
  for(let i = 0; i < nullAdresses.length; ) {

    let rowInd = nullAdresses[i][0];
    let colInd = nullAdresses[i][1];
    let candidate = matrix[rowInd][colInd] + 1;

    let resFound = false;
  
    while (!resFound && candidate <= 9) {

      if (checkValue(rowInd, colInd, candidate)) {

        resFound = true;

        matrix[rowInd][colInd] = candidate;

        i++;

      } else {

        candidate++;

      }

    }

//If no match stepback

    if (!resFound) {

      matrix[rowInd][colInd] = 0;

      i--;

    }

  }

  return matrix;

//Support fucntions

  function checkValue(rowInd, colInd, candidate) {

    const conditions = {

      rowReq: null,

      colReq: null,

      sqrReq: null

    };


  if(!matrix[rowInd].includes(candidate)) conditions.rowReq = true;

  if(matrix.every(el => el[colInd] !== candidate)) conditions.colReq = true;

  let initRow = 0;
  let initCol = 0;

  while (rowInd > initRow + 2) {

    initRow += 3;

  }

  while (colInd > initCol + 2) {

    initCol += 3;

  }

  const maxRow = initRow + 3;
  const maxCol = initCol + 3;

// Square check
  for (let i = initRow; i < maxRow; i++) {

    for (let j = initCol; j < maxCol; j++) {

      if (candidate === matrix[i][j]) {

        conditions.sqrReq =  false;

      }

    }

  }

// if check passed value hasn't changed => its ok
  if(conditions.sqrReq === null) conditions.sqrReq = true;

// whether row, column and square requirements ok or not

  return Object.entries(conditions).every(x => x[1] === true);

  }

};