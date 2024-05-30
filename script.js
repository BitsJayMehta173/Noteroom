wordcount=document.getElementsByClassName("wordcount")
addbtn=document.getElementById("addbtn")
btncover=document.querySelector(".openedfile")


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
    btncover.appendChild(btndiv)
}

ta.addEventListener("keyup", function(){
    let con=ta.value

    //need to make a function to remove space and next line count
    wordcount[0].textContent="WordCount: "+con.length
});
