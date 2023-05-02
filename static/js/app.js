function init()
{
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then(function(data){
        let individualNames = data.names;
                
        for (i=0; i<individualNames.length; i++)
        {
            $('#selDataset').append($('<option>', {value: individualNames[i], text:individualNames[i]}));
        }
        let sample = data.samples;
        let metaData = data.metadata;
        let result = sample[0];
        let demographic_info = metaData[0];
        
        x = result.sample_values;
        y = result.otu_ids;
        y = y.map(name => 'OTU'+name);
        text = result.otu_labels;
        demographicData = metaData[i]
        id = demographic_info.id;
        ethnicity = demographic_info.ethnicity;
        gender = demographic_info.gender;
        age = demographic_info.age;
        demographic_location = demographic_info.location;
        bbtype = demographic_info.bbtype;
        wfreq = demographic_info.wfreq
        $('#table').append( '<tr><td>' + 'ID: ' +  id + '</td></tr>' );
        $('#table').append( '<tr><td>' + 'Ethnicity: ' +  ethnicity + '</td></tr>' );
        $('#table').append( '<tr><td>' + 'Gender: ' +  gender + '</td></tr>' );
        $('#table').append( '<tr><td>' + 'Age: ' +  age + '</td></tr>' );
        $('#table').append( '<tr><td>' + 'Location: ' +  demographic_location + '</td></tr>' );
        $('#table').append( '<tr><td>' + 'BBTYPE: ' +  bbtype + '</td></tr>' );
        $('#table').append( '<tr><td>' + 'WFREQ: ' +  wfreq + '</td></tr>' );
        
        traceBar = {
            x: x.slice(0,10).reverse(),
            y: y.slice(0,10).reverse(),
            text: text.slice(0,10),
            type: 'bar',
            orientation: 'h'
        }
         traceDataBar = [traceBar];
         Plotly.newPlot('bar', traceDataBar);
        
        traceBubble = {
            x: result.otu_ids,
            y: result.sample_values,
            mode: 'markers',
            marker: {
                color: result.otu_ids,
                size: result.sample_values,
            },
            text: text
         }
         traceDataBubble = [traceBubble];
         layoutBuble = {xaxis: {title:{text:'OTU IDS'}}};
         Plotly.newPlot('bubble', traceDataBubble, layoutBuble);

         traceGauge = {
            title: {text: 'Belly Button Washing Frequency'},
            type: 'indicator',
            value: wfreq,
            gauge: {
                axis: { range: [0, 9] }},
            steps: [
                {range: [0,3]}, {range: [3-6]}, {range:[6-9]}],
            mode: 'gauge+number',
         }
         traceDataGauge = [traceGauge];
         Plotly.newPlot('gauge', traceDataGauge);

        });
}
    
function optionChanged()
{
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then(function(data) {
        // console.log(data);
    let dropdown = d3.select('#selDataset');
    let dataset = dropdown.property('value');
    // console.log(dataset);
    let samples = data.samples;
    let metaData = data.metadata;
    let x = [];
    let y = [];
    let demographicData = [];

    for (var i = 0; i < samples.length; i++)
    {
        sample = samples[i];
        demographic_info = metaData[i];
        // console.log(result.id);
        if (dataset == sample.id)
        {
            x = sample.sample_values;
            y = sample.otu_ids;
            y = y.map(name => 'OTU'+name);
            text = sample.otu_labels;
            demographicData = metaData[i]
            id = demographic_info.id;
            ethnicity = demographic_info.ethnicity;
            gender = demographic_info.gender;
            age = demographic_info.age;
            demographic_location = demographic_info.location;
            bbtype = demographic_info.bbtype;
            wfreq = demographic_info.wfreq;
            xBuble = sample.otu_ids;
            yBuble = sample.sample_values
        }
    }
    document.getElementById('table').innerHTML = '';
    $('#table').append( '<tr><td>' + 'ID: ' +  id + '</td></tr>' );
    $('#table').append( '<tr><td>' + 'Ethnicity: ' +  ethnicity + '</td></tr>' );
    $('#table').append( '<tr><td>' + 'Gender: ' +  gender + '</td></tr>' );
    $('#table').append( '<tr><td>' + 'Age: ' +  age + '</td></tr>' );
    $('#table').append( '<tr><td>' + 'Location: ' +  demographic_location + '</td></tr>' );
    $('#table').append( '<tr><td>' + 'BBTYPE: ' +  bbtype + '</td></tr>' );
    $('#table').append( '<tr><td>' + 'WFREQ: ' +  wfreq + '</td></tr>' );
    
    traceBar = {
        x: x.slice(0,10).reverse(),
        y: y.slice(0,10).reverse(),
        text: text,
        type: 'bar',
        orientation: 'h'
    }
    traceDataBar = [traceBar];
    
    Plotly.newPlot('bar', traceDataBar);
   
    traceBubble = {
        x: xBuble,
        y: yBuble,
        mode: 'markers',
        marker: {
            color: xBuble,
            size: yBuble,
        },
        text: text
     }
     layoutBuble = {xaxis: {title:{text:'OTU IDS'}}};
     traceDataBubble = [traceBubble];

     Plotly.newPlot('bubble', traceDataBubble, layoutBuble);

     traceGauge = {
        title: {text: 'Belly Button Washing Frequency'},
        type: 'indicator',
        value: wfreq,
        gauge: {
            axis: { range: [0, 9] }},
        steps: [
            {range: [0,3]}, {range: [3-6]}, {range:[6-9]}],
        mode: 'gauge+number',
     }
     console.log(wfreq);
 
     traceDataGauge = [traceGauge];
     Plotly.newPlot('gauge', traceDataGauge);
            
});
}


init();
d3.selectAll("#selDataset").on("optionChanged(this.value)", optionChanged);