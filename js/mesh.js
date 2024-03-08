const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const poster = data.posts;
    // console.log(poster);
    displayAllPost(poster);
}



const displayAllPost = (poster) => {

    const allPost = document.getElementById('all-posts');
    allPost.textContent = '';

    poster.forEach(post => {
        // console.log(post);
        

        const divCard = document.createElement('div');
        divCard.innerHTML = `
        <div class="flex flex-col lg:flex-row p-5 card bg-base-300 shadow-xl mb-5">
        <div id="avatar-logo" class="avatar online w-24 h-24">
                        <div class="w-24 h-24 rounded-full">
                            <img src="${post.image}" />
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="flex justify-around">
                            <p class=" font-semibold"># ${post.category}</p>
                            <p class=" font-semibold">Author : ${post.author.name}</p>
                        </div>
                        <h2 class="card-title font-bold">${post.title}</h2>
                        <p class="text-slate-600">${post.description}</p>
                        
                        <div class="flex justify-between">
                            <div class="flex justify-center items-center gap-2">
                                <img src="images/Group13.png" alt="">
                                <p>${post.comment_count}</p>
                            </div>
                            <div class="flex justify-center items-center gap-2">
                                <img src="images/view.png" alt="">
                                <p>${post.view_count}</p>
                            </div>
                            <div class="flex justify-center items-center gap-2">
                                <img src="images/Group18.png" alt="">
                                <p>${post.posted_time}</p>
                            </div>
                            <div class="card-actions">
                                <button id="show-title" onclick="titleCount();titleShow('${post.title}','${post.view_count}')" class="btn"><img src="images/email.png" alt=""></button>
                            </div>
                        </div>
                    </div>
                </div>
        `;

        

        allPost.appendChild(divCard);


    });

    

}

const loadLatestPosts= async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data);
    const divLatestPost = document.getElementById('latest-posts');
    divLatestPost.textContent= '';
    for(const element of data){
        // console.log(element);


        const divCard = document.createElement('div');
        divCard.innerHTML = `
            <div class="rounded-2xl border">
                    <div class=" card bg-base-100 shadow-xl">
                        <figure class="px-10 pt-10"><img class="rounded-2xl"
                                src="${element.cover_image}"
                                alt="" /></figure>
                        <div class="card-body">
                            <div class="flex gap-4">
                                <img src="images/calender.png" alt="">
                                <p class="text-slate-600">${element?.author?.posted_date || 'No publish date'}</p>
                            </div>

                            <h2 class="card-title font-bold">${element.title}</h2>
                            <p class="text-slate-600">${element.description} </p>
                            <div class=" justify-start flex gap-6 items-center">
                                <img class="h-[60px] w-[60px] rounded-full" src="${element.profile_image}" alt="">
                                <div class="">
                                    <h5 class="text-lg font-bold">${element.author.name}</h5>
                                    <p class="text-slate-600">
                                    ${element?.author?.designation || 'Unknown'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        `;
        divLatestPost.appendChild(divCard);

    }
}


function setTextElementValueById(elementId, value) {
    const element = document.getElementById(elementId);
    element.innerText = value;
}

const titleCount = () =>{
    const element = document.getElementById('post-count');
    const elementValueText = element.innerText;
    const value = parseInt(elementValueText);
    let count = 0;
    count = value + 1;
    // console.log(count);
    setTextElementValueById('post-count', count);
    
}

const titleShow = (title, view) => {
        const titleContent = document.getElementById('title-content');
        const titleContainer = document.createElement('div');
        titleContainer.innerHTML = `
                <div class="flex justify-center items-center bg-white m-3 p-5 rounded-xl shadow-xl">
                    <h2 class="text-xl font-bold">${title}</h2>
                    <div class="flex justify-center items-center gap-2">
                        <img src="images/view.png" alt="">
                        <p>${view}</p>
                    </div>
                </div>
                `
                titleContent.appendChild(titleContainer);
}

const loadPost = async(categoryName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data = await res.json();
    const post = data.posts;
    displayAllPost(post);
}

const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('input-btn');
    const categoryName = searchField.value;
    loadPost(categoryName);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('spinner');

    if (isLoading) {
        loadingSpinner.classList.remove('hidden');

        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
        }, 2000);
    } else {
        loadingSpinner.classList.add('hidden');
    }
}


loadLatestPosts();
loadData();
