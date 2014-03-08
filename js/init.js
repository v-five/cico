//aici se creaza laboratoarele cu tot ce tine de ele
$(function(){
	//un obiect care o sa contina tot ce o sa gasim in stocul unui lab
	var storageContent = new Object();
	storageContent.consumables = new Array();
	storageContent.breakables = new Array();

	//in consumables adaugam tot ce tine de cunsumabile
	storageContent.consumables.push("Seringe");
	storageContent.consumables.push("Eprubete");

	storageContent.breakables.push("Aparat analize sange");
	storageContent.breakables.push("Aparat analize altceva");

	//cream un container html unde au sa fie adaugate laboratoarele
	labCont = new labContainer();
	labCont.div.appendTo("body");

	//cream laboratoarele ( pot fi create mai multe sau mai putine )
	var lab1 = new lab("Lab 1", storageContent);
	labCont.addNewLab(lab1);
	var lab2 = new lab("Lab 2", storageContent);
	labCont.addNewLab(lab2);
	var lab3 = new lab("Lab 3", storageContent);
	lab3.div.html.css('margin-right', "25px");
	labCont.addNewLab(lab3);


	//momentan facem un random pt cat de pline sunt stocurile
	$(".consumables").each(function(){
		$(this).progressbar("option", {
			value: Math.floor((Math.random()*100)+1)
		});
	});

	$(document).tooltip();

	//cream meniul cu jquery ui
	$("#menu")
			.css({
				'width': "auto",
				'height': "20px",
				'position': "absolute"
			})
			.menu();
});

//clasa laborator
var lab = function(name, storageContent){
	this.div = new div();
	this.storage = new storage(storageContent);
	this.clientQueue = new clientQueue(name);

	this.div.html
			.css({
				'backgroundColor': "#4FA46B",
				'color': "white",
				'width': "300px",
				'height': "450px",
				'margin-left': "25px",
				'display': "inline-block"
			})
			.append(
					$("<h1></h1>")
							.text(name)
			)
			.append($("<hr>").width("80%"))
			.append(this.storage.div.html)
			.append(this.clientQueue.div.html)
			.addClass("lab")
	;
}

//clasa stoc
var storage = function(storageContent){
	this.div = new div();
	this.div.html
			.css({
				'backgroundColor': "#81d19a",
				'width': "120px",
				'height': "360px",
				'float': "left"
			})
			.addClass("storage")
	;
	this.div.html.html("<br>Storage").append($("<hr>").width("80%"));
	for(i=0; i < storageContent.consumables.length; i++){
		this[name] = new consumables(storageContent.consumables[i]);
		this.div.html.append(this[name].div.html);
	}
	for(i=0; i < storageContent.breakables.length; i++){
		this[name] = new breakables(storageContent.breakables[i]);
		this.div.html.append(this[name].div.html);
	}
}

//clasa pt containerul in care au sa fie adaugate laboratoarele
var labContainer = function(){
	this.div = new div();
	this.div.html
			.css({
				'width': "auto",
				'height': "500px",
				'backgroundColor': "#2E5F3E",
				'textAlign': "center"
			})
			.append(
					$("<div></div>")
							.css({
								'display': "inline-block",
								'margin-top': "25px"
							})
							.prop('id', "labContainer")
							.addClass("labContainer")
			);
	this.LCounter = 0;
	this.labs = new Array();
	this.addNewLab = function(lab){
		lab.div.appendTo("#labContainer");
		this.LCounter++;
		this.labs[this.LCounter] = lab;
	}
}

//clasa pt consumabile
var consumables = function(name){
	this.div = new div();
	this.div.html
			.css({
				'backgroundColor': "#4FA46B",
				'width': "95%",
				'height': "10px",
				'margin': "auto",
				'margin-bottom': "5px"
			})
			.prop('title', name)
			.addClass("consumables")
			.progressbar({
				value: false
			});
	;
}

//clasa pt breakables ( in cazul nostru aparatele de analize)
var breakables = function(name){
	this.div = new div();
	this.div.html
			.css({
				'backgroundColor': "#4FA46B",
				'width': "95%",
				'height': "10px",
				'margin': "auto",
				'margin-bottom': "5px"
			})
			.prop('title', name)
			.addClass("breakables")
			.progressbar({
				value: false
			});
	;
}

//clasa clientQueue ( e evident ce e :) )
var clientQueue = function(labName){
	this.div = new div();
	this.div.html
			.css({
				'width': "170px",
				'height': "360px",
				'float': "right"
			})
			.addClass("clientQueue")
	;
	this.labName = labName;
	//cati clienti sunt acum in q
	this.QCounter = 0;
	//max clienti care incap in q
	this.MaxQCounter = 10;

	//se adauga client in q
	this.addClient = function(client){
		//se adauga in html
		this.div.html.append($("<p></p>").text(client.fullName).attr("title", client.Analysis).css('text-align', "left"));
		//se adauga in q
		this.QCounter++;
	}
}

//clasa client
var Client = function(FName, LName, Analysis){
	this.div = new div();
	this.div.html
			.text(name)
			.addClass("client")
	;

	this.FName = FName;
	this.LName = LName;
	//fullName va fi afisat in clientQueue in interfata web
	this.fullName = this.FName + " " + this.LName;
	this.Analysis = Analysis;
}

//clasa div pt ca sa fie mai usor de folosit in codul de mai sus :)
var div = function(){
	//se creaza un div cu jquery
	this.html = $("<div></div>");
	this.appendTo = function(container){
		this.html.appendTo(container);
	}
}