let addBtn = document.querySelector(".add");
let clear = document.querySelector(".clear");
let tasks = document.querySelector(".tasks");
let input = document.querySelector(".top input")
let text = (textP,txt)=>{
  textP.appendChild(document.createTextNode(txt))
}
let append = (parent, ...args)=>{
  args.forEach(e=>{
    parent.appendChild(e)
  })
}
let data= JSON.parse(window.localStorage.getItem("data"))?JSON.parse(window.localStorage.getItem("data")):[]
let data2=[]
data.forEach((e, i)=>{
  toggle(e.value, i)
})
addBtn.onclick=()=>{
  input.value!=""?toggle(input.value, data2.length):""
}
function toggle(e, i){
  let div = document.createElement("div")
  let par = document.createElement("p")
  let span = document.createElement("span")
  text(par, e)
  div.dataset.id=i
  text(span, "Delete")
  div.classList.add("task")
  append(div, par, span)
  append(tasks, div)
  data2.push({
    id: div.dataset.id,
    value: e,
    completed: false
  })
  window.localStorage.setItem("data", JSON.stringify(data2))
  span.onclick=(e)=>{
    e.target.parentElement.remove()
    let data3 =data2.filter((x,y)=>(e.target.parentElement.dataset.id != y))
    console.log(data3)
    data2=[]
    tasks.innerHTML=""
    data3.forEach((e, i)=>{
      toggle(e.value, i)
    })
    window.localStorage.setItem("data", JSON.stringify(data3))
    data2.length>0?clear.style.display="block":clear.style.display="none";
    data2.length>0?tasks.style.display="block":tasks.style.display="none";
  }
  data2.length>0?clear.style.display="block":clear.style.display="none";
  data2.length>0?tasks.style.display="block":tasks.style.display="none";
}
clear.onclick=_=>{
  localStorage.clear();
  tasks.innerHTML="";
  data2=[]
  tasks.style.display="none";
  clear.style.display="none";
};