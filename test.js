const CompareObjs = require('./index');

var cb = new CompareObjs ( [1,2,3], [1,4,3], {deep:'hasPart'} );
var cb_1 = new CompareObjs ( [1,2,3], [1,2,3], {deep:'hasPart'} );
console.log(cb.contain()); //false
console.log(cb_1.contain()); //true
