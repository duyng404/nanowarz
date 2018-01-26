var TheGame = function(){
	// connection to server
	var peer;

	// put all the global variables in gvar
	var gvar = {};
	var hud = {};

	this.preload = function(){
		peer = new Peer({host: 'localhost', port: 8080, path: '/peerjs', debug: 3});
		peer.on('open',function(id){
			gvar.id = id;
			console.log('Peer id is: ' + id);
		});
		peer.on('connection',connectSuccess);
		peer.on('error',function(err){ console.log(err); });
	};

	this.create = function(){
		gvar.style = { font: "20px Arial", fill: "#ffffff", align: "center" };
		peer.listAllPeers(updateRooms);
		hud.refreshtext = game.add.text(20,20,"Refresh Peer List", gvar.style);
		hud.refreshtext.inputEnabled = true;
		hud.refreshtext.events.onInputUp.add(function(){
			peer.listAllPeers(updateRooms);
		});
	};

	function updateRooms(idList){
		if (hud.roomList) for (let i of hud.roomList){i.destroy()};
		hud.roomList = [];
		count = 0;
		for (let id of idList){
			if (id != gvar.id){
				hud.roomList.push(game.add.text(40, 50+25*count, id, gvar.style))
				hud.roomList[count].inputEnabled = true;
				hud.roomList[count].events.onInputUp.add(function(){
					connectClient(id);
				});
				count++;
			}
		}
	};

	function connectClient(id){
		gvar.conn = peer.connect(id);
		gvar.conn.on('open',function(){
			connectSuccess(gvar.conn);
		});
		gvar.conn.on('error', function(){ alert(err); });
	};

	function connectSuccess(c){
		// save the connection
		gvar.conn = c;

		// clear old hud
		for (let i of hud.roomList){ i.destroy(); }
		hud.roomList=[];
		hud.refreshtext.destroy();

		// new hud
		hud.sendRandomNumber = game.add.text(20,570,"Send#",gvar.style);
		hud.sendRandomNumber.inputEnabled = true;
		hud.sendRandomNumber.events.onInputUp.add(function(){
			// send a random number to the other
			var a = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
			a = { time:Date.now(), payload:a };
			gvar.conn.send(a);
			newMsg(a,'outbound');
		})

		// on receive data
		c.on('data', function(data){
			newMsg(data,'inbound');
			c.on('close',function(){
				console.log('connection closed');
			});
		});
	};

	function newMsg(a,s){
		// init
		var qmax = 20;
		if (!gvar.msgq) gvar.msgq=[];
		if (!hud.msgq) hud.msgq=[];
		// add msg to queue
		console.log(a);
		a.time=new Date(a.time);
		if (s=='inbound') a = a.time.getHours()+':'+a.time.getMinutes()+':'+a.time.getSeconds() + ' received: ' + a.payload;
		else if (s=='outbound') a = a.time.getHours()+':'+a.time.getMinutes()+':'+a.time.getSeconds() + ' sent: ' + a.payload;
		gvar.msgq.unshift(a);
		gvar.msgq.slice(0,qmax);

		// update hud
		for (var i=0; i<qmax; i++){
			if (gvar.msgq[i]){
				var newText = gvar.msgq[i];
				if (!hud.msgq[i]) { hud.msgq[i] = game.add.text(20,20+25*i,newText,gvar.style); }
				else { hud.msgq[i].text = newText };
			}
			else {
				if (hud.msgq[i]) hud.msgq[i].text = '';
			}
		}
	}

	this.render = function(){
//		console.log("this is render");
	};
}
