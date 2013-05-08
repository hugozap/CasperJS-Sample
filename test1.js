var options = {
	verbose:false,
	logLevel:'info',
	viewportSize:{width:800,height:800}
}

var testUser = 'admin';
var testPwd = 'admin2013';
var startUrl = 'http://localhost:3501/login.html';

var casper = require('casper').create(options);
var x = require('casper').selectXPath;
phantom.screenNumber = 1;

casper.on('url.changed',function(){
	casper.echo('Url changed to:'+this.getCurrentUrl(),'INFO');
})

casper.on('page.error',function(msg,trace){
	casper.echo('Page error:'+msg+" "+trace,'ERROR');
})


//--------Iniciar en la URL de mi App ----------//

casper.start(startUrl);

//---------- Hacer click en botón sin escribir credenciales ------------ //

casper.then(function(){
	
	
});

casper.then(function(){
	this.click('#btnLogin');
	this.wait(200,function(){
		//Asegurarse que no dejó pasar pues no ingreso credenciales.
		this.test.assert(this.getCurrentUrl() === startUrl,this.getCurrentUrl());
		this.captureSelector('login1.png','body');
	})

});



//---------Asignar usuario y password correctos -----------//

casper.then(function(){
	this.fill('form',{
		username:testUser,
		password:testPwd
	},false);
});

casper.thenClick('#btnLogin',function(){
		this.wait(200,function(){
		this.captureSelector('screen1.png','body');
	})
})

//--------- Validar que la url sea la del home -----------//

casper.then(function(){
		//Asegurarse que no dejó pasar pues no ingreso credenciales.
	this.test.assertTitle('Home');
});

//--------- Validar que nombre de usuario sea mostrado -----//

casper.then(function(){
	this.test.assertSelectorHasText('#labelUser',testUser,"Nombre de usuario mostrado ok");
})

//---------- Ir a página de contactos ------ //

casper.then(function(){
	this.clickLabel('Contacts','a');
	this.wait(200,function(){
		this.captureSelector('contacts.png','body');
	});
	this.test.assertNotVisible('.contactDetails','Detalles no visibles');
});

//---------- Pasar mouse por un contacto y tomar foto -------//

casper.then(function(){
	this.mouseEvent('mouseover',x('//a[text()="Carla"]'));
	this.captureSelector('mouseover.png','body');
	this.test.assertVisible(".contactImage","imagen mostrada ok");
})

//-------- Hacer click en contacto, validar que se hayan mostrado detalles ------------ //

casper.then(function(){
	casper.clickLabel('Carla','a');
	//esperar que animacion termine
	this.wait(1000,function(){
		this.captureSelector('carlaSelected.png','body');
		this.test.assertVisible('.contactDetails','Detalles visibles');
	})
	
});

//-------- Probar que botón regresar funcione ----//
casper.then(function(){
	casper.clickLabel('Back to list','button');
	this.wait(1000,function(){
		this.captureSelector('listAgain.png','body');
		this.test.assertVisible('#contactList','lista visible y hover sobre daniela');
	})

});

//--------- Seleccionar Daniela -------
casper.then(function(){
	this.mouseEvent('mouseover',x('//a[text()="Daniela"]'));
	this.wait(100,function(){
		this.captureSelector('danielaSelected.png','body');
	})
});

//--------- Ejecutar código en el contexto remoto -------
casper.then(function(){
	var prueba = this.evaluate(function(){
		//Esto corre en el contexto remoto
		$('a').css('fontSize','30px');
	});

	this.captureSelector('fontSizeAugmented.png','body');
});

casper.run();