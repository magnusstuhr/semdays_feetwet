<!--
Note: in at least some versions of libxslt (used by PHP), you can't set global
variables based on values retrieved by a key. Therefore this code contains
lots of redeclarations of the $northing, $easting, $lat, $long, $label,
$prefLabel, $altLabel, $title and $name variables.
  -->
  <xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
      <xsl:import href="result-osm.xsl"/>
      
      
      
      <xsl:template match="result" mode="topnav">
	<xsl:variable name="hasResults" select="items/item[@href]" />
	<xsl:variable name="isItem" select="not(items) and primaryTopic" />
	<nav class="topnav">
	  
	  <section class="sort">
	    <h1>Visualiseringer</h1>
	    <div class="info">
	    </div>
	    <ul>
	      <li id="orgchart"> 		
	    <xsl:variable name="person" select="//item[label='person']/value"/>
		<a title="Vis rollevisualisering" href="{$person}.sgvizler">Tilknyttede bolag og personer gjennom styreroller</a>
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
    