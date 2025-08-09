
const firebaseConfig = {
  apiKey: "AIzaSyCWX14VDXOWFbQ_OO_mhgM8T9NH6At2r7g",
  authDomain: "todolist-d3429.firebaseapp.com",
  projectId: "todolist-d3429",
  storageBucket: "todolist-d3429.appspot.com",
  messagingSenderId: "348673945406",
  appId: "1:348673945406:web:928fda43fa078edf13c66f",
  measurementId: "G-FZNZKJ1W07",
  databaseURL: "https://todolist-d3429-default-rtdb.asia-southeast1.firebasedatabase.app/"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


function addTask() {
  const task = taskInput.value.trim();
  if (task === "") return;
  const newTaskRef = db.ref("tasks").push();
  newTaskRef.set({ text: task });
  taskInput.value = "";
}


db.ref("tasks").on("value", (snapshot) => {
  taskList.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const taskId = childSnapshot.key;
    const taskData = childSnapshot.val();

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskData.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTask(taskId);

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
});


function deleteTask(id) {
  db.ref("tasks/" + id).remove();
}

