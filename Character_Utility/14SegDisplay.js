
//document.addEventListener("load", init());
var ctx=null;
var ulw=0;
var ulh=0;
var vscale=1;
var hscale=1;
var cheight=0;
var cwidth=0;

var highValueColor='rgb(255, 0, 0)';
var lowValueColor='rgb(128, 0, 0)';
var clearFillColor='rgb(255, 255, 255)';
var clearOutlineColor='rgb(0, 0, 0)';

var currentState = [ false, false, false, false, false, false, false, false, false, false, false, false, false, false ];

//The Active channel is marked as 0 since it sinks
var segmentTruth= [
    0001100000111100,
    0010100000111100,
    0011100000110100,
    0011100000111000,
    0011100000011100,
    0011000000111100,
    0011100000101100,
    0001100000111100,
    0010100000111100,
    0011100000110100,
    0011100000111000,
    0011100000011100,
    0011000000111100,
    0011100000101100
    ];

function init() {
	if(!ctx) { getContext(); }
	ctx.save();
	//ctx.transform(2.000000, 0.000000, 0.000000, 2.000000, -50.509900, -350.933000);
	calculateScaling();
	scaleSector();
	drawAll();
	console.log("initted");
}

function calculateScaling() {
	var canvasEle = document.getElementById("CharacterDisplayCanvas");
	cheight=canvasEle.height;
	cwidth=canvasEle.width;
	var wPaddingPct=0.05; //260
	var hPaddingPct=0.05; //349
	ulw=0-((cwidth)*(1.01-wPaddingPct)); //0-(cwidth*1.2)
	ulh=0-((cheight)*(1.8-hPaddingPct)); //0-(cheight*1.2)
	console.log("Setting Transform X:"+ulw+" Y:"+ulh);
	vscale = (cheight/349)*3.7;
	hscale = (cwidth/260)*3.7;
	console.log("Setting Scale Factor Horizontal:"+hscale+" Vertical:"+vscale);
	
}

function changeState(elementNum, state){
	currentState[elementNum] = state;
	drawAll(); //refresh the canvas
	generateOutput();
}

function getContext(){
	ctx = document.getElementById("CharacterDisplayCanvas").getContext("2d"); 
}

function scaleSector() {
	//ctx.transform(2.000000, 0.000000, 0.000000, 2.000000, -50.509900, -350.933000);
	ctx.save();
	ctx.setTransform(hscale, 0.000000, 0.000000, vscale, ulw, ulh );
	
}

function stopScale(){
	ctx.restore();
}

function clearDrawing() {
	if(!ctx) { getContext(); }
	
	ctx.clearRect(0, 0, cwidth, cheight);
}

function drawAll() {
	scaleSector();
	clearDrawing();
	drawSegmentA(currentState[0]);
	drawSegmentB(currentState[1]);
	drawSegmentC(currentState[2]);
	drawSegmentD(currentState[3]);
	drawSegmentE(currentState[4]);
	drawSegmentF(currentState[5]);
	drawSegmentG1(currentState[6]);
	drawSegmentG2(currentState[7]);
	drawSegmentH(currentState[8]);
	drawSegmentJ(currentState[9]);
	drawSegmentK(currentState[10]);
	drawSegmentL(currentState[11]);
	drawSegmentM(currentState[12]);
	drawSegmentN(currentState[13]);
	stopScale();
	}

function dec2bin(dec) {
	return (dec >>> 0).toString(2);
	//return Integer.toBinaryString( (1 << 16) | bin ).substring( 1 )
}


function generateOutput(){
	var highbits=0011100000111100; // probably need to start with identity values rather than 0...
	var lowbits=0011100000111100;
	//high order bit generation
	for(var h=0; h<7; h++){
		if (currentState[h]) {
			highbits = highbits&segmentTruth[h];
			}
		}
	//low order bit generation
	for(var l=7; l<14; l++){
		if (currentState[l]) {
			lowbits = lowbits&segmentTruth[l];
				}
		}
	let outBox = document.getElementById("output");
	outBox.innerHTML = dec2bin(highbits&0xFFFF) +"|"+ dec2bin(lowbits&0xFFFF);
}

//===================Segment drawing routines

function drawSegmentF(chk) {
	if(!ctx) { getContext(); }

	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(86.897209, 180.262270);
	seg.lineTo(85.398765, 181.191680);
	seg.lineTo(79.834748, 211.091290);
	seg.lineTo(82.408304, 214.275570);
	seg.lineTo(86.777584, 210.921920);
	seg.lineTo(91.205253, 185.397060);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	

}

function drawSegmentA(chk){
	if(!ctx) { getContext(); }
	console.log("Drawing Segment A");
	//ctx.beginPath();

	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(88.927348, 178.149000);
	seg.lineTo(93.132024, 183.745310);
	seg.lineTo(124.132090, 183.559710);
	seg.lineTo(130.146460, 178.554710);
	seg.lineTo(129.028990, 177.194950);
	seg.lineTo(90.590461, 177.067330);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentB(chk) {
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(120.800820, 211.052560);
	seg.lineTo(123.651780, 214.270830);
	seg.lineTo(127.931840, 210.813250);
	seg.lineTo(133.083580, 181.729580);
	seg.lineTo(131.868420, 180.279730);
	seg.lineTo(125.607700, 185.444360);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentC(chk) {
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(119.249160, 220.829010);
	seg.lineTo(114.437050, 246.746560);
	seg.lineTo(118.802580, 251.868190);
	seg.lineTo(120.727280, 250.714910);
	seg.lineTo(125.779950, 220.977490);
	seg.lineTo(123.464070, 217.574410);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentD(chk) {
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(75.316356, 253.601410);
	seg.lineTo(76.578909, 254.675520);
	seg.lineTo(115.588480, 254.822720);
	seg.lineTo(117.201490, 253.531730);
	seg.lineTo(112.360630, 247.985180);
	seg.lineTo(81.958822, 248.041080);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentE(chk) {
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(72.553591, 250.285240);
	seg.lineTo(73.920211, 251.606160);
	seg.lineTo(80.121737, 246.627730);
	seg.lineTo(84.885643, 221.035590);
	seg.lineTo(82.182768, 217.616910);
	seg.lineTo(78.026060, 221.018830);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentG1(chk) {
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(84.124750, 216.138260);
	seg.lineTo(86.853629, 219.093370);
	seg.lineTo(98.750519, 219.108170);
	seg.lineTo(101.009730, 216.071630);
	seg.lineTo(99.810258, 212.679360);
	seg.lineTo(88.456537, 212.547270);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentG2(chk) {
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(104.559160, 215.747380);
	seg.lineTo(107.192540, 212.552260);
	seg.lineTo(119.161860, 212.525460);
	seg.lineTo(121.352270, 215.702740);
	seg.lineTo(117.699730, 218.825380);
	seg.lineTo(105.797730, 218.945080);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentH(chk){
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(95.644345, 209.353460);
	seg.lineTo(98.090125, 209.234440);
	seg.lineTo(99.661281, 201.958330);
	seg.lineTo(93.531391, 187.620860);
	seg.lineTo(91.316627, 199.254620);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentJ(chk){
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(100.948430, 208.148100);
	seg.lineTo(103.005630, 213.660830);
	seg.lineTo(108.090120, 207.499250);
	seg.lineTo(111.863010, 186.290000);
	seg.lineTo(104.918050, 186.030910);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentK(chk) {
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(110.050240, 209.203330);
	seg.lineTo(112.602150, 209.411760);
	seg.lineTo(120.982830, 198.304370);
	seg.lineTo(123.114620, 187.110870);
	seg.lineTo(120.993110, 186.965440);
	seg.lineTo(111.738750, 199.560780);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentL(chk) {
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(107.820080, 222.220510);
	seg.lineTo(110.188260, 222.368700);
	seg.lineTo(114.399320, 232.342020);
	seg.lineTo(112.567800, 243.783580);
	seg.lineTo(106.097240, 230.013190);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentM(chk) {
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(94.161909, 245.548620);
	seg.lineTo(100.710670, 245.427210);
	seg.lineTo(105.042070, 224.136080);
	seg.lineTo(102.838290, 218.053600);
	seg.lineTo(97.853338, 224.531860);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}

function drawSegmentN(chk) {
	let seg = new Path2D();
	ctx.lineWidth = 0.070004;
	seg.moveTo(82.806705, 244.728830);
	seg.lineTo(84.678940, 244.865880);
	seg.lineTo(94.114853, 232.447430);
	seg.lineTo(96.165522, 222.487980);
	seg.lineTo(93.332713, 222.446280);
	seg.lineTo(84.714009, 233.636110);
	seg.closePath();
	
	if(chk){
		ctx.fillStyle = highValueColor;
		ctx.strokeStyle = highValueColor;
		}
	else {	
		ctx.fillStyle = clearFillColor;
		ctx.strokeStyle = clearOutlineColor;
		}	
	
	ctx.fill(seg, "evenodd");
	ctx.stroke(seg);	
}