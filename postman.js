//utility functions
function getElementFromString(string){
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}

let addedParamsCount=0;

//hide parameter box initially
let parameterBox=document.getElementById('parameterBox');
parameterBox.style.display="none";

//if user clicks on params box hide json box
let paramsRadio=document.getElementById("paramsradio");
paramsRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display='none';
    document.getElementById('parameterBox').style.display='block';
    document.getElementById('params').style.display='block'
})

//if users clicks on json box to hide the parameter box
let jsonRadio=document.getElementById('jsonradio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parameterBox').style.display='none';
    document.getElementById('requestJsonBox').style.display='block';
    document.getElementById('params').style.display='none'
})

//if the user click on add parameter button

let addParam = document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    console.log("hello");
    let params = document.getElementById("params");
    let string = `<div class="form-row">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount +2}</label>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterkey${addedParamsCount +2}" placeholder="Enter Parameter ${addedParamsCount +2} Key">
    </div>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parametervalue${addedParamsCount +2}" placeholder="Enter Parameter ${addedParamsCount +2} Value">
    </div>
    <button type="button" id="addParam" class="btn btn-primary deleteParam">-</button>
  </div>`
    let paramElement = getElementFromString(string);
    console.log(typeof paramElement);
    params.appendChild(paramElement);
    addedParamsCount++;
    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        })
    }
    
;});
    //if user clicks on submit button
    let submit=document.getElementById('submit');
    submit.addEventListener('click',()=>{
      console.log("hello");
      document.getElementById("responseJsonText").value="Please Wait..";
      //Fetch all the values user has Entered
      let url=document.getElementById("urlField").value;
      let requestType=document.querySelector("input[name='requestType']:checked").value;
      //console.log(url+".."+requestType);
      let contentType=document.querySelector("input[name='contentType']:checked").value;
      //if the user has used params option instead of json,collect all the parameter in an object
      if(contentType=='params'){
        data={};
        for(i=0;i<addedParamsCount+1;i++){
          let Key=document.getElementById('parameterkey'+(i+1)).value;
          let value=document.getElementById('parametervalue'+(i+1)).value;
          data[Key]=value;
        }
        data=JSON.stringify(data);
        console.log(data);
      }
      else{
        data =document.getElementById('requestJsonText').value;
        console.log(data);
      }
      //if requestType is GET invoked fetch api
      if(requestType=='GET'){
        fetch(url,{
          method:'GET'
        })
        .then(response=>response.text())
        .then(text=>{
          document.getElementById("responseJsonText").value=text;
        })
      }
      else{
        fetch(url,{
          method:'POST',
          body:data,
          headers:{
            "Content-type":"application/json;charset=UTF-8"
          }
        })
        .then(response=>response.text())
        .then(text=>{
          document.getElementById("responseJsonText").value=text;
        })
      }
    })


















