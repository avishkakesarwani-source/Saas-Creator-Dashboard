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

// save post button
const postForm= document.getElementById('add-post-form');
const tbody=document.querySelector('tbody');
postForm.addEventListener("submit",(e)=>{
    e.preventDefault();//stops page refresh
    const title= document.getElementById('post-title').value;
    const date=document.getElementById('release-date').value;
    const views=document.getElementById('post-views').value;
    const status=document.getElementById('post-status').value;
    const newRow= document.createElement('tr');
    newRow.innerHTML=`
        <td>${title}l</td>
        <td>${date}</td>
        <td>${views}</td>
        <td>${status}</td>
        `;
    tbody.appendChild(newRow);
    // clearing form and hiding model
    postForm.reset();
    document.getElementById('modal-overlay').style.display='none';
});