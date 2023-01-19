var add_q=document.getElementById('add-ques');

var q_count=2;

var ques=document.getElementById('ques');

var quesions=document.getElementById('');

add_q.addEventListener("click",()=>{       
    var node=document.createElement('div');
    node.className="question";

    node.innerHTML=`
    <br>
    <hr style="height:3px;border:0px;background-color:rgb(3, 63, 3)">
    <br>
    
    <div>
    <!-- Question -->

    <div class="input-field col s6">
        <input id="q${q_count}"  required  type="text" class="validate" name="q${q_count}">
        <label for="q${q_count}"><b>Question ${q_count}</b></label>
    </div>
    
    <!-- Option 1&2 --> 

    <div class="row">
    <div class="input-field col s6">
        <input id="q${q_count}o1"  required  type="text" class="validate" name="q${q_count}o1">
        <label for="q${q_count}o1">Option 1</label>
    </div>
    <div class="input-field col s6">
        <input id="q${q_count}o2"  required  type="text" class="validate" name="q${q_count}o2">
        <label for="q${q_count}o2">Option 2</label>
    </div>
    </div>
    
    <!-- Option 3&4 --> 
    <div class="row">
    <div class="input-field col s6">
        <input id="q${q_count}o3"  required  type="text" class="validate" name="q${q_count}o3">
        <label for="q${q_count}o3">Option 3</label>
    </div>
    <div class="input-field col s6">
        <input id="q${q_count}o4"  required  type="text" class="validate" name="q${q_count}o4">
        <label for="q${q_count}o4">Option 4</label>
    </div>
    </div>

    <!-- Ans -->

    <div class="input-field col s6">
        <input id="ans${q_count}"  required  type="text" class="validate" name="ans${q_count}">
        <label for="ans${q_count}">Answer</label>
    </div>

    </div>
      `;
    ques.append(node);
    q_count++;
});