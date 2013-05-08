<!--
Note: in at least some versions of libxslt (used by PHP), you can't set global
variables based on values retrieved by a key. Therefore this code contains
lots of redeclarations of the $northing, $easting, $lat, $long, $label,
$prefLabel, $altLabel, $title and $name variables.
-->
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:import href="result-osm.xsl"/>


<xsl:template match="result">
	<html>
		<head>
		  <xsl:apply-templates select="." mode="extension" />
		</head>
		<body>


  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
      <script type="text/javascript" src="https://www.google.com/jsapi"></script>
      <script type="text/javascript" id="sgvzlr_script" src="{$_resourceRoot}sgvizler/sgvizler.js"></script>
      <script type="text/javascript">
	// CONFIGURATION Sgvizler 0.4: Set variables to fit your setup.
	// NB! Do not let the last item in a list end with a comma.

	//// Prefixes
	// Add convenient prefixes for your dataset. rdf, rdfs, xsd, owl
	// are already set.  Examples:
	sgvizler.option.namespace.org = 'http://data.computas.com/informasjonsmodell/organisasjon/';
	sgvizler.option.namespace.lok = 'http://data.computas.com/informasjonsmodell/lokasjon/';

	
	//// Leave this as is. Ready, steady, GO!
	$(document).ready(sgvizler.go()) 
      </script>
		  <div id="page">

		  <xsl:variable name="enhet" select="//item[label='enhet']/value"/>

		  <span style="color: #99FF99; font-size: 140%">■ </span><a href="{$enhet}"><xsl:value-of select="$bolag"/></a> <br />
		  <span style="color: #FFCCCC; font-size: 140%">■ </span><a>Tilknyttede personer</a> <br />
		  <span style="color: #FFFF66; font-size: 140%">■ </span><a>Tilknyttede enheter</a> <br />
	
		 
				<div id="sgvzl_query"
				     data-sgvizler-endpoint="http://data.computas.com:3030/dataset/query"
				       style="width:0px; height:0px;"
				       data-sgvizler-loglevel="2"
				       data-sgvizler-chart="draculaGraph">
				  <xsl:attribute name="data-sgvizler-query">
				SELECT  DISTINCT  ?enhet1Name ?agentName ?enhet2Name ?rolle1Label ?rolle2Label  ?agent ?enhet2
				 WHERE{ 
					&lt;<xsl:value-of select="$bolag"/>&gt; org:rolle ?rolle1 ;
						org:navn ?enhet1Name .
					
					?rolle1 org:rolletype ?rolletype1 .
					?rolletype1 org:rolletypekode ?rolle1Label .

					?rolle1 org:agent ?agent .
					?agent a org:Person . 
					?agent org:navn ?agentName . 
					?agent org:verv ?rolle1 .
					?agent org:verv ?rolle2 .

					?rolle2 org:enhet ?enhet2 ;
						    org:rolletype ?rolletype2 .
					?rolletype2 org:rolletypekode ?rolle2Label .
					
					?enhet2 org:navn ?enhet2Name . 
					}
				</xsl:attribute>

			       </div>

		</div>





		</body>
	</html>
</xsl:template>





</xsl:stylesheet>
