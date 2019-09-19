// page - home - functions

var delte_alert = function(){
    if(document.getElementsByClassName("alert")){
        setInterval(function(){
            // document.getElementsByClassName("alert")[0].remove();
        $(".alert").fadeOut(300, function(){ 
            $(this).remove();
        });
        }, 5000);
    }
}

window.onload = function() {
    const myInput = document.getElementById('r_cpassword');
    myInput.onpaste = function(e) {
      e.preventDefault();
    }
    delte_alert();
};

window.onmessage = function(){
    delte_alert();
};

// var didScroll;
// var lastScrollTop = 0;
// var delta = 5

// $(window).scroll(function(event){
//     var navbarHeight = $('header').outerHeight();
//     didScroll = true;

//     setInterval(function() {
//         if (didScroll) {
//             didScroll = false;
//             hasScrolled(navbarHeight);
//         }
//     }, 250);

// });


// function hasScrolled(navbarHeight) {
//     var st = $(this).scrollTop();
//     // Make sure they scroll more than delta
//     if(Math.abs(lastScrollTop - st) <= delta){
//         return;
//     }
//     // If they scrolled down and are past the navbar, add class .nav-up.
//     // This is necessary so you never see what is "behind" the navbar.
//     if (st > lastScrollTop && st > navbarHeight){
//         // Scroll Down
//         document.getElementById("navbar").className = "nav-up";
//         // $('header').removeClass('nav-down').addClass('nav-up');
//     } else {
//         // Scroll Up
//         if(st + $(window).height() < $(document).height()) {
//             $('header').removeClass('nav-up').addClass('nav-down');
//         }
//     }
    
//     lastScrollTop = st;
// }

function validate_reg_fields(){ 

    var n = true;

    var text = document.getElementById("r_uname").value.trim();
    document.getElementById("r_uname").value = text;
    var input_box = document.getElementById("r_uname");
    var alert_tags = input_box.parentElement.getElementsByTagName("p");
    if(alert_tags.length !== 0){
        for(var i =0; i < alert_tags.length; i++){
            if(alert_tags[i].className !== 'miniature_msg'){
                input_box.parentElement.removeChild(alert_tags[i]);
            }
        } 
    };
    var matches = text.match(/[A-Za-z0-9_]+/);
    if(matches == null || matches[0].length !== text.length){
        input_box = document.getElementById("r_uname");
        alert_element = document.createElement("p");
        alert_element.className = "validation_alert"
        input_box.parentElement.appendChild(alert_element);
        var alert_element_msg = document.createTextNode("Invalid Username");
        alert_element.appendChild(alert_element_msg);
        n = false;
    };

    var text = document.getElementById("fname").value.trim();
    document.getElementById("fname").value = text;
    var input_box = document.getElementById("fname");
    var alert_tags = input_box.parentElement.getElementsByTagName("p");
    if(alert_tags.length !== 0){
        input_box.parentElement.removeChild(alert_tags[0]);
    };
    if(text.length == 0){
        var alert_element = document.createElement("p");
        alert_element.className = "validation_alert"
        input_box.parentElement.appendChild(alert_element);
        var alert_element_msg = document.createTextNode("Invalid First Name");
        alert_element.appendChild(alert_element_msg);
        n = false;
    };

    var text = document.getElementById("lanme").value.trim();
    document.getElementById("lanme").value = text;
    var input_box = document.getElementById("lanme");
    var alert_tags = input_box.parentElement.getElementsByTagName("p");
        if(alert_tags.length !== 0){
            input_box.parentElement.removeChild(alert_tags[0]);
        };
    if(text.length == 0){
        var alert_element = document.createElement("p");
        alert_element.className = "validation_alert"
        input_box.parentElement.appendChild(alert_element);
        var alert_element_msg = document.createTextNode("Invalid Last Name");
        alert_element.appendChild(alert_element_msg);
        n = false;
    };

    var text = document.getElementById("r_emailid").value.trim();
    document.getElementById("r_emailid").value = text;
    input_box = document.getElementById("r_emailid");
    alert_tags = input_box.parentElement.getElementsByTagName("p");
        if(alert_tags.length !== 0){
            input_box.parentElement.removeChild(alert_tags[0]);
        };
    var matches = text.match(/.*?@.*?\..{3}/);
    if(matches == null || matches.length > 1 || matches[0].length !== text.length){
        input_box = document.getElementById("r_emailid");
        alert_element = document.createElement("p");
        alert_element.className = "validation_alert"
        input_box.parentElement.appendChild(alert_element);
        var alert_element_msg = document.createTextNode("Invalid email id");
        alert_element.appendChild(alert_element_msg);
        n = false;
    };

    text = document.getElementById("r_password").value;
    input_box = document.getElementById("r_password");
    alert_tags = input_box.parentElement.getElementsByTagName("p");
    if(alert_tags.length !== 0){
        for(var i =0; i < alert_tags.length; i++){
            if(alert_tags[i].className !== 'miniature_msg'){
                input_box.parentElement.removeChild(alert_tags[i]);
            }
        } 
    };
    var capitals = text.match(/[A-Z]/);
    var smalls = text.match(/[a-z]/);
    var numbers = text.match(/[0-9]/);

    if(capitals == null || smalls == null || numbers == null || text.length < 8){
        input_box = document.getElementById("r_password");
        alert_element = document.createElement("p");
        alert_element.className = "validation_alert"
        input_box.parentElement.appendChild(alert_element);
        var alert_element_msg = document.createTextNode("Invalid password");
        alert_element.appendChild(alert_element_msg);
        n = false;
    };

    var text = document.getElementById("r_cpassword").value;
    var p_text = document.getElementById("r_password").value;

    var input_box = document.getElementById("r_cpassword");
    var alert_tags = input_box.parentElement.getElementsByTagName("p");
        if(alert_tags.length !== 0){
            input_box.parentElement.removeChild(alert_tags[0]);
        };
    if(text !== p_text){
        var alert_element = document.createElement("p");
        alert_element.className = "validation_alert"
        input_box.parentElement.appendChild(alert_element);
        var alert_element_msg = document.createTextNode("Passwords do not match");
        alert_element.appendChild(alert_element_msg);
        n = false;
    };

    return n
};

//runs when the form is trying to submit
$("#reg_form").submit(function(){
    alert("Submitted");
});


// page - about - functions

function ktop_img(img_src){

    document.getElementById("developer_img").src=img_src

};

function developer_img(img_src){

    document.getElementById("developer_img").src=img_src

};

// page - projects - functions

function blob_block(canvas){

    const context = canvas.getContext("2d");
    const blobCount = 4
    const blobs = new Array();

    let colors = new Array("rgb(33, 63, 83)", "rgb(0, 0, 0)", "rgb(100, 100, 100)", "rgb(255, 255, 255)");

    class Blob {
        constructor(color, size){
            this.size = size;
            this.x = Math.random() * canvas.width/1.5;
            this.y = Math.random() * canvas.height/1.5;
            this.color = color;
            this.xChange = Math.random() + 1;
            this.yChange = Math.random() + 1;
        }

        move(){
            if (this.x   >= canvas.width - this.size || this.x  <= 0 + this.size) {
                this.xChange *= -1;
                }

            if (this.y   >= canvas.height - this.size || this.y  <= 0 + this.size) {
                this.yChange *= -1;
                }

            this.x+=this.xChange;
            this.y+=this.yChange;
        }
        
        draw(){
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, 2*Math.PI);
            context.fillStyle = this.color;
            context.fill();
            context.stroke();
        }

    }

    function randomChoice(arr){
        return arr[Math.floor(Math.random()*arr.length)];
    }

    for(let i =0; i<blobCount; i++){

        let randomColor = randomChoice(colors);
        blobs.push(new Blob(randomColor, 7.5));
    }

    function canvasDraw(){
        context.clearRect(0,0,canvas.width, canvas.height);

        blobs.forEach(function(obj){
            obj.draw();
            obj.move();
        })
    }

    setInterval(canvasDraw,7.5);
};

function changeStyle(){
    
    document.getElementById("projects").style.color = "rgb(110, 165, 58)";
};

function grab_tags(){
    var tags = document.getElementsByTagName("li");
    tags[tags.length -1].style.backgroundColor = "rgb(110, 165, 58)";
};