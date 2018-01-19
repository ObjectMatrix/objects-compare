# objects-compare

compare objects in NodeJs

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

none

```
Give examples
```
const CompareObjs = require('./index');

var cobj = new CompareObjs ( [1,2,3], [1,4,3], {deep:'hasPart'} );
console.log(cobj.contain()); //false

var cobj = new CompareObjs ( [1,2,3], [1,4,3], {deep:'hasOnly'} );
console.log(cobj.contain()); //false
