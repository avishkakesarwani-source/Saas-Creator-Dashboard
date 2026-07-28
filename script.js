// selecting events
let input= document.querySelector('input');
let tbody_row=document.querySelectorAll('.body-row');
let openModalBtn=document.getElementById('open-modal-btn');
let closeModalBtn=document.getElementById('close-modal-btn');
let modalOverlay=document.getElementById('modal-overlay');


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

// creating new post
// open modal event
openModalBtn.addEventListener("click",()=>{
    modalOverlay.style.display='flex';
});
// close modal event
closeModalBtn.addEventListener("click",()=>{
    modalOverlay.style.display='none';
});
window.addEventListener('click',(e)=>{
    if(e.target===modalOverlay){
        modalOverlay.style.display='none';
    }
});