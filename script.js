// Load posts from localStorage in the Questions page
function loadPosts() {
    let postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    
    posts.forEach((post, index) => {
        let postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
            <p>${post.question}</p>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
            <div>
                ${post.replies.map((reply, rIndex) => `
                    <div class="reply">➡ ${reply} 
                        <button onclick="editReply(${index}, ${rIndex})">Edit</button> 
                        <button onclick="deleteReply(${index}, ${rIndex})">Delete</button>
                    </div>
                `).join("")}
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Function to submit a post
function submitPost() {
    let postInput = document.getElementById("postInput");
    let question = postInput.value.trim();

    if (question === "") return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push({ question: question, replies: [] });
    localStorage.setItem("posts", JSON.stringify(posts));

    postInput.value = "";
    loadPosts();
}

// Function to submit a review
function submitReview() {
    let reviewInput = document.getElementById("reviewInput");
    let ratingInput = document.getElementById("ratingInput");
    let imageUpload = document.getElementById("imageUpload");

    let review = reviewInput.value.trim();
    let rating = ratingInput.value.trim();
    let image = imageUpload.files[0];

    if (review === "" || rating === "") return;

    let reviewsContainer = document.getElementById("reviewsContainer");
    let reviewElement = document.createElement("div");
    reviewElement.className = "review";

    let imageUrl = "";
    if (image) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageUrl = e.target.result;
            reviewElement.innerHTML = `
                <p>${review} - ${rating} ⭐</p>
                <img src="${imageUrl}" alt="Review Image" style="width: 100px; height: auto;">
            `;
            reviewsContainer.appendChild(reviewElement);
        };
        reader.readAsDataURL(image);
    } else {
        reviewElement.innerHTML = `<p>${review} - ${rating} ⭐</p>`;
        reviewsContainer.appendChild(reviewElement);
    }

    reviewInput.value = "";
    ratingInput.value = "";
    imageUpload.value = "";
}
