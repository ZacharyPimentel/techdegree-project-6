
///////////////////////////////////////
//TRANSCRIPT ARRAY
//////////////////////////////////////

const transcript = [
	//paragraph 1
	{"start": 0,"end":3.9,"text":"Now that we've looked at the architecture of the internet, let's see how you might "},
	{"start": 4,"end":6.9,"text":"connect your personal devices to the internet inside your house. "},
	{"start": 7,"end":10.9,"text":"Well there are many ways to connect to the internet, and "},
	{"start": 11,"end":12.9,"text":"most often people connect wirelessly. "},
	// paragraph 2
	{"start": 13,"end":16.9,"text":"Let's look at an example of how you can connect to the internet. "},
	{"start": 17,"end":21.9,"text":"If you live in a city or a town, you probably have a coaxial cable for "},
	{"start": 22,"end":25.9,"text":"cable Internet, or a phone line if you have DSL, running to the outside of "},
	{"start": 26,"end":29.9,"text":"your house, that connects you to the Internet Service Provider, or ISP. "},
	{"start": 30,"end":33.9,"text":"If you live far out in the country, you'll more likely have "},
	{"start": 34,"end":38.9,"text":"a dish outside your house, connecting you wirelessly to your closest ISP, or "},
	{"start": 39,"end":40.9,"text":"you might also use the telephone system. "},
	//paragraph 3
	{"start": 41,"end":45.9,"text":"Whether a wire comes straight from the ISP hookup outside your house, or "},
	{"start": 46,"end":48.9,"text":"it travels over radio waves from your roof, "},
	{"start": 49,"end":52.9,"text":"the first stop a wire will make once inside your house, is at your modem. "},
	{"start": 53,"end":56.9,"text":"A modem is what connects the internet to your network at home. "},
	{"start": 57,"end":59.9,"text":"A few common residential modems are DSL or "}
];  
////////////////////////////////////////////
//GLOBAL VARIABLES
//////////////////////////////////////////////

let currentTime = 0;
const video = document.getElementById('video__player'); 
let spanEles; //this will contain all generated span elements

/////////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////

//creates p elements inside a designated parent container and gives them ids
const createContainers = function(parentContainer,numberOfBoxes){
	const container = parentContainer;
	const boxes = numberOfBoxes;
	
	for(i=0; i<numberOfBoxes;i++){
		let paragraph = document.createElement('p');
		container.appendChild(paragraph);
		paragraph.setAttribute("id","paragraph__" + (i+1));
	}
}

//loops through the transcript and splits up sentences into different paragraphs
const addText = function(){
	for(i=0; i<transcript.length;i++){
		let span = document.createElement('span');
		//change the arguments of the if statements to change where each p is separated
		if(i<4){
			let currentParagraph = document.getElementById('paragraph__1');
			currentParagraph.appendChild(span);
			span.innerHTML = transcript[i].text;
		}else if(i<11){
			let currentParagraph = document.getElementById('paragraph__2');
			currentParagraph.appendChild(span);
			span.innerHTML = transcript[i].text;
		}else{
			let currentParagraph = document.getElementById('paragraph__3');
			currentParagraph.appendChild(span);
			span.innerHTML = transcript[i].text;
		}
	}
}

//this block of code constantly updates the current time of the video
const videoTime = function(){		
	currentTime = video.currentTime;
	// console.log(currentTime);
}	

//highlights text at appropriate times
const highlight = function(){
	// console.log(spanEles);
	//loops through the transcript array
	for(i=0; i<transcript.length; i++){
		//if the current time is between the start and end of each object in the array
		if(transcript[i].start < currentTime && currentTime < transcript[i].end){
			//gets the text associated for the current time
			let currentText = transcript[i].text;
			//loops through all the created span elements
			for(i=0; i<spanEles.length; i++){
				//gives the correct span a color when it finds it and removes color from
				//previously colored elements
				if(spanEles[i].textContent === currentText){
					let currentSpan = spanEles[i];
					currentSpan.style.color = 'orange';
				}else{
					let currentSpan = spanEles[i];
					currentSpan.style.color = 'black';
				}
			}		
		}
	}
}

//adds the click event listener to each created span element
const clickLinks = function(){
	for(i=0; i<spanEles.length; i++){
		spanEles[i].addEventListener("click", changeTime(i));
	}
}

//adds the correct time for the click event listener to be applied to span elements
const changeTime = function(i){
	return function(){
		video.currentTime = transcript[i].start;
		video.play();
	};
}


///////////////////////////////////////////
//Calling functions
///////////////////////////////////////////


createContainers(text__boxes,3);
addText();
spanEles = document.querySelectorAll('span');
let interval1 = setInterval(videoTime,100);
let interval2 = setInterval(highlight,100);
clickLinks();
