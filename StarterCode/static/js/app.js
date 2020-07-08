function init() {
    var dropdownID = d3.select("#selDataset")
    d3.json("samples.json").then((data)=>{
        var names = data.names;

        names.forEach((samples)=>{
            dropdownID.append("option")
            .text(samples)
            .property("value",samples);
            console.log(samples);

        });
var firstsample = names[0];
demographic(firstsample);
createChart(firstsample);
    });
}
init()

function demographic(samples) {
    d3.json("samples.json").then((data)=>{
        var metadata = data.metadata;
        var array = metadata.filter(object=>object.id==samples);
        var result = array[0];
        var display = d3.select("#sample-metadata");
        display.html("");
        Object.entries(result).forEach(([key, value]) => {
            display.append("h6").text(`${key.toUpperCase()}: ${value}`);

});
    });
}
function optionChanged(samples) {
    demographic(samples);
    createChart(samples);
}

function createChart(ID) {
    d3.json("samples.json").then((data)=>{
        var samples = data.samples;
        var array = samples.filter(object=>object.id==ID);
        var result = array[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        var bubbledata = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth",
            } 
        }];
        Plotly.newPlot("bubble",bubbledata);
        var bardata = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
            
        }];
        Plotly.newPlot("bar",bardata);
});
}