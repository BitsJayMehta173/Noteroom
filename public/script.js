wordcount=document.getElementsByClassName("wordcount")
addbtn=document.getElementById("addbtn")
openedfile=document.querySelector(".openedfile")
btncover=document.querySelectorAll(".btncover")
fname=document.querySelectorAll(".fname")
close=document.querySelectorAll(".close")
newfiledialogue=document.querySelector(".newfiledialogue")



contents=[]

currentfile=null
// for now we have left DOMLOADED function but we can change it later for the required components to load first then fetch data later
async function load (){
    await fetch('http://localhost:3000/getUsers')
        .then(response => response.json())
        .then(data => {
            // console.log(data)

            data.forEach(val=>{
                let myobj={
                    id: val["_id"],
                    title: val["title"],
                    content:val["content"],
                    description:val["description"]
                }
                contents.push(myobj)
            })

        })
        .catch(error => console.log('Error fetching data:'));
    };
    
let c=0

lastactivefile=null
ta=document.querySelector(".ta")


function fileload(){
    load().then(()=>{
        contents.forEach(element =>{
        let btndiv=document.createElement("div")
        btndiv.setAttribute('id', element["id"]);
        btndiv.classList.toggle("btncover")
        let name=document.createElement("button")
        name.classList.toggle("fname")
        let close=document.createElement("button")
        name.innerHTML=element["title"]
        // ta.value=element["content"]
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
    ta=document.querySelector(".ta")
    // seperated into two function taking a lot of time and lines of code merge it or find a alternative solution
    btncover=document.querySelectorAll(".btncover")

    fname=document.querySelectorAll(".fname")

    close=document.querySelectorAll(".close")

    close.forEach(element => {
        element.addEventListener("click",function(e){ 
            contents.forEach(ele=>{
            idstore=document.querySelector(".idstore")
            
                if(idstore.textContent!="" && idstore.textContent==e.target.parentElement.getAttribute('id')){
                    ta.value=""
                    idstore.textContent=""
                    ta=document.querySelector(".ta")
                    ta.style.display="none"
                }
            })

            e.target.parentElement.remove();
            // ta.style.display="none"

        },false);
    });

    // after close the active file we must shift the activefile to newactive file if the current window is closed for this we have to create a stack for new window popup too

    fname.forEach(element => {
        element.addEventListener("click",function(e){ 
           
            
            const clickedbutton=e.target.parentElement
            ta.style.display="block"
            
            if (clickedbutton.classList.contains("btncover")) {
                if(lastactivefile){
                    lastactivefile.classList.remove("activefile");
                }
            }
            
            e.target.parentElement.classList.add("activefile")
            currentfile=1;
            lastactivefile=clickedbutton
            // for the text area change we have to create a unique id map for the corresponding file name and textarea
            // console.log(e.target.innerHTML)
            ta=document.querySelector(".ta")

            
            
            let idstore=document.querySelector(".idstore")
            
            contents.forEach(ele=>{
               
                if(ele["id"]==e.target.parentElement.getAttribute('id')){
                    ta.value=ele["content"]
                    // if we need to perform any action on the present note we can use idstore textcontent to save it in the db as it has its id
                    idstore.textContent=ele["id"]

                    // console.log(ele["id"])
                    
                    if(document.querySelector(".contdetails")){
                        document.querySelector(".contdetails").remove()
                    }
                        let detbox=document.querySelector(".detbox")
                        let contdetails=document.createElement("div")
                        contdetails.classList.toggle("contdetails")
                        // btndiv.setAttribute('id', data["receivedData"]["_id"]);
                        let timestamp=document.createElement("div")
                        timestamp.classList.toggle("timestamp")
                        let det=document.createElement("div")
                        det.classList.toggle("det")
                        let dettext=document.createElement("span")
                        dettext.textContent=ele["description"]
                        timestamp.innerHTML="Today"
                        det.classList.toggle("active")
                        contdetails.appendChild(timestamp)
                        det.appendChild(dettext)
                        contdetails.appendChild(det)
                        detbox.appendChild(contdetails)


                }
            })

        },false);
    });
    
    btncover.forEach(element => {
        element.addEventListener("click",function(e){
            if(!e.target.classList.contains("close")) 
                ta.style.display="block"
            const clickedbutton=e.target
            if (clickedbutton.classList.contains("btncover")) {
                if(lastactivefile){
                    lastactivefile.classList.remove("activefile");
                }
                e.target.classList.add("activefile")
                lastactivefile=clickedbutton
            }

            ta=document.querySelector(".ta")
            idstore=document.querySelector(".idstore")

            contents.forEach(ele=>{
                // console.log("a")
                if(ele["id"]==e.target.getAttribute('id')){
                    ta.value=ele["content"]
                    // console.log(ele["id"])
                    idstore.textContent=ele["id"]
                }
            })
        },false);
    });

  

}

highlight()

async function nfnsubmitfun(){
    nfn=document.querySelector(".nfn")
    // talking about the description this is draft we need to make a object which stores date,time,title and other descriptions in each update. 
    const data = {
        title: nfn.value,
        content: '',
        description:nfn.value,
    };
    await fetch('http://localhost:3000/getUsers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {console.log('Success:', data)
                let myobj={
                    id: data["receivedData"]["_id"],
                    title: data["receivedData"]["title"],
                    content:data["receivedData"]["content"],
                    description:data["receivedData"]["description"]
                }
                contents.push(myobj)
                // console.log(contents)

                // console.log(nfn.value)
                let btndiv=document.createElement("div")
                btndiv.classList.toggle("btncover")
                btndiv.setAttribute('id', data["receivedData"]["_id"]);
                let name=document.createElement("button")
                name.classList.toggle("fname")
                let close=document.createElement("button")
                name.innerHTML=nfn.value
                nfn.value=""
                close.innerHTML="X"
                close.classList.toggle("close")
                btndiv.appendChild(name)
                btndiv.appendChild(close)
                openedfile.appendChild(btndiv)
                newfiledialogue.style.display="none"
                highlight()
                idstore=document.querySelector(".idstore")
                idstore.textContent=data["receivedData"]["_id"]


            })
            .catch(error => console.error('Error:', error));


    
}



function addLab(){
    newfiledialogue.style.display="flex"
}


ta.addEventListener("keyup", async function(){

    let con=ta.value
    //need to make a function to remove space and next line count
    wordcount[0].textContent="WordCount: "+con.length
    
    // Data to be updated
    const updateData = {
        content: ta.value
    };
    
    // ID of the document to be updated (replace with actual ID)
    idstore=document.querySelector(".idstore")

    const id = idstore.textContent;

    // Send PUT request
    await fetch(`http://localhost:3000/getUsers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
    .then(response => response.json())
    .then(data => {console.log('Update Success:', data)
        contents.forEach(ele=>{
            nobj=data["updatedData"]
            if(nobj["_id"]==ele["id"]){
                ele["content"]=data["updatedData"]["content"]
            }
        })
    })
    .catch(error => console.error('Update Error:', error));

});
