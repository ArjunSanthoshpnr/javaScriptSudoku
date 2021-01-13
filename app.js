function dispalyObj(obj) {
    for(var i=0; i<9; i++) {
        for(var j=0; j<9; j++) {
            var elem = 'c' + i.toString() + j.toString();
            var val = obj[i][j] 
            if(val == 0){
                
            }
            else {
                document.getElementById(elem).value = obj[i][j];
                document.getElementById(elem).disabled = true;
            }
            
        }
    }
}
//dispalyObj(puzzle);

function findNextCellToFill(grid, i, j) {
    for(var x=i; x<9; x++) {
        for(var y=j; y<9; y++) {
            if(grid[x][y] == 0)
                return [x, y]
        }
    }
    for(var x=0; x<9; x++) {
        for(var y=0; y<9; y++) {
            if(grid[x][y] == 0)
                return [x, y];
        }
    }
    return [-1,-1]
}
function isValid(grid, i, j, e) {
    function allRow(grid, e, i) {
        for(var x=0; x<9; x++) {
            if(e == grid[i][x]) 
                return false;
        }
        return true;
    }
    
    function allColumn(grid, e, j) {
        for(var x=0; x<9; x++) {
            if(e == grid[x][j]) 
                return false;
        }
        return true;
    }
    var rowOK = allRow(grid, e, i);
    if(rowOK) {
        var columnOk = allColumn(grid, e, j);
        if(columnOk) {
            var secTopX = 3*(Math.floor(i/3)), secTopY = 3*(Math.floor(j/3));
            for(x=secTopX; x<secTopX+3; x++) {
                for(y=secTopY; y<secTopY+3; y++){
                    //console.log(grid[x][y]);
                    if(grid[x][y] == e)
                        return false;
                }
            }
            return true;
        }
    }
    return false;
}

function solveSudoku(grid, i=0, j=0) {
    var l = [], i, j;
    l = findNextCellToFill(grid, i, j);
    //console.log(l);
    i = l[0];
    j = l[1];
    if(i==-1) {
        
        return true;
    }
    for(var e=1; e<10; e++) {
        if(isValid(grid, i, j, e)) {
            grid[i][j] = e;
            if(solveSudoku(grid, i, j)) {
                return true;
            }
            grid[i][j] = 0;

        }
    }
    return false;
}


var loadData = (function() {
    var puzzle = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0]];
    return function() {
        for(i=0; i<9; i++) {
            for(j=0; j<9; j++) {
                var elem = 'c' + i.toString() + j.toString();
                var value = document.getElementById(elem).value;

                if(value == ''){
                    value = 0;
                }
                else {
                    value = parseInt(value, 10)
                }

                if(value.toString().length != 1){
                    alert('Enter inputs between 0-9.');
                    return false;
                }

                if(value!=0) {
                    if(isValid(puzzle, i, j, value)) {
                        puzzle[i][j] = value;
                        //console.log(puzzle);
                    }
                    else if(puzzle[i][j] == value) {
                        alert('Clear the table!');
                        return false;
                    }
                    else {
                        alert('Invalid Input!');
                        return false;
                    }
                }
            }
        }
        solveSudoku(puzzle);
        dispalyObj(puzzle);
    }
})();