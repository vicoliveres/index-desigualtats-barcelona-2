const padding = 2;

const margin = { top: 10, right: 5, bottom: 10, left: 5 };
const width = d3.select('.chart').node().getBoundingClientRect().width;
const height = d3.select('.chart').node().getBoundingClientRect().width;

const tooltip = d3.select("body").append("div")
    .style("opacity", 0);

    //Chart
      var chart = function(d3) {

        //Load in data
        d3.csv("index-desigualtats.csv", function(data) {

          // Format the data
         data.forEach(function(d) {
           d.NomDistricte = d.NomDistricte;
           d.NomBarri = d.NomBarri;
           d.AbreviacioBarri = d.AbreviacioBarri;
           d.IndexAtur = +d.IndexAtur;
           d.IndexEstrangers = +d.IndexEstrangers;
           d.IndexRenda = +d.IndexRenda;
           d.IndexSenseEstudis = +d.IndexSenseEstudis;
           d.PtgAturats = d.PtgAturats;
           d.PtgEstrangers = d.PtgEstrangers;
           d.Renda = d.Renda;
           d.PtgSenseEstudis = d.PtgSenseEstudis;
           d.OrdreBarris = +d.OrdreBarris;
         });

         var sqrtScaleAtur = d3.scaleLinear()
                 .domain([ d3.min(data, function(d) { return d.IndexAtur;}),
                           d3.max(data, function(d) { return d.IndexAtur;})
                         ])
                 .range([8, 20]);

         var sqrtScaleEstrangers = d3.scaleLinear()
                 .domain([ 3,
                           d3.max(data, function(d) { return d.IndexEstrangers;})
                         ])
                 .range([8, 20]);

         var sqrtScaleRenda = d3.scaleLinear()
                 .domain([ d3.min(data, function(d) { return d.IndexRenda;}),
                           d3.max(data, function(d) { return d.IndexRenda;})
                         ])
                 .range([8, 20]);

         var sqrtScaleSenseEstudis = d3.scaleLinear()
                  .domain([ d3.min(data, function(d) { return d.IndexSenseEstudis;}),
                            250
                          ])
                  .range([8, 20]);

                  grid = d3.select(".chart")
                      .attr('width', width + margin.left + margin.right)
                      .attr('height', height + margin.top + margin.bottom)

                  rects = grid.selectAll("rect")
                      .data(data)
                      .enter()
                      .append("svg")
                      .attr("class", "block")
                      .style("width", 83 + "px")
                      .style("height", 110 + "px")
                      .style("background", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#525252";
                                                        } else {
                                                          return "white";}
                                                        })

                  rects.append('text')
                      .text(function (d) { return d.AbreviacioBarri } )
                      .attr("y", 88)
                      .attr("x", 41.5)
                      .attr("class", "labels")
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "white";
                                                        } else {
                                                          return "black";}
                                                        })

                  rects.append('text')
                      .text(function (d) { return d.NomDistricte } )
                      .attr("y", 103)
                      .attr("x", 41.5)
                      .attr("class", "labels2")
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "white";
                                                        } else {
                                                          return "#737373";}
                                                        })

                  flor =  rects.append("g")

                  flor.append("circle")
                  .attr("class", "circleAtur")
                  .attr("class", "circle")
                  .attr("cx", 26)
                  .attr("cy", 26)
                  .attr("r", function(d) { return sqrtScaleAtur(+d.IndexAtur) } )
                  .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                      return "#22ca98";
                                                    } else {
                                                      return "#1b9e77";}
                                                    })


                  flor.append("circle")
                  .attr("class", "circleEstrangers")
                  .attr("class", "circle")
                  .attr("cx", 57)
                  .attr("cy", 26)
                  .attr("r", function(d) { return sqrtScaleRenda(+d.IndexRenda) } )
                  .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                      return "#fd7711";
                                                    } else {
                                                      return "#d95f02";}
                                                    })

                  flor.append("circle")
                  .attr("class", "circleSenseEstudis")
                  .attr("class", "circle")
                  .attr("cx", 26)
                  .attr("cy", 57)
                  .attr("r", function(d) { return sqrtScaleSenseEstudis(+d.IndexSenseEstudis) } )
                  .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                      return "#9591c5";
                                                    } else {
                                                      return "#7570b3";}
                                                    })

                  flor.append("circle")
                  .attr("class", "circleEstrangers")
                  .attr("class", "circle")
                  .attr("cx", 57)
                  .attr("cy", 57)
                  .attr("r", function(d) { return sqrtScaleEstrangers(+d.IndexEstrangers) } )
                  .style("fill", "#e7298a")
                  .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                      return "#ec57a3";
                                                    } else {
                                                      return "#e7298a";}
                                                    })

                  flor.append("circle")
                  .attr("class", "circleMiddle")
                  .attr("class", "circle")
                  .attr("cx", 41.5)
                  .attr("cy", 41.5)
                  .attr("r", 15)
                  .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                      return "#525252";
                                                    } else {
                                                      return "white";}
                                                    })
                  .on("mousemove", function(d) {
                    d3.select(this)
                      .style("fill", "#bdbdbd");
                    tooltip.transition()
                      .duration(100)
                      .style("opacity", .9)
                      .attr("class", "tooltip")
                      .style("left", (d3.event.pageX - 45) + "px")
                      .style("top", (d3.event.pageY + 10) + "px");
                    tooltip.html("<b>" + d.NomBarri + "</b> (" + d.NomDistricte + ") </br> Atur: " + d.PtgAturats + "% </br> Índex de renda: "
                    + d.Renda + "</br> Sense estudis: " + d.PtgSenseEstudis + "% </br> Estrangers no europeus: " + d.PtgEstrangers + "%");
                    })
                  .on("mouseout", function(d) {
                    d3.select(this)
                    .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                        return "#525252";
                                                      } else {
                                                        return "white";}
                                                      });
                    tooltip.transition()
                      .duration(200)
                      .style("opacity", 0);
                    });

            //Sorting Atur
                d3.select("#sortAtur")
                  .on("click", function() {

                    // Select all of the grouped/nested elements and update the data
                    d3.selectAll("svg")
                        .data(data)
                        .remove()

                    d3.selectAll("g")
                        .data(data)
                        .remove()

                    d3.selectAll("text")
                        .data(data)
                        .remove()

                    d3.select(".frase")
                    .append('text')
                    .text("De major a menor percentatge d'atur.")
                    .attr("class", "frase")

                    data.sort(function(a, b) {
                          return d3.descending(a.IndexAtur, b.IndexAtur);  //DEscending
                      })

                      grid = d3.select(".chart")
                          .attr('width', width + margin.left + margin.right)
                          .attr('height', height + margin.top + margin.bottom)

                      rects = grid.selectAll("rect")
                          .data(data)
                          .enter()
                          .append("svg")
                          .attr("class", "block")
                          .style("width", 83 + "px")
                          .style("height", 110 + "px")
                          .style("background", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "#525252";
                                                            } else {
                                                              return "white";}
                                                            })

                      rects.append('text')
                          .text(function (d) { return d.AbreviacioBarri } )
                          .attr("y", 88)
                          .attr("x", 41.5)
                          .attr("class", "labels")
                          .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "white";
                                                            } else {
                                                              return "black";}
                                                            })

                      rects.append('text')
                          .text(function (d) { return d.NomDistricte } )
                          .attr("y", 103)
                          .attr("x", 41.5)
                          .attr("class", "labels2")
                          .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "white";
                                                            } else {
                                                              return "#737373";}
                                                            })

                      flor =  rects.append("g")

                      flor.append("circle")
                      .attr("class", "circleAtur")
                      .attr("class", "circle")
                      .attr("cx", 26)
                      .attr("cy", 26)
                      .attr("r", function(d) { return sqrtScaleAtur(+d.IndexAtur) } )
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#22ca98";
                                                        } else {
                                                          return "#1b9e77";}
                                                        })


                      flor.append("circle")
                      .attr("class", "circleEstrangers")
                      .attr("class", "circle")
                      .attr("cx", 57)
                      .attr("cy", 26)
                      .attr("r", function(d) { return sqrtScaleRenda(+d.IndexRenda) } )
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#fd7711";
                                                        } else {
                                                          return "#d95f02";}
                                                        })

                      flor.append("circle")
                      .attr("class", "circleSenseEstudis")
                      .attr("class", "circle")
                      .attr("cx", 26)
                      .attr("cy", 57)
                      .attr("r", function(d) { return sqrtScaleSenseEstudis(+d.IndexSenseEstudis) } )
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#9591c5";
                                                        } else {
                                                          return "#7570b3";}
                                                        })

                      flor.append("circle")
                      .attr("class", "circleEstrangers")
                      .attr("class", "circle")
                      .attr("cx", 57)
                      .attr("cy", 57)
                      .attr("r", function(d) { return sqrtScaleEstrangers(+d.IndexEstrangers) } )
                      .style("fill", "#e7298a")
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#ec57a3";
                                                        } else {
                                                          return "#e7298a";}
                                                        })

                      flor.append("circle")
                      .attr("class", "circleMiddle")
                      .attr("class", "circle")
                      .attr("cx", 41.5)
                      .attr("cy", 41.5)
                      .attr("r", 15)
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#525252";
                                                        } else {
                                                          return "white";}
                                                        })
                      .on("mousemove", function(d) {
                        d3.select(this)
                          .style("fill", "#bdbdbd");
                        tooltip.transition()
                          .duration(100)
                          .style("opacity", .9)
                          .attr("class", "tooltip")
                          .style("left", (d3.event.pageX - 45) + "px")
                          .style("top", (d3.event.pageY + 10) + "px");
                        tooltip.html("<b>" + d.NomBarri + "</b> (" + d.NomDistricte + ") </br> Atur: " + d.PtgAturats + "% </br> Índex de renda: "
                        + d.Renda + "</br> Sense estudis: " + d.PtgSenseEstudis + "% </br> Estrangers no europeus: " + d.PtgEstrangers + "%");
                        })
                      .on("mouseout", function(d) {
                        d3.select(this)
                        .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                            return "#525252";
                                                          } else {
                                                            return "white";}
                                                          });
                        tooltip.transition()
                          .duration(200)
                          .style("opacity", 0);
                        });
                  });

                //Sorting Renda
                d3.select("#sortRenda")  //DEscending
                  .on("click", function() {

                    // Select all of the grouped/nested elements and update the data
                    d3.selectAll("svg")
                        .data(data)
                        .remove()

                    d3.selectAll("g")
                        .data(data)
                        .remove()

                    d3.selectAll("text")
                        .data(data)
                        .remove()

                    d3.select(".frase")
                        .append('text')
                        .text("De menor a major índex de renda.")
                        .attr("class", "frase")

                    data.sort(function(a, b) {
                          return d3.descending(b.IndexRenda, a.IndexRenda);  //DEscending
                      })

                      grid = d3.select(".chart")
                          .attr('width', width + margin.left + margin.right)
                          .attr('height', height + margin.top + margin.bottom)

                      rects = grid.selectAll("rect")
                          .data(data)
                          .enter()
                          .append("svg")
                          .attr("class", "block")
                          .style("width", 83 + "px")
                          .style("height", 110 + "px")
                          .style("background", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "#525252";
                                                            } else {
                                                              return "white";}
                                                            })

                      rects.append('text')
                          .text(function (d) { return d.AbreviacioBarri } )
                          .attr("y", 88)
                          .attr("x", 41.5)
                          .attr("class", "labels")
                          .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "white";
                                                            } else {
                                                              return "black";}
                                                            })

                      rects.append('text')
                          .text(function (d) { return d.NomDistricte } )
                          .attr("y", 103)
                          .attr("x", 41.5)
                          .attr("class", "labels2")
                          .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "white";
                                                            } else {
                                                              return "#737373";}
                                                            })

                      flor =  rects.append("g")

                      flor.append("circle")
                      .attr("class", "circleAtur")
                      .attr("class", "circle")
                      .attr("cx", 26)
                      .attr("cy", 26)
                      .attr("r", function(d) { return sqrtScaleAtur(+d.IndexAtur) } )
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#22ca98";
                                                        } else {
                                                          return "#1b9e77";}
                                                        })


                      flor.append("circle")
                      .attr("class", "circleEstrangers")
                      .attr("class", "circle")
                      .attr("cx", 57)
                      .attr("cy", 26)
                      .attr("r", function(d) { return sqrtScaleRenda(+d.IndexRenda) } )
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#fd7711";
                                                        } else {
                                                          return "#d95f02";}
                                                        })

                      flor.append("circle")
                      .attr("class", "circleSenseEstudis")
                      .attr("class", "circle")
                      .attr("cx", 26)
                      .attr("cy", 57)
                      .attr("r", function(d) { return sqrtScaleSenseEstudis(+d.IndexSenseEstudis) } )
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#9591c5";
                                                        } else {
                                                          return "#7570b3";}
                                                        })

                      flor.append("circle")
                      .attr("class", "circleEstrangers")
                      .attr("class", "circle")
                      .attr("cx", 57)
                      .attr("cy", 57)
                      .attr("r", function(d) { return sqrtScaleEstrangers(+d.IndexEstrangers) } )
                      .style("fill", "#e7298a")
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#ec57a3";
                                                        } else {
                                                          return "#e7298a";}
                                                        })

                      flor.append("circle")
                      .attr("class", "circleMiddle")
                      .attr("class", "circle")
                      .attr("cx", 41.5)
                      .attr("cy", 41.5)
                      .attr("r", 15)
                      .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                          return "#525252";
                                                        } else {
                                                          return "white";}
                                                        })
                      .on("mousemove", function(d) {
                        d3.select(this)
                          .style("fill", "#bdbdbd");
                        tooltip.transition()
                          .duration(100)
                          .style("opacity", .9)
                          .attr("class", "tooltip")
                          .style("left", (d3.event.pageX - 45) + "px")
                          .style("top", (d3.event.pageY + 10) + "px");
                        tooltip.html("<b>" + d.NomBarri + "</b> (" + d.NomDistricte + ") </br> Atur: " + d.PtgAturats + "% </br> Índex de renda: "
                        + d.Renda + "</br> Sense estudis: " + d.PtgSenseEstudis + "% </br> Estrangers no europeus: " + d.PtgEstrangers + "%");
                        })
                      .on("mouseout", function(d) {
                        d3.select(this)
                        .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                            return "#525252";
                                                          } else {
                                                            return "white";}
                                                          });
                        tooltip.transition()
                          .duration(200)
                          .style("opacity", 0);
                        });

                    });

                    //Sorting Sense Estudis
                    d3.select("#sortSenseEstudis")  //DEscending
                      .on("click", function() {

                        // Select all of the grouped/nested elements and update the data
                        d3.selectAll("svg")
                            .data(data)
                            .remove()

                        d3.selectAll("g")
                            .data(data)
                            .remove()

                        d3.selectAll("text")
                            .data(data)
                            .remove()

                        d3.select(".frase")
                            .append('text')
                            .text("De major a menor percentatge de població sense estudis.")
                            .attr("class", "frase")

                        data.sort(function(a, b) {
                              return d3.descending(a.IndexSenseEstudis, b.IndexSenseEstudis);  //DEscending
                          })

                          grid = d3.select(".chart")
                              .attr('width', width + margin.left + margin.right)
                              .attr('height', height + margin.top + margin.bottom)

                          rects = grid.selectAll("rect")
                              .data(data)
                              .enter()
                              .append("svg")
                              .attr("class", "block")
                              .style("width", 83 + "px")
                              .style("height", 110 + "px")
                              .style("background", function(d) { if (d.NomBarri == "Barcelona") {
                                                                  return "#525252";
                                                                } else {
                                                                  return "white";}
                                                                })

                          rects.append('text')
                              .text(function (d) { return d.AbreviacioBarri } )
                              .attr("y", 88)
                              .attr("x", 41.5)
                              .attr("class", "labels")
                              .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                  return "white";
                                                                } else {
                                                                  return "black";}
                                                                })

                          rects.append('text')
                              .text(function (d) { return d.NomDistricte } )
                              .attr("y", 103)
                              .attr("x", 41.5)
                              .attr("class", "labels2")
                              .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                  return "white";
                                                                } else {
                                                                  return "#737373";}
                                                                })

                          flor =  rects.append("g")

                          flor.append("circle")
                          .attr("class", "circleAtur")
                          .attr("class", "circle")
                          .attr("cx", 26)
                          .attr("cy", 26)
                          .attr("r", function(d) { return sqrtScaleAtur(+d.IndexAtur) } )
                          .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "#22ca98";
                                                            } else {
                                                              return "#1b9e77";}
                                                            })


                          flor.append("circle")
                          .attr("class", "circleEstrangers")
                          .attr("class", "circle")
                          .attr("cx", 57)
                          .attr("cy", 26)
                          .attr("r", function(d) { return sqrtScaleRenda(+d.IndexRenda) } )
                          .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "#fd7711";
                                                            } else {
                                                              return "#d95f02";}
                                                            })

                          flor.append("circle")
                          .attr("class", "circleSenseEstudis")
                          .attr("class", "circle")
                          .attr("cx", 26)
                          .attr("cy", 57)
                          .attr("r", function(d) { return sqrtScaleSenseEstudis(+d.IndexSenseEstudis) } )
                          .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "#9591c5";
                                                            } else {
                                                              return "#7570b3";}
                                                            })

                          flor.append("circle")
                          .attr("class", "circleEstrangers")
                          .attr("class", "circle")
                          .attr("cx", 57)
                          .attr("cy", 57)
                          .attr("r", function(d) { return sqrtScaleEstrangers(+d.IndexEstrangers) } )
                          .style("fill", "#e7298a")
                          .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "#ec57a3";
                                                            } else {
                                                              return "#e7298a";}
                                                            })

                          flor.append("circle")
                          .attr("class", "circleMiddle")
                          .attr("class", "circle")
                          .attr("cx", 41.5)
                          .attr("cy", 41.5)
                          .attr("r", 15)
                          .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                              return "#525252";
                                                            } else {
                                                              return "white";}
                                                            })
                          .on("mousemove", function(d) {
                            d3.select(this)
                              .style("fill", "#bdbdbd");
                            tooltip.transition()
                              .duration(100)
                              .style("opacity", .9)
                              .attr("class", "tooltip")
                              .style("left", (d3.event.pageX - 45) + "px")
                              .style("top", (d3.event.pageY + 10) + "px");
                            tooltip.html("<b>" + d.NomBarri + "</b> (" + d.NomDistricte + ") </br> Atur: " + d.PtgAturats + "% </br> Índex de renda: "
                            + d.Renda + "</br> Sense estudis: " + d.PtgSenseEstudis + "% </br> Estrangers no europeus: " + d.PtgEstrangers + "%");
                            })
                          .on("mouseout", function(d) {
                            d3.select(this)
                            .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                return "#525252";
                                                              } else {
                                                                return "white";}
                                                              });
                            tooltip.transition()
                              .duration(200)
                              .style("opacity", 0);
                            });

                        });

                        //Sorting Estrangers
                        d3.select("#sortEstrangers")  //DEscending
                          .on("click", function() {

                            // Select all of the grouped/nested elements and update the data
                            d3.selectAll("svg")
                                .data(data)
                                .remove()

                            d3.selectAll("g")
                                .data(data)
                                .remove()

                            d3.selectAll("text")
                                .data(data)
                                .remove()

                            d3.select(".frase")
                                .append('text')
                                .text("De major a menor percentatge de població estrangera no europea.")
                                .attr("class", "frase")

                            data.sort(function(a, b) {
                                  return d3.descending(a.IndexEstrangers, b.IndexEstrangers);  //DEscending
                              })

                              grid = d3.select(".chart")
                                  .attr('width', width + margin.left + margin.right)
                                  .attr('height', height + margin.top + margin.bottom)

                              rects = grid.selectAll("rect")
                                  .data(data)
                                  .enter()
                                  .append("svg")
                                  .attr("class", "block")
                                  .style("width", 83 + "px")
                                  .style("height", 110 + "px")
                                  .style("background", function(d) { if (d.NomBarri == "Barcelona") {
                                                                      return "#525252";
                                                                    } else {
                                                                      return "white";}
                                                                    })

                              rects.append('text')
                                  .text(function (d) { return d.AbreviacioBarri } )
                                  .attr("y", 88)
                                  .attr("x", 41.5)
                                  .attr("class", "labels")
                                  .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                      return "white";
                                                                    } else {
                                                                      return "black";}
                                                                    })

                              rects.append('text')
                                  .text(function (d) { return d.NomDistricte } )
                                  .attr("y", 103)
                                  .attr("x", 41.5)
                                  .attr("class", "labels2")
                                  .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                      return "white";
                                                                    } else {
                                                                      return "#737373";}
                                                                    })

                              flor =  rects.append("g")

                              flor.append("circle")
                              .attr("class", "circleAtur")
                              .attr("class", "circle")
                              .attr("cx", 26)
                              .attr("cy", 26)
                              .attr("r", function(d) { return sqrtScaleAtur(+d.IndexAtur) } )
                              .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                  return "#22ca98";
                                                                } else {
                                                                  return "#1b9e77";}
                                                                })


                              flor.append("circle")
                              .attr("class", "circleEstrangers")
                              .attr("class", "circle")
                              .attr("cx", 57)
                              .attr("cy", 26)
                              .attr("r", function(d) { return sqrtScaleRenda(+d.IndexRenda) } )
                              .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                  return "#fd7711";
                                                                } else {
                                                                  return "#d95f02";}
                                                                })

                              flor.append("circle")
                              .attr("class", "circleSenseEstudis")
                              .attr("class", "circle")
                              .attr("cx", 26)
                              .attr("cy", 57)
                              .attr("r", function(d) { return sqrtScaleSenseEstudis(+d.IndexSenseEstudis) } )
                              .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                  return "#9591c5";
                                                                } else {
                                                                  return "#7570b3";}
                                                                })

                              flor.append("circle")
                              .attr("class", "circleEstrangers")
                              .attr("class", "circle")
                              .attr("cx", 57)
                              .attr("cy", 57)
                              .attr("r", function(d) { return sqrtScaleEstrangers(+d.IndexEstrangers) } )
                              .style("fill", "#e7298a")
                              .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                  return "#ec57a3";
                                                                } else {
                                                                  return "#e7298a";}
                                                                })

                              flor.append("circle")
                              .attr("class", "circleMiddle")
                              .attr("class", "circle")
                              .attr("cx", 41.5)
                              .attr("cy", 41.5)
                              .attr("r", 15)
                              .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                  return "#525252";
                                                                } else {
                                                                  return "white";}
                                                                })
                              .on("mousemove", function(d) {
                                d3.select(this)
                                  .style("fill", "#bdbdbd");
                                tooltip.transition()
                                  .duration(100)
                                  .style("opacity", .9)
                                  .attr("class", "tooltip")
                                  .style("left", (d3.event.pageX - 45) + "px")
                                  .style("top", (d3.event.pageY + 10) + "px");
                                tooltip.html("<b>" + d.NomBarri + "</b> (" + d.NomDistricte + ") </br> Atur: " + d.PtgAturats + "% </br> Índex de renda: "
                                + d.Renda + "</br> Sense estudis: " + d.PtgSenseEstudis + "% </br> Estrangers no europeus: " + d.PtgEstrangers + "%");
                                })
                              .on("mouseout", function(d) {
                                d3.select(this)
                                .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                    return "#525252";
                                                                  } else {
                                                                    return "white";}
                                                                  });
                                tooltip.transition()
                                  .duration(200)
                                  .style("opacity", 0);
                                });

                            });

                  //Sorting Districte
                      d3.select("#sortDistricte")  //DEscending
                        .on("click", function() {

                          // Select all of the grouped/nested elements and update the data
                          d3.selectAll("svg")
                              .data(data)
                              .remove()

                          d3.selectAll("g")
                              .data(data)
                              .remove()

                          d3.selectAll("text")
                              .data(data)
                              .remove()

                          d3.select(".frase")
                              .append('text')
                              .text("Agrupats per districtes.")
                              .attr("class", "frase")

                          data.sort(function(a, b) {
                                return d3.ascending(a.OrdreBarris, b.OrdreBarris);  //DEscending
                            })

                            grid = d3.select(".chart")
                                .attr('width', width + margin.left + margin.right)
                                .attr('height', height + margin.top + margin.bottom)

                            rects = grid.selectAll("rect")
                                .data(data)
                                .enter()
                                .append("svg")
                                .attr("class", "block")
                                .style("width", 83 + "px")
                                .style("height", 110 + "px")
                                .style("background", function(d) { if (d.NomBarri == "Barcelona") {
                                                                    return "#525252";
                                                                  } else {
                                                                    return "white";}
                                                                  })

                            rects.append('text')
                                .text(function (d) { return d.AbreviacioBarri } )
                                .attr("y", 88)
                                .attr("x", 41.5)
                                .attr("class", "labels")
                                .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                    return "white";
                                                                  } else {
                                                                    return "black";}
                                                                  })

                            rects.append('text')
                                .text(function (d) { return d.NomDistricte } )
                                .attr("y", 103)
                                .attr("x", 41.5)
                                .attr("class", "labels2")
                                .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                    return "white";
                                                                  } else {
                                                                    return "#737373";}
                                                                  })

                            flor =  rects.append("g")

                            flor.append("circle")
                            .attr("class", "circleAtur")
                            .attr("class", "circle")
                            .attr("cx", 26)
                            .attr("cy", 26)
                            .attr("r", function(d) { return sqrtScaleAtur(+d.IndexAtur) } )
                            .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                return "#22ca98";
                                                              } else {
                                                                return "#1b9e77";}
                                                              })


                            flor.append("circle")
                            .attr("class", "circleEstrangers")
                            .attr("class", "circle")
                            .attr("cx", 57)
                            .attr("cy", 26)
                            .attr("r", function(d) { return sqrtScaleRenda(+d.IndexRenda) } )
                            .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                return "#fd7711";
                                                              } else {
                                                                return "#d95f02";}
                                                              })

                            flor.append("circle")
                            .attr("class", "circleSenseEstudis")
                            .attr("class", "circle")
                            .attr("cx", 26)
                            .attr("cy", 57)
                            .attr("r", function(d) { return sqrtScaleSenseEstudis(+d.IndexSenseEstudis) } )
                            .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                return "#9591c5";
                                                              } else {
                                                                return "#7570b3";}
                                                              })

                            flor.append("circle")
                            .attr("class", "circleEstrangers")
                            .attr("class", "circle")
                            .attr("cx", 57)
                            .attr("cy", 57)
                            .attr("r", function(d) { return sqrtScaleEstrangers(+d.IndexEstrangers) } )
                            .style("fill", "#e7298a")
                            .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                return "#ec57a3";
                                                              } else {
                                                                return "#e7298a";}
                                                              })

                            flor.append("circle")
                            .attr("class", "circleMiddle")
                            .attr("class", "circle")
                            .attr("cx", 41.5)
                            .attr("cy", 41.5)
                            .attr("r", 15)
                            .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                return "#525252";
                                                              } else {
                                                                return "white";}
                                                              })
                            .on("mousemove", function(d) {
                              d3.select(this)
                                .style("fill", "#bdbdbd");
                              tooltip.transition()
                                .duration(100)
                                .style("opacity", .9)
                                .attr("class", "tooltip")
                                .style("left", (d3.event.pageX - 45) + "px")
                                .style("top", (d3.event.pageY + 10) + "px");
                              tooltip.html("<b>" + d.NomBarri + "</b> (" + d.NomDistricte + ") </br> Atur: " + d.PtgAturats + "% </br> Índex de renda: "
                              + d.Renda + "</br> Sense estudis: " + d.PtgSenseEstudis + "% </br> Estrangers no europeus: " + d.PtgEstrangers + "%");
                              })
                            .on("mouseout", function(d) {
                              d3.select(this)
                              .style("fill", function(d) { if (d.NomBarri == "Barcelona") {
                                                                  return "#525252";
                                                                } else {
                                                                  return "white";}
                                                                });
                              tooltip.transition()
                                .duration(200)
                                .style("opacity", 0);
                              });

            });
        });
      }(d3);
