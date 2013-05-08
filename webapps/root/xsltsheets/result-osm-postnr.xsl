<!--
Note: in at least some versions of libxslt (used by PHP), you can't set global
variables based on values retrieved by a key. Therefore this code contains
lots of redeclarations of the $northing, $easting, $lat, $long, $label,
$prefLabel, $altLabel, $title and $name variables.
-->
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:import href="result-osm-sgvizler.xsl" />




<xsl:template match="result" mode="topnav">
	<xsl:variable name="hasResults" select="items/item[@href]" />
	<xsl:variable name="isItem" select="not(items) and primaryTopic" />
	<xsl:variable name="POSTNR" select="//item[label='postnr']/value"/>
	<nav class="topnav">


  <section class="sgvizler">
	    <h1>Næringsfordeling i området</h1>
	    <div class="info">
	    </div>
	    <ul>
	      <li id="piechart"> 		
		<div id="sgvzl_query"
		     data-sgvizler-endpoint="http://data.computas.com:3030/dataset/query"
		       style="width:454px; height:290px;"
		       data-sgvizler-loglevel="4"
		       data-sgvizler-chart="gPieChart">
		  <xsl:attribute name="data-sgvizler-query">
		    SELECT ?beskrivelse (COUNT(?org) AS ?bedrifter)
		    WHERE{ ?org a org:Enhet; 
				org:forretningsadresse ?adr .
	  		   ?adr lok:poststed ?poststed .
			   ?poststed lok:postnummer "<xsl:value-of select="$POSTNR"/>" .

			 ?org org:nacekode ?nace .
			 ?nace &lt;http://data.computas.com/informasjonsmodell/nace/tittel_kort&gt; ?beskrivelse.
			  } 
		  GROUP BY ?beskrivelse
		  HAVING(?bedrifter > 1)
		  ORDER BY(?bedrifter)</xsl:attribute>
		</div>
	      </li>
	    </ul>
	  </section>
	  
	  
	 <section class="sgvizler">
	    <h1>Stiftelsesår for bedrifter på postnummer <xsl:value-of select="$POSTNR"/></h1>
	    
	    <div class="info">
	    </div>
	    
	    <ul>
	      <li id="linechart"> 		

		<div id="lines"
		     data-sgvizler-endpoint="http://data.computas.com:3030/dataset/query"
		       style="width:454px; height:290px;"
		       data-sgvizler-loglevel="4"
		       data-sgvizler-chart="gLineChart">
		  <xsl:attribute name="data-sgvizler-query">
			SELECT ?reg (COUNT(?org) AS ?bedrifter) WHERE{
			?org a org:Enhet;
			   org:forretningsadresse ?adr .
	  		   ?adr lok:poststed ?poststed .
			   ?poststed lok:postnummer "<xsl:value-of select="$POSTNR"/>" .
			?org org:stiftelsesdato ?dato .
			LET(?reg := fn:substring(?dato, 7))
			} GROUP BY ?reg  HAVING(?bedrifter > 1) ORDER BY ASC(?reg)
		  </xsl:attribute>
		</div>
	      </li>
	    </ul>
	  </section>


	<section class="sort">
	    <h1>Organisasjoner med flest ansatte på postnummer <xsl:value-of select="$POSTNR"/></h1>
	    <div class="info">
	    </div>
	    <ul>
		<li id="columnchart"> 		

		<div id="columns"
		     data-sgvizler-endpoint="http://data.computas.com:3030/dataset/query"
		       style="width:454px; height:290px;"
		       data-sgvizler-loglevel="4"
		       data-sgvizler-chart="gBarChart">
		  <xsl:attribute name="data-sgvizler-query">
		    SELECT DISTINCT ?navn ?ansatte
		    WHERE{ 
		    ?org a org:Enhet; 
				org:navn ?navn ;
 				org:antAnsattePåDato ?antAns ;
				org:forretningsadresse ?adr .
            ?adr lok:poststed ?poststed .
            ?poststed lok:postnummer "<xsl:value-of select="$POSTNR"/>" .
			?antAns org:antAnsatte ?ansatte .
			} 
			ORDER BY DESC(?ansatte)
			LIMIT 20</xsl:attribute>
		</div>
	      </li>
	    </ul>
	  </section>


	<section class="sort">
	    <h1>Sysselsetning fordelt på næring på postnr <xsl:value-of select="$POSTNR"/></h1>
	    <div class="info">
	    </div>
	    <ul>
	      <li id="piechart2"> 

		<div id="sgvzl_query2"
		     data-sgvizler-endpoint="http://data.computas.com:3030/dataset/query"
		       style="width:454px; height:290px;"
		       data-sgvizler-loglevel="4"
		       data-sgvizler-chart="gPieChart">
		  <xsl:attribute name="data-sgvizler-query">
		    SELECT DISTINCT ?beskrivelse (SUM(?ant) AS ?ansatte)
    			WHERE{ 
    			?org a org:Enhet; 
    				org:nacekode ?nace ;
 					org:antAnsattePåDato ?antAns ;
					org:forretningsadresse ?adr .
	  		   ?adr lok:poststed ?poststed .
               ?poststed lok:postnummer "<xsl:value-of select="$POSTNR"/>" .	
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
