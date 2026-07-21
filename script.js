// selecting events
let input= document.querySelector('input');
let tbody_row=document.querySelectorAll('.body-row');

// input.addEventListener("input",(e)=>{
//     console.log("pressed");
//     let filtertext=e.target.value.toLowerCase();
//     tbody_row.forEach(function(row) {
//         let posttitle=row.cells[0].textContent.toLowerCase();
//         if(posttitle.includes(filtertext)){
//             row.style.display="";
//         }
//         else{
//             row.style.display="none";
//         }
//     });
// });

input.addEventListener("input",(e)=>{
    let searchtext=e.target.value.toLowerCase();
    for(row of tbody_row){
        let rowtext= row.textContent.toLowerCase();
        if(rowtext.includes(searchtext)){
            row.style.display="";
        }
        else
        {
            row.style.display="none";
        }
    };
   
});