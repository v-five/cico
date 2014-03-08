$(function(){
	$( "#dialog-addNewClient" ).dialog({
		autoOpen: false,
		modal: true,
		closeOnEscape: true,
		title: "Add new Client",
		buttons: {
			"Add": function() {
				addNewClient();
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});

	/*
		onclick pe butonul de add client din meniu sa se deschida formularul de adaugare client
	*/
	$( "#AddNewClient" ).click(function() {
		//se reseteaza toate inputurile
		$( "#dialog-addNewClient input").val("");
		$( "#dialog-addNewClient" ).dialog( "open" );
	});
});

function addNewClient(){
	var FName = $("#dialog-addNewClient input[name=FName]").val();
	var LName = $("#dialog-addNewClient input[name=LName]").val();
	//aici trebuie sa se ia id-ul analizei ( momentan e numele analizei )
	var Analysis = $("#dialog-addNewClient input[name=Analysis]").val();
	/* aici trebuie instantian un obiect de tip Analys */
	//cream obiectul client ( param Analysis trebuie schimbat cu obiectul care va fi creat in randul de mai sus )
	var client = new Client(FName, LName, Analysis);

	//aici cautam in care lab sa fie adaugat clientul
	minQ = labCont.labs[labCont.LCounter].clientQueue.MaxQCounter;
	for(i=1; i<=labCont.LCounter; i++)
		if(minQ > labCont.labs[i].clientQueue.QCounter){
			minQ = labCont.labs[i].clientQueue.QCounter;
			minQLab = labCont.labs[i];
		}
	//adaugam clientul in lista laboraturului mai putin plin
	minQLab.clientQueue.addClient( client);
}