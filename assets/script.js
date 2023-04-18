var topics = ['HTML', 'CSS', 'Git', 'JavaScript'];
var randomTopic = topics[Math.floor(Math.random() * topics.length)];

function listTopics() {
 for (var x = 0; x < topics.length; x++) {
   console.log(topics[x]);
 }
}

function selectTopic() {
 if (randomTopic === 'HTML') {
   console.log("Let's study HTML!");
 } else if (randomTopic === 'CSS') {
   console.log("Let's study CSS!");
 } else if (randomTopic === 'Git') {
   console.log("Let's study Git!");
 } else if (randomTopic === 'JavaScript') {
   console.log("Let's study JavaScript!");
 } else {
   console.log('Please try again!');
 }
}

console.log('Here are the topics we learned through Prework:');
listTopics();
console.log('Which topic should we study first?');
selectTopic();


console.log("Solve this maze");

let z = '';
for(let x = 0; x < 20; x++){
  for(let y = 0; y < 40; y++){
      z += "╱╲"[0|(Math.random()*2)];
  } 
  z += "\n";
}
console.log(z);

setTimeout(() => {
  console.log("Thank you for trying the maze!");
}, 30*1000);