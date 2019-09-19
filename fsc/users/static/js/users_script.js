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