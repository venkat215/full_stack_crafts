// page - home - functions
// $(document).ready(function () {
//     $('a[data-toggle="tab"]').click(function (e) {
//         e.preventDefault();
//         $(this).tab('show');
//     });
    
//     $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
//         var id = $(e.target).attr("href");
//         localStorage.setItem('selectedTab', id)
//     });
    
//     var selectedTab = localStorage.getItem('selectedTab');
//     if (selectedTab != null) {
//         $('a[data-toggle="tab"][href="' + selectedTab + '"]').tab('show');
//     }
// });

$(document).ready(function () {
    var forms = document.querySelectorAll('form');
    forms.forEach(function(form){
        resetForms(form);
    });
    
});

function resetForms(form) {
    form.reset();
}

var toggle_navcontainer = function(){
    if($(window).width()<993){
        $('.toggle-container').removeClass('container');
       }
    if($(window).width()>993){
        $('.toggle-container').addClass('container');
    }
}


$(window).resize(function(){
    toggle_navcontainer();
});
      
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
    toggle_navcontainer();
    const myInput = document.getElementById('password2');
    myInput.onpaste = function(e) {
      e.preventDefault();
    }
    delte_alert();
};

window.onmessage = function(){
    delte_alert();
};

var didScroll;
var lastScrollTop = 0;
var delta = 5

$(window).scroll(function(event){

    if($(window).width()<993){

        var navbarHeight = $('header').outerHeight();
        didScroll = true;

        setInterval(function() {
            if (didScroll) {
                didScroll = false;
                hasScrolled(navbarHeight);
            }
        }, 250);
    }
    else{
        $('header').removeClass('nav-up').addClass('nav-down');
    }
});

function hasScrolled(navbarHeight) {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta){
        return;
    }
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        document.getElementById("navbar").className = "nav-up";
        // $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

(function(global){
 
    //returns object of function constructor Greetr.init assigned to Greetr variable
    var FormValidator = function(){
        return new FormValidator.init();
    }

    var text
    var alert_tags
    var matches
    var alert_element
    var alert_element_msg
    var input_box
    
    //__proto__ of any object created with Greetr will point to Greetr.prototype
    //Defining all the methods for greeter inside prototype
    
    FormValidator.prototype = {

        allowed_chars : function(elementID, pattern, invalid_msg){
            console.log("here")
            text = document.getElementById(elementID).value.trim();
            document.getElementById(elementID).value = text;
            input_box = document.getElementById(elementID);
            alert_tags = input_box.parentElement.getElementsByTagName("p");
                if(alert_tags.length !== 0){
                    input_box.parentElement.removeChild(alert_tags[0]);
                };
            matches = text.match(pattern);

            if(matches == null || matches.length !== text.length){
                alert_element = document.createElement("p");
                alert_element.className = "validation-alert"
                input_box.parentElement.appendChild(alert_element);
                alert_element_msg = document.createTextNode(invalid_msg);
                input_box.classList.toggle('was-validated');
                input_box.classList.toggle('is-invalid');
                input_box.setCustomValidity(invalid_msg)
                alert_element.appendChild(alert_element_msg);
                return false;
            }
            else{
                return true;
            };
        },

        compare_to_element: function(elementID, compare_elementID, invalid_msg){
            text = document.getElementById(elementID).value;
            var p_text = document.getElementById(compare_elementID).value;
        
            input_box = document.getElementById(elementID);
            alert_tags = input_box.parentElement.getElementsByTagName("p");
                if(alert_tags.length !== 0){
                    input_box.parentElement.removeChild(alert_tags[0]);
                };
            if(text !== p_text){
                alert_element = document.createElement("p");
                alert_element.className = "validation-alert"
                input_box.parentElement.appendChild(alert_element);
                alert_element_msg = document.createTextNode(invalid_msg);
                input_box.className += ' was-validated is-invalid'
                input_box.setCustomValidity(invalid_msg)
                alert_element.appendChild(alert_element_msg);
                return false;
            }
            else{
                return true;
            };
        },

        length_check: function(elementID, req_length, invalid_msg){
            text = document.getElementById(elementID).value.trim();
            document.getElementById(elementID).value = text;
            input_box = document.getElementById(elementID);
            alert_tags = input_box.parentElement.getElementsByTagName("p");
            if(alert_tags.length !== 0){
                input_box.parentElement.removeChild(alert_tags[0]);
            };
            if(text.length < req_length){
                alert_element = document.createElement("p");
                alert_element.className = "validation-alert"
                input_box.parentElement.appendChild(alert_element);
                alert_element_msg = document.createTextNode(invalid_msg);
                input_box.className += ' was-validated is-invalid'
                input_box.setCustomValidity(invalid_msg)
                alert_element.appendChild(alert_element_msg);
                return false;
            }
            else{
                return true;
            };
        },

        email : function(elementID, invalid_msg){
            text = document.getElementById(elementID).value.trim();
            document.getElementById(elementID).value = text;
            input_box = document.getElementById(elementID);
            alert_tags = input_box.parentElement.getElementsByTagName("p");
                if(alert_tags.length !== 0){
                    input_box.parentElement.removeChild(alert_tags[0]);
                };
            matches = text.match(/.*?@.*?\..{3}/g);

            if(matches == null || matches.length > 1 || matches[0].length !== text.length){
                input_box = document.getElementById(elementID);
                alert_element = document.createElement("p");
                alert_element.className = "validation-alert"
                input_box.parentElement.appendChild(alert_element);
                alert_element_msg = document.createTextNode(invalid_msg);
                input_box.classList.toggle('was-validated');
                input_box.classList.toggle('is-invalid');
                input_box.setCustomValidity(invalid_msg)
                alert_element.appendChild(alert_element_msg);
                return false;
            }
            else{
                return true;
            };
        },

        password: function(elementID, invalid_msg){
            text = document.getElementById(elementID).value;
            input_box = document.getElementById(elementID);
            alert_tags = input_box.parentElement.getElementsByTagName("p");
            alert_tags = input_box.parentElement.getElementsByTagName("p");
                if(alert_tags.length !== 0){
                    input_box.parentElement.removeChild(alert_tags[0]);
                };
            var capitals = text.match(/[A-Z]/);
            var smalls = text.match(/[a-z]/);
            var numbers = text.match(/[0-9]/);
        
            if(capitals == null || smalls == null || numbers == null || text.length < 8){
                input_box = document.getElementById(elementID);
                alert_element = document.createElement("p");
                alert_element.className = "validation-alert"
                input_box.parentElement.appendChild(alert_element);
                alert_element_msg = document.createTextNode(invalid_msg);
                input_box.className += ' was-validated is-invalid'
                input_box.setCustomValidity(invalid_msg)
                alert_element.appendChild(alert_element_msg);
                return false;
            }
            else{
                return true;
            };
        },
        

        remove_invalid : function(dom_elem){
            dom_elem.classList.remove('was-validated');
            dom_elem.classList.remove('is-invalid');
            dom_elem.setCustomValidity("");
            dom_elem.nextElementSibling.remove();
        },

    };

    // Function constructor
    FormValidator.init = function init(){
    }

    //Greetr always uses Greetr.init to create objects so referencing Greetr.prototype to Greetr.init.prototype
    FormValidator.init.prototype = FormValidator.prototype;

    //assign Greetr object to the global variable that gets passed
    global.form_validator = global.fv = FormValidator;

}(window)); //Immediately Invoked. Expects global object and jquey object

// register page

function validate_reg_fields(){ 
    var n = false;

    vdtr = fv();
    valid_array = [vdtr.email("email", "Invalid Email"),
                   vdtr.password("password1", "Invalid Password"),
                   vdtr.compare_to_element("password2", "password1", "Passwords did not match"),
                   vdtr.length_check("fname", 1, "Invalid First Name"),
                   vdtr.length_check("lname", 1, "Invalid Last Name")];

    if(valid_array.every(function(obj){return obj == true;})){
        n = true;
    }
    return n
};

// profile page

function validate_acc_fields(){ 

    var n = false;

    vdtr = fv();
    valid_array = [vdtr.allowed_chars("username", /[a-zA-Z0-9\-_@\.]/g, "Invalid Username"),
                   vdtr.length_check("username", 6, "Invalid Username"),
                   vdtr.email('email', "Invalid Email"),
                   vdtr.length_check("fname", 1, "Invalid First Name"),
                   vdtr.length_check("lname", 1, "Invalid Last Name")];

    if(valid_array.every(function(obj){return obj == true;})){
        n = true;
    }
    return n
};

// function validate_ch_pass_fields(){ 
//     var n = false;

//     vdtr = fv();
//     valid_array = [vdtr.email("email"), vdtr.password("password1"), vdtr.compare_to_element("password2", "password1"), vdtr.blank_field("fname"), vdtr.blank_field("lname")];

//     if(valid_array.every(function(obj){return obj == true;})){
//         n = true;
//     }
//     return n
// };



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