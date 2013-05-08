<!-- Note: in at least some versions of libxslt (used by PHP), you can't 
	set global variables based on values retrieved by a key. Therefore this code 
	contains lots of redeclarations of the $northing, $easting, $lat, $long, 
	$label, $prefLabel, $altLabel, $title and $name variables. -->
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:rdfs="http://www.w3.org/TR/rdf-schema/#">

	<xsl:import href="result-osm-sgvizler.xsl" />

	<xsl:template match="result" mode="topnav">
		<xsl:variable name="hasResults" select="items/item[@href]" />
		<xsl:variable name="isItem" select="not(items) and primaryTopic" />
		<nav class="topnav">

			
			

			<section class="sort">
				<xsl:variable name="KOMMUNENR" select="//item[label='kommunenr']/value" />
				<h1>
					Organisjonsformfordeling for kommunenr
					
					<xsl:value-of select="$KOMMUNENR" />
				</h1>
				<div class="info">
				</div>
				<ul>
					<li id="piechart">

						<div id="sgvzl_query" data-sgvizler-endpoint="http://data.computas.com:3030/dataset/query"
							style="width:454px; height:290px;" data-sgvizler-loglevel="4"
							data-sgvizler-chart="gPieChart">
							<xsl:attribute name="data-sgvizler-query">
							
		    SELECT ?orgformName (COUNT(?org) AS ?bedrifter)
		    WHERE{ 
		        ?org a org:Bolag; 
				     org:kommune ?kommune .
				?kommune lok:kommunenummer "<xsl:value-of select="$KOMMUNENR" />" .
				?orgform org:beskrivelse ?orgformName .
		 	} GROUP BY ?orgformName
		  HAVING(?bedrifter > 0)
		  
		  					</xsl:attribute>
						</div>
					</li>
				</ul>
			</section>

			<section class="sort">
				<xsl:variable name="KOMMUNENR" select="//item[label='kommunenr']/value" />
				<h1>
					Organisasjoner med flest ansatte i kommunenr
					<xsl:value-of select="$KOMMUNENR" />
				</h1>
				<div class="info">
				</div>
				<ul>
					<li id="columnchart">

						<div id="columns" data-sgvizler-endpoint="http://data.computas.com:3030/dataset/query"
							style="width:454px; height:290px;" data-sgvizler-loglevel="4"
							data-sgvizler-chart="gBarChart">
							<xsl:attribute name="data-sgvizler-query">
		    SELECT DISTINCT ?navn ?ansatte
		    WHERE{ 
		    ?org a org:Bolag; 
				org:navn ?navn ;
 				org:antAnsattePåDato ?antAns ;
			    org:kommune ?kommune .
		    ?kommune lok:kommunenummer "<xsl:value-of select="$KOMMUNENR" />" .
			?antAns org:antAnsatte ?ansatte .
			} 
			ORDER BY DESC(?ansatte)
			LIMIT 20		
						</xsl:attribute>
						</div>
					</li>
				</ul>
			</section>

			<section class="sort">
				<xsl:variable name="KOMMUNENR" select="//item[label='kommunenr']/value" />
				<h1>
					Sysselsetting fordelt på næring i kommunenr
					<xsl:value-of select="$KOMMUNENR" />
				</h1>
				<div class="info">
				</div>
				<ul>
					<li id="piechart2">

						<div id="sgvzl_query2" data-sgvizler-endpoint="http://data.computas.com:3030/dataset/query"
							style="width:454px; height:290px;" data-sgvizler-loglevel="4"
							data-sgvizler-chart="gPieChart">
							<xsl:attribute name="data-sgvizler-query">
		    SELECT DISTINCT ?beskrivelse (SUM(?ant) AS ?ansatte)
    			WHERE{ 
    			?org a org:Bolag;
					org:nacekode ?nace ;
 					org:antAnsattePåDato ?antAns ;
				org:kommune ?kommune .
		    	?kommune lok:kommunenummer "<xsl:value-of select="$KOMMUNENR" />" .
				?antAns org:antAnsatte ?ant .
			    ?nace &lt;http://data.computas.com/informasjonsmodell/nace/tittel_kort&gt; ?beskrivelse.
			} GROUP BY ?beskrivelse
			HAVING(?ansatte > 1)
			ORDER BY DESC(?ansatte)
			
		  </xsl:attribute>
		  
						</div>
					</li>
				</ul>
				
			</section>



			<xsl:apply-templates select="." mode="moreinfo" />
			<xsl:apply-templates select="." mode="map" />
			<xsl:if test="$hasResults">
				<xsl:if test="not(next)">
					<xsl:apply-templates select="." mode="graphs" />
				</xsl:if>
				<xsl:apply-templates select="." mode="summary" />
			</xsl:if>
			<xsl:if test="not($isItem)">
				<xsl:apply-templates select="." mode="filternav" />
			</xsl:if>
			<xsl:if test="$hasResults">
				<xsl:apply-templates select="." mode="sortnav" />
			</xsl:if>
			<xsl:if test="$hasResults or $isItem">
				<xsl:apply-templates select="." mode="viewnav" />
			</xsl:if>
			<xsl:if test="$hasResults">
				<xsl:apply-templates select="." mode="sizenav" />
			</xsl:if>
		</nav>
	</xsl:template>


</xsl:stylesheet>
