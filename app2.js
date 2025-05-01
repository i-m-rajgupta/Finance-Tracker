let isClicked;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
console.log(transactions);

function generateColor(){
    let color = [];
    for(let i=0; i<transactions.length ; i++){
       let num1 = Math.floor(Math.random()*256);
       let num2 = Math.floor(Math.random()*256);
       let num3 = Math.floor(Math.random()*256);
    //    let alpha = Math.random().toFixed(1);
       color[i] = `rgba(${num1},${num2},${num3},1)`;
    }
    return color;
}
// set chart
let chartType = ["line","pie","doughnut","bar"]; 
function updateChart(){
    let chartLabels = transactions.map(el=>el.descriptValue);
    let chartData = transactions.map(el=>el.amtValue); 
    let color = generateColor();
   for(let chart of chartType){
    console.log(chart);
    let graph = document.querySelector(`#${chart}`);
    console.log(graph);
    const ctx = graph.getContext('2d');
    console.log(ctx);
    const myChart = new Chart(ctx,{
        type : chart,
        data : {
            labels : chartLabels,
            datasets: [{
                label: 'Finance Description',
                data: chartData,
                backgroundColor: color,
                borderWidth: 1
              }]
            },
            options: {
                plugins: {
                  legend: {
                    labels: {
                      color: 'rgba(148, 0, 211, 1)',
                      font: {
                        size: 20,
                        family: 'Arial'
                      }
                    }
                  },
                  title: {
                    display: true,
                    text: `${chart.toUpperCase()} GRAPH`,
                    color: 'rgba(30, 130, 250, 1)',
                    font: {
                      size: 25,
                      family: 'Georgia',
                      weight: 'bold'
                    }
                  }
                }
              }
              
        }
    );
   }
}
updateChart();