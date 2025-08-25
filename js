const videos = [
    { src: 'video1.mp4', description: 'Description of the first video reel.' },
    { src: 'video2.mp4', description: 'Description of the second video reel.' },
];

let currentUser  = null;

// Check for existing user session
if (localStorage.getItem('username')) {
    currentUser  = localStorage.getItem('username');
    document.getElementById('auth-form').style.display = 'none';
    loadVideos();
}

document.getElementById('login-button').addEventListener('click', function() {
    const usernameInput = document.getElementById('username');
    currentUser  = usernameInput.value;
    if (currentUser ) {
        localStorage.setItem('username', currentUser );
        document.getElementById('auth-form').style.display = 'none';
        loadVideos();
    }
});

document.getElementById('register-button').addEventListener('click', function() {
    const usernameInput = document.getElementById('username');
    currentUser  = usernameInput.value;
    if (currentUser ) {
        localStorage.setItem('username', currentUser );
        document.getElementById('auth-form').style.display = 'none';
        loadVideos();
    }
});

document.getElementById('upload-button').addEventListener('click', function() {
    const videoInput = document.getElementById('video-upload');
    const descriptionInput = document.getElementById('video-description');
    const file = videoInput.files[0];
    const description = descriptionInput.value;

    if (file && description) {
        const videoURL = URL.createObjectURL(file);
        videos.push({ src: videoURL, description: description });
        loadVideos();
        videoInput.value = '';
        descriptionInput.value = '';
    }
});

function loadVideos() {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // Clear existing videos
    videos.forEach(video => {
        const reel = document.createElement('div');
        reel.className = 'reel';

        reel.innerHTML = `
            <video controls>
                <source src="${video.src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p>${video.description}</p>
            <div class="actions">
                <button class="like-button">❤ Like</button>
                <span class="like-count">0</span>
            </div>
            <div class="comments">
                <input type="text" class="comment-input" placeholder="Add a comment..." />
                <button class="comment-button">Comment</button>
                <ul class="comment-list"></ul>
            </div>
        `;

        reel.querySelector('.like-button').addEventListener('click', function() {
            const likeCountSpan = this.nextElementSibling;
            let count = parseInt(likeCountSpan.textContent);
            count++;
            likeCountSpan.textContent = count;
        });

        reel.querySelector('.comment-button').addEventListener('click', function() {
            const commentInput = reel.querySelector('.comment-input');
            const commentList = reel.querySelector('.comment-list');
            const commentText = commentInput.value;
            if (commentText) {
                const commentItem = document.createElement('li');
                commentItem.className = 'comment';
                commentItem.textContent = ${currentUser }: ${commentText};
                const deleteButton = document.createElement('span');
                deleteButton.textContent = '❌';
                deleteButton.className = 'delete-comment';
                deleteButton.addEventListener('click', function() {
                    commentList.removeChild(commentItem);
                });
                commentItem.appendChild(deleteButton);
                commentList.appendChild(commentItem);
                commentInput.value = '';
            }
        });

        videoContainer.appendChild(reel);
    });
}
