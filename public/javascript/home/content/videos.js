const videoid = document.getElementById('videoid').value;

function likeComment(commentId) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/video/' + videoid + '/comments/' + commentId + '/like');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const commentElement = document.getElementById(commentId);
        const likeBtn = document.getElementById('likebtn' + commentId);
        const dislikeBtn = document.getElementById('dislikebtn' + commentId);
        const response = JSON.parse(xhr.responseText);
        const average = response.average;
        const alreadyLiked = response.alreadyLiked;
  
        commentElement.innerText = average;
        
  
        if (alreadyLiked) {
          likeBtn.classList.remove('likeactive');
          likeBtn.classList.remove('bi-caret-up-fill');
          likeBtn.classList.add('bi-caret-up');
          dislikeBtn.classList.remove('dislikeactive');
          dislikeBtn.classList.remove('bi-caret-down-fill');
            dislikeBtn.classList.add('bi-caret-down');


        } else {
            likeBtn.classList.add('bi-caret-up-fill');
            
            likeBtn.classList.remove('bi-caret-up');
  
          likeBtn.classList.add('likeactive');
            dislikeBtn.classList.remove('dislikeactive');
            dislikeBtn.classList.remove('bi-caret-down-fill');
            dislikeBtn.classList.add('bi-caret-down');
            likeBtn.classList.remove('likeactive');


        }
      }
    };
    xhr.send();
  }
  
  function dislikeComment(commentId) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/video/' + videoid + '/comments/' + commentId + '/dislike');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const commentElement = document.getElementById(commentId);
        const likeBtn = document.getElementById('likebtn' + commentId);
        const dislikeBtn = document.getElementById('dislikebtn' + commentId);
        const response = JSON.parse(xhr.responseText);
        const average = response.average;
        const alreadyLiked = response.alreadyLiked;

        commentElement.innerText = average;
  
        if (alreadyLiked) {
          dislikeBtn.classList.remove('dislikeactive');
          dislikeBtn.classList.remove('bi-caret-down-fill');
          dislikeBtn.classList.add('bi-caret-down');
            likeBtn.classList.remove('likeactive');
            likeBtn.classList.remove('bi-caret-up-fill');
            likeBtn.classList.add('bi-caret-up');


        } else {
          dislikeBtn.classList.add('dislikeactive');

            likeBtn.classList.remove('likeactive');
            likeBtn.classList.remove('bi-caret-up-fill');
            likeBtn.classList.add('bi-caret-up');

            dislikeBtn.classList.add('bi-caret-down-fill');
            dislikeBtn.classList.remove('bi-caret-down');

        }
      }
    };
    xhr.send();
  }
  

  function likeReply(commentId, replyId) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/video/' + videoid + '/comments/' + commentId + '/' + replyId + '/like');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const countElement = document.getElementById(replyId);
        const likeBtn = document.getElementById('likebtn' + replyId);
        const dislikeBtn = document.getElementById('dislikebtn' + replyId);
  
        countElement.innerText = response.average;
  
        if (response.alreadyLiked) {
          likeBtn.classList.remove('active');
          likeBtn.classList.remove('bi-caret-up-fill');
          likeBtn.classList.add('bi-caret-up');
          dislikeBtn.classList.remove('dislikeactive');
          dislikeBtn.classList.remove('bi-caret-down-fill');

            dislikeBtn.classList.add('bi-caret-down');


        } else {
          likeBtn.classList.add('active');
          likeBtn.classList.add('bi-caret-up-fill');
          likeBtn.classList.remove('bi-caret-up');
          likeBtn.classList.remove('likeactive');
          dislikeBtn.classList.remove('dislikeactive');
          dislikeBtn.classList.remove('bi-caret-down-fill');
          dislikeBtn.classList.add('bi-caret-down');
          likeBtn.classList.remove('likeactive');

        }
      }
    };
    xhr.send();
  }
  
  function dislikeReply(commentId, replyId) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/video/' + videoid + '/comments/' + commentId + '/' + replyId + '/dislike');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const countElement = document.getElementById(replyId);
        const dislikeBtn = document.getElementById('dislikebtn' + replyId);
        const likeBtn = document.getElementById('likebtn' + replyId);

  
        countElement.innerText = response.average;
  
        if (response.alreadyDisliked) {
          dislikeBtn.classList.remove('active');
          dislikeBtn.classList.remove('bi-caret-down-fill');
          dislikeBtn.classList.add('bi-caret-down');
          likeBtn.classList.remove('likeactive');
          likeBtn.classList.remove('bi-caret-up-fill');
          likeBtn.classList.add('bi-caret-up');

        } else {
          dislikeBtn.classList.add('active');
          dislikeBtn.classList.add('bi-caret-down-fill');
          dislikeBtn.classList.remove('bi-caret-down');
          likeBtn.classList.remove('likeactive');
          likeBtn.classList.remove('bi-caret-up-fill');
          likeBtn.classList.add('bi-caret-up');
        }
      }
    };
    xhr.send();
  }
  