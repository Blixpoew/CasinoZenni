const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
var value1= document.getElementById('value1').value;
var value2= document.getElementById('value2').value;
var value3= document.getElementById('value3').value;
var value4= document.getElementById('value4').value;
var value5= document.getElementById('value5').value;
var value6= document.getElementById('value6').value;
//Object that stores values of minimum and maximum angle for a value

function fxConfetti(){
	confetti({
		particleCount: 100,
		spread: 70,
		origin: {y: 0.6}
	})
}
function getValues(){
	var value1= document.getElementById('value1').value;
	var value2= document.getElementById('value2').value;
	var value3= document.getElementById('value3').value;
	var value4= document.getElementById('value4').value;
	var value5= document.getElementById('value5').value;
	var value6= document.getElementById('value6').value;
	
	finalValue.innerHTML = `<p>🤑Veamos quién gana🤑</p>`;
	
	var x = document.getElementById("containerSpin");
	 x.style.display = "block";
	
	var rotationValues = [
  { minDegree: 0, maxDegree: 30, value: value2 },
  { minDegree: 31, maxDegree: 90, value: value1 },
  { minDegree: 91, maxDegree: 150, value: value6 },
  { minDegree: 151, maxDegree: 210, value: value5 },
  { minDegree: 211, maxDegree: 270, value: value4 },
  { minDegree: 271, maxDegree: 330, value: value3 },
  { minDegree: 331, maxDegree: 360, value: value2 },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "rgba(77,68,218,1)",
  "rgba(55,112,229,1)",
  "rgba(77,68,218,1)",
  "rgba(55,112,229,1",
  "rgba(77,68,218,1)",
  "rgba(55,112,229,1",
];
//Create chart
var myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [value1, value2, value3, value4, value5, value6],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 20 },
      },
    },
  },
});
//display value based on the randomAngle
var valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>🙀 Ganador: ${i.value} 🤑</p>`;
      spinBtn.disabled = false;
	fxConfetti();
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>🤞 Buena suerte! 🍀</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
};