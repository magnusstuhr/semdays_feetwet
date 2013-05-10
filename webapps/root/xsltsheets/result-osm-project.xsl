<!-- Note: in at least some versions of libxslt (used by PHP), you can't
	set global variables based on values retrieved by a key. Therefore this code
	contains lots of redeclarations of the $northing, $easting, $lat, $long,
	$label, $prefLabel, $altLabel, $title and $name variables. -->
<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >

    <xsl:import href="result-osm.xsl" />



    <xsl:template match="result" mode="topnav">
        <xsl:variable name="hasResults" select="items/item[@href]" />
        <xsl:variable name="isItem" select="not(items) and primaryTopic" />
        <nav class="topnav">

            <section class="sort">
                <h1>Browse</h1>
                <div class="info">
                </div>
                <ul>
                    <li id="agr1">
                        <xsl:variable name="project" select="//item[label='project']/value"/>
                        <a title="Staff project!" href="http://localhost:3030/dataset/query?query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+%3A+%3Chttp%3A%2F%2Fwww.posccaesar.org%2Fwiki%2FPCA%2FSemanticDays2013%2FTutorial%2F%3E%0D%0A%0D%0ASELECT+%3Fproject+%3Fperson%0D%0AWHERE+%7B%0D%0A++++%3C{$project}%3E+rdf%3Atype+%3AProject+%3B%0D%0A+++++++++++++%3Aneeds+%3Fskill+.%0D%0A++++%3Fperson+%3AhasProfiency+[+%3Acharacterizes+%3Fskill+]+.%0D%0A%7D&amp;output=xml&amp;stylesheet=%2Fxml-to-html.xsl">Find persons available for staffing this project</a>
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
