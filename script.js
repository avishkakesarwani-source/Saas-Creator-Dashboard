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
// postForm.addEventListener("submit",(e)=>{
//     e.preventDefault();//stops page refresh
//     const title= document.getElementById('post-title').value;
//     const date=document.getElementById('release-date').value;
//     const views=document.getElementById('post-views').value;
//     const status=document.getElementById('post-status').value;
//     const newRow= document.createElement('tr');
//     newRow.innerHTML=`
//         <td>${title}l</td>
//         <td>${date}</td>
//         <td>${views}</td>
//         <td>${status}</td>
//         `;
//     tbody.appendChild(newRow);
//     // clearing form and hiding model
//     postForm.reset();
//     document.getElementById('modal-overlay').style.display='none';
// });

//1. Database se posts fetch karke cards to dynammically compute krna
function fetchPosts() {
    fetch('/api/posts') // Relative path automatically 8080 port use karega
        .then(res => res.json())
        .then(posts => {
            if (Array.isArray(posts)) {
                tbody.innerHTML = ''; // clear table
                let totalViewsCount=0;
                posts.forEach(post => {
                    const newRow = document.createElement('tr');
                    const cleanDate = post.release_date ? post.release_date.split('T')[0] : '';
                    totalViewsCount += parseInt(post.views)||0;
                    newRow.innerHTML = `
                        <td>${post.title}</td>
                        <td>${cleanDate}</td>
                        <td>${post.views}</td>
                        <td>${post.status}</td>
                    `;
                    tbody.appendChild(newRow);
                });
                // Top Cards Update karna
                updateMetricCards(posts.length, totalViewsCount);
            }
        })
        .catch(err => console.error(" Fetch Error:", err));
}
// 2.  function to run Top Metric Cards  Dynamically 
function updateMetricCards(totalPosts, totalViews) {
    const totalPostsCard = document.getElementById('total-posts-count');
    const totalViewsCard = document.getElementById('total-views-count');

    if (totalPostsCard) totalPostsCard.innerText = totalPosts;
    if (totalViewsCard) totalViewsCard.innerText = totalViews;
}

// 3. Delete Post Function
function deletePost(id) {
    if (confirm("do you wanna delete this post")) {
        fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log("Deleted:", data);
            fetchPosts(); // Delete hone ke baad DB se updated list dobara fetch karo
        })
        .catch(err => console.error("Delete Error:", err));
    }
}
// Initial Call on Page Load
fetchPosts();

// 4.Form Submit Handler
if (postForm) {
    postForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const postData = {
            title: document.getElementById('post-title').value,
            date: document.getElementById('release-date').value,
            views: document.getElementById('post-views').value,
            status: document.getElementById('post-status').value
        };

        fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Backend Response:", data);
            fetchPosts(); // Reload table from DB
            postForm.reset();
            const modalOverlay = document.getElementById('modal-overlay');
            if (modalOverlay) modalOverlay.style.display = 'none';
        })
        .catch(err => console.error(" Save Error:", err));
    });
}