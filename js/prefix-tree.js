var Node = function(){
	this.Key = '';
	this.Parent = null;
	this.LematizedNodes = [];
	this.TerminalLocations = [];
};


var PrefixTree = function(){
	var _root = new Node();
	
	this.getRoot = function(){ return _root; }
	
	var _getNodeForWord = function(word)
	{
		if (!word || word.length == 0)
			return null;
					
		var curr = _root;
		for (var i = 0; i < word.length; ++i)
		{
			var c = word[i];
			var next = curr[c];
			if (!next){ 
				next = new Node();
				next.Key = c;
				next.Parent = curr;
				curr[c] = next;
			}
			curr = next;
		}
		
		return curr;
	}
	
	this.clear = function(){
		_root = new Node();
	};
	
	this.push = function(word, lemma, paragraphIndex, paragraphOffset){
		if (!word || word.length == 0)
			return;

		if (!lemma || lemma.length == 0)
			return;
		
		word = word.toLowerCase();
		lemma = lemma.toLowerCase();
		var wordNode = _getNodeForWord(word);
		
		var terminalLocation = {
			'paragraphIndex': paragraphIndex,
			'paragraphOffset': paragraphOffset
		};
		
		wordNode.TerminalLocations.push(terminalLocation);
		
		if (word != lemma)
		{
			var lemmaNode = _getNodeForWord(lemma);
			if (!lemmaNode.LematizedNodes.includes(wordNode))
			{
				lemmaNode.LematizedNodes.push(wordNode);
			}
			else
			{
				console.log('found');
			}
		}
		//console.log(_root);
	};
	
	var _appendWordRec = function(currentStr, node, words)
	{
		if (node.TerminalLocations.length > 0)
		{
			words.push({
				'value': currentStr,
				'count': node.TerminalLocations.length
			});
		}
		
		for (var key in node)
		{
			if (key.length != 1) continue;
			_appendWordRec(currentStr + key, node[key], words);
		}
	};
	
	this.enumerateWords = function(){
		var words = [];
		_appendWordRec('', _root, words);
		return words;
	},
	
	this.enumerateWordPositions = function(word){
		if (!word || word.length == 0)
			return [];
		
		word = word.toLowerCase();
			
		var curr = _root;
		for (var i = 0; i < word.length; ++i)
		{
			var c = word[i];
			//console.log(c);
			var next = curr[c];
			if (!next) {
				return [];
			}

			curr = next;
		}
		
		var copy = [];
		
		for (var t in curr.TerminalLocations){
			var loc = curr.TerminalLocations[t];
			copy.push({
				'paragraphIndex': loc.paragraphIndex,
				'paragraphOffset': loc.paragraphOffset
			});
		}
		
		
		return copy;
	}
};
