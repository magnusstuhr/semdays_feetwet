/*  Sgvizler JavaScript SPARQL result set visualizer, version 0.5.0
 *  (c) 2011 Martin G. Skjæveland
 *
 *  Sgvizler is freely distributable under the terms of an MIT-style license.
 *  Sgvizler web site: https://code.google.com/p/sgvizler/
 *--------------------------------------------------------------------------*/
 
 var sgvizler={
 
 go:function(){
 
 this.loadLibs(),
 google.load("visualization","1.0",
 {
 packages:["annotatedtimeline","corechart","gauge","geomap","geochart","imagesparkline","map","orgchart","table","motionchart","treemap"]}),
 google.setOnLoadCallback(function(){sgvizler.charts.loadCharts(),sgvizler.drawFormQuery(),sgvizler.drawContainerQueries()})},
 loadLibs:function(){
 sgvizler.ui.isElement(sgvizler.ui.id.script)&&(this.option.homefolder=$("#"+sgvizler.ui.id.script).attr("src").replace(/sgvizler\.js$/,""),
 this.option.libfolder=this.option.homefolder+""),
 $.ajax(this.option.libfolder+"d3.min.js",
 {dataType:"script",async:!1}),
 $.ajax(this.option.libfolder+"d3.layout.min.js",
 {dataType:"script",async:!1}),
 $.ajax(this.option.libfolder+"d3.geom.min.js",
 {dataType:"script",async:!1}),
 $.ajax(this.option.libfolder+"raphael-min.js",
 {dataType:"script",async:!1}),
 $.ajax(this.option.libfolder+"dracula_graffle.js",
 {dataType:"script",async:!1}),
 $.ajax(this.option.libfolder+"dracula.js",
 {dataType:"script",async:!1}),
 $.ajax(this.option.libfolder+"dracula-visualization.js",
 {dataType:"script",async:!1}),
 $("head").append('<link rel="stylesheet" href="'+this.option.homefolder+'sgvizler.chart.css" type="text/css" />')},
 drawFormQuery:function(){
 var a=new sgvizler.query(sgvizler.ui.id.chartCon),
 b=sgvizler.ui.getUrlParams();
 $.extend(a,sgvizler.option.query,
 {query:b.query,chart:b.chart}),
 sgvizler.ui.displayUI(a),
 sgvizler.ui.isElement(a.container)&&a.query&&($.extend(a.chartOptions,{width:b.width,height:b.height}),a.draw())},
 drawContainerQueries:function(){$("["+this.ui.attr.prefix+"query]").each(function(){var a=new sgvizler.query;$.extend(a,sgvizler.option.query,sgvizler.ui.getQueryOptionAttr(this)),
 $.extend(a.chartOptions,sgvizler.ui.getChartOptionAttr(this)),a.draw()})},
 option:{},chart:{},charts:{},parser:{},ui:{}};
 jQuery.ajaxSetup({accepts:{xml:"application/sparql-results+xml",json:"application/sparql-results+json"}}),
 sgvizler.option={home:window.location.href.replace(window.location.search,""),
 homefolder:"",libfolder:this.homefolder+"/lib/",
 namespace:{rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",owl:"http://www.w3.org/2002/07/owl#",xsd:"http://www.w3.org/2001/XMLSchema#"},
 query:{},chart:{}},sgvizler.ui={id:{script:"sgvzlr_script",chartCon:"sgvzlr_gchart",queryForm:"sgvzlr_formQuery",queryTxt:"sgvzlr_cQuery",formQuery:"sgvzlr_strQuery",
 formWidth:"sgvzlr_strWidth",formHeight:"sgvzlr_strHeight",formChart:"sgvzlr_optChart",prefixCon:"sgvzlr_cPrefix",messageCon:"sgvzlr_cMessage"},attr:{prefix:"data-sgvizler-",
 prefixChart:"data-sgvizler-chart-options",valueAssign:"=",valueSplit:"|"},params:["query","chart","width","height"],
 displayUI:function(a){this.displayPrefixes(),this.displayChartTypesMenu(),this.displayUserInput(a)},
 displayPrefixes:function(){this.setElementText(this.id.prefixCon,sgvizler.query.prototype.getPrefixes())},
 displayUserInput:function(a){this.setElementValue(this.id.queryTxt,a.query),this.setElementValue(this.id.formChart,a.chart),this.setElementValue(this.id.formWidth,a.width),this.setElementValue(this.id.formHeight,a.height)},
 displayChartTypesMenu:function(){
 if(this.isElement(this.id.formChart)){
 var a=sgvizler.charts.all;
 for(var b=0;b<a.length;b++)
 $("#"+this.id.formChart).append($("<option/>").val(a[b].id).html(a[b].id))}},
 displayFeedback:function(a,b){
 var c="",
 d=a.container;
 a.container===this.id.chartCon&&this.isElement(this.id.messageCon)&&(d=this.id.messageCon);
 if(a.loglevel===0)
 return;
 if(a.loglevel===1){
 if(b==="LOADING")
 c="Loading...";
 else if(b==="ERROR_ENDPOINT"||b==="ERROR_UNKNOWN")
 c="Error."
 }
 else b==="LOADING"?c="Sending query...":b==="ERROR_ENDPOINT"?c="Error querying endpoint. Possible errors:"+this.html.ul(this.html.a(a.endpoint,"SPARQL endpoint")+" down? "+this.html.a(a.endpoint+a.endpoint_query_url+a.encodedQuery,"Check if query runs at the endpoint")+".","Malformed SPARQL query? "+this.html.a(a.validator_query_url+a.encodedQuery,"Check if it validates")+".","CORS supported and enabled? Read more about "+this.html.a("http://code.google.com/p/sgvizler/wiki/Compatibility","CORS and compatibility")+".","Is your "+this.html.a("http://code.google.com/p/sgvizler/wiki/Compatibility","browser support")+"ed?","Hmm.. it might be a bug! Please file a report to "+this.html.a("http://code.google.com/p/sgvizler/issues/","the issues")+"."):b==="ERROR_UNKNOWN"?c="Unknown error.":b==="NO_RESULTS"?c="Query returned no results.":b==="DRAWING"&&(c="Received "+a.noRows+" rows. Drawing chart...<br/>"+this.html.a(a.endpoint+a.endpoint_query_url+a.encodedQuery,"View query results","target='_blank'")+" (in new window).");
 this.setElementHTML(d,this.html.tag("p",c))},
 setElementValue:function(a,b){
 this.isElement(a)&&$("#"+a).val(b)
 },
 setElementText:function(a,b){
 this.isElement(a)&&$("#"+a).text(b)
 },
 setElementHTML:function(a,b){
 this.isElement(a)&&$("#"+a).html(b)},
 isElement:function(a){return $("#"+a).length>0},
 getQueryOptionAttr:function(a){
 var b={container:$(a).attr("id")
 },
 c=a.attributes;
 for(var d=0;d<c.length;d++)
 c[d].name.lastIndexOf(this.attr.prefix,0)===0&&(b[c[d].name.substring(this.attr.prefix.length)]=c[d].value);
 return b
 },
 getChartOptionAttr:function(a){
 var b={},c=$(a).attr(sgvizler.ui.attr.prefixChart);
 if(typeof c!="undefined"){
 options=c.split(this.attr.valueSplit);
 for(var d in options){
 var e=options[d].split(this.attr.valueAssign),f=e[0].split("."),g=b;
 for(var h=0;h<f.length-1;h++)
 typeof g[f[h]]=="undefined"&&(g[f[h]]={}),g=g[f[h]];g[f[h]]=e[1]}}
 return b.width=/(\d+)/.exec($(a).css("width"))[1],b.height=/(\d+)/.exec($(a).css("height"))[1],b},
 getUrlParams:function(){
 var a={},
 b,
 c=/([^&=]+)=?([^&]*)/g,
 d=function(a){
 return decodeURIComponent(a.replace(/\+/g," "))
 },
 e=window.location.search.substring(1);
 while(b=c.exec(e))b[2].length>0&&$.inArray(b[1],this.params!==-1)&&(a[d(b[1])]=d(b[2]));
 return a
 },
 resetPage:function(){
 document.location=sgvizler.home
 },
 submitQuery:function(){
 $("#"+this.id.formQuery).val($("#"+this.id.queryTxt).val()),
 $("#"+this.id.queryForm).submit()},
 html:{a:function(a,b,c){
 typeof c=="undefined"&&(c="");
 if(typeof a!="undefined"&&typeof b!="undefined")
 return"<a "+c+" href='"+a+"'>"+b+"</a>"
 },
 ul:function(){
 var a=this.ul.arguments;
 if(a.length){var b="<ul>";
 for(var c=0;c<a.length;c++)b+="<li>"+a[c]+"</li>";
 return b+"</ul>"
 }
 },
 tag:function(a,b){
 return"<"+a+">"+b+"</"+a+">"}}},
 sgvizler.parser={defaultGDatatype:"string",
 countRowsSparqlXML:function(a){
 return $(a).find("sparql").find("results").find("result").length},
 countRowsSparqlJSON:function(a){
 if(typeof a.results.bindings!="undefined")
 return a.results.bindings.length
 },
 SparqlXML2GoogleJSON:function(a){
 var b=[],
 c=[],
 d=[],
 e=$(a).find("sparql").find("results").find("result"),
 f=0;
 $(a).find("sparql").find("head").find("variable").each(function(){
 var a=null,
 c=null,
 g=$(this).attr("name"),
 h=$(e).find('binding[name="'+g+'"]');
 if(h.length){var i=$(h).first().children().first()[0];a=i.nodeName,c=$(i).attr("datatype")}
 d[f]=sgvizler.parser.getGoogleJsonDatatype(a,c),
 b[f]={
 id:g,
 label:g,type:d[f]
 },
 f++
 });
 var g=0;
 return $(e).each(function(){
 var a=[];
 for(var e=0;e<b.length;e++){
 var f=null,
 h=$(this).find('binding[name="'+b[e].id+'"]');
 if(h.length&&typeof $(h).first().children().first()!="undefined"&&$(h).first().children().first().firstChild!==null){
 var i=$(h).first().children().first()[0],
 j=i.nodeName,
 k=$(i).first().text();
 f=sgvizler.parser.getGoogleJsonValue(k,d[e],j)}a[e]={v:f}}c[g]={c:a},g++}),
 {cols:b,rows:c}},
 SparqlJSON2GoogleJSON:function(a){
 var b=[],
 c=[],
 d=[],
 e=a.head.vars,
 f=a.results.bindings;
 for(var g=0;g<e.length;g++){
 var h=0,
 i=null,
 j=null;
 while(typeof f[h][e[g]]=="undefined"&&h+1<f.length)
 h++;
 typeof f[h][e[g]]!="undefined"&&(i=f[h][e[g]].type,j=f[h][e[g]].datatype),
 d[g]=this.getGoogleJsonDatatype(i,j),
 b[g]={id:e[g],label:e[g],type:d[g]}}
 for(var h=0;h<f.length;h++){
 var k=f[h],
 l=[];
 for(var g=0;g<e.length;g++){
 var m=null;
 typeof k[e[g]]!="undefined"&&typeof k[e[g]].value!="undefined"&&(m=this.getGoogleJsonValue(k[e[g]].value,d[g],k[e[g]].type)),
 l[g]={v:m}}c[h]={c:l}}
 return{cols:b,rows:c}},
 getGoogleJsonValue:function(a,b,c){
 return b==="number"?Number(a):b==="date"?new Date(a.substr(0,4),a.substr(5,2),a.substr(8,2)):b==="datetime"?new Date(a.substr(0,4),a.substr(5,2),a.substr(8,2),a.substr(11,2),a.substr(14,2),a.substr(17,2)):b==="timeofday"?[a.substr(0,2),a.substr(3,2),a.substr(6,2)]:c==="uri"?this.prefixify(a):a},getGoogleJsonDatatype:function(a,b){var c=sgvizler.option.namespace.xsd;if(typeof a!="undefined"&&(a==="typed-literal"||a==="literal")){if(b===c+"float"||b===c+"double"||b===c+"decimal"||b===c+"int"||b===c+"long"||b===c+"integer")return"number";if(b===c+"boolean")return"boolean";if(b===c+"date")return"date";if(b===c+"dateTime")return"datetime";if(b===c+"time")return"timeofday"}return this.defaultGDatatype},prefixify:function(a){for(var b in sgvizler.option.namespace)if(a.lastIndexOf(sgvizler.option.namespace[b],0)===0)return a.replace(sgvizler.option.namespace[b],b+":");return a},unprefixify:function(a){for(var b in sgvizler.option.namespace)if(a.lastIndexOf(b+":",0)===0)return a.replace(b+":",sgvizler.option.namespace[b]);return a}},
 sgvizler.query=function(a){
 this.container=a,
 this.query="SELECT ?class (count(?instance) AS ?noOfInstances)\nWHERE{ ?instance a ?class }\nGROUP BY ?class\nORDER BY ?class",
 this.endpoint="http://sws.ifi.uio.no/sparql/world",
 this.endpoint_output="json",
 this.endpoint_query_url="?output=text&amp;query=",
 this.validator_query_url="http://www.sparql.org/query-validator?languageSyntax=SPARQL&amp;outputFormat=sparql&amp;linenumbers=true&amp;query=",
 this.chart="gLineChart",
 this.loglevel=2,
 this.chartOptions={width:"800",height:"400",
 chartArea:{left:"5%",top:"5%",width:"75%",height:"80%"
 },
 gGeoMap:{dataMode:"markers"},
 gMap:{dataMode:"markers"},
 sMap:{dataMode:"markers",
 showTip:!0,useMapTypeControl:!0
 },
 gSparkline:{showAxisLines:!1}}},
 sgvizler.query.prototype.draw=function(){
 var a=this,b=sgvizler.charts.getChart(this.container,this.chart);
 this.setChartSpecificOptions(),
 this.insertFrom(),
 this.runQuery(function(c){b.draw(new google.visualization.DataTable(a.processQueryResults(c)),a.chartOptions)})},
 sgvizler.query.prototype.runQuery=function(a){
 var b=this.endpoint_output;sgvizler.ui.displayFeedback(this,"LOADING"),
 this.encodedQuery=encodeURIComponent(this.getPrefixes()+this.query);
 if(this.endpoint_output!=="jsonp"&&$.browser.msie&&window.XDomainRequest){
 var c=new XDomainRequest,d=this.endpoint+"?query="+this.encodedQuery+"&output="+this.endpoint_output;c.open("GET",d),
 c.onload=function(){
 var d;
 b==="xml"?d=$.parseXML(c.responseText):d=$.parseJSON(c.responseText),a(d)
 },
 c.send()
 }
 else $.get(this.endpoint,{query:this.getPrefixes()+this.query,output:this.endpoint_output==="jsonp"?"json":this.endpoint_output},
 function(b){
 a(b)
 },
 this.endpoint_output).error(function(){sgvizler.ui.displayFeedback(this,"ERROR_ENDPOINT")})},
 sgvizler.query.prototype.processQueryResults=function(a){this.setResultRowCount(a);
 if(this.noRows===null)
 sgvizler.ui.displayFeedback(this,"ERROR_UNKNOWN");
 else if(this.noRows===0)sgvizler.ui.displayFeedback(this,"NO_RESULTS");
 else return sgvizler.ui.displayFeedback(this,"DRAWING"),this.getGoogleJSON(a)},
 sgvizler.query.prototype.setResultRowCount=function(a){this.endpoint_output==="xml"?this.noRows=sgvizler.parser.countRowsSparqlXML(a):
 this.noRows=sgvizler.parser.countRowsSparqlJSON(a)},
 sgvizler.query.prototype.getGoogleJSON=function(a){
 return this.endpoint_output==="xml"?a=sgvizler.parser.SparqlXML2GoogleJSON(a):a=sgvizler.parser.SparqlJSON2GoogleJSON(a),a},
 sgvizler.query.prototype.insertFrom=function(){
 if(typeof this.rdf!="undefined"){
 var a=this.rdf.split(sgvizler.ui.attr.valueSplit),b="";for(var c in a)b+="FROM <"+a[c]+">\n";
 this.query=this.query.replace(/(WHERE)?(\s)*\{/,"\n"+b+"WHERE {")}},
 sgvizler.query.prototype.getPrefixes=function(){
 var a="";
 for(var b in sgvizler.option.namespace)a+="PREFIX "+b+": <"+sgvizler.option.namespace[b]+">\n";return a},
 sgvizler.query.prototype.setChartSpecificOptions=function(){
 for(var a in this.chartOptions)if(a===this.chart)for(var b in this.chartOptions[a])
 this.chartOptions[b]=this.chartOptions[a][b]},
 sgvizler.charts={all:[],loadCharts:function(){
 var a=
 [{id:"gLineChart",func:google.visualization.LineChart},
 {id:"gAreaChart",func:google.visualization.AreaChart},
 {id:"gSteppedAreaChart",func:google.visualization.SteppedAreaChart},
 {id:"gPieChart",func:google.visualization.PieChart},
 {id:"gBubbleChart",func:google.visualization.BubbleChart},
 {id:"gColumnChart",func:google.visualization.ColumnChart},
 {id:"gBarChart",func:google.visualization.BarChart},
 {id:"gSparkline",func:google.visualization.ImageSparkLine},
 {id:"gScatterChart",func:google.visualization.ScatterChart},
 {id:"gCandlestickChart",func:google.visualization.CandlestickChart},
 {id:"gGauge",func:google.visualization.Gauge},
 {id:"gOrgChart",func:google.visualization.OrgChart},
 {id:"gTreeMap",func:google.visualization.TreeMap},
 {id:"gTimeline",func:google.visualization.AnnotatedTimeLine},
 {id:"gMotionChart",func:google.visualization.MotionChart},
 {id:"gGeoChart",func:google.visualization.GeoChart},
 {id:"gGeoMap",func:google.visualization.GeoMap},
 {id:"gMap",func:google.visualization.Map},
 {id:"gTable",func:google.visualization.Table}];
 $.merge(this.all,a);for(var b in sgvizler.chart)this.register(sgvizler.chart[b].prototype.id,sgvizler.chart[b])},
 register:function(a,b){this.all.push({id:a,func:b})},
 getChart:function(a,b){var c=document.getElementById(a);
 for(var d=0;d<this.all.length;d++)
 if(b===this.all[d].id)
 return new this.all[d].func(c)}},
 
 sgvizler.chart.dForceGraph=function(a){this.container=a},
 sgvizler.chart.dForceGraph.prototype={
 id:"dForceGraph",
 draw:function(a,b){
 function t(){
 s.attr("transform","translate("+d3.event.translate+")"+" scale("+d3.event.scale+")")} 
 var c=a.getNumberOfColumns(),
 d=a.getNumberOfRows(),
 e=$.extend({maxnodesize:15,minnodesize:2},b);
 colors=d3.scale.category20(),
 w=b.width,
 h=b.height,
 isNumber=function(a){
 return!isNaN(parseFloat(a))&&isFinite(a)};
 var f=[],
 g=[],
 i={},
 j={},
 k=0;
 for(var l=0;l<d;l++){
 var m=a.getValue(l,0),
 n=a.getValue(l,1);
 m!==null&&$.inArray(m,f)===-1&&(f.push(m),j[m]=c>2?Math.sqrt(a.getValue(l,2)):0,i[m]=c>3?a.getValue(l,3):0,j[m]>k&&(k=j[m])),n!==null&&$.inArray(n,f)===-1&&f.push(n),m!==null&&n!==null&&g.push({source:$.inArray(m,f),target:$.inArray(n,f)})}k===0&&(k=1);
 var o=e.maxnodesize/k;
 for(var p=0;p<f.length;p++){
 var q=typeof i[f[p]]!="undefined"?i[f[p]]:1,
 r=isNumber(j[f[p]])?e.minnodesize+j[f[p]]*o:e.minnodesize;
 f[p]={name:f[p],color:q,size:r}}$(this.container).empty();
 var s=d3.select(this.container).append("svg:svg").attr("width",w).attr("height",h).attr("pointer-events","all").append("svg:g").call(d3.behavior.zoom().on("zoom",t)).append("svg:g");
 s.append("svg:rect").attr("width",w).attr("height",h).attr("fill","white");
 var u=d3.layout.force().gravity(.05).distance(100).charge(-100).nodes(f).links(g).size([w,h]).start(),
 v=s.selectAll("line.link").data(g).enter().append("svg:line").attr("class","link").attr("x1",function(a){return a.source.x}).attr("y1",function(a){return a.source.y}).attr("x2",function(a){return a.target.x}).attr("y2",function(a){return a.target.y}),x=s.selectAll("g.node").data(f).enter().append("svg:g").attr("class","node").call(u.drag);x.append("svg:circle").style("fill",function(a){return colors(a.color)}).attr("class","node").attr("r",function(a){return a.size}),x.append("svg:title").text(function(a){return a.name}),x.append("svg:text").attr("class","nodetext").attr("dx",12).attr("dy",".35em").text(function(a){return a.name});var y=0;u.on("tick",function(){y++,y>250&&(u.stop(),u.charge(0).linkStrength(0).linkDistance(0).gravity(0).start()),v.attr("x1",function(a){return a.source.x}).attr("y1",function(a){return a.source.y}).attr("x2",function(a){return a.target.x}).attr("y2",function(a){return a.target.y}),x.attr("transform",function(a){return"translate("+a.x+","+a.y+")"})})
 }},
 
 sgvizler.chart.draculaGraph=function(a){this.container=a},
 sgvizler.chart.draculaGraph.prototype={
 id:"draculaGraph",
 draw:function(a,b){
 
	var numberOfColumns=a.getNumberOfColumns(),
	numberOfRows=a.getNumberOfRows(),
	e=$.extend({cellSep:" ",termPrefix:"",termPostfix:":",definitionPrefix:"",definitionPostfix:""},b);

	var graph = new Graph();
	function createGreenRenderer() {
		var greenRender = function(r, n) {
			/* the Raphael set is obligatory, containing all you want to display */
			var set = r.set().push(
				/* custom objects go here */
				
				r.rect(n.point[0], n.point[1], n.label.length*10, 50)
					.attr({"fill": "#66FF66", "stroke-width": 1, r : "3px"}))
					.push(r.text(n.point[0]+n.label.length*5, n.point[1] + 25, n.label)
						.attr({"font-size":"12px"}));
			return set;
		};
		return greenRender;
	}
	function createPinkRenderer(clickableURL) {
		 var pinkRender = function(r, n) {
			/* the Raphael set is obligatory, containing all you want to display */
			var set = r.set().push(
				/* custom objects go here */
				r.rect(n.point[0], n.point[1], n.label.length*10, 50)
					.attr({"fill": "#FF9999", "stroke-width": 1, r : "3px"}))
					.push(r.text(n.point[0]+n.label.length*5, n.point[1] + 25, n.label)
						.attr({"font-size":"12px"})
						.click(function () {
				window.open(clickableURL);
			 }));
			return set;
		};
		return pinkRender;
	}
	function createYellowRenderer(clickableURL) {
		var yellowRender = function(r, n) {
			/* the Raphael set is obligatory, containing all you want to display */
			var set = r.set().push(
				/* custom objects go here */
				r.rect(n.point[0], n.point[1], n.label.length*10, 50)
					.attr({"fill": "#FFFF00", "stroke-width": 1, r : "3px"}))
					.push(r.text(n.point[0]+n.label.length*5, n.point[1] + 25, n.label)
						.attr({"font-size":"12px"})
						.click(function () {
				window.open(clickableURL);
			 }));
			return set;
		};
		return yellowRender;
	}
	
	var indexReset = numberOfColumns-4;
	var index = indexReset;
	var entityIndexReset = numberOfColumns-2;
	var entityIndex = entityIndexReset;
	var entityURI = "";
	
	var predicate = "";
	var oldSubject = "";
	var oldPredicate = "";
	var oldObject = "";
	var edge = "";
	var finalPredicate = "";
	var lineBreak = "";
	
	var triples = new Array();
	var tripleIndex = 0;
	
	 for(var g=0;g<numberOfRows;g++){
		var subject=e.termPrefix+a.getValue(g,0)+e.termPostfix;
		//alert(subject);
		var object=e.definitionPrefix;
		
		
		
		subject = subject.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(":", "");
		
		for(var j=1;j<3;j++) {
		var originalEntityURI = "";
			var tripleExists = false;
			
			object=a.getValue(g,j);
			j+1!==numberOfColumns&&(object+=e.cellSep);
			object+=e.definitionPostfix;
			predicate = a.getValue(g, index);
			
			if (entityIndex == numberOfColumns) {
				entityIndex = entityIndexReset;
			}
			
			
			//entityIndex++;

			object = object.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(":", "");
			
			index++;
			if (index == numberOfColumns-2) {
				index = indexReset;
			}
			
			if (j == 2) {
				if (originalEntityURI == "" ) {
				entityURI = a.getValue(g, entityIndex+1);
				}
				
				var tripleArray = new Array(4);
				tripleArray[0] = oldObject;
				tripleArray[1] = predicate;
				tripleArray[2] = object;
				tripleArray[3] = createGreenRenderer();
				tripleArray[4] = createYellowRenderer(entityURI);
				triples[tripleIndex] = tripleArray;
				tripleIndex++;
				tripleExists = true;
			}
			
			for (var tripleArrayIndex = 0; tripleArrayIndex < triples.length; tripleArrayIndex++) {
				var testTriple = triples[tripleArrayIndex];
				var testSubject = testTriple[0];
				var testPredicate = testTriple[1];
				var testObject = testTriple[2];
					if ((testSubject == subject && testObject == object) || (testSubject == oldObject && testObject == object)) {
						//Only add predicate if it does not exist from before.
						//alert(testPredicate+" :: "+predicate);
						if (testPredicate.indexOf(predicate) == -1) {
							triples[tripleArrayIndex][1] = testPredicate+" , "+predicate;
						}
						tripleExists = true;
					}
			}
			oldObject = object;
			
			
			
			if (!tripleExists) {
			//entityIndex++;
			if (originalEntityURI == "" ) {
				entityURI = a.getValue(g, entityIndex);
				}
				var tripleArray = new Array(3);
				tripleArray[0] = subject;
				tripleArray[1] = predicate;
				tripleArray[2] = object;
				tripleArray[3] = createGreenRenderer();
				tripleArray[4] = createPinkRenderer(entityURI);
				triples[tripleIndex] = tripleArray;
				tripleIndex++;
				}
				
			}
	}
	
	var finalTripleArray = new Array();
	var finalTripleArrayIndex = 0;
	var entities = new Array();
	var entitiesIndex = 0;
	
	for (var tripleArrayIndex = 0; tripleArrayIndex < triples.length; tripleArrayIndex++) {
			var tripleExists = false;
			var triple = triples[tripleArrayIndex];
			//alert(triple);
			var sub = triple[0];
			var pred = triple[1];
			var obj = triple[2];
			var subjRend = triple[3];
			var objRend = triple[4];
			
			if (entities.length > 0) {
				for (var index=0; index < entities.length; index++) {
					var entity = entities[index];
					if (entity != sub) {
						//alert(sub+" finnes ikke i "+entities);
						graph.addNode(sub, {label: sub, render: subjRend});
					}
					if (entity != obj) {
						//alert(obj+" finnes ikke i "+entities);
						graph.addNode(obj, {label: obj, render: objRend});
					}
				}
			}
			else {
				graph.addNode(sub, {label: sub, render: subjRend});
				graph.addNode(obj, {label: obj, render: objRend});
			}
			for (var ind = 0; ind < finalTripleArray.length; ind++) {
				var tempTriple = finalTripleArray[ind];
				var tempSub = tempTriple[0];
				var tempPred = tempTriple[1];
				var tempObj = tempTriple[2];
				
				if ((tempSub == sub && tempObj == obj) || (tempSub == obj && tempObj == sub)) {
					tripleExists = true;
				}
				else {
					//alert(":"+tempSub + ": er ikke det samme som :"+sub+": && :"+tempObj + ": er ikke det samme som :"+obj+": || :"+tempSub + ": er ikke det samme som :"+obj+": && :"+tempObj + " er ikke det samme som :"+sub+":");
				}
			}
			if (!tripleExists) {
				var finalTriple = new Array(3);
				finalTriple[0] = sub;
				finalTriple[1] = pred;
				finalTriple[2] = obj;
				finalTripleArray[finalTripleArrayIndex] = finalTriple;
				finalTripleArrayIndex++;
			}
			
			entities[entitiesIndex] = sub;
			entitiesIndex++;
			entities[entitiesIndex] = obj;
			entitiesIndex++;
			}
			for (var ind2 = 0; ind2 < finalTripleArray.length; ind2++) {
				var tempTriple = finalTripleArray[ind2];
				var tempSub2 = tempTriple[0];
				var tempPred2 = tempTriple[1];
				var tempObj2 = tempTriple[2];
				graph.addEdge(tempSub2, tempObj2, { stroke : "#bfa" , fill : "#56f", label : tempPred2 });
			}
			
var layouter = new Graph.Layout.Spring(graph);
layouter.layout();


 $(this.container).empty();
 var renderer = new Graph.Renderer.Raphael(this.container, graph, 1800, 1500);
 renderer.draw();

}
 },
 
 sgvizler.chart.DefList=function(a){this.container=a},
 sgvizler.chart.DefList.prototype={
 id:"sDefList",
 draw:function(a,b){
 var c=a.getNumberOfColumns(),
 d=a.getNumberOfRows(),
 e=$.extend({cellSep:" ",termPrefix:"",termPostfix:":",definitionPrefix:"",definitionPostfix:""},b),
 f=$(document.createElement("dl"));
 for(var g=0;g<d;g++){
 var h=e.termPrefix+a.getValue(g,0)+e.termPostfix;
 f.append($(document.createElement("dt")).html(h));
 var i=e.definitionPrefix;
 for(var j=1;j<c;j++)
 i+=a.getValue(g,j),
 j+1!==c&&(i+=e.cellSep);
 i+=e.definitionPostfix,
 f.append($(document.createElement("dd")).html(i))
 }
 $(this.container).empty(),
 $(this.container).append(f)
}
},
 sgvizler.chart.List=function(a){this.container=a},
 sgvizler.chart.List.prototype={id:"sList",draw:function(a,b){var c=a.getNumberOfColumns(),d=a.getNumberOfRows(),e=$.extend({list:"ul",cellSep:", ",rowPrefix:"",rowPostfix:""},b),f=$(document.createElement(e.list));for(var g=0;g<d;g++){var h=e.rowPrefix;for(var i=0;i<c;i++)h+=a.getValue(g,i),i+1!==c&&(h+=e.cellSep);h+=e.rowPostfix,f.append($(document.createElement("li")).html(h))}$(this.container).empty(),$(this.container).append(f)}},
 sgvizler.chart.sMap=function(a){this.container=a},
 sgvizler.chart.sMap.prototype={id:"sMap",draw:function(a,b){var c,d=a.getNumberOfColumns();if(d>3){c=a.clone();for(var e=d-1;e>2;e--)c.removeColumn(e);for(var f=0;f<a.getNumberOfRows();f++){var g="<div class='sgvizler sgvizler-sMap'>";g+="<h1>"+a.getValue(f,2)+"</h1>",5<d&&a.getValue(f,5)!==null&&(g+="<div class='img'><img src='"+a.getValue(f,5)+"'/></div>"),3<d&&a.getValue(f,3)!==null&&(g+="<p class='text'>"+a.getValue(f,3)+"</p>"),4<d&&a.getValue(f,4)!==null&&(g+="<p class='link'><a href='"+sgvizler.parser.unprefixify(a.getValue(f,4))+"'>"+a.getValue(f,4)+"</a></p>"),g+="</div>",c.setCell(f,2,g)}}else c=dDataTable;chart=new google.visualization.Map(this.container),chart.draw(c,b)}},
 sgvizler.chart.Text=function(a){this.container=a},
 sgvizler.chart.Text.prototype={id:"sText",draw:function(a,b){var c=a.getNumberOfColumns(),d=a.getNumberOfRows(),e=$.extend({cellSep:", ",cellPrefix:"",cellPostfix:"",rowPrefix:"<p>",rowPostfix:"</p>",resultsPrefix:"<div>",resultsPostfix:"</div>"},b),f=e.resultsPrefix;for(var g=0;g<d;g++){var h=e.rowPrefix;for(var i=0;i<c;i++)h+=e.cellPrefix+a.getValue(g,i)+e.cellPostfix,i+1!==c&&(h+=e.cellSep);f+=h+e.rowPostfix}f+=e.resultsPostfix,$(this.container).empty(),$(this.container).html(f)}
 };

