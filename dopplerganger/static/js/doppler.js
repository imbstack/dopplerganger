function run() {
    var width = 960;
    var height = 500;

    var svg = d3.select("#showbox").insert("svg", ":first-child")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(.55)")
      .append("g");

    svg.append("g").attr("class", "darts");

    var connection = new WebSocket('ws://' + window.location.host + '/dots');

    connection.onmessage = function(evt) {
        // TODO: This is all bad
        var data = [];
        data.push(JSON.parse(evt.data));
        var darts = svg.select(".darts").selectAll("circle").data(data);

        darts.enter().insert("circle")
            .attr("cx", function(p) {return p.x})
            .attr("cy", function(p) {return p.y})
            .attr("r", 2.5)
            .attr("fill-opacity", 1.0)
            .transition()
            .duration(400)
            .attr("r", 6)
            .attr("fill-opacity", 0.0)
            .remove();
    }
}
