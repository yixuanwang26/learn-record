// steps = 3, arrLen = 2
// 4

// steps = 2, arrLen = 4
// 2

// steps = 4, arrLen = 2
// 8

var numWays = function(steps, arrLen) {
   const dp = [];
   for(var i = 0; i<arrLen; i++) {
     for(var j =1; j< steps + 1; j++) {
       if(i === 0 ) {
          // 当位置在 0 时还有 j 步，
          dp[0][j] = j;
          break;
       }
     }
   }
};