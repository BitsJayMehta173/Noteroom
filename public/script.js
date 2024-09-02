wordcount = document.getElementsByClassName("wordcount");
addbtn = document.getElementById("addbtn");
openedfile = document.querySelector(".openedfile");
btncover = document.querySelectorAll(".btncover");
fname = document.querySelectorAll(".fname");
close = document.querySelectorAll(".close");
newfiledialogue = document.querySelector(".newfiledialogue");

let abtnpress = 0;
contents = [];
let started = 0;
currentfile = null;
// for now we have left DOMLOADED function but we can change it later for the required components to load first then fetch data later
async function load() {
  await fetch("/getUsers")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)

      data.forEach((val) => {
        let myobj = {
          id: val["_id"],
          title: val["title"],
          content: val["content"],
          description: val["description"],
        };
        contents.push(myobj);
      });
    })
    .catch((error) => console.log("Error fetching data:"));
}

let c = 0;

lastactivefile = null;
ta = document.querySelector(".ta");

function fileload() {
  load().then(() => {
    let idx = 0;
    contents.forEach((element) => {
      let btndiv = document.createElement("div");
      btndiv.setAttribute("id", element["id"]);
      btndiv.classList.toggle("btncover");
      let name = document.createElement("button");
      name.classList.toggle("fname");
      let close = document.createElement("button");
      name.innerHTML = element["title"];
      // ta.value=element["content"]
      close.innerHTML = "X";
      close.classList.toggle("close");
      btndiv.appendChild(name);
      btndiv.appendChild(close);
      openedfile.appendChild(btndiv);

      highlight();
      let detbox = document.querySelector(".detbox");
      let contdetails = document.createElement("div");
      contdetails.classList.toggle("contdetails");
      // btndiv.setAttribute('id', data["receivedData"]["_id"]);
      let timestamp = document.createElement("div");
      timestamp.classList.toggle("timestamp");
      let det = document.createElement("div");
      det.classList.toggle("det");
      let dettext = document.createElement("span");
      dettext.classList.toggle("dettext");
      dettext.textContent = element["title"];
      timestamp.innerHTML = "Today";
      if (idx == 0) {
        det.classList.toggle("active");
        idx += 1;
      }
      contdetails.appendChild(timestamp);
      det.appendChild(dettext);
      contdetails.appendChild(det);
      detbox.appendChild(contdetails);
    });
  });
}

fileload();

function highlight() {
  ta = document.querySelector(".ta");
  // seperated into two function taking a lot of time and lines of code merge it or find a alternative solution
  btncover = document.querySelectorAll(".btncover");

  fname = document.querySelectorAll(".fname");

  close = document.querySelectorAll(".close");

  close.forEach((element) => {
    element.addEventListener(
      "click",
      function (e) {
        let idx = 0;
        let testing = 0;
        contents.forEach((ele) => {
          idstore = document.querySelector(".idstore");
          if (
            idstore.textContent != "" &&
            idstore.textContent == e.target.parentElement.getAttribute("id")
          ) {
            testing = 1;
            ta.value = "";
            idstore.textContent = "";
            ta = document.querySelector(".ta");
            ta.style.display = "none";
            // if(document.querySelector(".contdetails")){
            //     document.querySelectorAll(".contdetails").forEach(e=>{
            //         e.remove()
            //     })
            // }
            if (document.querySelector(".deletefile")) {
              document.querySelector(".deletefile").remove();
            }
          }
        });

        e.target.parentElement.remove();
        // ta.style.display="none"
        if (testing == 1) {
          if (document.querySelector(".contdetails")) {
            document.querySelectorAll(".contdetails").forEach((e) => {
              e.remove();
            });
          }
          contents.forEach((cele) => {
            let detbox = document.querySelector(".detbox");
            let contdetails = document.createElement("div");
            contdetails.classList.toggle("contdetails");
            // btndiv.setAttribute('id', data["receivedData"]["_id"]);
            let timestamp = document.createElement("div");
            timestamp.classList.toggle("timestamp");
            let det = document.createElement("div");
            det.classList.toggle("det");
            let dettext = document.createElement("span");
            dettext.classList.toggle("dettext");
            dettext.textContent = cele["title"];
            timestamp.innerHTML = "Today";
            if (idx == 0) {
              det.classList.toggle("active");
              idx += 1;
            }
            contdetails.appendChild(timestamp);
            det.appendChild(dettext);
            contdetails.appendChild(det);
            detbox.appendChild(contdetails);
          });
        }
      },
      false
    );
  });

  // after close the active file we must shift the activefile to newactive file if the current window is closed for this we have to create a stack for new window popup too

  fname.forEach((element) => {
    element.addEventListener(
      "click",
      function (e) {
        started = 1;

        const clickedbutton = e.target.parentElement;
        ta.style.display = "block";

        if (clickedbutton.classList.contains("btncover")) {
          if (lastactivefile) {
            lastactivefile.classList.remove("activefile");
          }
        }

        e.target.parentElement.classList.add("activefile");
        currentfile = 1;
        lastactivefile = clickedbutton;
        // for the text area change we have to create a unique id map for the corresponding file name and textarea
        // console.log(e.target.innerHTML)
        ta = document.querySelector(".ta");

        let idstore = document.querySelector(".idstore");

        contents.forEach((ele) => {
          if (ele["id"] == e.target.parentElement.getAttribute("id")) {
            ta.value = ele["content"];
            // if we need to perform any action on the present note we can use idstore textcontent to save it in the db as it has its id
            idstore.textContent = ele["id"];

            // console.log(ele["id"])

            if (document.querySelector(".contdetails")) {
              document.querySelectorAll(".contdetails").forEach((e) => {
                e.remove();
              });
            }
            if (document.querySelector(".deletefile")) {
              document.querySelector(".deletefile").remove();
            }
            let detbox = document.querySelector(".detbox");
            let contdetails = document.createElement("div");
            contdetails.classList.toggle("contdetails");
            // btndiv.setAttribute('id', data["receivedData"]["_id"]);
            let timestamp = document.createElement("div");
            timestamp.classList.toggle("timestamp");
            let det = document.createElement("div");
            det.classList.toggle("det");
            let dettext = document.createElement("span");
            dettext.classList.toggle("dettext");
            dettext.textContent = ele["description"];
            timestamp.innerHTML = "Today";
            det.classList.toggle("active");
            contdetails.appendChild(timestamp);
            det.appendChild(dettext);
            contdetails.appendChild(det);
            detbox.appendChild(contdetails);

            let deletefile = document.createElement("button");
            deletefile.classList.toggle("deletefile");
            deletefile.innerHTML = "X";
            let otherprops = document.querySelector(".otherprops");
            otherprops.appendChild(deletefile);
            if (document.querySelector(".deletefile")) {
              let deletefile = document.querySelector(".deletefile");
              deletefile.onclick = function () {
                let idstore = document.querySelector(".idstore");
                console.log(idstore.textContent);
                deleteData(idstore.textContent);
              };
            }
          }
        });
      },
      false
    );
  });

  btncover.forEach((element) => {
    element.addEventListener(
      "click",
      function (e) {
        started = 1;
        if (!e.target.classList.contains("close")) ta.style.display = "block";
        const clickedbutton = e.target;
        if (clickedbutton.classList.contains("btncover")) {
          if (lastactivefile) {
            lastactivefile.classList.remove("activefile");
          }
          e.target.classList.add("activefile");
          lastactivefile = clickedbutton;
        }

        ta = document.querySelector(".ta");
        idstore = document.querySelector(".idstore");

        contents.forEach((ele) => {
          // console.log("a")
          if (ele["id"] == e.target.getAttribute("id")) {
            ta.value = ele["content"];
            // console.log(ele["id"])
            idstore.textContent = ele["id"];

            if (document.querySelector(".contdetails")) {
              document.querySelectorAll(".contdetails").forEach((e) => {
                e.remove();
              });
            }
            if (abtnpress == 1) {
              abtnpress = 0;
            }
            if (document.querySelector(".deletefile")) {
              document.querySelector(".deletefile").remove();
            }
            let detbox = document.querySelector(".detbox");
            let contdetails = document.createElement("div");
            contdetails.classList.toggle("contdetails");
            // btndiv.setAttribute('id', data["receivedData"]["_id"]);
            let timestamp = document.createElement("div");
            timestamp.classList.toggle("timestamp");
            let det = document.createElement("div");
            det.classList.toggle("det");
            let dettext = document.createElement("span");
            dettext.classList.toggle("dettext");
            dettext.textContent = ele["description"];
            timestamp.innerHTML = "Today";
            det.classList.toggle("active");
            contdetails.appendChild(timestamp);
            det.appendChild(dettext);
            contdetails.appendChild(det);
            detbox.appendChild(contdetails);

            let deletefile = document.createElement("button");
            deletefile.classList.toggle("deletefile");
            deletefile.innerHTML = "X";
            let otherprops = document.querySelector(".otherprops");
            otherprops.appendChild(deletefile);
            if (document.querySelector(".deletefile")) {
              let deletefile = document.querySelector(".deletefile");
              deletefile.onclick = function () {
                let idstore = document.querySelector(".idstore");
                console.log(idstore.textContent);
                deleteData(idstore.textContent);
              };
            }
          }
        });
        ta.focus();
        let wordcount = document.querySelector(".wordcount");
        let number = wc(ta.value);
        wordcount.textContent = "WordCount: " + number;
        if (ta.style.display == "none") {
          wordcount.textContent = "No file Opened";
        }
      },
      false
    );
  });
}

function deleteData(id) {
  fetch(`/getUsers/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.message) {
        location.reload();
      }
    })
    .catch((error) => console.error("Error deleting data:", error));
}

highlight();

// talking about the description this is draft we need to make a object which stores date,time,title and other descriptions in each update.
async function nfnsubmitfun() {
  nfn = document.querySelector(".nfn");

  const data = {
    title: nfn.value,
    content: "",
    description: nfn.value,
  };

  await fetch("/getUsers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      let myobj = {
        id: data["receivedData"]["_id"],
        title: data["receivedData"]["title"],
        content: data["receivedData"]["content"],
        description: data["receivedData"]["description"],
      };
      contents.push(myobj);

      let btndiv = document.createElement("div");
      btndiv.classList.toggle("btncover");
      btndiv.setAttribute("id", data["receivedData"]["_id"]);

      let name = document.createElement("button");
      name.classList.toggle("fname");

      let close = document.createElement("button");
      name.innerHTML = nfn.value;
      nfn.value = "";
      close.innerHTML = "X";
      close.classList.toggle("close");

      btndiv.appendChild(name);
      btndiv.appendChild(close);
      openedfile.appendChild(btndiv);
      newfiledialogue.style.display = "none";
      abtnpress = 1;
      highlight();
      const elements = document.querySelectorAll(".btncover");
      const lastElement = elements.length
        ? elements[elements.length - 1]
        : null;

      if (lastElement) {
        lastElement.click();
        ta.focus();
      } else {
        console.log("No elements found");
      }
      // Scroll to the newly added file
      btndiv.scrollIntoView({ behavior: "smooth", block: "center" });

      // Automatically select the newly added file
      btndiv.click();
      ta.focus();
    })
    .catch((error) => console.error("Error:", error));
}

function addLab() {
  newfiledialogue.style.display = "flex";
  newfiledialogue.scrollIntoView({ behavior: "smooth", block: "end" });
}
function nfnclosefun() {
    newfiledialogue.style.display = "none";
    newfiledialogue.scrollIntoView({ behavior: "smooth", block: "end" });
  }

ta.addEventListener("keyup", async function () {
  // let con=ta.value
  //need to make a function to remove space and next line count
  // wordcount[0].textContent="WordCount: "+con.length
  let ta = document.querySelector(".ta");
  let wordcount = document.querySelector(".wordcount");
  let number = wc(ta.value);
  wordcount.textContent = "WordCount: " + number;

  // Data to be updated
  const updateData = {
    content: ta.value,
  };

  // ID of the document to be updated (replace with actual ID)
  idstore = document.querySelector(".idstore");

  const id = idstore.textContent;

  // Send PUT request
  await fetch(`/getUsers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Update Success:", data);
      contents.forEach((ele) => {
        nobj = data["updatedData"];
        if (nobj["_id"] == ele["id"]) {
          ele["content"] = data["updatedData"]["content"];
        }
      });
    })
    .catch((error) => console.error("Update Error:", error));
});

function wc(words) {
  let len = 0;
  words = words.split();
  // console.log(words)
  for (let i = 0; i < words[0].length; i++) {
    if (words[0][i] != " " && words[0][i] != "\n") {
      len = len + 1;
    }
  }
  // console.log(len)
  return len;
}

function searchItems() {
    // Get the value of the search input
    const searchValue = document.querySelector(".searchBox").value.toLowerCase();
    console.log(searchValue);
  
    // Remove existing search results
    if (document.querySelector(".contdetails")) {
      document.querySelectorAll(".contdetails").forEach((e) => {
        e.remove();
      });
    }
  
    // Loop through the contents array and filter items based on the search value
    contents.forEach((cele) => {
      const itemText = cele["title"].toLowerCase(); // Make sure the item text is lowercase for comparison
  
      if (itemText.includes(searchValue)) {
        // Create a new div element for the search result
        let detbox = document.querySelector(".detbox");
        let contdetails = document.createElement("div");
        contdetails.classList.add("contdetails");
  
        // Create a timestamp element
        let timestamp = document.createElement("div");
        timestamp.classList.add("timestamp");
        timestamp.textContent = "Today";
  
        // Create a details element
        let det = document.createElement("div");
        det.classList.add("det");
  
        // Create a span element for the item text
        let dettext = document.createElement("span");
        dettext.classList.add("dettext");
        dettext.textContent = cele["title"];
  
        // Append the timestamp and details text to the contdetails div
        det.appendChild(dettext);
        contdetails.appendChild(timestamp);
        contdetails.appendChild(det);
  
        // Append the contdetails div to the detbox container
        detbox.appendChild(contdetails);
      }
    });
  }
  