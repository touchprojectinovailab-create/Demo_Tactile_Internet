const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const conn1 = mongoose.createConnection(process.env.MONGODB_URI_READ, { useNewUrlParser: true, useUnifiedTopology: true });
const conn2 = mongoose.createConnection(process.env.MONGODB_URI_WRITE, { useNewUrlParser: true, useUnifiedTopology: true });

const tactileSensationsSchema = {
   id_tactile: String,
   tactileSensationName: String,
   textureType: String,
   highPulseMs_high_speed: String,
   lowPulseMs_high_speed: String,
   frequency_high_speed: String,
   dutyCycle_high_speed: String,
   hp_high_speed: Number,
   lp_high_speed: Number,
   hp_high_speed_ms: Number,
   lp_high_speed_ms: Number,
   t_high_speed_ms: Number,
   d_high_speed_ms: Number,
   highPulseMs_low_speed: String,
   lowPulseMs_low_speed: String,
   frequency_low_speed: String,
   dutyCycle_low_speed: String, 
   hp_low_speed: Number,  
   lp_low_speed: Number,
   hp_low_speed_ms: Number,
   lp_low_speed_ms: Number,
   t_low_speed_ms: Number,
   d_low_speed_ms: Number
}

const TactileSensation = conn1.model("TactileSensation", tactileSensationsSchema);

const highPulseLowPulseMsDataSchema = {
   hp_ms: Number,
   lp_ms: Number,
   t: Number,
   d: Number
}

const HighPulseLowPulseMsData = conn2.model('HighPulseLowPulseMsData', highPulseLowPulseMsDataSchema);

const test = new HighPulseLowPulseMsData({
   hp_ms: 0,
   lp_ms: 0,
   t: 0,
   d: 0
});   

const absence_of_sensation = new TactileSensation({
   id_tactile: "0",
   tactileSensationName: "Absence of Sensation",
   textureType: "External movements, in texture regions, represent absence of tactile sensation",
   highPulseMs_high_speed: "0ms",
   lowPulseMs_high_speed: "0ms",
   frequency_high_speed: "0Hz",
   dutyCycle_high_speed: "0%",
   hp_high_speed: 0,
   lp_high_speed: 0,
   hp_high_speed_ms: 0,
   lp_high_speed_ms: 0,
   t_high_speed_ms: 0,
   d_high_speed_ms: 0,
   highPulseMs_low_speed: "0ms",
   lowPulseMs_low_speed: "0ms",
   frequency_low_speed: "0Hz",
   dutyCycle_low_speed: "0%", 
   hp_low_speed: 0,  
   lp_low_speed: 0,
   hp_low_speed_ms: 0,
   lp_low_speed_ms: 0,
   t_low_speed_ms: 0,
   d_low_speed_ms: 0
});

const coarse_roughness = new TactileSensation({
   id_tactile: "1",
   tactileSensationName: "Coarse Roughness",
   textureType: "Similar to contact with different thicknesses boulders",
   highPulseMs_high_speed: "45ms",
   lowPulseMs_high_speed: "94ms",
   frequency_high_speed: "7.2Hz",
   dutyCycle_high_speed: "32%",
   hp_high_speed: 173,
   lp_high_speed: 362,
   hp_high_speed_ms: 45,
   lp_high_speed_ms: 94,
   t_high_speed_ms: 139,
   d_high_speed_ms: 32,
   highPulseMs_low_speed: "80ms",
   lowPulseMs_low_speed: "170ms",
   frequency_low_speed: "4Hz",
   dutyCycle_low_speed: "68%", 
   hp_low_speed: 308,  
   lp_low_speed: 654,
   hp_low_speed_ms: 80,
   lp_low_speed_ms: 170,
   t_low_speed_ms: 250,
   d_low_speed_ms: 68
});

const fine_roughness = new TactileSensation({
   id_tactile: "2",
   tactileSensationName: "Fine Roughness",
   textureType: "Similar to contact with different thicknesses boulders",
   highPulseMs_high_speed: "22ms",
   lowPulseMs_high_speed: "42ms",
   frequency_high_speed: "15.6Hz",
   dutyCycle_high_speed: "34%",
   hp_high_speed: 85,
   lp_high_speed: 162,
   hp_high_speed_ms: 22,
   lp_high_speed_ms: 42,
   t_high_speed_ms: 64,
   d_high_speed_ms: 34,
   highPulseMs_low_speed: "28.33ms",
   lowPulseMs_low_speed: "55ms",
   frequency_low_speed: "12Hz",
   dutyCycle_low_speed: "34%", 
   hp_low_speed: 109,  
   lp_low_speed: 212,
   hp_low_speed_ms: 28,
   lp_low_speed_ms: 55,
   t_low_speed_ms: 83,
   d_low_speed_ms: 34
});

const smoothness = new TactileSensation({
   id_tactile: "3",
   tactileSensationName: "Smoothness",
   textureType: "It indicates contact with materials similar to polished wood",
   highPulseMs_high_speed: "2ms",
   lowPulseMs_high_speed: "1ms",
   frequency_high_speed: "333Hz",
   dutyCycle_high_speed: "67%",
   hp_high_speed: 8,
   lp_high_speed: 4,
   hp_high_speed_ms: 2,
   lp_high_speed_ms: 1,
   t_high_speed_ms: 3,
   d_high_speed_ms: 67,
   highPulseMs_low_speed: "1.38ms",
   lowPulseMs_low_speed: "1.62ms",
   frequency_low_speed: "333Hz",
   dutyCycle_low_speed: "46%", 
   hp_low_speed: 5,  
   lp_low_speed: 6,
   hp_low_speed_ms: 1,
   lp_low_speed_ms: 2,
   t_low_speed_ms: 3,
   d_low_speed_ms: 46
});

const softness = new TactileSensation({
   id_tactile: "4",
   tactileSensationName: "Softness",
   textureType: "Similar to the experience of running fingers over cotton",
   highPulseMs_high_speed: "1.44ms",
   lowPulseMs_high_speed: "4.56ms",
   frequency_high_speed: "166.7Hz",
   dutyCycle_high_speed: "24%",
   hp_high_speed: 6,
   lp_high_speed: 18,
   hp_high_speed_ms: 1,
   lp_high_speed_ms: 5,
   t_high_speed_ms: 6,
   d_high_speed_ms: 24,
   highPulseMs_low_speed: "1ms",
   lowPulseMs_low_speed: "5ms",
   frequency_low_speed: "166.7Hz",
   dutyCycle_low_speed: "16.7%", 
   hp_low_speed: 4,  
   lp_low_speed: 19,
   hp_low_speed_ms: 1,
   lp_low_speed_ms: 5,
   t_low_speed_ms: 6,
   d_low_speed_ms: 17
});


absence_of_sensation.save();
coarse_roughness.save();
fine_roughness.save();
smoothness.save();
softness.save();


/*
TactileSensation.findByIdAndRemove("63f129da82a3bea1e2691429", function(err){
   if(!err){
     console.log("Tactile sensation successfully deleted.");
   }
});
*/

var oldMouseSpeedValue = 0;

var velMaxPassive = 600;

var hp_value; //high pulse
var lp_value; //low pulse

var value_hp_high_speed_ms;
var value_lp_high_speed_ms;
var value_hp_low_speed_ms;
var value_lp_low_speed_ms;
var t_ms;
var duty_cycle;

var auxBinarySpeed;

var auxLimitedVel;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//-------------------------------------------------------------------------

app.post("/zero", function(req, res){
   var num0 = Number(req.body.id_zero);
   var idTactile0 = num0.toString();
   console.log("idTactile: ", idTactile0);
});

//---------------------------------------------------

app.post("/one", function(req, res){
   var num1 = Number(req.body.id_one);
   var idTactile1 = num1.toString();
   console.log("idTactile: ", idTactile1);            
});

//---------------------------------------------------

app.post("/two", function(req, res){
   var num2 = Number(req.body.id_two);
   var idTactile2 = num2.toString();
   console.log("idTactile: ", idTactile2);       
});

//---------------------------------------------------

app.post("/three", function(req, res){
   var num3 = Number(req.body.id_three);
   var idTactile3 = num3.toString();
   console.log("idTactile: ", idTactile3);             
});

//---------------------------------------------------

app.post("/four", function(req, res){
   var num4 = Number(req.body.id_four);
   var idTactile4 = num4.toString();
   console.log("idTactile: ", idTactile4);      
});

//-------------------------------------------------------------------------

function sendTactileSensation(vel, velMax, idTactile){
   console.log("vel", vel);
   console.log("velMax", velMax);
   console.log("idTactile", idTactile);
   
   readFromDatabase(idTactile); 

   console.log("value_hp_high_speed_ms", value_hp_high_speed_ms);
   console.log("value_lp_high_speed_ms", value_lp_high_speed_ms);
   console.log("t_ms", t_ms);
   console.log("duty_cycle", duty_cycle);
   
   /*

   hp_value = Math.round(highPulse(vel, velMax, value_hp_high_speed_ms, value_lp_high_speed_ms));
   lp_value = Math.round(lowPulse(vel, velMax, value_hp_low_speed_ms, value_lp_low_speed_ms));

   t_ms = hp_value + lp_value;
   
   duty_cycle = Math.round((100*hp_value)/t_ms)

   console.log("limitedSpeed: ", auxLimitedVel);

   console.log("v_high: ", hp_value);
   console.log("v_low: ", lp_value + "\n");

   */

   HighPulseLowPulseMsData.findByIdAndUpdate("68e1783e009439d30f02085f", { hp_ms: value_hp_high_speed_ms }, function(err){
      if (err){
         console.log(err);
      }
   });

   HighPulseLowPulseMsData.findByIdAndUpdate("68e1783e009439d30f02085f", { lp_ms: value_lp_high_speed_ms }, function(err){
      if (err){
         console.log(err);
      }
   });
   
   HighPulseLowPulseMsData.findByIdAndUpdate("68e1783e009439d30f02085f", { t: t_ms }, function(err){
      if (err){
         console.log(err);
      }
   });

   HighPulseLowPulseMsData.findByIdAndUpdate("68e1783e009439d30f02085f", { d: duty_cycle }, function(err){
      if (err){
         console.log(err);
      }
   });
   
}

//-------------------------------------------------------------------------

function readFromDatabase(tactile_id){
   TactileSensation.find({id_tactile: tactile_id}, function(err, tactilesensations){
      if (err) {
         console.log(err);
      }else{
         tactilesensations.forEach(function(tactilesensation){
            value_hp_high_speed_ms = tactilesensation.hp_high_speed_ms;
            value_lp_high_speed_ms = tactilesensation.lp_high_speed_ms;
            t_ms = tactilesensation.t_high_speed_ms;
            duty_cycle = tactilesensation.d_high_speed_ms;   
         });
      }    
   });
}

//-------------------------------------------------------------------------
/*
function highPulse(vel, velMax, v_hp_high_speed, v_hp_low_speed){
   var limitedVelValue = limitedVel(vel, velMax);
   var velActivePassive = limitedVelValue/velMax;
   var hp = binarySpeed(velActivePassive)*v_hp_low_speed+velActivePassive*(v_hp_high_speed-v_hp_low_speed);
   return hp;
}
//-------------------------------------------------------------------------

function lowPulse(vel, velMax, v_lp_high_speed, v_lp_low_speed){
   var limitedVelValue = limitedVel(vel, velMax);
   var velActivePassive = limitedVelValue/velMax;
   var lp = binarySpeed(velActivePassive)*v_lp_low_speed+velActivePassive*(v_lp_high_speed-v_lp_low_speed);
   return lp;
}
//-------------------------------------------------------------------------

function limitedVel(vel, velMax){
   if(vel >= velMax){
      auxLimitedVel = velMax;
   }
   if(vel < velMax){
      auxLimitedVel = vel;
   }
   
   return auxLimitedVel;
}
//-------------------------------------------------------------------------

function binarySpeed(vel){
   if(vel == 0){
      auxBinarySpeed = 0;
   }

   if(vel > 0){
      auxBinarySpeed = 1;
   }
   return auxBinarySpeed;
}
*/
//-------------------------------------------------------------------------

io.on('connection', (socket) => {
   socket.on('mouse_speed_track', function(speed_value, idTactile){
      if(oldMouseSpeedValue == 0 || speed_value == oldMouseSpeedValue){
         oldMouseSpeedValue = speed_value;
      }else if(speed_value != oldMouseSpeedValue){
         oldMouseSpeedValue = speed_value;
         /*
         console.log("speedValue: ", speed_value);
         console.log("idTactile: ", idTactile);
         */
         sendTactileSensation(Math.round(speed_value), velMaxPassive, idTactile);
      }
   });
     
   socket.on('disconnect', function(){
      //console.log('user disconnected');
   });
});       

//-------------------------------------------------------------------------

function main(){

   app.use('/Tactile_Glove_Experiment_QoE', express.static(__dirname + '/Tactile_Glove_Experiment_QoE'));
   app.use('/dist', express.static(__dirname + '/dist'));
   app.get("/", function(req, res){
      res.render("indeex", {});
   });
   app.get("/views/indeex.ejs", function(req, res){
      res.render("indeex", {}); 
   });
   app.get("/views/camisabasica.ejs", function(req, res){
      res.render("camisabasica", {});  
   });
   app.get("/views/camisapolo.ejs", function(req, res){
      res.render("camisapolo", {});  
   });
   app.get("/views/casacoalgodao1.ejs", function(req, res){
      res.render("casacoalgodao1", {}); 
   });
   app.get("/views/casacoalgodao2.ejs", function(req, res){
      res.render("casacoalgodao2", {});  
   });
   app.get("/views/casacocroche1.ejs", function(req, res){
      res.render("casacocroche1", {});  
   });
   app.get("/views/casacocroche2.ejs", function(req, res){
      res.render("casacocroche2", {});  
   });
   app.get("/views/casacocroche3.ejs", function(req, res){
      res.render("casacocroche3", {});  
   });
   app.get("/views/casacocroche4.ejs", function(req, res){
      res.render("casacocroche4", {});  
   });
   app.get("/views/roupajeans.ejs", function(req, res){
      res.render("roupajeans", {});  
   });
   app.get("/views/salto.ejs", function(req, res){
      res.render("salto", {});  
   });
   app.get("/views/sandalia_amarela.ejs", function(req, res){
      res.render("sandalia_amarela", {});  
   });
   app.get("/views/sueter1.ejs", function(req, res){
      res.render("sueter1", {});  
   });
   app.get("/views/sueter2.ejs", function(req, res){
      res.render("sueter2", {});  
   });
   app.get("/views/sueter3.ejs", function(req, res){
      res.render("sueter3", {});  
   });
   app.get("/views/tenis.ejs", function(req, res){
      res.render("tenis", {});  
   });
   app.get("/cadastro.html", function(req, res){
      res.sendFile(__dirname + "/cadastro.html");  
   });
   app.get("/camisas.html", function(req, res){
      res.sendFile(__dirname + "/camisas.html");  
   });
   app.get("/carrinho.html", function(req, res){
      res.sendFile(__dirname + "/carrinho.html");  
   });
   app.get("/casacos.html", function(req, res){
      res.sendFile(__dirname + "/casacos.html");  
   });
   app.get("/conta.html", function(req, res){
      res.sendFile(__dirname + "/conta.html");  
   });
   app.get("/contaconfirmada.html", function(req, res){
      res.sendFile(__dirname + "/contaconfirmada.html");  
   });
   app.get("/crochê.html", function(req, res){
      res.sendFile(__dirname + "/crochê.html");  
   });
   app.get("/jeans.html", function(req, res){
      res.sendFile(__dirname + "/jeans.html");  
   });
   app.get("/login.html", function(req, res){
      res.sendFile(__dirname + "/login.html");  
   });
   app.get("/sobre.html", function(req, res){
      res.sendFile(__dirname + "/sobre.html");  
   });   
}

// set an interval to update 2 times per second:
setInterval(main, 500);

//#######################################################################

server.listen(3000, function(){   
  console.log("Server is running on port 3000");
});














