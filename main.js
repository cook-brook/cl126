song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftwrist=0;

function preload() { 
    song = loadSound("music.mp3");
 } 

function setup(){
    canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('results',gotPoses);
}
function modelLoaded(){
    console.log('poseNet is initialized');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist=results[0].pose.kepoints[9].leftWrist.score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY"+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+ightWristY);
    }

}

function draw(){
    image(video,0,0,600,500);
    fill("#0000FF");
    stroke("#0000FF");
    if(scoreleftwrist>0.2){
        circle(leftWristX,leftWristY,20);
        inNumberleftwristY= Number(leftWristY);
        remove_desimals= floor(inNumberleftwristY);
        leftwrist_divide= remove_desimals/500;
        volume=leftwrist_divide*2;
        document.getElementById("volume").innerHTML="volume="+volume;
    }  
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}