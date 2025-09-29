

//-----------  Configuration ----------------- //

     var firebaseConfig = {
        apiKey: "AIzaSyAAZSDa4A3ytc-QbeIYCV86QPzlexS2HOg",
        authDomain: "telemedicines-123c0.firebaseapp.com",
        databaseURL: "https://telemedicines-123c0.firebaseio.com",
        projectId: "telemedicines-123c0",
        storageBucket: "telemedicines-123c0.appspot.com",
        messagingSenderId: "490806536805",
        appId: "1:490806536805:web:73a3b462b3e52df8c5748c",
        measurementId: "G-QPEMY0KWSQ"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      var database = firebase.database();


    // -----------------------------------------------------//  



function getUnique(array){
    var uniqueArray = [];
        
        // Loop through array values
        for(i=0; i < array.length; i++){
            if(uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
}




window.onload = function () {


 var orderRef = database.ref('order detail');
 var order_list=[];
 orderRef.on('value', function(snapshot) {
       const object=snapshot.val();
       for (const [key, value] of Object.entries(object)) {
        var q =parseInt(value["Quantity"]);
          console.log(value["Quantity"]);
            for(var j=0;j<q;j++){
            order_list.push(value["Product Name"])
            }

       }



       order_list=getUnique(order_list);
       data_point=[];
       var i;
      for (i = 0; i < order_list.length; i++) {
        var count=0;
        orderRef.on('value', function(snapshot) {
            const object=snapshot.val();
         for (const [key, value] of Object.entries(object)) {
              if(order_list[i]==value['Product Name'])
              {
                  count=count+1;
              }
         }

       });
      data_point.push({y:count,label:order_list[i]});
      console.log(data_point);


      }

      var chart = new CanvasJS.Chart("chartContainer_bar", {
        animationEnabled: true,

        title:{
          text:"Overall Analysics Perform"
        },
        axisX:{
          interval: 1
        },
        axisY2:{
          interlacedColor: "#D7BDE2",
          gridColor: "#ab47bc",
        },
        data: [{
          type: "bar",
          name: "companies",
          axisYType: "secondary",
          color: "#ab47bc",
          dataPoints: data_point
        }]
      });
      chart.render();


 });



}
