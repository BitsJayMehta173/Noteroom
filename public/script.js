wordcount=document.getElementsByClassName("wordcount")
addbtn=document.getElementById("addbtn")
openedfile=document.querySelector(".openedfile")
btncover=document.querySelectorAll(".btncover")
fname=document.querySelectorAll(".fname")
close=document.querySelectorAll(".close")



lastactivefile=null
ta=document.querySelector(".ta")

ta.value=".....Sunflower....

a small hand pasees,
running in those crowds of sunflower,
giggling with laughter,
and stops by a beautiful sunflower,
touches it with silence,
mommy do you know why dad loves it soo much?
why dont you ask him yourself girl..
im sure dad will love it.
you know sunflower always waits for the sun..
now lets go and show it to your dad.
plucks the flower
and runs to the cottage happily..

nailing sound comes from a room,
someone is packing a box.
bhoo and giggles.
dady i got you haha.
yes that scared me dear hahaha,
hehehe thats what a villian power is hehehe (evil laugh)
hahaha(worried dad laugh)
laughs daughter.

tadaaa see what i brought..
(smiles) yes thats what we needed now thanks cookie,
daddy did you put my letter in it.
yes i did dear.
so now your mama must be waiting
sooo its all ready now lets go.
let me carry the box dady.
uuuggghh its heavy dad.
hahaha come let me get it, you take the flowers..
okk dady(sad)

(carries the wooden box)leaves the room

as they walk..
daddy why do you like sunflower soo much..
smiles because your mom always gave me sunflower when we used to meet.
but today we are going to give it to her.

we are here she runs foreward,
(there lies a gravestone,)
dad follows..
a silent wind blows as we se the gravestone.
dad steps foreward with a silent expression 
and sits in front of the gravestone.
come sit here.
and give it to your mom.....
places the sunfllower over the gravestone...."

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
