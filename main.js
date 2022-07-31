// CHART START
//Definir constantes y SVG
const width = 1024
const height = 760
const margin = {    top: 10,
                    right: 10,
                    bottom: 40,
                    left: 70
                }

const svg = d3.select("#chart").append("svg").attr("id", "svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr('transform', `translate(${0}, ${margin.top})`) 

// Escala

let x = d3.scaleLinear().range([0, width - margin.left - margin.right])
let y = d3.scaleBand().range([0, height - margin.top - margin.bottom]).paddingInner(0.2).paddingOuter(0.05)

// Ejes

const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr('transform', `translate(${margin.left},${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr('transform', `translate(${margin.left},${margin.top})`)
const xAxis = d3.axisBottom().scale(x).ticks(5)
const yAxis = d3.axisLeft().scale(y)

// Leemos los Datos

d3.csv('data.csv').then(data => {
    data.map( d => d.titles = +d.titles)
    x.domain([0, d3.max(data.map(d => d.titles))])
    y.domain(data.map(d => d.country))
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)
    elementGroup.selectAll('.bar').data(data).call(barras)
    })

// Con esto creamos las barras

    function barras(group) {
        group.enter().append("rect")
        .attr('id', d => +d.titles)
        .attr('class', 'bar')
        .attr('height', y.bandwidth())
        .attr('width', d => x(d.titles))
        .attr('x', margin.left)
        .attr('y', d => y(d.country))
              }

        // CHART END

// slider:

function slider() {    
    var sliderTime = d3
        .sliderBottom()
        .min(d3.min(years))  // rango años
        .max(d3.max(years))
        .step(4)  // cada cuánto aumenta el slider
        .width(580)  // ancho de nuestro slider
        .ticks(years.length)  
        .default(years[years.length -1])  // punto inicio de la marca
        .on('onchange', val => {
            console.log("La función aún no está conectada con la gráfica")
            // conectar con la gráfica aquí
        });

        var gTime = d3
        .select('div#slider-time')  // div donde lo insertamos
        .append('svg')
        .attr('width', width * 0.8)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

        gTime.call(sliderTime);

        d3.select('p#value-time').text(sliderTime.value());
}