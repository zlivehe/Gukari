const fullscreen = document.getElementById("full-screen-tab")
const boardeatil = document.querySelector('.project-details')
const boardimage = document.querySelector('.imge-size')
const topnav = document.querySelector('.top-nav')
if(fullscreen){
console.log(fullscreen)
fullscreen.addEventListener('click',function(e){
    boardeatil.classList.toggle('hidden')
    boardimage.classList.toggle('hidden')
    topnav.classList.toggle('hidden')

})
}