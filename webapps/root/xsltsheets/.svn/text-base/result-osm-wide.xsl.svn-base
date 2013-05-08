<!-- Note: in at least some versions of libxslt (used by PHP), you can't 
	set global variables based on values retrieved by a key. Therefore this code 
	contains lots of redeclarations of the $northing, $easting, $lat, $long, 
	$label, $prefLabel, $altLabel, $title and $name variables. -->
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:import href="result-osm.xsl" />


	<xsl:template match="result" mode="style">
		<link rel="stylesheet" href="{$_resourceRoot}css/html5reset-1.6.1.css"
			type="text/css" />
		<link rel="stylesheet" href="{$_resourceRoot}css/jquery-ui.css"
			type="text/css" />
		<link rel="stylesheet" href="{$_resourceRoot}css/smoothness/jquery-ui.css"
			type="text/css" />
		<link rel="stylesheet" href="{$_resourceRoot}css/result_wide.css"
			type="text/css" />
		<xsl:comment>
			<xsl:text>[if IE]&gt;</xsl:text>
			<xsl:text>&lt;link rel="stylesheet" href="</xsl:text>
			<xsl:value-of select='$_resourceRoot' />
			<xsl:text>css/ie.css" type="text/css">&lt;/link></xsl:text>
			<xsl:text>&lt;![endif]</xsl:text>
		</xsl:comment>
	</xsl:template>


</xsl:stylesheet>
