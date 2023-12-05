
const main = document.querySelector("main")
const addUser = document.querySelector("#add-user")
const sort = document.querySelector("#sort");
const double = document.querySelector("#double");
const list = document.querySelector("list")



var userArray = new Array()


//得到一个随机名字和数字
async function getRandomName(){
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    const user = await data.results[0]
    const newUser= {name: `${user.name["first"]} ${user.name["last"]}` ,
                    wealth: (Math.random()*1000000).toFixed(0)
                   } 
     
     add(newUser)
}


//增加一个新的用户到userArray之中
function add(username){
    userArray.push(username)
    console.log(userArray)
    updateDOM()
}

//根据资产改变userArray的排列顺序
function changeSequence(){
     userArray = userArray.sort(function(a,b){
         return b["wealth"]-a["wealth"]     
     })
    updateDOM()
}


function doubleMoney(){
    userArray = userArray.map(user=>{
     return { ...user, wealth: user.wealth * 2 }
     })  

   updateDOM()
}




//把数据显示到网页中
function updateDOM(){
 main.innerHTML = " <h2><strong>Person</strong> Wealth</h2>";

userArray.forEach((user)=>{
     const element = document.createElement("div")
    element.classList.add("person")

    element.innerHTML = `<strong>${user.name}</strong>${user.wealth}`

    main.appendChild(element);    
})
} 






addUser.addEventListener("click", getRandomName)
sort.addEventListener("click",changeSequence)
double.addEventListener("click",doubleMoney)
