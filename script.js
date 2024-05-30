wordcount=document.getElementsByClassName("wordcount")
addbtn=document.getElementById("addbtn")
openedfile=document.querySelector(".openedfile")
btncover=document.querySelectorAll(".btncover")
fname=document.querySelectorAll(".fname")



lastactivefile=null

ta=document.querySelector(".ta")

function addLab(){
    let btndiv=document.createElement("div")
    btndiv.classList.toggle("btncover")
    let name=document.createElement("button")
    let close=document.createElement("button")
    name.innerHTML="Life"
    close.innerHTML="X"
    close.classList.toggle("close")
    btndiv.appendChild(name)
    btndiv.appendChild(close)
    openedfile.appendChild(btndiv)
}

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
        // console.log(lastactivefile)
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
        // console.log(lastactivefile)
    },false);
});

ta.addEventListener("keyup", function(){
    let con=ta.value

    //need to make a function to remove space and next line count
    wordcount[0].textContent="WordCount: "+con.length
});
