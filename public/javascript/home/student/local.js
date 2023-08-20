const contentMenu = document.getElementById("content-menu")
const me = document.querySelector('.wi')
const sideNav = document.getElementById("default-sidebar")
const sideText = document.querySelectorAll(".navtext")
const sideIcon = document.getElementsByClassName("bx")
let meunToggle = document.querySelector('.toggle')
const body = document.querySelector('body')
const toggleBtn = document.getElementById("theme")
let darkMode = localStorage.getItem("dark-mode");
// const sidenav = document.querySelector('.sidenav')
const content = document.querySelector('.content')
const togglechange = document.querySelector('#togglechange')
const sidetoggle = document.querySelector('#leftBtn')
const activityitems = document.querySelector('.activity-items')
// const settingstoggle = document.querySelector('.settingbtn')
const sidecontent  = document.getElementById('side-content')
const topnavbar = document.querySelector('.topnavbar')
const  wallimgs = document.querySelectorAll('#imgwall').src
const bgimgwalls = document.querySelectorAll('.sample-img img');
const voicesearch = document.getElementById('voice-search')
const usertheme = document.getElementById('usertheme')
const currentc = document.querySelector('.currentc')
const closeside = document.getElementById('closeside')
// for (let bgimgwall of bgimgwalls) {
//   bgimgwall.addEventListener('click', function() {
//     document.body.style.backgroundImage = `url(${bgimgwall.src})`;
//     sideNav.style.backgroundColor = 'transparent';
//     topnavbar.style.backgroundColor = 'transparent';
//     contentMenu.style.opacity = '0.75'
//     sidecontent.style.opacity = '0.75'
//     voicesearch.style.opacity = '0.75'
//     currentc.style.opacity = '0.75'
//   });
// }


// console.log(bgimgwall)
// bgimgwalls.addEventListener('click',function(e){
//   body.style.backgroundImage = `url(${bgimgwall})`;

  
// })
//dark Mode
const enableDarkMode = () => {
    contentMenu.classList.add("dark-mode-theme");
    togglechange.classList.remove("bi-moon-fill");
    togglechange.classList.add("bi-sun-fill")
    body.classList.toggle('dark')
    localStorage.setItem("dark-mode", "enabled");
  };
  
  const disableDarkMode = () => {
    contentMenu.classList.remove("dark-mode-theme");
    togglechange.classList.add("bi-moon-fill")
    togglechange.classList.remove("bi-sun-fill");
    body.classList.remove('dark')
    localStorage.setItem("dark-mode", "disabled");
  };
  
  if (darkMode === "enabled") {
    enableDarkMode(); // set state of darkMode on page load
  }
  
  toggleBtn.addEventListener("click", (e) => {
    darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
    if (darkMode === "disabled") {
        
      enableDarkMode();
    } else {
      disableDarkMode();
  
    }
  });
  if (localStorage.getItem('icon-mode') === "enabled") {
console.log('half')
  }
  closeside.addEventListener('click',function(e){
    sideNav.classList.toggle('hidden')
    contentMenu.classList.toggle('left-none')
  })
  sidetoggle.addEventListener('click',()=>{
    localStorage.setItem("icon-mode", "enabale");

    for(let i = 0; i < sideText.length; i++){
        sideText[i].classList.toggle("hidden")
    }
    // activityitems.classList.toggle('activity-toggle')

    sideNav.classList.toggle("sidebar-toggle")
    // sideNav.classList.remove("bart")
    
    contentMenu.classList.toggle("content-toggle")
  })
  // settingstoggle.addEventListener('click', function(e){
  //   contentMenu.classList.toggle('setting-toggle')
  //   sidecontent.classList.toggle('setting-side')
  //   sidecontent.style.transition = '1s';
    
  // })

  usertheme.addEventListener('click',function(e){
    console.log('ok')
  })