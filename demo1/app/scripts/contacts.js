var App = App || {};

var ViewModel = function(){
	this.contacts = ko.observableArray();
	this.selectedContact = ko.observable();
	var self = this;
	this.someoneSelected = ko.computed(function(){
		return self.selectedContact()!=null;
	})
}

function Contact(name,web,image){
	this.name = name;
	this.web = web;
	this.notes = '';
	this.image = image;
	var self = this;
	this.urlImage = ko.computed(function(){
		return "/images/"+self.image;
	})
}

App.selectContact = function(){
	App.model.selectedContact(this);
}

App.deleteContact = function(){
	alert('deleted');
}

App.goBackList = function(){
	App.model.selectedContact(null);
}


$(document).ready(function(){
	var model = App.model = new ViewModel();
	ko.applyBindings(model);

	//Crear contactos de prueba.
	model.contacts.push(new Contact('Carla','http://www.mycoolapp.com/carla','1.jpg'));
	model.contacts.push(new Contact('John','http://www.mycoolapp.com/john','2.jpg'));
	model.contacts.push(new Contact('Peter','http://www.mycoolapp.com/peter','3.jpg'));
	model.contacts.push(new Contact('Daniela','http://www.mycoolapp.com/daniela','4.jpg'));

	//Mostrar imagen en grid cuando se haga hover
	$(".contactLink").live('mouseover',function(){
		$('.contactImage').hide();
		var img = $(this).siblings('.contactImage');
		img.show();
		console.log('mouseover contact');
	});

});