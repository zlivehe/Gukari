
function firstpirod() {
    const points = document.querySelectorAll('.firstclass')
    const totalPoints = document.querySelectorAll('.total-points')
    let classgrade = document.querySelector('.classpercent')
    let pointcard = document.querySelectorAll('.pointcard') // assiments card
    const classgrades = document.querySelector('.classgrade')
    const gradedisplay = document.querySelector('.gradedisplay')
    let addassiment = document.querySelector('.add-Mesure')
    const taskType = document.querySelector('#task')
    const assimentsubmit = document.getElementById('assimentsubmit')
    const addtotalpoints = document.querySelector('.add-total-points')
    const addpoint = document.querySelector('.add-points')
    const gradingContent = document.querySelector('.grading-content')
    const addedpoints = document.querySelector('.addedpoint')
    const addgradedisplay = document.querySelector('.addgradedisplay')
    const addassimentsbtn = document.getElementById('add-assiments')
    const addpoints = document.querySelector('.addpoints')
    const assimentcancel = document.getElementById('assimentcancel')
    const classclose = document.getElementById('classclose')
    const classtogle = document.querySelector('.toggle-out')
    const removeassiments = document.getElementById('remove-assiments')
    const secondpiroid = document.querySelector('.secondpiroid')
    const classtitle = document.querySelector('.class-title ') 
    if(classtitle.classList.contains('AP') || classtitle.classList.contains('Hon')){
        localStorage.setItem('wgh1', 0.14)
    }
    let alltaskassigmentsTotal = [];
    let practicepointTotal = [];
    let allTasksumTotal = 0;
    let practiceSumTotal = 0;

    let alltaskassigments = [];
    let practicepoint = [];
    let allTasksum = 0;
    let practiceSum = 0;


    let allpoints = []
    let practicepoints = []
    let updatealltask = [];
    let updatepractice = [];

    let gpa = 0;


    let addedassiment = []
    // getEvents()
    // addedassiment.push(... JSON.parse(localStorage.getItem("events")))

    
    // assimentsubmit.addEventListener('click',reloadP())
//add assigment function
    assimentsubmit.addEventListener('click',function(e){
        e.preventDefault()
            let title1 = addassiment.value
            let type1 = taskType.value
            let point1 = addpoint.value
            let totalpoint1 = addtotalpoints.value
            let assigment = {title:title1,type:type1,point:point1,totalpoint:totalpoint1}
            addedassiment.push(assigment)
            if(assigment.type == "All Task"){
                alltaskassigments.push(assigment.point)
                alltaskassigmentsTotal.push(assigment.totalpoint)
                // console.log(alltaskassigments)
                allTasksumTotal += Number(assigment.totalpoint)
                allTasksum += Number(assigment.point)
        
            } else{
                practicepoint.push(assigment.point)
                practicepointTotal.push(assigment.totalpoint)
                practiceSumTotal += Number(assigment.totalpoint)
                practiceSum += Number(assigment.point)
                // console.log(practicepoint)
            }
            addgrade()
                let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
                // addgradedisplay
                // gpa = studentgpa
                gpa = studentgpa.toFixed(1)
                classgrade.innerHTML =  gpa + "%"
                gradecolor()
               
                Gpamain()
                Gpaclc()    
                addpoint.value = "0"
                addtotalpoints.value = "0"
                addassiment.value = ""
                taskType.value = "All Task"
    })


    function gradecolor(){
        if(gpa >= 89.5){
            classgrades.innerHTML = "A"
            p1 = '4'
            localStorage.setItem('p1', p1)
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-green-400 '

        } else if(gpa >= 79.5){
            p1 = '3'
            localStorage.setItem('p1', p1)
            classgrades.innerHTML = "B"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-sky-400'
        } else if( gpa >= 69.5){
            p1 = '2'
            localStorage.setItem('p1', p1)
            classgrades.innerHTML = "C"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-yellow-200'

        } else if(gpa >= 59.5){
            p1 = '0'
            localStorage.setItem('p1', p1)
            classgrades.innerHTML = "D"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-300'

        } else{
            p1 = '0'
            localStorage.setItem('p1', p1)
            classgrades.innerHTML = "E"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-400'
        }

    }
//add grade

    function addgrade(){
        let content = ` `;
        addedassiment.forEach((assigmentn) => {

             content += `
            <div class="added-pointcard ${assigmentn.type} addcd pointcard rounded-md ml-3  mb-2 p-2 border border-solid "> 
               <span class="text-blue-400 text-lg"> Your Added assigments </span> <br>
                <span class="addedtitle text-md font-semibold"> ${assigmentn.title}</span><br>
                <span class="addedtype text-sm">${assigmentn.type}</span><br>
                <!-- <span class="late"></span><br> -->
                <!-- <div class="dates flex">
                </div> --> <br>
                <div class="pooints flex">
                    <input name="points" class="form-control w-20 addn addedpoint text-xs ml-2  " value="${assigmentn.point}" type="number" disabled="">  /
                    <input class="form-control w-20 added-total-point addnt  text-xs  " value="${assigmentn.totalpoint}" type="text" disabled=""> 
                </div>
             </div>
            `
        })
        addedpoints.innerHTML = content;
        saveEvents()
    }
    
//total poinr
    function pointstotal(){
        for(let point of totalPoints){
        if(point.classList.contains('All')){
            alltaskassigmentsTotal.push(point.value)


        } else if(point.classList.contains('Preparation')){
            practicepointTotal.push(point.value)
            }
        
    }
    for(let i = 0; i < alltaskassigmentsTotal.length; i++){
        allTasksumTotal += Number(alltaskassigmentsTotal[i])
    }
    for(let i = 0; i < practicepointTotal.length; i++){
        practiceSumTotal += Number(practicepointTotal[i])
    }
            // console.log(allTasksumTotal)
            // console.log(practiceSumTotal )
    // console.log(practicepointTotal)
    // console.log(alltaskassigmentsTotal)
    
    }
    pointstotal()

//point earned
    function pointscalc(){

    for(let point of points){
        if(point.classList.contains('All')){
            alltaskassigments.push(point.value)


        } else if(point.classList.contains('Preparation')){
            practicepoint.push(point.value)
            // console.log(practicepoint)

        }
        
    }
    for(let i = 0; i < alltaskassigments.length; i++){
        allTasksum += Number(alltaskassigments[i])
    }
    for(let i = 0; i < practicepoint.length; i++){
        practiceSum += Number(practicepoint[i])
    }

    }
    pointscalc()

    function Gpa(){
       let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
        gpa = studentgpa.toFixed(1)
        classgrade.append(gpa + "%")
    }
    Gpa()

    function Grdeletter(){
        if(gpa >= 89.5){
            classgrades.append("A")
            p1 = '4'
            localStorage.setItem('grade', 'A')
            gradedisplay.classList.toggle('bg-green-300')
            localStorage.setItem('p1', p1)
            
        } else if(gpa >= 79.5){
            classgrades.append("B")
            gradedisplay.classList.toggle('bg-sky-400')
            localStorage.setItem('grade', 'B')
            p1 = '3'
            localStorage.setItem('p1', p1)

        } else if( gpa >= 69.5){
            classgrades.append("C")
            gradedisplay.classList.toggle('bg-yellow-200')
            localStorage.setItem('grade', 'C')
            p1 = '2'
            localStorage.setItem('p1', p1)

        } else if(gpa >= 59.5){
            classgrades.append("D")
            gradedisplay.classList.toggle('bg-red-300')
            localStorage.setItem('grade', 'D')
            p1 = '1'
            localStorage.setItem('p1', p1)

        } else{
            classgrades.append("E")
            gradedisplay.classList.toggle('bg-red-400')
            localStorage.setItem('grade', 'E')
            p1 = '0'
            localStorage.setItem('p1', p1)

        }
    }
    Grdeletter()

    function Gradecolor(){
    for(let cardpoint of pointcard){
    if(cardpoint.classList.contains('Preparation')){
        cardpoint.classList.toggle('prep-color')
    } else if(cardpoint.classList.contains('All')){
        cardpoint.classList.toggle('all-color')
    }
    }
    }
    Gradecolor()
function saveEvents(){
    localStorage.setItem("assigments",JSON.stringify(addedassiment));
}

function getEvents(){

    addedassiment.push(... JSON.parse(localStorage.getItem("assigments")))
    addgrade()
    for(let assigment of JSON.parse(localStorage.getItem("assigments")))
    if(assigment.type == "All Task"){
        alltaskassigments.push(assigment.point)
        alltaskassigmentsTotal.push(assigment.totalpoint)
        // console.log(alltaskassigments)
        allTasksumTotal += Number(assigment.totalpoint)
        allTasksum += Number(assigment.point)

    } else{
        practicepoint.push(assigment.point)
        practicepointTotal.push(assigment.totalpoint)
        practiceSumTotal += Number(assigment.totalpoint)
        practiceSum += Number(assigment.point)
        // console.log(practicepoint)
    }

    let studentgpa2 =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    gpa = studentgpa2
    localStorage.setItem("gpa",JSON.stringify(gpa));

}

  // let myassiment = "0"
    // let mypoint = "0"
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)

    removeassiments.addEventListener('click', function(e){
        const addn = document.querySelector('.addn')
        const addt = document.querySelector('.addnt')
        const addcd = document.querySelectorAll('.addcd')
    for(adds of addcd){
        if(adds.classList.contains('All')){
            allTasksum -= Number(addn.value)
            allTasksumTotal  -= Number(addt.value)
            adds.classList.add('none')
            addedassiment.splice(0,addedassiment.length)
console.log(addedassiment)
    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        } else{
        practiceSum -= Number(addn.value)
        practiceSumTotal  -= Number(addt.value)
        adds.classList.add('none')
        addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        }
        }

    })
    classtogle.classList.toggle('none')
    addassimentsbtn.addEventListener('click', function() {
        addpoints.classList.toggle('block')
        addassimentsbtn.classList.toggle('none')

    })
    assimentcancel.addEventListener('click', function() {
        addpoints.classList.remove('block')
        addassimentsbtn.classList.remove('none')

    })
    classclose.addEventListener('click', function() {
        classtogle.classList.toggle('block')
        
        
    })
    let sum = 0;
    let practicepointup = 0;
    let alltaskup = 0;

        //loop through first class and get the value of each point
        let list = [0,1];
        for(let i = 0; i < points.length; i++){
            if(points[i].classList.contains('Preparation')){
            for(let point of points){
            point.addEventListener('change', (event) => {
               list.push(points[i].value)
               localStorage.setItem('list', JSON.stringify(list))
               list = [0,4]
            })
             }
                
            } 
            if(points[i].classList.contains('All')){
                alltaskup = points[i].value
                
            }

        }

        //points edit
        
        function pointscalc2(){
            alltaskassigments = []
            practicepoint = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigments.push(added.point)
                } else{
                practicepoint.push(added.point)
                }
            }

             allTasksum = 0
             practiceSum = 0
            for(let point of points){
                if(point.classList.contains('All')){
                    alltaskassigments.push(point.value)
        
                } else if(point.classList.contains('Preparation')){
                    practicepoint.push(point.value)
                    // console.log(practicepoint)
                }
                
            }
            for(let i = 0; i < alltaskassigments.length; i++){
                allTasksum += Number(alltaskassigments[i])
            }
            for(let i = 0; i < practicepoint.length; i++){
                practiceSum += Number(practicepoint[i])
            }
            let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100

            gpa = studentgpa.toFixed(1)
            classgrade.innerHTML =  gpa + "%"

            gradecolor()
            addgrade()
            Gpamain()
            Gpaclc()

        }
     
        for(let point of points){
            point.addEventListener('change', (event) => {
                pointscalc2()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';
            })
        }
        

        function pointscalc1(){
            alltaskassigmentsTotal = []
            practicepointTotal = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigmentsTotal.push(added.totalpoint)

                } else{
                    practicepointTotal.push(added.totalpoint)
                }
            }
            allTasksumTotal = 0
            practiceSumTotal = 0
           for(let point of totalPoints){
               if(point.classList.contains('All')){
                   alltaskassigmentsTotal.push(point.value)
       
               } else if(point.classList.contains('Preparation')){
                   practicepointTotal.push(point.value)
                   // console.log(practicepointTotal)
               }
               
           }
           for(let i = 0; i < alltaskassigmentsTotal.length; i++){
               allTasksumTotal += Number(alltaskassigmentsTotal[i])
           }
           for(let i = 0; i < practicepointTotal.length; i++){
               practiceSumTotal += Number(practicepointTotal[i])
           }
           let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
           // addgradedisplay
           // gpa = studentgpa
           gpa = studentgpa
           classgrade.innerHTML =  gpa + "%"

           gradecolor()
           addgrade()
           Gpamain()
           Gpaclc()
       }


        for(let pointotal of totalPoints){
            pointotal.addEventListener('change', (event) => {
                pointscalc1()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';

            })
        }

       
            // console.log('click')
            // let point = e.target.innerHTML
            // let totalpoint = e.target.nextElementSibling.innerHTML
    

        
}
firstpirod()


function secondpirod(){
    const points = document.querySelectorAll('.secondpiroid .firstclass2')
    const totalPoints = document.querySelectorAll('.secondpiroid .total-points2')
    let classgrade = document.querySelector('.secondpiroid .classpercent')
    let pointcard = document.querySelectorAll('.pointcard1') // assiments card
    const classgrades = document.querySelector('.secondpiroid .classgrade2')
    const gradedisplay = document.querySelector('.secondpiroid .gradedisplay')
    const addassiment = document.querySelector('.secondpiroid .add-Mesure')
    const taskType = document.querySelector('.secondpiroid #task')
    const assimentsubmit = document.querySelector('.secondpiroid #assimentsubmit')
    const addtotalpoints = document.querySelector('.secondpiroid .add-total-points')
    const addpoint = document.querySelector('.secondpiroid .add-points')
    const gradingContent = document.querySelector('.secondpiroid .grading-content')
    const addedpoints = document.querySelector('.secondpiroid .addedpoint')
    const addgradedisplay = document.querySelector('.secondpiroid .addgradedisplay')
    const addassimentsbtn = document.querySelector('.secondpiroid #add-assiments')
    const addpoints = document.querySelector('.secondpiroid .addpoints')
    const assimentcancel = document.querySelector('.secondpiroid #assimentcancel')
    const classclose = document.querySelector('.secondpiroid #classclose')
    const classtogle = document.querySelector('.secondpiroid .toggle-out')
    const removeassiments = document.querySelector('.secondpiroid #remove-assiments')
    const thirdpiroid = document.querySelector('.thirdpiroid')
    const classtitle = document.querySelector('.secondpiroid  .class-title') 
    if(classtitle.classList.contains('AP') || classtitle.classList.contains('Hon')){
        localStorage.setItem('wgh2', 0.14)
    }
    let alltaskassigmentsTotal = [];
    let practicepointTotal = [];
    let allTasksumTotal = 0;
    let practiceSumTotal = 0;

    let alltaskassigments = [];
    let practicepoint = [];
    let allTasksum = 0;
    let practiceSum = 0;


    let allpoints = []
    let practicepoints = []
    let updatealltask = [];
    let updatepractice = [];

    let gpa = 0;


    let addedassiment = []
    // getEvents()
    // addedassiment.push(... JSON.parse(localStorage.getItem("events")))

    
    // assimentsubmit.addEventListener('click',reloadP())
//add assigment function
    assimentsubmit.addEventListener('click',function(e){
        e.preventDefault()
            let title1 = addassiment.value
            let type1 = taskType.value
            let point1 = addpoint.value
            let totalpoint1 = addtotalpoints.value
            let assigment = {title:title1,type:type1,point:point1,totalpoint:totalpoint1}
            addedassiment.push(assigment)
            if(assigment.type == "All Task"){
                alltaskassigments.push(assigment.point)
                alltaskassigmentsTotal.push(assigment.totalpoint)
                // console.log(alltaskassigments)
                allTasksumTotal += Number(assigment.totalpoint)
                allTasksum += Number(assigment.point)
        
            } else{
                practicepoint.push(assigment.point)
                practicepointTotal.push(assigment.totalpoint)
                practiceSumTotal += Number(assigment.totalpoint)
                practiceSum += Number(assigment.point)
                // console.log(practicepoint)
            }
            addgrade()
                let studentgpa = ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
                // addgradedisplay
                // gpa = studentgpa
                gpa = studentgpa.toFixed(1)
                classgrade.innerHTML =  gpa + "%"
                gradecolor()
               
                Gpamain()
                Gpaclc()    
                addpoint.value = "0"
                addtotalpoints.value = "0"
                addassiment.value = ""
                taskType.value = "All Task"
    })


    function gradecolor(){
        if(gpa >= 89.5){
            classgrades.innerHTML = "A"
            p2 = 4
            localStorage.setItem('p2',p2);
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-green-400 '

        } else if(gpa >= 79.5){
            classgrades.innerHTML = "B"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-sky-400'
            p2 = 3
            localStorage.setItem('p2',p2);

        } else if( gpa >= 69.5){
            classgrades.innerHTML = "C"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-yellow-200'
            p2 = 2
            localStorage.setItem('p2',p2);
        } else if(gpa >= 59.5){
            classgrades.innerHTML = "D"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-300'
            p2 = 1
            localStorage.setItem('p2',p2);
        } else{
            classgrades.innerHTML = "E"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-400'
            p2 = 0
            localStorage.setItem('p2',p2);
        }

    }
//add grade

function addgrade(){
    let content = ` `;
    addedassiment.forEach((assigmentn) => {

         content += `
        <div class="added-pointcard ${assigmentn.type} addcd pointcard rounded-md ml-3  mb-2 p-2 border border-solid "> 
           <span class="text-blue-400 text-lg"> Your Added assigments </span> <br>
            <span class="addedtitle text-md font-semibold"> ${assigmentn.title}</span><br>
            <span class="addedtype text-sm">${assigmentn.type}</span><br>
            <!-- <span class="late"></span><br> -->
            <!-- <div class="dates flex">
            </div> --> <br>
            <div class="pooints flex">
                <input name="points" class="form-control w-20 addn addedpoint text-xs ml-2  " value="${assigmentn.point}" type="number" disabled="">  /
                <input class="form-control w-20 added-total-point addnt  text-xs  " value="${assigmentn.totalpoint}" type="text" disabled=""> 
            </div>
         </div>
        `
    })
    addedpoints.innerHTML = content;
    saveEvents()
}

//total poinr
function pointstotal(){
    for(let point of totalPoints){
    if(point.classList.contains('All')){
        alltaskassigmentsTotal.push(point.value)


    } else if(point.classList.contains('Preparation')){
        practicepointTotal.push(point.value)
    }
    
}
for(let i = 0; i < alltaskassigmentsTotal.length; i++){
    allTasksumTotal += Number(alltaskassigmentsTotal[i])
}
for(let i = 0; i < practicepointTotal.length; i++){
    practiceSumTotal += Number(practicepointTotal[i])
}
        // console.log(allTasksumTotal)
        // console.log(practiceSumTotal )
// console.log(practicepointTotal)
// console.log(alltaskassigmentsTotal)

}
pointstotal()

//point earned
function pointscalc(){

for(let point of points){
    if(point.classList.contains('All')){
        alltaskassigments.push(point.value)

    } else if(point.classList.contains('Preparation')){
        practicepoint.push(point.value)
        // console.log(practicepoint)
    }
    
}
for(let i = 0; i < alltaskassigments.length; i++){
    allTasksum += Number(alltaskassigments[i])
}
for(let i = 0; i < practicepoint.length; i++){
    practiceSum += Number(practicepoint[i])
}

}
pointscalc()

    function Gpa(){
       let studentgpa = ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
        gpa2 = studentgpa.toFixed(1)
        classgrade.append(gpa2 + "%")
    }
    Gpa()

    function Grdeletter(){
        if(gpa2 >= 89.5){
            p2 = 4
            classgrades.append("A")
            localStorage.setItem('grade2', 'A')
            gradedisplay.classList.toggle('bg-green-300')
            grade2 = 'A'
            localStorage.setItem('p2',p2);
        } else if(gpa2 >= 79.5){
            classgrades.append("B")
            gradedisplay.classList.toggle('bg-sky-400')
            localStorage.setItem('grade2', 'B')
            grade2 = 'B'
            p2 = 3
            localStorage.setItem('p2',p2);
        } else if( gpa2 >= 69.5){
            classgrades.append("C")
            gradedisplay.classList.toggle('bg-yellow-200')
            localStorage.setItem('grade2', 'C')
            grade2 = 'C'
            p2 = 2
            localStorage.setItem('p2',p2);
        } else if(gpa2 >= 59.5){
            classgrades.append("D")
            gradedisplay.classList.toggle('bg-red-300')
            localStorage.setItem('grade2', 'D')
            grade2 = 'D'
            p2 = 1
            localStorage.setItem('p2',p2);
        } else{
            classgrades.append("E")
            gradedisplay.classList.toggle('bg-red-400')
            localStorage.setItem('grade2', 'E')
            grade2 = 'E'
            p2 = 0
            localStorage.setItem('p2',p2);
        }
        
    }
    Grdeletter()

    function Gradecolor(){
    for(let cardpoint of pointcard){
    if(cardpoint.classList.contains('Preparation')){
        cardpoint.classList.toggle('prep-color')
    } else if(cardpoint.classList.contains('All')){
        cardpoint.classList.toggle('all-color')
    }
    }
    }
    Gradecolor()
function saveEvents(){
    localStorage.setItem("assigments",JSON.stringify(addedassiment));
}

function getEvents(){

    addedassiment.push(... JSON.parse(localStorage.getItem("assigments")))
    addgrade()
    for(let assigment of JSON.parse(localStorage.getItem("assigments")))
    if(assigment.type == "All Task"){
        alltaskassigments.push(assigment.point)
        alltaskassigmentsTotal.push(assigment.totalpoint)
        // console.log(alltaskassigments)
        allTasksumTotal += Number(assigment.totalpoint)
        allTasksum += Number(assigment.point)

    } else{
        practicepoint.push(assigment.point)
        practicepointTotal.push(assigment.totalpoint)
        practiceSumTotal += Number(assigment.totalpoint)
        practiceSum += Number(assigment.point)
        // console.log(practicepoint)
    }

    let studentgpa2 =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    gpa2 = studentgpa2.toFixed(1)
    localStorage.setItem("gpa2",JSON.stringify(gpa));

}

    //edit grade

  // let myassiment = "0"
    // let mypoint = "0"
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    removeassiments.addEventListener('click', function(e){
        const addn = document.querySelector('.addn')
        const addt = document.querySelector('.addnt')
        const addcd = document.querySelectorAll('.addcd')
    for(adds of addcd){
        if(adds.classList.contains('All')){
            allTasksum -= Number(addn.value)
            allTasksumTotal  -= Number(addt.value)
            adds.classList.add('none')
            addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        } else{
        practiceSum -= Number(addn.value)
        practiceSumTotal  -= Number(addt.value)
        adds.classList.add('none')
        addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
     gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        }
        }

    })
    classtogle.classList.toggle('none')
    addassimentsbtn.addEventListener('click', function() {
        addpoints.classList.toggle('block')
        addassimentsbtn.classList.toggle('none')

    })
    assimentcancel.addEventListener('click', function() {
        addpoints.classList.remove('block')
        addassimentsbtn.classList.remove('none')

    })
    classclose.addEventListener('click', function() {
        classtogle.classList.toggle('block')
    
    })
    let sum = 0;
    let practicepointup = 0;
    let alltaskup = 0;

        //loop through first class and get the value of each point
        let list = [0,1];
        for(let i = 0; i < points.length; i++){
            if(points[i].classList.contains('Preparation')){
            for(let point of points){
            point.addEventListener('change', (event) => {
               list.push(points[i].value)
               localStorage.setItem('list', JSON.stringify(list))
               list = [0,4]
            })
             }
                
            } 
            if(points[i].classList.contains('All')){
                alltaskup = points[i].value
                
            }

        }

        //points edit
        
        function pointscalc2(){
            alltaskassigments = []
            practicepoint = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigments.push(added.point)
                } else{
                practicepoint.push(added.point)
                }
            }

             allTasksum = 0
             practiceSum = 0
            for(let point of points){
                if(point.classList.contains('All')){
                    alltaskassigments.push(point.value)
        
                } else if(point.classList.contains('Preparation')){
                    practicepoint.push(point.value)
                    // console.log(practicepoint)
                }
                
            }
            for(let i = 0; i < alltaskassigments.length; i++){
                allTasksum += Number(alltaskassigments[i])
            }
            for(let i = 0; i < practicepoint.length; i++){
                practiceSum += Number(practicepoint[i])
            }
            let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
            // addgradedisplay
            // gpa = studentgpa
            gpa = studentgpa.toFixed(1)
            classgrade.innerHTML =  gpa + "%"

            gradecolor()
            addgrade()
            Gpamain()
            Gpaclc()
        }
     
        for(let point of points){
            point.addEventListener('change', (event) => {
                pointscalc2()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';
            })
        }
        

        function pointscalc1(){
            alltaskassigmentsTotal = []
            practicepointTotal = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigmentsTotal.push(added.totalpoint)

                } else{
                    practicepointTotal.push(added.totalpoint)
                }
            }
            allTasksumTotal = 0
            practiceSumTotal = 0
           for(let point of totalPoints){
               if(point.classList.contains('All')){
                   alltaskassigmentsTotal.push(point.value)
       
               } else if(point.classList.contains('Preparation')){
                   practicepointTotal.push(point.value)
                   // console.log(practicepointTotal)
               }
               
           }
           for(let i = 0; i < alltaskassigmentsTotal.length; i++){
               allTasksumTotal += Number(alltaskassigmentsTotal[i])
           }
           for(let i = 0; i < practicepointTotal.length; i++){
               practiceSumTotal += Number(practicepointTotal[i])
           }
           let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
           // addgradedisplay
           // gpa = studentgpa
           gpa = studentgpa.toFixed(1)
           classgrade.innerHTML =  gpa + "%"

           gradecolor()
           addgrade()
           Gpamain()
           Gpaclc()
       }


        for(let pointotal of totalPoints){
            pointotal.addEventListener('change', (event) => {
                pointscalc1()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';

            })
        }






}
secondpirod()


function thirdpirod(){
        const points = document.querySelectorAll('.thirdpiroid .firstclass3')
        const totalPoints = document.querySelectorAll('.thirdpiroid .total-points3')
        let classgrade = document.querySelector('.thirdpiroid .classpercent')
        let pointcard = document.querySelectorAll('.pointcard1') // assiments card
        const classgrades = document.querySelector('.thirdpiroid .classgrade')
        const gradedisplay = document.querySelector('.thirdpiroid .gradedisplay')
        const addassiment = document.querySelector('.thirdpiroid .add-Mesure')
        const taskType = document.querySelector('.thirdpiroid #task')
        const assimentsubmit = document.querySelector('.thirdpiroid #assimentsubmit')
        const addtotalpoints = document.querySelector('.thirdpiroid .add-total-points')
        const addpoint = document.querySelector('.thirdpiroid .add-points')
        const gradingContent = document.querySelector('.thirdpiroid .grading-content')
        const addedpoints = document.querySelector('.thirdpiroid .addedpoint')
        const addgradedisplay = document.querySelector('.thirdpiroid .addgradedisplay')
        const addassimentsbtn = document.querySelector('.thirdpiroid #add-assiments')
        const addpoints = document.querySelector('.thirdpiroid .addpoints')
        const assimentcancel = document.querySelector('.thirdpiroid #assimentcancel')
        const classclose = document.querySelector('.thirdpiroid #classclose')
        const classtogle = document.querySelector('.thirdpiroid .toggle-out')
        const removeassiments = document.querySelector('.thirdpiroid #remove-assiments')
        const forthpiroid = document.querySelector('.forthpiroid')
        const classtitle = document.querySelector('.thirdpiroid  .class-title ') 
        if(classtitle.classList.contains('AP') || classtitle.classList.contains('Hon')){
            localStorage.setItem('wgh3', 0.14)
        }

        let alltaskassigmentsTotal = [];
        let practicepointTotal = [];
        let allTasksumTotal = 0;
        let practiceSumTotal = 0;
    
        let alltaskassigments = [];
        let practicepoint = [];
        let allTasksum = 0;
        let practiceSum = 0;
    
    
        let allpoints = []
        let practicepoints = []
        let updatealltask = [];
        let updatepractice = [];
    
        let gpa = 0;
    
    
        let addedassiment = []
        // getEvents()
        // addedassiment.push(... JSON.parse(localStorage.getItem("events")))
    
        
        // assimentsubmit.addEventListener('click',reloadP())
    //add assigment function
        assimentsubmit.addEventListener('click',function(e){
            e.preventDefault()
                let title1 = addassiment.value
                let type1 = taskType.value
                let point1 = addpoint.value
                let totalpoint1 = addtotalpoints.value
                let assigment = {title:title1,type:type1,point:point1,totalpoint:totalpoint1}
                addedassiment.push(assigment)
                if(assigment.type == "All Task"){
                    alltaskassigments.push(assigment.point)
                    alltaskassigmentsTotal.push(assigment.totalpoint)
                    // console.log(alltaskassigments)
                    allTasksumTotal += Number(assigment.totalpoint)
                    allTasksum += Number(assigment.point)
            
                } else{
                    practicepoint.push(assigment.point)
                    practicepointTotal.push(assigment.totalpoint)
                    practiceSumTotal += Number(assigment.totalpoint)
                    practiceSum += Number(assigment.point)
                    // console.log(practicepoint)
                }
                addgrade()
                    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
                    // addgradedisplay
                    // gpa = studentgpa
                    gpa = studentgpa.toFixed(1)
                    classgrade.innerHTML =  gpa + "%"
                    gradecolor()
                   
                    Gpamain()
                    Gpaclc()    
                    addpoint.value = "0"
                    addtotalpoints.value = "0"
                    addassiment.value = ""
                    taskType.value = "All Task"
            })
    
    
        function gradecolor(){
            if(gpa >= 89.5){
                p3 = 4
                localStorage.setItem('p3',p3);
                classgrades.innerHTML = "A"
                gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-green-400 '
    
            } else if(gpa >= 79.5){
                p3 = 3
                localStorage.setItem('p3',p3);
                classgrades.innerHTML = "B"
                gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-sky-400'
            } else if( gpa >= 69.5){
                p3 = 2
                localStorage.setItem('p3',p3);
                classgrades.innerHTML = "C"
                gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-yellow-200'
    
            } else if(gpa >= 59.5){
                p3 = 1
                localStorage.setItem('p3',p3);
                classgrades.innerHTML = "D"
                gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-300'
    
            } else{
                p3 = 0
                localStorage.setItem('p3',p3);
                classgrades.innerHTML = "E"
                gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-400'
            }
    
        }
    //add grade

    function addgrade(){
        let content = ` `;
        addedassiment.forEach((assigmentn) => {

             content += `
            <div class="added-pointcard ${assigmentn.type} addcd pointcard rounded-md ml-3  mb-2 p-2 border border-solid "> 
               <span class="text-blue-400 text-lg"> Your Added assigments </span> <br>
                <span class="addedtitle text-md font-semibold"> ${assigmentn.title}</span><br>
                <span class="addedtype text-sm">${assigmentn.type}</span><br>
                <!-- <span class="late"></span><br> -->
                <!-- <div class="dates flex">
                </div> --> <br>
                <div class="pooints flex">
                    <input name="points" class="form-control w-20 addn addedpoint text-xs ml-2  " value="${assigmentn.point}" type="number" disabled="">  /
                    <input class="form-control w-20 added-total-point addnt  text-xs  " value="${assigmentn.totalpoint}" type="text" disabled=""> 
                </div>
             </div>
            `
        })
        addedpoints.innerHTML = content;
        saveEvents()
    }
    
//total poinr
    function pointstotal(){
        for(let point of totalPoints){
        if(point.classList.contains('All')){
            alltaskassigmentsTotal.push(point.value)


        } else if(point.classList.contains('Preparation')){
            practicepointTotal.push(point.value)
            }
        
    }
    for(let i = 0; i < alltaskassigmentsTotal.length; i++){
        allTasksumTotal += Number(alltaskassigmentsTotal[i])
    }
    for(let i = 0; i < practicepointTotal.length; i++){
        practiceSumTotal += Number(practicepointTotal[i])
    }
            // console.log(allTasksumTotal)
            // console.log(practiceSumTotal )
    // console.log(practicepointTotal)
    // console.log(alltaskassigmentsTotal)
    
    }
    pointstotal()

//point earned
    function pointscalc(){

    for(let point of points){
        if(point.classList.contains('All')){
            alltaskassigments.push(point.value)

        } else if(point.classList.contains('Preparation')){
            practicepoint.push(point.value)
            // console.log(practicepoint)
        }
        
    }
    for(let i = 0; i < alltaskassigments.length; i++){
        allTasksum += Number(alltaskassigments[i])
    }
    for(let i = 0; i < practicepoint.length; i++){
        practiceSum += Number(practicepoint[i])
    }

    }
    pointscalc()

        function Gpa(){
           let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
            gpa = studentgpa.toFixed(1)
            classgrade.append(gpa + "%")
            }
        Gpa()
    
        function Grdeletter(){
            if(gpa >= 89.5){
                p3 = 4
                localStorage.setItem('p3',p3);
                classgrades.append("A")
                localStorage.setItem('grade3', 'A')
                gradedisplay.classList.toggle('bg-green-300')
                grade3 = 'A'
            } else if(gpa >= 79.5){
                p3 = 3
                localStorage.setItem('p3',p3);
                classgrades.append("B")
                gradedisplay.classList.toggle('bg-sky-400')
                localStorage.setItem('grade3', 'B')
                grade3 = 'B'
            } else if( gpa >= 69.5){
                p3 = 2
                localStorage.setItem('p3',p3);
                classgrades.append("C")
                gradedisplay.classList.toggle('bg-yellow-200')
                localStorage.setItem('grade3', 'C')
                grade3 = 'C'
            } else if(gpa >= 59.5){
                p3 = 1
                localStorage.setItem('p3',p3);
                classgrades.append("D")
                gradedisplay.classList.toggle('bg-red-300')
                localStorage.setItem('grade3', 'D')
                grade3 = 'D'
            } else{
                p3 = 0
                localStorage.setItem('p3',p3);
                classgrades.append("E")
                gradedisplay.classList.toggle('bg-red-400')
                localStorage.setItem('grade3', 'E')
                grade3 = 'E'
            }
        }
        Grdeletter()
    
        function Gradecolor(){
        for(let cardpoint of pointcard){
        if(cardpoint.classList.contains('Preparation')){
            cardpoint.classList.toggle('prep-color')
        } else if(cardpoint.classList.contains('All')){
            cardpoint.classList.toggle('all-color')
        }
        }
        }
        Gradecolor()
    function saveEvents(){
        localStorage.setItem("assigments",JSON.stringify(addedassiment));
    }
    
    function getEvents(){
    
        addedassiment.push(... JSON.parse(localStorage.getItem("assigments")))
        addgrade()
        for(let assigment of JSON.parse(localStorage.getItem("assigments")))
        if(assigment.type == "All Task"){
            alltaskassigments.push(assigment.point)
            alltaskassigmentsTotal.push(assigment.totalpoint)
            // console.log(alltaskassigments)
            allTasksumTotal += Number(assigment.totalpoint)
            allTasksum += Number(assigment.point)
    
        } else{
            practicepoint.push(assigment.point)
            practicepointTotal.push(assigment.totalpoint)
            practiceSumTotal += Number(assigment.totalpoint)
            practiceSum += Number(assigment.point)
            // console.log(practicepoint)
        }
    
        let studentgpa2 =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
        // addgradedisplay
        gpa = studentgpa2
            localStorage.setItem("gpa",JSON.stringify(gpa));
    
    
    }
        //edit grade

  // let myassiment = "0"
    // let mypoint = "0"
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    removeassiments.addEventListener('click', function(e){
        const addn = document.querySelector('.addn')
        const addt = document.querySelector('.addnt')
        const addcd = document.querySelectorAll('.addcd')
    for(adds of addcd){
        if(adds.classList.contains('All')){
            allTasksum -= Number(addn.value)
            allTasksumTotal  -= Number(addt.value)
            adds.classList.add('none')
            addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        } else{
        practiceSum -= Number(addn.value)
        practiceSumTotal  -= Number(addt.value)
        adds.classList.add('none')
        addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        }
        }

    })
    classtogle.classList.toggle('none')
    addassimentsbtn.addEventListener('click', function() {
        addpoints.classList.toggle('block')
        addassimentsbtn.classList.toggle('none')

    })
    assimentcancel.addEventListener('click', function() {
        addpoints.classList.remove('block')
        addassimentsbtn.classList.remove('none')

    })
    classclose.addEventListener('click', function() {
        classtogle.classList.toggle('block')
    
    })
    let sum = 0;
    let practicepointup = 0;
    let alltaskup = 0;

        //loop through first class and get the value of each point
        let list = [0,1];
        for(let i = 0; i < points.length; i++){
            if(points[i].classList.contains('Preparation')){
            for(let point of points){
            point.addEventListener('change', (event) => {
               list.push(points[i].value)
               localStorage.setItem('list', JSON.stringify(list))
               list = [0,4]
            })
             }
                
            } 
            if(points[i].classList.contains('All')){
                alltaskup = points[i].value
                
            }

        }

        //points edit
        
        function pointscalc2(){
            alltaskassigments = []
            practicepoint = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigments.push(added.point)
                } else{
                practicepoint.push(added.point)
                }
            }

             allTasksum = 0
             practiceSum = 0
            for(let point of points){
                if(point.classList.contains('All')){
                    alltaskassigments.push(point.value)
        
                } else if(point.classList.contains('Preparation')){
                    practicepoint.push(point.value)
                    // console.log(practicepoint)
                }
                
            }
            for(let i = 0; i < alltaskassigments.length; i++){
                allTasksum += Number(alltaskassigments[i])
            }
            for(let i = 0; i < practicepoint.length; i++){
                practiceSum += Number(practicepoint[i])
            }
            let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
            // addgradedisplay
            // gpa = studentgpa
            gpa = studentgpa.toFixed(1)
            classgrade.innerHTML =  gpa + "%"


            gradecolor()
            addgrade()
            Gpamain()
            Gpaclc()
        }
     
        for(let point of points){
            point.addEventListener('change', (event) => {
                pointscalc2()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';
            })
        }
        

        function pointscalc1(){
            alltaskassigmentsTotal = []
            practicepointTotal = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigmentsTotal.push(added.totalpoint)

                } else{
                    practicepointTotal.push(added.totalpoint)
                }
            }
            allTasksumTotal = 0
            practiceSumTotal = 0
           for(let point of totalPoints){
               if(point.classList.contains('All')){
                   alltaskassigmentsTotal.push(point.value)
       
               } else if(point.classList.contains('Preparation')){
                   practicepointTotal.push(point.value)
                   // console.log(practicepointTotal)
               }
               
           }
           for(let i = 0; i < alltaskassigmentsTotal.length; i++){
               allTasksumTotal += Number(alltaskassigmentsTotal[i])
           }
           for(let i = 0; i < practicepointTotal.length; i++){
               practiceSumTotal += Number(practicepointTotal[i])
           }
           let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
           // addgradedisplay
           // gpa = studentgpa
           gpa = studentgpa.toFixed(1)
           classgrade.innerHTML =  gpa + "%"
           gradecolor()
           addgrade()
           Gpamain()
           Gpaclc()
       }


        for(let pointotal of totalPoints){
            pointotal.addEventListener('change', (event) => {
                pointscalc1()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';

            })
        }


    
}
thirdpirod()

function forthpiroid(){
    const points = document.querySelectorAll('.forthpiroid .firstclass4')
    const totalPoints = document.querySelectorAll('.forthpiroid .total-points4')
    let classgrade = document.querySelector('.forthpiroid .classpercent')
    let pointcard = document.querySelectorAll('.pointcard1') // assiments card
    const classgrades = document.querySelector('.forthpiroid .classgrade')
    const gradedisplay = document.querySelector('.forthpiroid .gradedisplay')
    const addassiment = document.querySelector('.forthpiroid .add-Mesure')
    const taskType = document.querySelector('.forthpiroid #task')
    const assimentsubmit = document.querySelector('.forthpiroid #assimentsubmit')
    const addtotalpoints = document.querySelector('.forthpiroid .add-total-points')
    const addpoint = document.querySelector('.forthpiroid .add-points')
    const gradingContent = document.querySelector('.forthpiroid .grading-content')
    const addedpoints = document.querySelector('.forthpiroid .addedpoint')
    const addgradedisplay = document.querySelector('.forthpiroid .addgradedisplay')
    const addassimentsbtn = document.querySelector('.forthpiroid #add-assiments')
    const addpoints = document.querySelector('.forthpiroid .addpoints')
    const assimentcancel = document.querySelector('.forthpiroid #assimentcancel')
    const classclose = document.querySelector('.forthpiroid #classclose')
    const classtogle = document.querySelector('.forthpiroid .toggle-out')
    const removeassiments = document.querySelector('.forthpiroid #remove-assiments')
    const fifthpiroid = document.querySelector('.fifthpiroid')
    const classtitle = document.querySelector('.forthpiroid  .class-title ') 
    if(classtitle.classList.contains('AP') || classtitle.classList.contains('Hon')){
        localStorage.setItem('wgh4', 0.14)
    }

    let alltaskassigmentsTotal = [];
    let practicepointTotal = [];
    let allTasksumTotal = 0;
    let practiceSumTotal = 0;

    let alltaskassigments = [];
    let practicepoint = [];
    let allTasksum = 0;
    let practiceSum = 0;


    let allpoints = []
    let practicepoints = []
    let updatealltask = [];
    let updatepractice = [];

    let gpa = 0;


    let addedassiment = []
    // getEvents()
    // addedassiment.push(... JSON.parse(localStorage.getItem("events")))

    
    // assimentsubmit.addEventListener('click',reloadP())
//add assigment function
    assimentsubmit.addEventListener('click',function(e){
        e.preventDefault()
            let title1 = addassiment.value
            let type1 = taskType.value
            let point1 = addpoint.value
            let totalpoint1 = addtotalpoints.value
            let assigment = {title:title1,type:type1,point:point1,totalpoint:totalpoint1}
            addedassiment.push(assigment)
            if(assigment.type == "All Task"){
                alltaskassigments.push(assigment.point)
                alltaskassigmentsTotal.push(assigment.totalpoint)
                // console.log(alltaskassigments)
                allTasksumTotal += Number(assigment.totalpoint)
                allTasksum += Number(assigment.point)
        
            } else{
                practicepoint.push(assigment.point)
                practicepointTotal.push(assigment.totalpoint)
                practiceSumTotal += Number(assigment.totalpoint)
                practiceSum += Number(assigment.point)
                // console.log(practicepoint)
            }
            addgrade()
                let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
                console.log(studentgpa)
                // addgradedisplay
                // gpa = studentgpa
                gpa = studentgpa.toFixed(1)
                classgrade.innerHTML =  gpa + "%"
                gradecolor()
                Gpamain()
                Gpaclc()    
                addpoint.value = "0"
                addtotalpoints.value = "0"
                addassiment.value = ""
                taskType.value = "All Task"
    })


    function gradecolor(){
        if(gpa >= 89.5){
            p4 = 4
            localStorage.setItem('p4',p4);
            classgrades.innerHTML = "A"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-green-400 '

        } else if(gpa >= 79.5){
            p4 = 3
            localStorage.setItem('p4',p4);
            classgrades.innerHTML = "B"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-sky-400'
        } else if( gpa >= 69.5){
            p4 = 2
            localStorage.setItem('p4',p4);
            classgrades.innerHTML = "C"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-yellow-200'

        } else if(gpa >= 59.5){
            p4 = 1
            localStorage.setItem('p4',p4);
            classgrades.innerHTML = "D"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-300'

        } else{
            p4 = 0
            localStorage.setItem('p4',p4);
            classgrades.innerHTML = "E"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-400'
        }

    }
//add grade

function addgrade(){
    let content = ` `;
    addedassiment.forEach((assigmentn) => {

         content += `
        <div class="added-pointcard ${assigmentn.type} addcd pointcard rounded-md ml-3  mb-2 p-2 border border-solid "> 
           <span class="text-blue-400 text-lg"> Your Added assigments </span> <br>
            <span class="addedtitle text-md font-semibold"> ${assigmentn.title}</span><br>
            <span class="addedtype text-sm">${assigmentn.type}</span><br>
            <!-- <span class="late"></span><br> -->
            <!-- <div class="dates flex">
            </div> --> <br>
            <div class="pooints flex">
                <input name="points" class="form-control w-20 addn addedpoint text-xs ml-2  " value="${assigmentn.point}" type="number" disabled="">  /
                <input class="form-control w-20 added-total-point addnt  text-xs  " value="${assigmentn.totalpoint}" type="text" disabled=""> 
            </div>
         </div>
        `
    })
    addedpoints.innerHTML = content;
    saveEvents()
}

//total poinr
function pointstotal(){
    for(let point of totalPoints){
    if(point.classList.contains('All')){
        alltaskassigmentsTotal.push(point.value)


    } else if(point.classList.contains('Preparation')){
        practicepointTotal.push(point.value)
    }
    
}
for(let i = 0; i < alltaskassigmentsTotal.length; i++){
    allTasksumTotal += Number(alltaskassigmentsTotal[i])
}
for(let i = 0; i < practicepointTotal.length; i++){
    practiceSumTotal += Number(practicepointTotal[i])
}
        // console.log(allTasksumTotal)
        // console.log(practiceSumTotal )
// console.log(practicepointTotal)
// console.log(alltaskassigmentsTotal)

}
pointstotal()

//point earned
function pointscalc(){

for(let point of points){
    if(point.classList.contains('All')){
        alltaskassigments.push(point.value)

    } else if(point.classList.contains('Preparation')){
        practicepoint.push(point.value)
        // console.log(practicepoint)
    }
    
}
for(let i = 0; i < alltaskassigments.length; i++){
    allTasksum += Number(alltaskassigments[i])
}
for(let i = 0; i < practicepoint.length; i++){
    practiceSum += Number(practicepoint[i])
}

}
pointscalc()

function Gpa(){
   let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    gpa = studentgpa.toFixed(1)
    classgrade.append(gpa + "%")
}
Gpa()


    function Grdeletter(){
        if(gpa >= 89.5){
            p4 = 4
            localStorage.setItem('p4',p4);
            classgrades.append("A")
            localStorage.setItem('grade4', 'A')
            gradedisplay.classList.toggle('bg-green-300')
        } else if(gpa >= 79.5){
            p4 = 3
            localStorage.setItem('p4',p4);
            classgrades.append("B")
            gradedisplay.classList.toggle('bg-sky-400')
            localStorage.setItem('grade4', 'B')
        } else if( gpa >= 69.5){
            p4 = 2
            localStorage.setItem('p4',p4);
            classgrades.append("C")
            gradedisplay.classList.toggle('bg-yellow-200')
            localStorage.setItem('grade4', 'C')
        } else if(gpa >= 59.5){
            p4 = 1
            localStorage.setItem('p4',p4);
            classgrades.append("D")
            gradedisplay.classList.toggle('bg-red-300')
            localStorage.setItem('grade4', 'D')
        } else{
            p4 = 0
            localStorage.setItem('p4',p4);
            classgrades.append("E")
            gradedisplay.classList.toggle('bg-red-400')
            localStorage.setItem('grade4', 'E')
        }
    }
    Grdeletter()

    function Gradecolor(){
    for(let cardpoint of pointcard){
    if(cardpoint.classList.contains('Preparation')){
        cardpoint.classList.toggle('prep-color')
    } else if(cardpoint.classList.contains('All')){
        cardpoint.classList.toggle('all-color')
    }
    }
    }
    Gradecolor()
function saveEvents(){
    localStorage.setItem("assigments",JSON.stringify(addedassiment));
}

function getEvents(){

    addedassiment.push(... JSON.parse(localStorage.getItem("assigments")))
    addgrade()
    for(let assigment of JSON.parse(localStorage.getItem("assigments")))
    if(assigment.type == "All Task"){
        alltaskassigments.push(assigment.point)
        alltaskassigmentsTotal.push(assigment.totalpoint)
        // console.log(alltaskassigments)
        allTasksumTotal += Number(assigment.totalpoint)
        allTasksum += Number(assigment.point)

    } else{
        practicepoint.push(assigment.point)
        practicepointTotal.push(assigment.totalpoint)
        practiceSumTotal += Number(assigment.totalpoint)
        practiceSum += Number(assigment.point)
        // console.log(practicepoint)
    }

    let studentgpa2 =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    gpa = studentgpa2
    localStorage.setItem("gpa",JSON.stringify(gpa));

}

    //edit grade

  // let myassiment = "0"
    // let mypoint = "0"
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    removeassiments.addEventListener('click', function(e){
        const addn = document.querySelector('.addn')
        const addt = document.querySelector('.addnt')
        const addcd = document.querySelectorAll('.addcd')
    for(adds of addcd){
        if(adds.classList.contains('All')){
            allTasksum -= Number(addn.value)
            allTasksumTotal  -= Number(addt.value)
            adds.classList.add('none')
            addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        } else{
        practiceSum -= Number(addn.value)
        practiceSumTotal  -= Number(addt.value)
        adds.classList.add('none')
        addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
        gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  studentgpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        }
        }

    })
    classtogle.classList.toggle('none')
    addassimentsbtn.addEventListener('click', function() {
        addpoints.classList.toggle('block')
        addassimentsbtn.classList.toggle('none')

    })
    assimentcancel.addEventListener('click', function() {
        addpoints.classList.remove('block')
        addassimentsbtn.classList.remove('none')

    })
    classclose.addEventListener('click', function() {
        classtogle.classList.toggle('block')
     
    })

    let sum = 0;
    let practicepointup = 0;
    let alltaskup = 0;

        //loop through first class and get the value of each point
        let list = [0,1];
        for(let i = 0; i < points.length; i++){
            if(points[i].classList.contains('Preparation')){
            for(let point of points){
            point.addEventListener('change', (event) => {
               list.push(points[i].value)
               localStorage.setItem('list', JSON.stringify(list))
               list = [0,4]
            })
             }
                
            } 
            if(points[i].classList.contains('All')){
                alltaskup = points[i].value
                
            }

        }

        //points edit
        
        function pointscalc2(){
            alltaskassigments = []
            practicepoint = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigments.push(added.point)
                } else{
                practicepoint.push(added.point)
                }
            }

             allTasksum = 0
             practiceSum = 0
            for(let point of points){
                if(point.classList.contains('All')){
                    alltaskassigments.push(point.value)
        
                } else if(point.classList.contains('Preparation')){
                    practicepoint.push(point.value)
                    // console.log(practicepoint)
                }
                
            }
            for(let i = 0; i < alltaskassigments.length; i++){
                allTasksum += Number(alltaskassigments[i])
            }
            for(let i = 0; i < practicepoint.length; i++){
                practiceSum += Number(practicepoint[i])
            }
            let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
            // addgradedisplay
            // gpa = studentgpa
            gpa = studentgpa.toFixed(1)
            classgrade.innerHTML =  gpa + "%"


            gradecolor()
            addgrade()
            Gpamain()
            Gpaclc()
        }
     
        for(let point of points){
            point.addEventListener('change', (event) => {
                pointscalc2()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';
            })
        }
        

        function pointscalc1(){
            alltaskassigmentsTotal = []
            practicepointTotal = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigmentsTotal.push(added.totalpoint)

                } else{
                    practicepointTotal.push(added.totalpoint)
                }
            }
            allTasksumTotal = 0
            practiceSumTotal = 0
           for(let point of totalPoints){
               if(point.classList.contains('All')){
                   alltaskassigmentsTotal.push(point.value)
       
               } else if(point.classList.contains('Preparation')){
                   practicepointTotal.push(point.value)
                   // console.log(practicepointTotal)
               }
               
           }
           for(let i = 0; i < alltaskassigmentsTotal.length; i++){
               allTasksumTotal += Number(alltaskassigmentsTotal[i])
           }
           for(let i = 0; i < practicepointTotal.length; i++){
               practiceSumTotal += Number(practicepointTotal[i])
           }
           let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
           // addgradedisplay
           // gpa = studentgpa
           gpa = studentgpa.toFixed(1)
           classgrade.innerHTML =  gpa + "%"
           gradecolor()
           addgrade()
           Gpamain()
           Gpaclc()
       }


        for(let pointotal of totalPoints){
            pointotal.addEventListener('change', (event) => {
                pointscalc1()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';

            })
        }


}
forthpiroid()

function fifthpiroid(){
    const points = document.querySelectorAll('.fifthpiroid .firstclass5')
    const totalPoints = document.querySelectorAll('.fifthpiroid .total-points5')
    let classgrade = document.querySelector('.fifthpiroid .classpercent')
    let pointcard = document.querySelectorAll('.pointcard1') // assiments card
    const classgrades = document.querySelector('.fifthpiroid .classgrade')
    const gradedisplay = document.querySelector('.fifthpiroid .gradedisplay')
    const addassiment = document.querySelector('.fifthpiroid .add-Mesure')
    const taskType = document.querySelector('.fifthpiroid #task')
    const assimentsubmit = document.querySelector('.fifthpiroid #assimentsubmit')
    const addtotalpoints = document.querySelector('.fifthpiroid .add-total-points')
    const addpoint = document.querySelector('.fifthpiroid .add-points')
    const gradingContent = document.querySelector('.fifthpiroid .grading-content')
    const addedpoints = document.querySelector('.fifthpiroid .addedpoint')
    const addgradedisplay = document.querySelector('.fifthpiroid .addgradedisplay')
    const addassimentsbtn = document.querySelector('.fifthpiroid #add-assiments')
    const addpoints = document.querySelector('.fifthpiroid .addpoints')
    const assimentcancel = document.querySelector('.fifthpiroid #assimentcancel')
    const classclose = document.querySelector('.fifthpiroid #classclose')
    const classtogle = document.querySelector('.fifthpiroid .toggle-out')
    const removeassiments = document.querySelector('.fifthpiroid #remove-assiments')
    const sixthpiroid = document.querySelector('.sixthpiroid')
    const classtitle = document.querySelector('.fifthpiroid  .class-title ') 
    if(classtitle.classList.contains('AP') || classtitle.classList.contains('Hon')){
        localStorage.setItem('wgh5', 0.14)
    }

    let alltaskassigmentsTotal = [];
    let practicepointTotal = [];
    let allTasksumTotal = 0;
    let practiceSumTotal = 0;

    let alltaskassigments = [];
    let practicepoint = [];
    let allTasksum = 0;
    let practiceSum = 0;


    let allpoints = []
    let practicepoints = []
    let updatealltask = [];
    let updatepractice = [];

    let gpa = 0;


    let addedassiment = []
    // getEvents()
    // addedassiment.push(... JSON.parse(localStorage.getItem("events")))

    
    // assimentsubmit.addEventListener('click',reloadP())
//add assigment function
    assimentsubmit.addEventListener('click',function(e){
        e.preventDefault()
            let title1 = addassiment.value
            let type1 = taskType.value
            let point1 = addpoint.value
            let totalpoint1 = addtotalpoints.value
            let assigment = {title:title1,type:type1,point:point1,totalpoint:totalpoint1}
            addedassiment.push(assigment)
            if(assigment.type == "All Task"){
                alltaskassigments.push(assigment.point)
                alltaskassigmentsTotal.push(assigment.totalpoint)
                // console.log(alltaskassigments)
                allTasksumTotal += Number(assigment.totalpoint)
                allTasksum += Number(assigment.point)
        
            } else{
                practicepoint.push(assigment.point)
                practicepointTotal.push(assigment.totalpoint)
                practiceSumTotal += Number(assigment.totalpoint)
                practiceSum += Number(assigment.point)
                // console.log(practicepoint)
            }
            addgrade()
                let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
                // addgradedisplay
                // gpa = studentgpa
                gpa = studentgpa.toFixed(1)
                classgrade.innerHTML =  gpa + "%"
                gradecolor()
               
                Gpamain()
                Gpaclc()    
                addpoint.value = "0"
                addtotalpoints.value = "0"
                addassiment.value = ""
                taskType.value = "All Task"
    })


    function gradecolor(){
        if(gpa >= 89.5){
            localStorage.setItem('p5',p5);
            p5 = 4
            classgrades.innerHTML = "A"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-green-400 '

        } else if(gpa >= 79.5){
            p5 = 3
            localStorage.setItem('p5',p5);
            classgrades.innerHTML = "B"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-sky-400'
        } else if( gpa >= 69.5){
            p5 = 2
            localStorage.setItem('p5',p5);
            classgrades.innerHTML = "C"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-yellow-200'

        } else if(gpa >= 59.5){
            p5 = 1
            localStorage.setItem('p5',p5);
            classgrades.innerHTML = "D"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-300'

        } else{
            p5 = 0
            localStorage.setItem('p5',p5);
            classgrades.innerHTML = "E"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-400'
        }

    }
//add grade
function addgrade(){
    let content = ` `;
    addedassiment.forEach((assigmentn) => {

         content += `
        <div class="added-pointcard ${assigmentn.type} addcd pointcard rounded-md ml-3  mb-2 p-2 border border-solid "> 
           <span class="text-blue-400 text-lg"> Your Added assigments </span> <br>
            <span class="addedtitle text-md font-semibold"> ${assigmentn.title}</span><br>
            <span class="addedtype text-sm">${assigmentn.type}</span><br>
            <!-- <span class="late"></span><br> -->
            <!-- <div class="dates flex">
            </div> --> <br>
            <div class="pooints flex">
                <input name="points" class="form-control w-20 addn addedpoint text-xs ml-2  " value="${assigmentn.point}" type="number" disabled="">  /
                <input class="form-control w-20 added-total-point addnt  text-xs  " value="${assigmentn.totalpoint}" type="text" disabled=""> 
            </div>
         </div>
        `
    })
    addedpoints.innerHTML = content;
    saveEvents()
}

//total poinr
function pointstotal(){
    for(let point of totalPoints){
    if(point.classList.contains('All')){
        alltaskassigmentsTotal.push(point.value)


    } else if(point.classList.contains('Preparation')){
        practicepointTotal.push(point.value)
    }
    
}
for(let i = 0; i < alltaskassigmentsTotal.length; i++){
    allTasksumTotal += Number(alltaskassigmentsTotal[i])
}
for(let i = 0; i < practicepointTotal.length; i++){
    practiceSumTotal += Number(practicepointTotal[i])
}
        // console.log(allTasksumTotal)
        // console.log(practiceSumTotal )
// console.log(practicepointTotal)
// console.log(alltaskassigmentsTotal)

}
pointstotal()

//point earned
function pointscalc(){

for(let point of points){
    if(point.classList.contains('All')){
        alltaskassigments.push(point.value)

    } else if(point.classList.contains('Preparation')){
        practicepoint.push(point.value)
        // console.log(practicepoint)
    }
    
}
for(let i = 0; i < alltaskassigments.length; i++){
    allTasksum += Number(alltaskassigments[i])
}
for(let i = 0; i < practicepoint.length; i++){
    practiceSum += Number(practicepoint[i])
}

}
pointscalc()

    function Gpa(){
       let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
        gpa = studentgpa.toFixed(1)
        classgrade.append(gpa + "%")
    }
    Gpa()

    function Grdeletter(){
        if(gpa >= 89.5){
            p5 = 4
            localStorage.setItem('p5',p5);
            classgrades.append("A")
            localStorage.setItem('grade5', 'A')
            gradedisplay.classList.toggle('bg-green-300')
        } else if(gpa >= 79.5){
            p5 = 3
            localStorage.setItem('p5',p5);
            classgrades.append("B")
            gradedisplay.classList.toggle('bg-sky-400')
            localStorage.setItem('grade5', 'B')
        } else if( gpa >= 69.5){
            p5 = 2
            localStorage.setItem('p5',p5);
            classgrades.append("C")
            gradedisplay.classList.toggle('bg-yellow-200')
            localStorage.setItem('grade5', 'C')
        } else if(gpa >= 59.5){
            p5 = 1
            localStorage.setItem('p5',p5);
            classgrades.append("D")
            gradedisplay.classList.toggle('bg-red-300')
            localStorage.setItem('grade5', 'D')
        } else{
            p5 = 0
            localStorage.setItem('p5',p5);
            classgrades.append("E")
            gradedisplay.classList.toggle('bg-red-400')
            localStorage.setItem('grade5', 'E')
        }
    }
    Grdeletter()

    function Gradecolor(){
    for(let cardpoint of pointcard){
    if(cardpoint.classList.contains('Preparation')){
        cardpoint.classList.toggle('prep-color')
    } else if(cardpoint.classList.contains('All')){
        cardpoint.classList.toggle('all-color')
    }
    }
    }
    Gradecolor()
function saveEvents(){
    localStorage.setItem("assigments",JSON.stringify(addedassiment));
}

function getEvents(){

    addedassiment.push(... JSON.parse(localStorage.getItem("assigments")))
    addgrade()
    for(let assigment of JSON.parse(localStorage.getItem("assigments")))
    if(assigment.type == "All Task"){
        alltaskassigments.push(assigment.point)
        alltaskassigmentsTotal.push(assigment.totalpoint)
        // console.log(alltaskassigments)
        allTasksumTotal += Number(assigment.totalpoint)
        allTasksum += Number(assigment.point)

    } else{
        practicepoint.push(assigment.point)
        practicepointTotal.push(assigment.totalpoint)
        practiceSumTotal += Number(assigment.totalpoint)
        practiceSum += Number(assigment.point)
        // console.log(practicepoint)
    }

    let studentgpa2 =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    gpa = studentgpa2
    localStorage.setItem("gpa",JSON.stringify(gpa));

}

    //edit grade

  // let myassiment = "0"
    // let mypoint = "0"
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    removeassiments.addEventListener('click', function(e){
        const addn = document.querySelector('.addn')
        const addt = document.querySelector('.addnt')
        const addcd = document.querySelectorAll('.addcd')
    for(adds of addcd){
        if(adds.classList.contains('All')){
            allTasksum -= Number(addn.value)
            allTasksumTotal  -= Number(addt.value)
            adds.classList.add('none')
            addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        } else{
        practiceSum -= Number(addn.value)
        practiceSumTotal  -= Number(addt.value)
        adds.classList.add('none')
        addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  Math.floor(((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100)
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        }
        }

    })
    classtogle.classList.toggle('none')
    addassimentsbtn.addEventListener('click', function() {
        addpoints.classList.toggle('block')
        addassimentsbtn.classList.toggle('none')

    })
    assimentcancel.addEventListener('click', function() {
        addpoints.classList.remove('block')
        addassimentsbtn.classList.remove('none')

    })
    classclose.addEventListener('click', function() {
        classtogle.classList.toggle('block')
    
    })
    let sum = 0;
    let practicepointup = 0;
    let alltaskup = 0;

        //loop through first class and get the value of each point
        let list = [0,1];
        for(let i = 0; i < points.length; i++){
            if(points[i].classList.contains('Preparation')){
            for(let point of points){
            point.addEventListener('change', (event) => {
               list.push(points[i].value)
               localStorage.setItem('list', JSON.stringify(list))
               list = [0,4]
            })
             }
                
            } 
            if(points[i].classList.contains('All')){
                alltaskup = points[i].value
                
            }

        }

        //points edit
        
        function pointscalc2(){
            alltaskassigments = []
            practicepoint = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigments.push(added.point)
                } else{
                practicepoint.push(added.point)
                }
            }

             allTasksum = 0
             practiceSum = 0
            for(let point of points){
                if(point.classList.contains('All')){
                    alltaskassigments.push(point.value)
        
                } else if(point.classList.contains('Preparation')){
                    practicepoint.push(point.value)
                    // console.log(practicepoint)
                }
                
            }
            for(let i = 0; i < alltaskassigments.length; i++){
                allTasksum += Number(alltaskassigments[i])
            }
            for(let i = 0; i < practicepoint.length; i++){
                practiceSum += Number(practicepoint[i])
            }
            let studentgpa =  Math.floor(((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100)
            // addgradedisplay
            // gpa = studentgpa
            gpa = studentgpa.toFixed(1)
            classgrade.innerHTML =  gpa + "%"

            gradecolor()
            addgrade()
            Gpamain()
            Gpaclc()
        }
     
        for(let point of points){
            point.addEventListener('change', (event) => {
                pointscalc2()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';
            })
        }
        

        function pointscalc1(){
            alltaskassigmentsTotal = []
            practicepointTotal = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigmentsTotal.push(added.totalpoint)

                } else{
                    practicepointTotal.push(added.totalpoint)
                }
            }
            allTasksumTotal = 0
            practiceSumTotal = 0
           for(let point of totalPoints){
               if(point.classList.contains('All')){
                   alltaskassigmentsTotal.push(point.value)
       
               } else if(point.classList.contains('Preparation')){
                   practicepointTotal.push(point.value)
                   // console.log(practicepointTotal)
               }
               
           }
           for(let i = 0; i < alltaskassigmentsTotal.length; i++){
               allTasksumTotal += Number(alltaskassigmentsTotal[i])
           }
           for(let i = 0; i < practicepointTotal.length; i++){
               practiceSumTotal += Number(practicepointTotal[i])
           }
           let studentgpa =  Math.floor(((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100)
           // addgradedisplay
           // gpa = studentgpa
           gpa = studentgpa.toFixed(1)
           classgrade.innerHTML =  gpa + "%"
           gradecolor()
           addgrade()
           Gpamain()
           Gpaclc()
       }


        for(let pointotal of totalPoints){
            pointotal.addEventListener('change', (event) => {
                pointscalc1()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';

            })
        }



}
fifthpiroid()

function sixthpiroid(){
    const points = document.querySelectorAll('.sixthpiroid .firstclass6')
    const totalPoints = document.querySelectorAll('.sixthpiroid .total-points6')
    let classgrade = document.querySelector('.sixthpiroid .classpercent')
    let pointcard = document.querySelectorAll('.pointcard1') // assiments card
    const classgrades = document.querySelector('.sixthpiroid .classgrade')
    const gradedisplay = document.querySelector('.sixthpiroid .gradedisplay')
    const addassiment = document.querySelector('.sixthpiroid .add-Mesure')
    const taskType = document.querySelector('.sixthpiroid #task')
    const assimentsubmit = document.querySelector('.sixthpiroid #assimentsubmit')
    const addtotalpoints = document.querySelector('.sixthpiroid .add-total-points')
    const addpoint = document.querySelector('.sixthpiroid .add-points')
    const gradingContent = document.querySelector('.sixthpiroid .grading-content')
    const addedpoints = document.querySelector('.sixthpiroid .addedpoint')
    const addgradedisplay = document.querySelector('.sixthpiroid .addgradedisplay')
    const addassimentsbtn = document.querySelector('.sixthpiroid #add-assiments')
    const addpoints = document.querySelector('.sixthpiroid .addpoints')
    const assimentcancel = document.querySelector('.sixthpiroid #assimentcancel')
    const classclose = document.querySelector('.sixthpiroid #classclose')
    const classtogle = document.querySelector('.sixthpiroid .toggle-out')
    const removeassiments = document.querySelector('.sixthpiroid #remove-assiments')
    const seventhpiroid = document.querySelector('.seventhpiroid')
    const classtitle = document.querySelector('.sixthpiroid  .class-title ') 
    if(classtitle.classList.contains('AP') || classtitle.classList.contains('Hon')){
        localStorage.setItem('wgh6', 0.14)
    }
    let alltaskassigmentsTotal = [0];
    let practicepointTotal = [0];
    let allTasksumTotal = 0;
    let practiceSumTotal = 0;

    let alltaskassigments = [0];
    let practicepoint = [0];
    let allTasksum = 0;
    let practiceSum = 0;


    let allpoints = []
    let practicepoints = []
    let updatealltask = [];
    let updatepractice = [];

    let gpa = 0;

    for(let point of totalPoints){
console.log(point.value)
    }
    let addedassiment = []
    // getEvents()
    // addedassiment.push(... JSON.parse(localStorage.getItem("events")))

    
    // assimentsubmit.addEventListener('click',reloadP())
//add assigment function
    assimentsubmit.addEventListener('click',function(e){
        e.preventDefault()
            let title1 = addassiment.value
            let type1 = taskType.value
            let point1 = addpoint.value
            let totalpoint1 = addtotalpoints.value
            let assigment = {title:title1,type:type1,point:point1,totalpoint:totalpoint1}
            addedassiment.push(assigment)
            if(assigment.type == "All Task"){
                alltaskassigments.push(assigment.point)
                alltaskassigmentsTotal.push(assigment.totalpoint)
                // console.log(alltaskassigments)
                allTasksumTotal += Number(assigment.totalpoint)
                allTasksum += Number(assigment.point)
        
            } else{
                practicepoint.push(assigment.point)
                practicepointTotal.push(assigment.totalpoint)
                practiceSumTotal += Number(assigment.totalpoint)
                practiceSum += Number(assigment.point)
                // console.log(practicepoint)
            }
            addgrade()
                let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
                console.log(studentgpa)
                // addgradedisplay
                // gpa = studentgpa
                gpa = studentgpa.toFixed(1)
                classgrade.innerHTML =  gpa + "%"
                gradecolor()
                Gpamain()
                Gpaclc()    
                addpoint.value = "0"
                addtotalpoints.value = "0"
                addassiment.value = ""
                taskType.value = "All Task"
    })


    function gradecolor(){
        if(gpa >= 89.5){
            p6= 4
            localStorage.setItem('p6',p6);
            classgrades.innerHTML = "A"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-green-400 '

        } else if(gpa >= 79.5){
            p6= 3
            localStorage.setItem('p6',p6);
            classgrades.innerHTML = "B"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-sky-400'
        } else if( gpa >= 69.5){
            p6= 2
            localStorage.setItem('p6',p6);
            classgrades.innerHTML = "C"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-yellow-200'

        } else if(gpa >= 59.5){
            p6= 1
            localStorage.setItem('p6',p6);
            classgrades.innerHTML = "D"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-300'

        } else{
            p6= 0
            localStorage.setItem('p6',p6);
            classgrades.innerHTML = "E"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-400'
        }

    }
//add grade

function addgrade(){
    let content = ` `;
    addedassiment.forEach((assigmentn) => {

         content += `
        <div class="added-pointcard ${assigmentn.type} addcd pointcard rounded-md ml-3  mb-2 p-2 border border-solid "> 
           <span class="text-blue-400 text-lg"> Your Added assigments </span> <br>
            <span class="addedtitle text-md font-semibold"> ${assigmentn.title}</span><br>
            <span class="addedtype text-sm">${assigmentn.type}</span><br>
            <!-- <span class="late"></span><br> -->
            <!-- <div class="dates flex">
            </div> --> <br>
            <div class="pooints flex">
                <input name="points" class="form-control w-20 addn addedpoint text-xs ml-2  " value="${assigmentn.point}" type="number" disabled="">  /
                <input class="form-control w-20 added-total-point addnt  text-xs  " value="${assigmentn.totalpoint}" type="text" disabled=""> 
            </div>
         </div>
        `
    })
    addedpoints.innerHTML = content;
    saveEvents()
}

//total poinr
function pointstotal(){
    for(let point of totalPoints){
    if(point.classList.contains('All')){
        alltaskassigmentsTotal.push(point.value)


    } else if(point.classList.contains('Preparation')){
        practicepointTotal.push(point.value)
    }
    console.log(alltaskassigmentsTotal)
    
}
for(let i = 0; i < alltaskassigmentsTotal.length; i++){
    allTasksumTotal += Number(alltaskassigmentsTotal[i])
}
for(let i = 0; i < practicepointTotal.length; i++){
    practiceSumTotal += Number(practicepointTotal[i])
}
        // console.log(allTasksumTotal)
        // console.log(practiceSumTotal )
// console.log(practicepointTotal)
// console.log(alltaskassigmentsTotal)

}
pointstotal()

//point earned
function pointscalc(){

for(let point of points){
    if(point.classList.contains('All')){
        alltaskassigments.push(point.value)

    } else if(point.classList.contains('Preparation')){
        practicepoint.push(point.value)
        // console.log(practicepoint)
    }
    
}
for(let i = 0; i < alltaskassigments.length; i++){
    allTasksum += Number(alltaskassigments[i])
}
for(let i = 0; i < practicepoint.length; i++){
    practiceSum += Number(practicepoint[i])
}

}
pointscalc()
    function Gpa(){
        console.log(allTasksum)
        console.log(allTasksumTotal)
        console.log(practiceSum)
        console.log(practiceSumTotal)
        
       let studentgpa =  ((Number(allTasksum)/Number(allTasksumTotal) * 90/100) + (Number(practiceSum)/Number(practiceSumTotal) * 10/100)) * 100
        gpa = studentgpa.toFixed(1)
        classgrade.append(gpa + "%")
        console.log(studentgpa)
    }
    Gpa()

    function Grdeletter(){
        if(gpa >= 89.5){
            p6= 4
            localStorage.setItem('p6',p6);
            classgrades.append("A")
            localStorage.setItem('grade6', 'A')
            gradedisplay.classList.toggle('bg-green-300')
        } else if(gpa >= 79.5){
            p6= 3
            localStorage.setItem('p6',p6);
            classgrades.append("B")
            gradedisplay.classList.toggle('bg-sky-400')
            localStorage.setItem('grade6', 'B')
        } else if( gpa >= 69.5){
            p6= 2
            localStorage.setItem('p6',p6);
            classgrades.append("C")
            gradedisplay.classList.toggle('bg-yellow-200')
            localStorage.setItem('grade6', 'C')
        } else if(gpa >= 59.5){
            p6= 1
            localStorage.setItem('p6',p6);
            classgrades.append("D")
            gradedisplay.classList.toggle('bg-red-300')
            localStorage.setItem('grade6', 'D')
        } else{
            p6= 0
            localStorage.setItem('p6',p6);
            classgrades.append("E")
            gradedisplay.classList.toggle('bg-red-400')
            localStorage.setItem('grade6', 'E')
        }
    }
    Grdeletter()

    function Gradecolor(){
    for(let cardpoint of pointcard){
    if(cardpoint.classList.contains('Preparation')){
        cardpoint.classList.toggle('prep-color')
    } else if(cardpoint.classList.contains('All')){
        cardpoint.classList.toggle('all-color')
    }
    }
    }
    Gradecolor()
function saveEvents(){
    localStorage.setItem("assigments",JSON.stringify(addedassiment));
}

function getEvents(){

    addedassiment.push(... JSON.parse(localStorage.getItem("assigments")))
    addgrade()
    for(let assigment of JSON.parse(localStorage.getItem("assigments")))
    if(assigment.type == "All Task"){
        alltaskassigments.push(assigment.point)
        alltaskassigmentsTotal.push(assigment.totalpoint)
        // console.log(alltaskassigments)
        allTasksumTotal += Number(assigment.totalpoint)
        allTasksum += Number(assigment.point)

    } else{
        practicepoint.push(assigment.point)
        practicepointTotal.push(assigment.totalpoint)
        practiceSumTotal += Number(assigment.totalpoint)
        practiceSum += Number(assigment.point)
        // console.log(practicepoint)
    }

    let studentgpa2 =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    gpa = studentgpa2
    localStorage.setItem("gpa",JSON.stringify(gpa));

}

    //edit grade

  // let myassiment = "0"
    // let mypoint = "0"
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)

    removeassiments.addEventListener('click', function(e){
        const addn = document.querySelector('.addn')
        const addt = document.querySelector('.addnt')
        const addcd = document.querySelectorAll('.addcd')
    for(adds of addcd){
        if(adds.classList.contains('All')){
            allTasksum -= Number(addn.value)
            allTasksumTotal  -= Number(addt.value)
            adds.classList.add('none')
            addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        } else{
        practiceSum -= Number(addn.value)
        practiceSumTotal  -= Number(addt.value)
        adds.classList.add('none')
        addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        }
        }

    })
    classtogle.classList.toggle('none')
    addassimentsbtn.addEventListener('click', function() {
        addpoints.classList.toggle('block')
        addassimentsbtn.classList.toggle('none')

    })
    assimentcancel.addEventListener('click', function() {
        addpoints.classList.remove('block')
        addassimentsbtn.classList.remove('none')

    })
    classclose.addEventListener('click', function() {
        classtogle.classList.toggle('block')
        s

    })
    let sum = 0;
    let practicepointup = 0;
    let alltaskup = 0;

        //loop through first class and get the value of each point
        let list = [0,1];
        for(let i = 0; i < points.length; i++){
            if(points[i].classList.contains('Preparation')){
            for(let point of points){
            point.addEventListener('change', (event) => {
               list.push(points[i].value)
               localStorage.setItem('list', JSON.stringify(list))
               list = [0,4]
            })
             }
                
            } 
            if(points[i].classList.contains('All')){
                alltaskup = points[i].value
                
            }

        }

        //points edit
        
        function pointscalc2(){
            alltaskassigments = []
            practicepoint = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigments.push(added.point)
                } else{
                practicepoint.push(added.point)
                }
            }

             allTasksum = 0
             practiceSum = 0
            for(let point of points){
                if(point.classList.contains('All')){
                    alltaskassigments.push(point.value)
        
                } else if(point.classList.contains('Preparation')){
                    practicepoint.push(point.value)
                    // console.log(practicepoint)
                }
                
            }
            for(let i = 0; i < alltaskassigments.length; i++){
                allTasksum += Number(alltaskassigments[i])
            }
            for(let i = 0; i < practicepoint.length; i++){
                practiceSum += Number(practicepoint[i])
            }
            let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
            // addgradedisplay
            // gpa = studentgpa
            gpa = studentgpa.toFixed(1)
            classgrade.innerHTML =  gpa + "%"

            gradecolor()
            addgrade()
            Gpamain()
            Gpaclc()
        }
     
        for(let point of points){
            point.addEventListener('change', (event) => {
                pointscalc2()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';
            })
        }
        

        function pointscalc1(){
            alltaskassigmentsTotal = []
            practicepointTotal = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigmentsTotal.push(added.totalpoint)

                } else{
                    practicepointTotal.push(added.totalpoint)
                }
            }
            allTasksumTotal = 0
            practiceSumTotal = 0
           for(let point of totalPoints){
               if(point.classList.contains('All')){
                   alltaskassigmentsTotal.push(point.value)
       
               } else if(point.classList.contains('Preparation')){
                   practicepointTotal.push(point.value)
                   // console.log(practicepointTotal)
               }
               
           }
           for(let i = 0; i < alltaskassigmentsTotal.length; i++){
               allTasksumTotal += Number(alltaskassigmentsTotal[i])
           }
           for(let i = 0; i < practicepointTotal.length; i++){
               practiceSumTotal += Number(practicepointTotal[i])
           }
           let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
           // addgradedisplay
           // gpa = studentgpa
           gpa = studentgpa.toFixed(1)
           classgrade.innerHTML =  gpa + "%"
           gradecolor()
           addgrade()
           Gpamain()
           Gpaclc()
       }


        for(let pointotal of totalPoints){
            pointotal.addEventListener('change', (event) => {
                pointscalc1()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';

            })
        }


}
sixthpiroid()

function seventhpiroid(){
    const points = document.querySelectorAll('.seventhpiroid .firstclass7')
    const totalPoints = document.querySelectorAll('.seventhpiroid .total-points7')
    let classgrade = document.querySelector('.seventhpiroid .classpercent')
    let pointcard = document.querySelectorAll('.pointcard1') // assiments card
    const classgrades = document.querySelector('.seventhpiroid .classgrade')
    const gradedisplay = document.querySelector('.seventhpiroid .gradedisplay')
    const addassiment = document.querySelector('.seventhpiroid .add-Mesure')
    const taskType = document.querySelector('.seventhpiroid #task')
    const assimentsubmit = document.querySelector('.seventhpiroid #assimentsubmit')
    const addtotalpoints = document.querySelector('.seventhpiroid .add-total-points')
    const addpoint = document.querySelector('.seventhpiroid .add-points')
    const gradingContent = document.querySelector('.seventhpiroid .grading-content')
    const addedpoints = document.querySelector('.seventhpiroid .addedpoint')
    const addgradedisplay = document.querySelector('.seventhpiroid .addgradedisplay')
    const addassimentsbtn = document.querySelector('.seventhpiroid #add-assiments')
    const addpoints = document.querySelector('.seventhpiroid .addpoints')
    const assimentcancel = document.querySelector('.seventhpiroid #assimentcancel')
    const classclose = document.querySelector('.seventhpiroid #classclose')
    const classtogle = document.querySelector('.seventhpiroid .toggle-out')
    const removeassiments = document.querySelector('.seventhpiroid #remove-assiments')
    const classtitle = document.querySelector('.seventhpiroid  .class-title ') 
    if(classtitle.classList.contains('AP') || classtitle.classList.contains('Hon')){
        localStorage.setItem('wgh7', 0.14)
    }

    let alltaskassigmentsTotal = [0];
    let practicepointTotal = [0];
    let allTasksumTotal = 0;
    let practiceSumTotal = 0;

    let alltaskassigments = [0];
    let practicepoint = [0];
    let allTasksum = 0;
    let practiceSum = 0;



    let gpa = 0;


    let addedassiment = []
    // getEvents()
    // addedassiment.push(... JSON.parse(localStorage.getItem("events")))

    
    // assimentsubmit.addEventListener('click',reloadP())
//add assigment function
    assimentsubmit.addEventListener('click',function(e){
        e.preventDefault()
            let title1 = addassiment.value
            let type1 = taskType.value
            let point1 = addpoint.value
            let totalpoint1 = addtotalpoints.value
            let assigment = {title:title1,type:type1,point:point1,totalpoint:totalpoint1}
            addedassiment.push(assigment)
            if(assigment.type == "All Task"){
                alltaskassigments.push(assigment.point)
                alltaskassigmentsTotal.push(assigment.totalpoint)
                // console.log(alltaskassigments)
                allTasksumTotal += Number(assigment.totalpoint)
                allTasksum += Number(assigment.point)
        
            } else{
                practicepoint.push(assigment.point)
                practicepointTotal.push(assigment.totalpoint)
                practiceSumTotal += Number(assigment.totalpoint)
                practiceSum += Number(assigment.point)
                // console.log(practicepoint)
            }
            addgrade()
                let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
                console.log(studentgpa)
                // addgradedisplay
                // gpa = studentgpa
                gpa = studentgpa.toFixed(1)
                classgrade.innerHTML =  gpa + "%"
                gradecolor()
               
                Gpamain()
                Gpaclc()    
                addpoint.value = "0"
                addtotalpoints.value = "0"
                addassiment.value = ""
                taskType.value = "All Task"
    })


    function gradecolor(){
        if(gpa >= 89.5){
            localStorage.setItem('p7',p7);
            p7 = 4
            classgrades.innerHTML = "A"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-green-400 '

        } else if(gpa >= 79.5){
            p7 = 3
            localStorage.setItem('p7',p7);
            classgrades.innerHTML = "B"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-sky-400'
        } else if( gpa >= 69.5){
            p7 = 2
            localStorage.setItem('p7',p7);
            classgrades.innerHTML = "C"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-yellow-200'

        } else if(gpa >= 59.5){
            p7 = 1
            localStorage.setItem('p7',p7);
            classgrades.innerHTML = "D"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-300'

        } else{
            p7 = 0
            localStorage.setItem('p7',p7);
            classgrades.innerHTML = "E"
            gradedisplay.classList.value = 'gradedisplay block flex flex-col text-center ml-2 p-1 rounded-md bg-red-400'
        }

    }
//add grade

function addgrade(){
    let content = ` `;
    addedassiment.forEach((assigmentn) => {

         content += `
        <div class="added-pointcard ${assigmentn.type} addcd pointcard rounded-md ml-3  mb-2 p-2 border border-solid "> 
           <span class="text-blue-400 text-lg"> Your Added assigments </span> <br>
            <span class="addedtitle text-md font-semibold"> ${assigmentn.title}</span><br>
            <span class="addedtype text-sm">${assigmentn.type}</span><br>
            <!-- <span class="late"></span><br> -->
            <!-- <div class="dates flex">
            </div> --> <br>
            <div class="pooints flex">
                <input name="points" class="form-control w-20 addn addedpoint text-xs ml-2  " value="${assigmentn.point}" type="number" disabled="">  /
                <input class="form-control w-20 added-total-point addnt  text-xs  " value="${assigmentn.totalpoint}" type="text" disabled=""> 
            </div>
         </div>
        `
    })
    addedpoints.innerHTML = content;
    saveEvents()
}

//total poinr
function pointstotal(){
    for(let point of totalPoints){
    if(point.classList.contains('All')){
        alltaskassigmentsTotal.push(point.value)



    } else if(point.classList.contains('Preparation')){
        practicepointTotal.push(point.value)
    }
    
}
for(let i = 0; i < alltaskassigmentsTotal.length; i++){
    allTasksumTotal += Number(alltaskassigmentsTotal[i])
}
for(let i = 0; i < practicepointTotal.length; i++){
    practiceSumTotal += Number(practicepointTotal[i])
}
//         console.log(allTasksumTotal)

    // console.log(alltaskassigmentsTotal)
    // console.log(alltaskassigments)

}
pointstotal()

//point earned
function pointscalc(){

for(let point of points){
    if(point.classList.contains('All')){
        alltaskassigments.push(point.value)

    } else if(point.classList.contains('Preparation')){
        practicepoint.push(point.value)
        // console.log(practicepoint)
    }
    
}
for(let i = 0; i < alltaskassigments.length; i++){
    allTasksum += Number(alltaskassigments[i])
}
for(let i = 0; i < practicepoint.length; i++){
    practiceSum += Number(practicepoint[i])
}

}

pointscalc()

    function Gpa(){
       let studentgpa = ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) *100 
        gpa = studentgpa.toFixed(1)
        classgrade.append(studentgpa.toFixed(1) + "%")
    }
    Gpa()
    function Grdeletter(){
        if(gpa >= 89.5){
            p7 = 4
            localStorage.setItem('p7',p7);
            classgrades.append("A")
            localStorage.setItem('grade7', 'A')
            gradedisplay.classList.toggle('bg-green-300')
        } else if(gpa >= 79.5){
            p7 = 3
            localStorage.setItem('p7',p7);
            classgrades.append("B")
            gradedisplay.classList.toggle('bg-sky-400')
            localStorage.setItem('grade7', 'B')
        } else if( gpa >= 69.5){
            p7 = 2
            localStorage.setItem('p7',p7);
            classgrades.append("C")
            gradedisplay.classList.toggle('bg-yellow-200')
            localStorage.setItem('grade7', 'C')
        } else if(gpa >= 59.5){
            p7 = 1
            localStorage.setItem('p7',p7);
            classgrades.append("D")
            gradedisplay.classList.toggle('bg-red-300')
            localStorage.setItem('grade7', 'D')
        } else{
            p7 = 0
            localStorage.setItem('p7',p7);
            classgrades.append("E")
            gradedisplay.classList.toggle('bg-red-400')
            localStorage.setItem('grade7', 'E')
        }
    }
    Grdeletter()

    function Gradecolor(){
    for(let cardpoint of pointcard){
    if(cardpoint.classList.contains('Preparation')){
        cardpoint.classList.toggle('prep-color')
    } else if(cardpoint.classList.contains('All')){
        cardpoint.classList.toggle('all-color')
    }
    }
    }
    Gradecolor()
function saveEvents(){
    localStorage.setItem("assigments",JSON.stringify(addedassiment));
}

function getEvents(){

    addedassiment.push(... JSON.parse(localStorage.getItem("assigments")))
    addgrade()
    for(let assigment of JSON.parse(localStorage.getItem("assigments")))
    if(assigment.type == "All Task"){
        alltaskassigments.push(assigment.point)
        alltaskassigmentsTotal.push(assigment.totalpoint)
        // console.log(alltaskassigments)
        allTasksumTotal += Number(assigment.totalpoint)
        allTasksum += Number(assigment.point)

    } else{
        practicepoint.push(assigment.point)
        practicepointTotal.push(assigment.totalpoint)
        practiceSumTotal += Number(assigment.totalpoint)
        practiceSum += Number(assigment.point)
        // console.log(practicepoint)
    }

    let studentgpa2 =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    gpa = studentgpa2
    localStorage.setItem("gpa",JSON.stringify(gpa));

}

    //edit grade

  // let myassiment = "0"
    // let mypoint = "0"
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)
    // alltaskassigments.push(mypoint)
    // alltaskassigmentsTotal.push(myassiment)

    removeassiments.addEventListener('click', function(e){
        const addn = document.querySelector('.addn')
        const addt = document.querySelector('.addnt')
        const addcd = document.querySelectorAll('.addcd')
    for(adds of addcd){
        if(adds.classList.contains('All')){
            allTasksum -= Number(addn.value)
            allTasksumTotal  -= Number(addt.value)
            adds.classList.add('none')
            addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        } else{
        practiceSum -= Number(addn.value)
        practiceSumTotal  -= Number(addt.value)
        adds.classList.add('none')
        addedassiment.splice(0,1)

    addedpoints.innerHTML = ``;
    let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
    // addgradedisplay
    // gpa = studentgpa
    gpa = studentgpa.toFixed(1)
    classgrade.innerHTML =  gpa + "%"
    addgrade()
    gradecolor()
    Gpamain()
    Gpaclc()      
        }
        }

    })
    classtogle.classList.toggle('none')
    addassimentsbtn.addEventListener('click', function() {
        addpoints.classList.toggle('block')
        addassimentsbtn.classList.toggle('none')

    })
    assimentcancel.addEventListener('click', function() {
        addpoints.classList.remove('block')
        addassimentsbtn.classList.remove('none')

    })
    classclose.addEventListener('click', function() {
        classtogle.classList.toggle('block')
    })
    let sum = 0;
    let practicepointup = 0;
    let alltaskup = 0;

        //loop through first class and get the value of each point
        let list = [0,1];
        for(let i = 0; i < points.length; i++){
            if(points[i].classList.contains('Preparation')){
            for(let point of points){
            point.addEventListener('change', (event) => {
               list.push(points[i].value)
               localStorage.setItem('list', JSON.stringify(list))
               list = [0,4]
            })
             }
                
            } 
            if(points[i].classList.contains('All')){
                alltaskup = points[i].value
                
            }

        }

        //points edit
        
        function pointscalc2(){
            alltaskassigments = []
            practicepoint = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigments.push(added.point)
                } else{
                practicepoint.push(added.point)
                }
            }

             allTasksum = 0
             practiceSum = 0
            for(let point of points){
                if(point.classList.contains('All')){
                    alltaskassigments.push(point.value)
        
                } else if(point.classList.contains('Preparation')){
                    practicepoint.push(point.value)
                    // console.log(practicepoint)
                }
                
            }
            for(let i = 0; i < alltaskassigments.length; i++){
                allTasksum += Number(alltaskassigments[i])
            }
            for(let i = 0; i < practicepoint.length; i++){
                practiceSum += Number(practicepoint[i])
            }
            let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
            // addgradedisplay
            // gpa = studentgpa
            gpa = studentgpa.toFixed(1)
            classgrade.innerHTML =  gpa + "%"

            gradecolor()
            addgrade()
            Gpamain()
            Gpaclc()
        }
     
        for(let point of points){
            point.addEventListener('change', (event) => {
                pointscalc2()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';
            })
        }
        

        function pointscalc1(){
            alltaskassigmentsTotal = []
            practicepointTotal = []
            for(let added of addedassiment){
                if(added.type == "All Task"){
                    alltaskassigmentsTotal.push(added.totalpoint)

                } else{
                    practicepointTotal.push(added.totalpoint)
                }
            }
            allTasksumTotal = 0
            practiceSumTotal = 0
           for(let point of totalPoints){
               if(point.classList.contains('All')){
                   alltaskassigmentsTotal.push(point.value)
       
               } else if(point.classList.contains('Preparation')){
                   practicepointTotal.push(point.value)
                   // console.log(practicepointTotal)
               }
               
           }
           for(let i = 0; i < alltaskassigmentsTotal.length; i++){
               allTasksumTotal += Number(alltaskassigmentsTotal[i])
           }
           for(let i = 0; i < practicepointTotal.length; i++){
               practiceSumTotal += Number(practicepointTotal[i])
           }
           let studentgpa =  ((allTasksum/allTasksumTotal * 90/100) + (practiceSum/practiceSumTotal * 10/100)) * 100
           // addgradedisplay
           // gpa = studentgpa
           gpa = studentgpa.toFixed(1)
           classgrade.innerHTML =  gpa + "%"
           gradecolor()
           addgrade()
           Gpamain()
           Gpaclc()
       }


        for(let pointotal of totalPoints){
            pointotal.addEventListener('change', (event) => {
                pointscalc1()
                event.target.classList.toggle('pointtg');
                event.target.style.backgroundColor = 'pink';

            })
        }


}
seventhpiroid()

function Gpaclc(){
    p1 = 0
    p2 = 0
    p3 = 0
    p4 = 0
    p5 = 0
    p6 = 0
    p7 = 0

    fp1 = localStorage.getItem('grade');
    fp2 = localStorage.getItem('grade2');
    fp3 = localStorage.getItem('grade3');
    fp4 = localStorage.getItem('grade4');
    fp5 = localStorage.getItem('grade5');
    fp6 = localStorage.getItem('grade6');
    fp7 = localStorage.getItem('grade7');

    if(fp1 == "A"){
        p1 = 4
    }
    if(fp2 == "A"){
        p2 = 4
    }
    if(fp3 == "A"){
        p3 = 4
    }
    if(fp4 == "A"){
        p4 = 4
    }
    if(fp5 == "A"){
        p5 = 4
    }
    if(fp6 == "A"){
        p6 = 4
    }
    if(fp7 == "A"){
        p7 = 4
    }
    //B
    if(fp1 == "B"){
        p1 = 3
    }
    if(fp2 == "B"){
        p2 = 3
    }
    if(fp3 == "B"){
        p3 = 3
    }
    if(fp4 == "B"){
        p4 = 3
    }
    if(fp5 == "B"){
        p5 = 3
    }
    if(fp6 == "B"){
        p6 = 3
    }
    if(fp7 == "B"){
        p7 = 3
    }
    //C
    if(fp1 == "C"){
        p1 = 2
    }
    if(fp2 == "C"){
        p2 = 2
    }
    if(fp3 == "C"){
        p3 = 2
    }
    if(fp4 == "C"){
        p4 = 2
    }
    if(fp5 == "C"){
        p5 = 2
    }
    if(fp6 == "C"){
        p6 = 2
    }
    if(fp7 == "C"){
        p7 = 2
    }
    //D
    if(fp1 == "D"){
        p1 = 1
    }
    if(fp2 == "D"){
        p2 = 1
    }
    if(fp3 == "D"){
        p3 = 1
    }
    if(fp4 == "D"){
        p4 = 1
    }
    if(fp5 == "D"){
        p5 = 1
    }
    if(fp6 == "D"){
        p6 = 1
    }
    if(fp7 == "D"){
        p7 = 1
    }
    //E
    if(fp1 == "E"){
        p1 = 0
    }
    if(fp2 == "E"){
        p2 = 0
    }
    if(fp3 == "E"){
        p3 = 0
    }
    if(fp4 == "E"){
        p4 = 0
    }
    if(fp5 == "E"){
        p5 = 0
    }
    if(fp6 == "E"){
        p6 = 0
    }
    if(fp7 == "E"){
        p7 = 0
    }
    
    // if(fp1 == "A" || fp2 == "A" || fp3 == "A" || fp4 == "A" || fp5 == "A" || fp6 == "A" || fp7 == "A" ){
    //    fp1 = 4
    // //    fp2 = 4
    // //    fp3 = 4
    // //    fp4 = 4
    // //    fp5 = 4
    // //    fp6 = 4
    // //    fp7 = 4

    // }else if(fp1 == "B" || fp2 == "B" || fp3 == "B" || fp4 == "B" || fp5 == "B" || fp6 == "B" || fp7 == "B"){
    //     fp1 = 3
    //     fp2 = 3
    //     fp3 = 3
    //     fp4 = 3
    //     fp5 = 3
    //     fp6 = 3
    //     fp7 = 3
    // } else if(fp1 == "C" || fp2 == "C" || fp3 == "C" || fp4 == "C" || fp5 == "C" || fp6 == "C" || fp7 == "C"){
    //     fp1 = 2
    //     fp2 = 2
    //     fp3 = 2
    //     fp4 = 2
    //     fp5 = 2
    //     fp6 = 2
    //     fp7 = 2
    // }else if(fp1 == "D" || fp2 == "D" || fp3 == "D" || fp4 == "D" || fp5 == "D" || fp6 == "D" || fp7 == "D"){
    //     fp1 = 1
    //     fp2 = 1
    //     fp3 = 1
    //     fp4 = 1
    //     fp5 = 1
    //     fp6 = 1
    //     fp7 = 1
    // }else if(fp1 == "E" || fp2 == "E" || fp3 == "E" || fp4 == "E" || fp5 == "E" || fp6 == "E" || fp7 == "E"){
    //     fp1 = 0
    //     fp2 = 0
    //     fp3 = 0
    //     fp4 = 0
    //     fp5 = 0
    //     fp6 = 0
    //     fp7 = 0
    // }
    


}
Gpaclc()

function Gpamain(){
    const toalgpa = document.querySelector('.totalgpa')
    const weightgpa = document.querySelector('.weightgpa')

    let pw1 = localStorage.getItem('p1');
    let pw2 = localStorage.getItem('p2');
    let pw3 = localStorage.getItem('p3');
    let pw4 = localStorage.getItem('p4');
    let pw5 = localStorage.getItem('p5');
    let pw6 = localStorage.getItem('p6');
    let pw7 = localStorage.getItem('p7');

    let wgh1 = localStorage.getItem('wgh1');
    let wgh2 = localStorage.getItem('wgh2');
    let wgh3 = localStorage.getItem('wgh3');
    let wgh4 = localStorage.getItem('wgh4');
    let wgh5 = localStorage.getItem('wgh5');
    let wgh6 = localStorage.getItem('wgh6');
    let wgh7 = localStorage.getItem('wgh7');
    let wgh = Number(wgh1) + Number(wgh2)+ Number(wgh3)+ Number(wgh4)+ Number(wgh5)+ Number(wgh6)+ Number(wgh7)

    let studentgpa = (Number(pw1)+ Number(pw2)+ Number(pw3)+ Number(pw4)+ Number(pw5)+ Number(pw6)+ Number(pw7))/Number(7)
    toalgpa.innerHTML =  Math.round(100*studentgpa)/100

    let weighted = (Number(pw1)+ Number(pw2)+ Number(pw3)+ Number(pw4)+ Number(pw5)+ Number(pw6)+ Number(pw7))/Number(7)
     totalw = weighted.toFixed(1)
     let weigh = weighted + wgh
    weightgpa.innerHTML = weigh.toFixed(2)


}
Gpamain()