;var Parsers = 
(function(){
	
	var SrtParser = function(){

		var _subtitles = [];
		
		var _strip = function (s) {
			return s.replace(/^\s+|\s+$/g,"");
		}
		
		this.parse = function(fileContent){
			srt = fileContent.replace(/\r\n|\r|\n/g, '\n');

			srt = _strip(srt);

			var srt_ = srt.split('\n\n');

			var index = 0;
			_subtitles = [];

			for(s in srt_) {
				st = srt_[s].split('\n');

				if(st.length >= 2) {
					var number = st[0];

					var start = _strip(st[1].split(' --> ')[0]);
					var end = _strip(st[1].split(' --> ')[1]);
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
			case 'TXT': return null;
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
