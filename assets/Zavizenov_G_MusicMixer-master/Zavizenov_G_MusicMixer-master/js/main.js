(() => {

	const instruments = document.querySelectorAll(".instrument-icon"),
    dropZones = document.querySelectorAll(".dropzone"),
    playbtn = document.querySelector("#play-btn"),
    controller = document.querySelector('.controller'),
    questionBtn = document.querySelector(".question-button"),
	closeBtn = document.querySelector(".close-btn"),
	explainerBox = document.querySelector(".explainer-box"),
	resetBtn = document.querySelector('.reset-button'),
	instrumentsContainer = document.querySelector(".instruments"),
	main = document.querySelector(".main");
    let audioToPlay = [];
    let isPlaying = false;

	instruments.forEach(instrument => {
		instrument.addEventListener('dragstart', function(e){
			e.dataTransfer.setData("text/plain", this.dataset.ref);
		});
	})

    dropZones.forEach(zone => {
		zone.addEventListener("dragover", function(e) {
			e.preventDefault();
		});
		zone.addEventListener("drop", function(e) {
			// Prevents adding multiple instruments to same dropzone
			e.preventDefault();
			console.log("Dropped something on me!");

			let instrument = e.dataTransfer.getData("text/plain");
			console.log(instrument);

			if (zone.children.length === 0){
				e.target.appendChild(document.querySelector(`img[data-ref="${instrument}"]`));
			} else {
			  console.log("Zone already has an element");
			}
			audioToPlay.push(document.querySelector(`audio[data-ref="${instrument}"]`));

			if ((dropZones[0].firstElementChild.dataset.back === 'mariachii') && (dropZones[1].firstElementChild.dataset.back === 'mariachii') && (dropZones[2].firstElementChild.dataset.back === 'mariachii')){
				main.style.backgroundImage = 'url(images/mariachii.png)';
			}

			if ((dropZones[0].firstElementChild.dataset.back === 'nirvana') && (dropZones[1].firstElementChild.dataset.back === 'nirvana') && (dropZones[2].firstElementChild.dataset.back === 'nirvana')){
				main.style.backgroundImage = 'url(images/nirvana.jpg)';
			}

			if ((dropZones[0].firstElementChild.dataset.back === 'frank-sinatra') && (dropZones[1].firstElementChild.dataset.back === 'frank-sinatra') && (dropZones[2].firstElementChild.dataset.back === 'frank-sinatra')){
				main.style.backgroundImage = 'url(images/frank-sinatra.jpg)';
			}
		});

	});
    
	function playController(){
		if(!isPlaying){
			audioToPlay.forEach(audio => {
				audio.play();
			});
		  	isPlaying = true;
		  	controller.classList.add('controller-active');
		  	dropZones.forEach(dropzone => dropzone.classList.add("dropzone-active"));
		  	playbtn.style.backgroundImage = "url(images/stop-btn.svg)";
		} else {
			isPlaying = false;
		  	audioToPlay.forEach(audio => {
				audio.pause();
				audio.currentTime = 0;
		  	});
		  	controller.classList.remove('controller-active');
		  	dropZones.forEach(dropzone => dropzone.classList.remove("dropzone-active"));
		  	// 2. Change image to 'play'
		  	playbtn.style.backgroundImage = "url(images/play-btn.svg)";
		}
	}

	resetBtn.addEventListener('click', function(){
		console.log("Reset was pressed");
		dropZones.forEach(zone => {
			if(zone.childNodes.length > 0){
				instrumentsContainer.appendChild(zone.firstElementChild);
				isPlaying = false;
		  		audioToPlay.forEach(audio => {
					audio.pause();
					audio.currentTime = 0;
				});
				audioToPlay = [];
				controller.classList.remove('controller-active');
				dropZones.forEach(dropzone => dropzone.classList.remove("dropzone-active"));
		  		// 2. Change image to 'play'
				playbtn.style.backgroundImage = "url(images/play-btn.svg)";
				main.style.backgroundImage = 'url(images/background.jpg)';
			} else {
				console.log("Node is empty");
			}
		})
	});

	questionBtn.addEventListener('click', function(){
		explainerBox.classList.add("explainer-box-active");
		questionBtn.style.display = 'none';
	});

	closeBtn.addEventListener('click', function(){
		explainerBox.classList.remove("explainer-box-active");
		questionBtn.style.display = 'block';
	});

	playbtn.addEventListener('click', playController);

})();
