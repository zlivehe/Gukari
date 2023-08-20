    
 const thumbnailInput = document.getElementById('thumbnailInput');
 thumbnailInput.addEventListener('change', handleThumbnailInputChange);
 
 // Function to handle thumbnail file input change event
 function handleThumbnailInputChange(event) {
   const thumbnailPreview = document.getElementById('thumbnailPreview');
   thumbnailPreview.style.display = 'block';
   const file = event.target.files[0];
 
   if (file) {
     const reader = new FileReader();
     reader.onload = function(e) {
       thumbnailPreview.src = e.target.result;
     };
     reader.readAsDataURL(file);
   } else {
     thumbnailPreview.src = ''; // Clear the image source if no file selected
   }
 }
     document.getElementById('videoFile').addEventListener('change', function(event) {
        var file = event.target.files[0];
        var video = document.createElement('video');
        video.controls = true;
        document.getElementById('videoContainer').style.display = 'block';
        document.getElementById('uploadContainer').style.display = 'none';

        var reader = new FileReader();
        reader.onload = function(e) {
          video.src = e.target.result;
          video.addEventListener('loadedmetadata', function() {
            document.getElementById('uploadContainer').style.display = 'none';
            document.getElementById('videoContainer').innerHTML = '';
            document.getElementById('videoContainer').appendChild(video);
            
            
            var removeButton = document.createElement('button');
            removeButton.classList.add('remove-vid');
            removeButton.innerHTML = '<i class="bi bi-x-circle-fil  l"></i>';
            removeButton.addEventListener('click', function() {
              document.getElementById('uploadContainer').style.display = 'block';
              document.getElementById('videoContainer').innerHTML = '';

            });
            
            document.getElementById('videoContainer').appendChild(removeButton);
          });
        };
    
        reader.readAsDataURL(file);
    
        var spinner = document.createElement('div');
        spinner.className = 'spinner';
        document.getElementById('videoContainer').innerHTML = '';
        document.getElementById('videoContainer').appendChild(spinner);
      });
    



      //checbok
      function handleVisibilityChange(selectedVisibility) {
        let visa = document.getElementById('visa').value;
        const checkboxes = document.getElementsByName('visibility');
        // Uncheck all checkboxes
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        
        // Check the selected checkbox
        const selectedCheckbox = document.querySelector(`input[value="${selectedVisibility}"]`);
        selectedCheckbox.checked = true;
        visa =  selectedCheckbox.value;
        console.log(visa)

      }