;var Parsers = 
(function(){

	var _normalize = function(s){
		return s.replace(/\r\n|\r|\n/g, '\n');
	};
	
	var _trim = function (s) {
		return s.replace(/^\s+|\s+$/g, '');
	};
	
	var _removeEmptyLines = function(s){
		return s.replace(/(\n+)/g, '\n');
	};
	
	var TxtParser = function(){

		var _processedText = '';
		
		this.parse = function(fileContent){
			var processed = _normalize(fileContent);
			var trimmed = _trim(processed);
			_processedText = _removeEmptyLines(trimmed);
		};
		
		this.getParagraphs = function(){
			var strParagraphs = _processedText.split('\n');
			return strParagraphs;
		};
	};

	
	var SrtParser = function(){

		var _subtitles = [];
		
		this.parse = function(fileContent){

			var processed = _normalize(fileContent);
			var trimmed = _trim(processed);
			
			var perts = trimmed.split('\n\n');

			var index = 0;
			_subtitles = [];

			for(s in perts) {
				st = perts[s].split('\n');

				if(st.length >= 2) {
					var number = st[0];

					var start = _trim(st[1].split(' --> ')[0]);
					var end = _trim(st[1].split(' --> ')[1]);
					var text = st[2];

					if(st.length > 2) {
						for(j=3; j<st.length;j++)
						  text += ' ' + st[j];
					}

					_subtitles[index] = {
						number: number,
						start: start,
						end: end,
						text: text
					};
				}
				index++;
			}
		};
		
		this.getParagraphs = function(){
			var strParagraphs = [];
			for (var i = 0; i < _subtitles.length; ++i)
			{
				strParagraphs.push(/*_subtitles[i].start + ' -> ' + _subtitles[i].end + ': ' + */ _subtitles[i].text);
			}
			return strParagraphs;
		};
	};
		
	// var xmlParser = new DOMParser();
	// xmlDoc = xmlParser.parseFromString(fileContent, "text/xml");
	
	// var paragraphNodes = xmlDoc.getElementsByTagName("p");
	// var strParagraphs = [];
	
	// var i = 0, node;
	// while (node = paragraphNodes[i++]) {
		// strParagraphs.push(node.childNodes[0].nodeValue);
	// }

	var parserExists = function(parserType){
		switch(parserType.toUpperCase())
		{
			case 'TXT': return true;
			case 'SRT': return true;
			case 'FB2': return true;
			default: return false;
		}
	}
	
	var getParser = function(parserType){
		switch(parserType.toUpperCase())
		{
			case 'TXT': return new TxtParser();
			case 'SRT': return new SrtParser();
			case 'FB2': return null;
			default: return null;
		}
	};
	
	return {
		parserExists: parserExists,
		getParser: getParser
	};
})();
