document.addEventListener('DOMContentLoaded', function () {

  const contentMenu = document.getElementById("content-menu")
  const hiddenElements = document.querySelector('.side-hidden');  
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
  const searchform = document.querySelector('.search-form')
  const usertheme = document.getElementById('usertheme')
  const currentc = document.querySelector('.currentc')
  const maincontent = document.querySelector('.main-content')
  const closeside = document.getElementById('closeside')
  const sidenavtoggle = document.getElementById('sidenavtoggle')
  const sidebar = document.querySelector('.sidebar')
  const iconlogo = document.getElementById('iconlogo')
  const hamnav = document.getElementById('hamnav')
  const makecard = document.querySelectorAll('.make-card')
  const newtask = document.getElementById('newtask')
  const taskcreatecard = document.getElementById('task-create-card')
  const taskremovecard = document.getElementById('task-remove-card')
  const fullscreentab = document.querySelector('#fullscreentab')
  
  if(fullscreentab){
  fullscreentab.addEventListener('click', function () {
   sideNav.classList.toggle('hidden');
   if(localStorage.getItem('rightnav') === 'true'){
    localStorage.setItem('rightnav', 'false');
    }else{
      localStorage.setItem('rightnav', 'true');
    }
   
    contentMenu.classList.toggle('fullscreen');
  })
}
  
  if(localStorage.getItem('rightnav') === 'true'){
    sideNav.classList.add('hidden');
    contentMenu.classList.add('fullscreen');
  }

      
  if (sidenavtoggle) {
    // Retrieve the stored toggle state from localStorage
    var isSidebarHidden = localStorage.getItem('rightnav') === 'true';

    // Apply the stored toggle state on page load
    if (isSidebarHidden) {
      maincontent.classList.add('content-full-width');
      sidebar.classList.add('side-hidden');
    }

    sidenavtoggle.addEventListener('click', function (e) {
      maincontent.classList.toggle('content-full-width');
      sidebar.classList.toggle('side-hidden');

      // Store the updated toggle state in localStorage
      var isHidden = sidebar.classList.contains('side-hidden');
      localStorage.setItem('rightnav', isHidden);
    });

  }
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
  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
      if (darkMode === "disabled") {

        enableDarkMode();
      } else {
        disableDarkMode();

      }
    });
  }
  if (localStorage.getItem('icon-mode') === "enabled") {
    console.log('half')
  }
  // closeside.addEventListener('click', function (e) {
  //     sideNav.classList.toggle('hidden')
  //     contentMenu.classList.toggle('left-none')
  // })
  // for (btns of sidetoggle) {
  //     btns.addEventListener('click', (req, res) => {
  //         console.log(btns)
  //     })
  // }
  // Retrieve the stored toggle state from localStorage
  var isSidebarHidden = localStorage.getItem('sidebarToggle') === 'true';

  // Apply the stored toggle state on page load
  if (isSidebarHidden) {
    iconlogo.classList.add('icon-logo-resize');
    for (let i = 0; i < sideText.length; i++) {
      sideText[i].classList.add("hidden");
    }
    sideNav.classList.add("sidebar-toggle");
    contentMenu.classList.add("content-toggle");
  }

  sidetoggle.addEventListener('click', function () {
    // Toggle the necessary classes
    iconlogo.classList.toggle('icon-logo-resize');
    for (let i = 0; i < sideText.length; i++) {
      sideText[i].classList.toggle("hidden");
    }
    sideNav.classList.toggle("sidebar-toggle");
    contentMenu.classList.toggle("content-toggle");

    // Store the updated toggle state in localStorage
    var isHidden = sideNav.classList.contains("sidebar-toggle");
    localStorage.setItem('sidebarToggle', isHidden);
  });

  // settingstoggle.addEventListener('click', function(e){
  //   contentMenu.classList.toggle('setting-toggle')
  //   sidecontent.classList.toggle('setting-side')
  //   sidecontent.style.transition = '1s';

  // })
  if (usertheme) {
    usertheme.addEventListener('click', function (e) {
      console.log('ok')
    })
  }

  if (hamnav) {
    hamnav.addEventListener('click', function (e) {
      sideNav.style.display = 'block'
      sideNav.classList.toggle('whiteem')

    })
  }
  if (newtask) {
    newtask.addEventListener('click', function (e) {
      taskcreatecard.classList.toggle('task-create-block')
      newtask.classList.toggle('hidden')
    })
    taskremovecard.addEventListener('click', function (e) {
      searchform.classList.toggle('hidden')
      taskcreatecard.classList.remove('task-create-block')
      newtask.classList.remove('hidden')

    })
  }


  // Check the screen width and apply styles based on the condition
  function applyStylesBasedOnScreenWidth() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;

    if (screenWidth <= 900) {
      if (hamnav) {
        hamnav.style.display = 'flex'
      }
      for (carde of makecard) {
        carde.classList.remove('max-w-sm')
      }

    } else {

    }
  }

  // Call the function when the page loads
  window.addEventListener('load', applyStylesBasedOnScreenWidth);

  // Call the function whenever the screen is resized
  window.addEventListener('resize', applyStylesBasedOnScreenWidth);

});