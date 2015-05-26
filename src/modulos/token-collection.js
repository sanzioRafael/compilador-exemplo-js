var tiposToken = require("./tipo-token");

function Token(value, line){
	this.value = value || "";
	this.line = line || -1;
	this.type = tiposToken.word;
}

function TokenCollection(){

	this.tokens = [];
	this.current = -1;
	
}

TokenCollection.prototype.add = function(value, line, type){
	
	var token = new Token(value, line);
	
	if(type){
		token.type = type;
		var ultimo = this.tokens[this.tokens.length - 1];
		if(ultimo.type == tiposToken.fimInstrucao && type == ultimo.type){
			return;
		}
	}
	
	this.tokens.push(token);
};

TokenCollection.prototype.toArray = function(){
	return this.tokens.slice();
};

TokenCollection.prototype.next = function(){
	this.current += 1;
	if(this.current >= this.tokens.length ){
		return null;
	}
	return this.tokens[this.current];
};

TokenCollection.prototype.getInstrucoes = function () {
	
	var instrucoes = []
	var instrucao = [];
	
	var token = null;
	
	while((token = this.next()) != null){
		if(token.type == tiposToken.fimInstrucao){
			instrucoes.push(instrucao)
			instrucao = [];
			continue;
		}
		instrucao.push(token);
	}
	
	if(instrucao.length){
		instrucoes.push(instrucao);
	}

	return instrucoes;

}

module.exports = TokenCollection;