wordcount=document.getElementsByClassName("wordcount")
addbtn=document.getElementById("addbtn")
openedfile=document.querySelector(".openedfile")
btncover=document.querySelectorAll(".btncover")
fname=document.querySelectorAll(".fname")
close=document.querySelectorAll(".close")

contents=[]

// for now we have left DOMLOADED function but we can change it later for the required components to load first then fetch data later
async function load (){
    await fetch('http://localhost:3000/getUsers')
        .then(response => response.json())
        .then(data => {
            // console.log(data)

            data.forEach(val=>{
                let myobj={
                    name: val["name"],
                    age:val["age"]
                }
                contents.push(myobj)
            })

        })
        .catch(error => console.log('Error fetching data:'));
    };
    


lastactivefile=null
ta=document.querySelector(".ta")


function fileload(){
    load().then(()=>{
        // console.log(contents)
        contents.forEach(element =>{
        let btndiv=document.createElement("div")
        btndiv.classList.toggle("btncover")
        let name=document.createElement("button")
        name.classList.toggle("fname")
        let close=document.createElement("button")
        name.innerHTML=element["name"]
        // ta.value=element["age"]
        close.innerHTML="X"
        close.classList.toggle("close")
        btndiv.appendChild(name)
        btndiv.appendChild(close)
        openedfile.appendChild(btndiv)
        highlight()
    })})
}

fileload()

function highlight(){

    // seperated into two function taking a lot of time and lines of code merge it or find a alternative solution
    btncover=document.querySelectorAll(".btncover")

    fname=document.querySelectorAll(".fname")
    fname.forEach(element => {
        element.addEventListener("click",function(e){ 
            const clickedbutton=e.target.parentElement
            if (clickedbutton.classList.contains("btncover")) {
                if(lastactivefile){
                    lastactivefile.classList.remove("activefile");
                }
            }
            e.target.parentElement.classList.add("activefile")
            lastactivefile=clickedbutton
            // for the text area change we have to create a unique id map for the corresponding file name and textarea
            // console.log(e.target.innerHTML)
        },false);
    });
    
    btncover.forEach(element => {
        element.addEventListener("click",function(e){ 
            const clickedbutton=e.target
            if (clickedbutton.classList.contains("btncover")) {
                if(lastactivefile){
                    lastactivefile.classList.remove("activefile");
                }
                e.target.classList.add("activefile")
                lastactivefile=clickedbutton
            }
        },false);
    });

    close=document.querySelectorAll(".close")

    close.forEach(element => {
        element.addEventListener("click",function(e){ 
            e.target.parentElement.remove();
        },false);
    });

}

highlight()

function addLab(){
    let btndiv=document.createElement("div")
    btndiv.classList.toggle("btncover")
    let name=document.createElement("button")
    name.classList.toggle("fname")
    let close=document.createElement("button")
    name.innerHTML="Life"
    close.innerHTML="X"
    close.classList.toggle("close")
    btndiv.appendChild(name)
    btndiv.appendChild(close)
    openedfile.appendChild(btndiv)
    highlight()
}


ta.addEventListener("keyup", function(){
    let con=ta.value

    //need to make a function to remove space and next line count
    wordcount[0].textContent="WordCount: "+con.length
});
