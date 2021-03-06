//<nowiki>
( function( mw, $ ) {
	$( function( ) {
		var tabMessages = mw.config.get( 'wgVisualEditorConfig' ).tabMessages;
		new mw.Api().get( {
			action: 'query',
			meta: 'allmessages',
			format: 'json',
			ammessages: 'editlink',
			amlang: mw.config.get( 'pageLanguageCode' ),
			rawcontinue: ''
		} ).done ( function ( editMsg ) {
			var edit = editMsg.query.allmessages[0]['*'];
			var editBeta = edit + ' ' + mw.msg( tabMessages[ 'editsectionappendix' ] );
			var editSource = mw.msg( tabMessages[ 'editsectionsource' ] );
			var namespaceNames = [], visualEditorNamespaces = [];
			$.each( mw.config.get( 'wgNamespaceIds' ), function ( i, v ) {
				namespaceNames[namespaceNames.length] = i;
				if ( $.inArray( v, wgVisualEditorConfig.namespaces ) !== -1 ) {
					visualEditorNamespaces[visualEditorNamespaces.length] = i;
				}
			} );
			if ( mw.user.options.get( 'visualeditor-enable' ) == '1' ) {
				$( 'span.lx' ).each( function ( ) {
					var thisLinkNS = '', thisLink = '', thisLinkTitle = '', thisLinkClass = '', thisLinkVE = '';
					if ( $( this ).find( 'a:first' ).html() !== undefined ) {
						thisLinkNS = $( this ).find( 'a:first' ).attr( 'href' ).match( /\/w(iki\/|\/index.php\?title=)([\w]*)(:.*)?/i );
					} else if ( $( this ).prev( 'a' ).html() !== undefined ) {
						thisLinkNS = $( this ).prev( 'a' ).attr( 'href' ).match( /\/w(iki\/|\/index.php\?title=)([\w]*)(:.*)?/i );
					}
					thisLinkNS = thisLinkNS[2].toLowerCase();
					if ( $.inArray( thisLinkNS, namespaceNames ) === -1 ) {
						thisLinkNS = '';
					}
					thisLink = $( this ).find( 'a:contains(' + edit + ')' );
					if ( $.inArray( thisLinkNS, visualEditorNamespaces ) !== -1 ) {
						if ( thisLink.attr( 'title' ) !== undefined && thisLink.attr( 'title' ) !== '' ) {
							thisLinkTitle = thisLink.attr( 'title' );
						}
						if ( thisLink.attr( 'class' ) !== undefined && thisLink.attr( 'class' ) !== '' ) {
							thisLinkClass = thisLink.attr( 'class' );
						}
						if ( thisLink.attr( 'href' ) !== undefined && thisLink.attr( 'href' ) !== '' ) {
							thisLinkVE = thisLink.attr( 'href' ).replace( '&action=edit', '&veaction=edit' );
							thisLink.after( '&nbsp;| <a title="' + thisLinkTitle +
								'" class="' + thisLinkClass +
								'" href="' + thisLinkVE +
								'">' + editBeta +
								'</a>' );
						} else {
							console.warn( 'No href found for:\n\t%s', $( this ).parent().html() );
						}
					}
					thisLink.text( editSource );
				} );
			}
		} );
	} );
} ( mediaWiki, jQuery ) );
//</nowiki>
