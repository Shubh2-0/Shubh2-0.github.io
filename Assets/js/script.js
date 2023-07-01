$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });



});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Shubham Bhati";
            $("#favicon").attr("href", "Assets/images/R.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "Assets/images/back.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Back-End development", "Front-End development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

 

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info skills-card">
                <img class="skills-card-img" src="Assets/images/Skills/${skill.icon}" alt="skill" width="50"/>
                <span class="skills-card-name" >${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}


/* JavaScript code for generating project cards */

function showProjects(projects) {
    let projectsContainer = document.querySelector("#projects .box-container");
    let projectHTML = "";
    projects.forEach(project => {
        projectHTML += `
        <div class="box project-card">

      <img id="projectimage" draggable="false" src="Assets/images/projects/${project.image}.png" alt="project" />

      <div>
        <div class="tag">
        <h3 class="project-title">${project.name}</h3>
        </div>
        <div class="desc">
          <p class="project-description">${project.desc}</p>
          <br>
       
          <div class="btns">
            <a href="${project.links.view}" class="btn project-deployed-link" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn project-github-link" target="_blank">Code <i class="fas fa-code"></i></a>
            </div>

             <div id="tech2" class="project-tech-stack"><img id="tech" src="https://skillicons.dev/icons?i=${project.stacks}" alt=""></div>

        </div>
      </div>
    </div>`
    });


    
    projectsContainer.innerHTML = projectHTML;


    
  let sendbtn = document.querySelector("#send");
  sendbtn.addEventListener('click',function(e){
    e.preventDefault()
  let name = document.querySelector("input[name='name']").value;
  let email = document.querySelector("input[name='email']").value;
  let message = document.querySelector("textarea[name='message']").value;
  let phone = document.querySelector("input[name='phone']").value;

  if(email.length < 7){

         


  if(name.length == 0 || email.length == 0 || message.length == 0  || phone.length  == 0){

     
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Please make sure to fill in all the required fields before submitting the form!',
})
return;
  }

  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Invalid Email Address!',
})
return;

  }


  let bodym =   'name: '+ name + '<br/> email :'+email + '<br/> phone :'+phone + '<br/> message :' + message

  Email.send({
SecureToken : "a5d79846-ab78-4f9c-a0a8-bf499c8aead5",
    To : 'shubhambhati226@gmail.com',
    From : 'shubhambhati226@gmail.com',
    Subject : "Message send through Portfolio by :" +name,
    Body : bodym
}).then(
  message => 
  Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Message sent successfully!',
  showConfirmButton: false,
  timer: 1500
})
);
  document.querySelector("input[name='name']").value = "";
  document.querySelector("input[name='email']").value = "";
  document.querySelector("textarea[name='message']").value = "";
  document.querySelector("input[name='phone']").value = "";

  })




    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        // reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});




/* ===== SCROLL REVEAL ANIMATION ===== */
// const srtop = ScrollReveal({
//     origin: 'top',
//     distance: '80px',
//     duration: 1000,
//     reset: true
// });

// /* SCROLL HOME */
// srtop.reveal('.home2 .content h3', { delay: 200 });
// srtop.reveal('.home2 .content p', { delay: 200 });
// srtop.reveal('.home2 .content .btn', { delay: 200 });

// srtop.reveal('.home2 .image', { delay: 400 });
// srtop.reveal('.home2 .linkedin', { interval: 600 });
// srtop.reveal('.home2 .github', { interval: 800 });



// srtop.reveal('.home2 .dev', { interval: 600 });

// /* SCROLL ABOUT */
// srtop.reveal('.about2 .content h3', { delay: 200 });
// srtop.reveal('.about2 .content .tag', { delay: 200 });
// srtop.reveal('.about2 .content p', { delay: 200 });
// srtop.reveal('.about2 .content .box-container', { delay: 200 });
// srtop.reveal('.about2 .content .resumebtn', { delay: 200 });


// /* SCROLL SKILLS */
// srtop.reveal('.skills2 .container', { interval: 200 });
// srtop.reveal('.skills2 .container .bar', { delay: 400 });


// /* SCROLL PROJECTS */
// srtop.reveal('.work .box', { interval: 200 });


// /* SCROLL CONTACT */
// srtop.reveal('.contact2 .container', { delay: 400 });
// srtop.reveal('.contact2 .container .form-group', { delay: 400 });
