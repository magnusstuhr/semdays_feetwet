<!-- Note: in at least some versions of libxslt (used by PHP), you can't 
	set global variables based on values retrieved by a key. Therefore this code 
	contains lots of redeclarations of the $northing, $easting, $lat, $long, 
	$label, $prefLabel, $altLabel, $title and $name variables. -->
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:import href="result-osm-wide.xsl" />



<xsl:template match="result" mode="script">
	<xsl:variable name="northing" select="key('propertyTerms', $northing-uri)/label" />
	<xsl:variable name="easting" select="key('propertyTerms', $easting-uri)/label" />
    <xsl:variable name="lat" select="key('propertyTerms', $lat-uri)/label" />
    <xsl:variable name="long" select="key('propertyTerms', $long-uri)/label" />
	<xsl:variable name="showMap">
		<xsl:apply-templates select="." mode="showMap" />
	</xsl:variable>
	<xsl:comment>
		<xsl:text>[if lt IE 9]&gt;</xsl:text>
		<xsl:text>&lt;script src="http://html5shiv.googlecode.com/svn/trunk/html5.js">&lt;/script></xsl:text>
		<xsl:text>&lt;![endif]</xsl:text>
	</xsl:comment>
	<xsl:if test="$showMap = 'true'">
        <script src="{$_resourceRoot}openlayers/OpenLayers.js"></script>
        <script src="{$_resourceRoot}openlayers/OpenStreetMap.js"></script>
        <script src="{$_resourceRoot}openlayers/proj4js-combined.js"></script>
        <script src="http://spatialreference.org/ref/epsg/27700/proj4js/"></script>
        <script src="http://spatialreference.org/ref/epsg/4326/proj4js/"></script>
	</xsl:if>
	<script type="text/javascript" src="{$_resourceRoot}scripts/jquery.min.js"></script>
	<script type="text/javascript" src="{$_resourceRoot}scripts/jquery-ui.min.js"></script>
	<script type="text/javascript" src="{$_resourceRoot}scripts/jquery.sparkline.js"></script>
	<script type="text/javascript" src="{$_resourceRoot}scripts/codemirror/codemirror_min.js"></script>
	<script type="text/javascript">
		$(function() {
			$('.info img')
				.toggle(function () {
					$(this)
						.attr('src', '<xsl:value-of select="$activeImageBase"/>/Cancel.png')
						.next().show();
				}, function () {
					$(this)
						.attr('src', '<xsl:value-of select="$activeImageBase"/>/Question.png')
						.next().fadeOut('slow');
				});
	
<!-- 	had to remove the following in order to get search forms work togehter with sgvizler		 -->
<!-- 			$('input[type=date]').datepicker({ -->
<!-- 				changeMonth: true, --> 
<!-- 				changeYear: true, -->
<!-- 				dateFormat: 'yy-mm-dd', -->
<!-- 				autoSize: true -->
<!-- 			}); -->
			
			$('#search').hide();
			
			$('#openSearch')
				.toggle(function () {
					$(this).text('Hide Search Form');
					$('#search').slideDown('slow');
				}, function () {
					$(this).text('Show Search Form');
					$('#search').slideUp('slow');
				});
			
			$('.provenance textarea')
				.each(function () {
					var skipLines = parseFloat($(this).attr('data-skip-lines'), 10);
					var lineHeight = parseFloat($(this).css('line-height'), 10);
					$(this).scrollTop(skipLines * lineHeight);
					var cm = CodeMirror.fromTextArea(this, {
						basefiles: ["<xsl:value-of select='$_resourceRoot'/>scripts/codemirror/codemirror_base_sparql.js"],
						stylesheet: "<xsl:value-of select='$_resourceRoot'/>css/sparql.css",
						textWrapping: false
					});
					$(cm.frame).load(function () {
						cm.jumpToLine(skipLines + 1);
						$(cm.frame)
							.css('border', 	'1px solid #D3D3D3')
							.css('border-radius', '5px')
							.css('-moz-border-radius', '5px');
					});
				});
			
			<xsl:if test="$showMap = 'true'">
				<xsl:variable name="uri">
					<xsl:call-template name="clearPosition">
						<xsl:with-param name="uri">
							<xsl:apply-templates select="/result" mode="searchURI" />
						</xsl:with-param>
					</xsl:call-template>
				</xsl:variable>
				<xsl:variable name="sep">
					<xsl:choose>
						<xsl:when test="contains($uri, '?')">&amp;</xsl:when>
						<xsl:otherwise>?</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:variable name="mapProperty" select="(//*[*[name(.) = $long] and *[name(.) = $lat]])[1]" />
				<xsl:variable name="mapParam">
					<xsl:apply-templates select="$mapProperty" mode="paramHierarchy" />
				</xsl:variable>
				<xsl:variable name="longParam" select="concat($mapParam, '.', $long)" />
				<xsl:variable name="latParam" select="concat($mapParam, '.', $lat)" />
				<xsl:variable name="properties">
					<xsl:if test="not(/result/items)">_properties=<xsl:value-of select="$longParam"/>,<xsl:value-of select="$latParam"/>&amp;</xsl:if>
				</xsl:variable>
				initMap();
				
				$('.map .search').click(function() {
					var bounds = summaryMap.getExtent().transform(summaryMap.getProjectionObject(),wgs84);
					var minLong = Math.floor(bounds.left*1000)/1000;
					var maxLong = Math.ceil(bounds.right*1000)/1000;
					var minLat  = Math.floor(bounds.bottom*1000)/1000;
					var maxLat  = Math.ceil(bounds.top*1000)/1000;
					var midLong = minLong + ((maxLong - minLong) / 2);
					var midLat  = minLat + ((maxLat - minLat) / 2);
					<!-- skw 17/10/2011 Remove any bounding-box params from the base URI. -->				
                    <xsl:variable name="windowUri">
                       <xsl:call-template name="substituteParam">
                          <xsl:with-param name="value" select="''"/>
                          <xsl:with-param name="param">min-<xsl:value-of select="$longParam"/></xsl:with-param>
                          <xsl:with-param name="uri">
                             <xsl:call-template name="substituteParam">
                               <xsl:with-param name="value" select="''"/>
                               <xsl:with-param name="param">max-<xsl:value-of select="$longParam"/></xsl:with-param>
                               <xsl:with-param name="uri">
                                 <xsl:call-template name="substituteParam">
                                   <xsl:with-param name="value" select="''"/>
                                   <xsl:with-param name="param">min-<xsl:value-of select="$latParam"/></xsl:with-param>
                                   <xsl:with-param name="uri">
                                      <xsl:call-template name="substituteParam">
                                        <xsl:with-param name="value" select="''"/>
                                        <xsl:with-param name="param">max-<xsl:value-of select="$latParam"/></xsl:with-param>
                                        <xsl:with-param name="uri" select="$uri"/>            
                                      </xsl:call-template>
                                   </xsl:with-param>
                                 </xsl:call-template>
                               </xsl:with-param>
                             </xsl:call-template>
                          </xsl:with-param>
                       </xsl:call-template>
                    </xsl:variable>
					window.location = '<xsl:value-of select="concat($windowUri, $sep, $properties)"/>min-<xsl:value-of select="$longParam"/>=' + minLong + '&amp;max-<xsl:value-of select="$longParam"/>=' + maxLong + '&amp;min-<xsl:value-of select="$latParam"/>=' + minLat + '&amp;max-<xsl:value-of select="$latParam"/>=' + maxLat;
				});
			</xsl:if>
		});
	</script>
	<!-- begin sgvizler set up -->
	  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
	 <script type="text/javascript" src="https://www.google.com/jsapi"></script>
	 <script type="text/javascript" id="sgvzlr_script" src="{$_resourceRoot}sgvizler/sgvizler.js"></script>
      <script type="text/javascript">
	// CONFIGURATION Sgvizler 0.4: Set variables to fit your setup.
	// NB! Do not let the last item in a list end with a comma.
	
	//// Query settings. The defaults settings are listed.
	sgvizler.queryOptions = {
        // Default query.
        //'query':                "SELECT ?class (count(?instance) AS ?noOfInstances)\nWHERE{ ?instance a ?class }\nGROUP BY ?class\nORDER BY ?class",
	
        // Endpoint URL.
        //'endpoint':             "http://sws.ifi.uio.no/sparql/world",
	
        // Endpoint output format.
        //'endpoint_output':      'json',  // 'xml' or 'json'
	
        // This string is appended the 'endpoint' variable and the query to it again to give a link to the "raw" query results.
        //'endpoint_query_url':   "?output=text&amp;query=",
	
        // URL to SPARQL validation service. The query is appended to it.
        //'validator_query_url':  "http://www.sparql.org/query-validator?languageSyntax=SPARQL&amp;outputFormat=sparql&amp;linenumbers=true&amp;query=",
	
        // Default chart type.
        //'chart':                'gLineChart',
	
        // Default log level. Must be either 0, 1, or 2.
        //'loglevel':             2
	};
	
	//// Prefixes
	// Add convenient prefixes for your dataset. rdf, rdfs, xsd, owl
	// are already set.  Examples:  
	sgvizler.option.namespace.fn = 'http://www.w3.org/2005/xpath-functions#';
	sgvizler.option.namespace.foaf = 'http://xmlns.com/foaf/0.1/';
	sgvizler.option.namespace.rr = 'http://data.computas.com/informasjonsmodell/regnskapsregisteret/';
	sgvizler.option.namespace.org = 'http://data.computas.com/informasjonsmodell/organisasjon/';
	sgvizler.option.namespace.lok = 'http://data.computas.com/informasjonsmodell/lokasjon/';

	//// Your chart drawing preferences. The defaults are listed.
	// See the Google visualization API for available options for
	// Google charts, and the Sgvizler homepage for other
	// options. Options applicable to all charts are put in the
	// "root" of sgvizler.chartOptions. Chart specific options are
	// put in a "child" with the chart's id as name,
	// e.g. 'gGeoMap'.
	sgvizler.chartOptions = {
        //'width':           '0',
        //'height':          '0',
        //'chartArea':       { left: '5%', top: '5%', width: '75%', height: '80%' },
        //     'gGeoMap': {
        //       'dataMode':           'markers'
        //     },
        //     'gMap': {
        //       'dataMode':           'markers',
        //     },
        //     'sMap': {
        //       'dataMode':           'markers',
        //       'showTip':            true,
        //       'useMapTypeControl':  true
        //     }
	};
	
	//// Leave this as is. Ready, steady, GO!
	$(document).ready(sgvizler.go());
      </script>
      	<!-- end sgvizler set up -->
</xsl:template>






</xsl:stylesheet>
