var topics = ['HTML', 'CSS', 'Git', 'JavaScript'];

for (var x = 0; x < topics.length; x++) {
 console.log(topics[x]);
}

/*
if (topic === 'HTML') {
 console.log("Let's study HTML!");
} else if (topic === 'CSS') {
 console.log("Let's study CSS!");
} else if (topic === 'Git') {
 console.log("Let's study Git!");
} else if (topic === 'JavaScript') {
 console.log("Let's study JavaScript!");
} else {
 console.log('Please try again!');
}
*/

console.log("Solve this maze");

let z = '';
for(let x = 0; x < 20; x++){
  for(let y = 0; y < 40; y++){
      z += "╱╲"[0|(Math.random()*2)];
  } 
  z += "\n";
}
console.log(z);