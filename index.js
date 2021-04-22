const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select Media stream, pass to video Element, then play
async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    }
    catch(error){
        console.log('Oops, error here:', error);
    }
}

button.addEventListener('click', async () => {
    //disable button
    button.disabled = true;
    // start picture-in-picture
    await videoElement.requestPictureInPicture();
    // Reset Button
    button.disable = false;
});

// onLoad
selectMediaStream();