
// Topic decleration, listing and selection
function selectStudyTopic(){
  let topics = ["HTML", "CSS", "Git", "Javascript"];

  console.log('Here are the topics we learned through Prework:');

  for (var x = 0; x < topics.length; x++) {
    console.log(topics[x]);
  }

  console.log(' ');
  console.log('Which topic should we study first?');

  let randomTopic = topics[Math.floor(Math.random()*4)];

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

  console.log(' ');
}


selectStudyTopic();


// ============================================================================
// Everything past here is extra work
// ============================================================================





// Print a generated maze to the console for the user to solve
console.log("Solve this maze");

let z = '';
for(let x = 0; x < 20; x++){
  z += "█";
  for(let y = 0; y < 40; y++){
      z += "╱╲"[0|(Math.random()*2)];
  } 
  z += "█\n";
}
console.log(z);


// Helper functions for escaping HTML tags
function escapeHTML(htmlString) {
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  return htmlString.replace(/[&<>"'`=\/]/g, function (character) {
    return escapeMap[character];
  });
}

// XOR cipher
function x(input, key) {
  let output = '';
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return output;
}

// Scramble API key and API URL so that it doesn't get picked up by scrapers. Key is expendable
var mystery = "'\x02@\tN\b0B-\x17G*j=$\n%M\x07%\x14>\x126_'L\x10\x0E5%\x00B13X\x17\x044\x12aX?\x12 -\x07\x10\x1EJ\x1A";
var biscuits = '<\x1D\x19\x15SS\\\x0F\x18\x1F\x1C\\O\x1D\n\x1D\x15IX\x02\x03\x18N\x14]JC\x1A\x04\x07@\x16\x1D\x0E\x15BE!\x1A\nN\x1A';
var time = 'Time is your most valuable resource. Use it wisely.';
var k = x(mystery,time);
var a = x(biscuits,time);

// Respawn the page regeneration button after a generation cycle
function regenerationComplete(){
  const feedback = document.createElement('div');
  const feedbackText = document.createElement('input');
  const feedbackButton = document.createElement('button');
  feedbackButton.onclick = fetchNewContent;
  feedbackButton.innerHTML = "Generate another new page";
  feedbackButton.style = "display: block; margin: 5px auto;";
  feedbackText.id = "prompt";
  feedbackText.placeholder = "Enter page suggestion";
  feedbackText.type = "text";
  feedbackText.style = "display: block; margin: 5px auto;";
  feedback.appendChild(feedbackText);
  feedback.appendChild(feedbackButton);

  let footer = document.querySelector('footer');
  if (!footer) { footer = document.querySelector('.footer, #footer');}
  footer.appendChild(feedback);
}

// This experiment got way out of hand
// Generate and stream in a complete HTML page using GPT3.5 when the user clicks the button, allowing the user to watch the HTML elements arrange themselves as the DOM updates
// Also accepts a suggestion from the user to allow them to influence the generated page via the "Enter page suggestion" textbox.
// suggestion prompts to try:
//   Tropical theme
//   Make page elements wiggle on mouseover
//   Make the page spin
//   Add a section about machine learning

// API documentation
// https://platform.openai.com/docs/api-reference/chat

async function fetchNewContent() {
  const apiUrl = a;
  let customPrompt = document.getElementById('prompt').value;

  // A little bit of prompt engineering
  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": "Generate website code based on the user's specification. Create inventive and fun ways to implement seemingly impossible features. Never say that something is impossible. Implement all features. Prepend the code with [CODE]."},
      {"role": "user", "content": `Generate a single-fle complete static HTML page with these features:
Inline CSS and Javascript code
A ${customPrompt ? '' : 'dark blue '}header and footer
Nice looking CSS styling
A large title in the header reading "Prework Study Guide"
An image in the header from source "./assets/bowtie-cat.png" sized to 50x50px
A message page asking the user to check the Javascript console, decorated with emoji
4 sections with drop shadows with beginner information on the topics: HTML, CSS, Git and Javascript
Use an anonymous function to print a message in the Javascript console telling the user which of these randomly selected items to study first: HTML, CSS, Git, Javascript
Copyright page to nobody
${customPrompt}`}
    ],
    max_tokens: 2048,
    temperature: 0.7,
    stream: true,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + k,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.body || !response.body.getReader) {
      throw new Error('ReadableStream not supported by the browser or the response');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    async function readStream() {
      let documentClear = false;
      // We keep a copy of the HTML header data for later when we swap it out
      let headerSwapped = false;
      let headerHTML = '';
      let chunksBuffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          regenerationComplete();
          break;
        }

        chunksBuffer += decoder.decode(value);

        // Split incoming chunks by newlines as sometimes multiple chunks come through at once
        let newlineIndex = chunksBuffer.indexOf('\n');
        while (newlineIndex > -1) {
          const line = chunksBuffer.slice(0, newlineIndex).trim();
          chunksBuffer = chunksBuffer.slice(newlineIndex + 1);
          newlineIndex = chunksBuffer.indexOf('\n');

          // Data chunks are prepended with 'data: '
          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              break;
            } else {
              // Clear the page and prepare it so the header informaton is rendered as plantext so the user can see it stream in
              if (!documentClear) {
                document.open();
                document.write(`<!DOCTYPE html>
<html lang="en">
<head></head><body><pre>GPT-3.5 Says:
`);
                documentClear = true;
              }
              // Parse the JSON and append the text to the page
              const newHTML = JSON.parse(data).choices[0].delta.content;

              // Drop empty responses
              if(!newHTML){break;}
              
              if(headerSwapped){
                document.write(newHTML);
              } else {
                const escapedString = escapeHTML(newHTML);
                headerHTML += newHTML;
                document.write(escapedString);
                if(document.documentElement){
                  let bodyTagReached = document.documentElement.outerHTML.includes("&lt;body&gt;");
                  if(bodyTagReached){
                    // Remove everything before the HTML code
                    let startOfCode = headerHTML.indexOf('[CODE]');
                    if (startOfCode !== -1) {
                      headerHTML = headerHTML.slice(startOfCode + '[CODE]'.length).trim();
                    }
                    // Clear page and swap in the now complete HTML header
                    document.open();
                    document.write(headerHTML);
                    headerSwapped = true;
                  }
                }
              }
            }
          }
        }
      }
    }

    await readStream();
  } catch (error) {
    console.error('Error during streaming:', error);
  }
}
