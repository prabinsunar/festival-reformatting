const fetch = require('node-fetch');

let result = {};
let band = {};
let recordLabel = {};

//fetch api for for festivals endpoint
fetch('https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals')
.then(response => response.json())
.then(data => {
    result = data;
    //looping through each element in the result object
    for (const [key, value] of Object.entries(result)) {
        band = value.bands;
        
        band.map(ele => {
            //checking if the recordlable for each band is defined or not
           if(ele.hasOwnProperty('recordLabel')){
            if(recordLabel.hasOwnProperty(ele.recordLabel)){
                if(Array.isArray(recordLabel[ele.recordLabel])){
                    let obj1 = {};
                   obj1[ele.name] = value.name;
                     recordLabel[ele.recordLabel].push(obj1);
                     recordLabel[ele.recordLabel].sort(compare);
                }else{
                   let obj = {};
                   obj[ele.name] = value.name;
                    recordLabel[ele.recordLabel] =  [recordLabel[ele.recordLabel]];
                    recordLabel[ele.recordLabel].push(obj);
                    recordLabel[ele.recordLabel].sort(compare);
                }
            }else{
                recordLabel[ele.recordLabel] = {};
                recordLabel[ele.recordLabel][ele.name] = value.name;
                
            }
           }else{
               let obj3 = {};
               obj3[ele.name] = value.name;
               if(recordLabel.hasOwnProperty('')){
              
                   let obj3 = {};
                   obj3[ele.name] = value.name;
                    recordLabel[''] =  [recordLabel['']];
                    recordLabel[''].push(obj3);
                    recordLabel[''].sort(compare);
                
                }else{
                    ele[recordLabel] = '';
                    recordLabel[ele.recordLabel][ele.name] =value.name;
                 }
           }
        });

    }
    //sorting the resulted array 
    const ordered = Object.keys(recordLabel).sort().reduce(
        (obj, key) => { 
          obj[key] = recordLabel[key]; 
          return obj;
        }, 
        {}
      );
    //writing output to the console in desired format
    for (const [key, value] of Object.entries(ordered)) {
        if(key === ''){
            console.log(`No record label`);
            if(Array.isArray(value)){
                value.forEach(ele => {
                    console.log(`  ${Object.keys(ele)[0]}`)
                    presentArray(ele);
                })
            }else{
                console.log(`  ${Object.keys(value)[0]}`)
                present(value);
            }
        }else{
            console.log(key)
            if(Array.isArray(value)){
                value.forEach(ele => {
                    console.log(`  ${Object.keys(ele)[0]}`)
                    presentArray(ele)
                })
            }else{
                console.log(`  ${Object.keys(value)[0]}`)
                present(value);
            }
        }
    }

});

         
//function for comparing and sorting band names
 function compare(a, b) {
    keyA = Object.keys(a);
    keyB = Object.keys(b);
  
    let comparison = 0;
    if (keyA > keyB) {
      comparison = 1;
    } else if (keyA < keyB) {
      comparison = -1;
    }
    return comparison;
  }
  
//checking if the band has undefined value for festival
function present(festive){
    if(Object.values(festive)[0]){
        console.log(`   ${Object.values(festive)[0]}`)
    }
}

//similar to present function but for array of band 
function presentArray(festive){
    if(Object.values(festive)[0]){
        console.log(`   ${Object.values(festive)[0]}`)
    }
}