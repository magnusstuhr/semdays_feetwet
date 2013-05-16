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
                        <xsl:variable name="person" select="//item[label='person']/value"/>
                        <a title="Find projects!" href="http://localhost:3030/dataset/query?query=prefix+%3A++++++++%3Chttp%3A%2F%2Fwww.posccaesar.org%2Fwiki%2FPCA%2FSemanticDays2013%2FTutorial%23%3E%0D%0A%0D%0ASELECT+DISTINCT+%3FprojectTitle%0D%0AWHERE+%7B%0D%0A%0D%0A++++%3Fproject++%3AlastsFor+[%3AdurationFrom+%3FdurationFrom+%3B%0D%0A++++++++++++++%3AdurationTo+%3FdurationTo+]+%3B%0D%0A++++++++++++++%3AprojectTitle+%3FprojectTitle+.%0D%0A%0D%0A++++%3C{$person}%3E%0D%0A++++++++++++%3AfirstName+%3FpersonFirstName+%3B%0D%0A++++++++++++%3AlastName+%3FpersonLastName+%3B%0D%0A++++++++++++%3AhasAvailability+%3Favailability.%0D%0A%0D%0A%3Favailability+%3AmustFitWith[%3AdurationFrom+%3FavailableFrom+%3B%0D%0A+++++++++++++++++++++++++++%3AdurationTo+%3FavailableTo].%0D%0A%0D%0AFilter%28%3FdurationFrom+%3E%3D+%3FavailableFrom+%26%26+%3FdurationTo+%3C%3D+%3FavailableTo%29.%0D%0A%7D&amp;output=xml&amp;stylesheet=%2Fxml-to-html.xsl">Find all projects that meets this person's availability</a>
                    </li>
                </ul>
                <ul>
                    <li id="agr2">
                        <xsl:variable name="person" select="//item[label='person']/value"/>
                        <a title="Find projects!" href="http://localhost:3030/dataset/query?query=prefix+%3A++++++++%3Chttp%3A%2F%2Fwww.posccaesar.org%2Fwiki%2FPCA%2FSemanticDays2013%2FTutorial%23%3E%0D%0A%0D%0ASELECT+%3FprojectTitle+%3Fskillname%0D%0AWHERE+%7B%0D%0A%0D%0A++++%3Fproject%0D%0A+++++++++++%3Aneeds+%3Fskill+%3B%0D%0A+++++++++++%3AprojectTitle+%3FprojectTitle+.%0D%0A%0D%0A++++%3C{$person}%3E%0D%0A++++++++++++%3AhasProficiency+[+%3Acharacterizes+%3Fskill+]+%3B%0D%0A++++++++++++%3AfirstName+%3FpersonFirstName+%3B%0D%0A++++++++++++%3AlastName+%3FpersonLastName+.%0D%0A%0D%0A++++%3Fskill+%3AskillType+%3Fskillname+.%0D%0A%0D%0A%7D&amp;output=xml&amp;stylesheet=%2Fxml-to-html.xsl">Find all projects that meets this person's skill</a>
                    </li>
                </ul>
                <ul>
                    <li id="agr3">
                        <xsl:variable name="person" select="//item[label='person']/value"/>
                        <a title="Find projects!" href="http://localhost:3030/dataset/query?query=prefix+%3A++++++++%3Chttp%3A%2F%2Fwww.posccaesar.org%2Fwiki%2FPCA%2FSemanticDays2013%2FTutorial%23%3E%0D%0A%0D%0ASELECT+%3FprojectTitle+%3Fskillname%0D%0AWHERE+%7B%0D%0A%0D%0A++++%3Fproject+%0D%0A+++++++++++%3AlastsFor+%0D%0A+++++++++++++++[%3AdurationFrom+%3FdurationFrom+%3B%0D%0A++++++++++++++++%3AdurationTo+%3FdurationTo]%3B%0D%0A+++++++++++%3Aneeds+%3Fskill+%3B%0D%0A+++++++++++%3AprojectTitle+%3FprojectTitle+.%0D%0A%0D%0A++++%3C{$person}%3E+%0D%0A++++++++++++%3AhasProficiency+[+%3Acharacterizes+%3Fskill+]+%3B%0D%0A++++++++++++%3AfirstName+%3FpersonFirstName+%3B%0D%0A++++++++++++%3AlastName+%3FpersonLastName+%3B%0D%0A++++++++++++%3AhasAvailability+%3Favailability.%0D%0A%0D%0A++++%3Fskill+%3AskillType+%3Fskillname+.+%0D%0A%0D%0A%3Favailability+%3AmustFitWith[%3AdurationFrom+%3FavailableFrom+%3B+%3AdurationTo+%3FavailableTo].%0D%0A%0D%0AFilter%28%28%3FdurationFrom+%3E%3D+%3FavailableFrom+%26%26+%3FdurationTo+%3C%3D+%3FavailableTo%29%29.%0D%0A%7D&amp;output=xml&amp;stylesheet=%2Fxml-to-html.xsl">Find all projects that meets this person's availability and skill</a>
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
