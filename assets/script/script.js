const now = moment().format("MMMM Do YYYY, h:mm:ss a");
// console.log(now);
$("#currentDay").text(now);

let timeBlocks = [
  "9:00 am",
  "10:00 am",
  "11:00 am",
  "12:00 pm",
  "1:00 pm",
  "2:00 pm",
  "3:00 pm",
  "4:00 pm",
  "5:00 pm",
];

var tasks = [{}];

$(".row").innerHTML = "";
for (i = 0; i < timeBlocks.length; i++) {
  var RowHour = timeBlocks[i];

  $(`<div class="col-2  hour" id="hour-${i}"></div>`)
    .text(RowHour)
    .appendTo(".row");
  $(
    `<textarea class="col-8 note-input textarea description pr-3 pt-3 mb-1" id="input-${i}"></textarea>`
  ).appendTo(".row");
  $(
    `<button class="col-2 btn btn-primary saveBtn mb-1" id="button-${i}"></button>`
  )
    .text("SAVE")
    .appendTo(".row");
}

var saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

$(".saveBtn").click(function (e) {
  let i = this.id.slice(-1);

  let taskTime = timeBlocks[i];
  var newTask = $("#input-" + i).val();

  tasks.push({
    text: newTask,
    time: taskTime,
  });

  console.log(tasks);
  saveTasks();
});

// var loadTasks = function () {
//   tasks = JSON.parse(localStorage.getItem("tasks"));

//   // if nothing in localStorage, create a new object to track all task status arrays
//   if (!tasks) {
//     tasks = {
//       text: "",
//       time: "",
//     };
//   }

//   for (var i = 0; i < timeBlocks.length; i++) {
//     // console.log(tasks[i].time);
//     // console.log(JSON.stringify(tasks[i].time));
//     // console.log(timeBlocks[i]);
//     // console.log(JSON.stringify(tasks[i].text));
//     var storeTime = JSON.stringify([i].tasks.time);
//     var storeText = JSON.stringify([i].tasks.text);

//     if (timeBlocks[i] == storeTime) {
//       $("#input-" + i).innerText = storeText;
//     }
//     //  else {
//     //   $("#input-" + i).innerText = "";
//     // }
//   }
//   //     if (typeof tasks[i].text === "undefined") {
// //       i += 1;
// //     } else {
// //       var TextAreas = $("#input-" + i);
// //       //   console.log(TextAreas);
// //       TextAreas.textContent = tasks[i].text;

// //       i += 1;
// //     }
// //   }
// };
// loadTasks();

function updateTaskColor() {
  var getCurrentTime = moment(moment().format("H A"), "H A");
  var testBlock = moment(timeBlocks, "H A");
  var input = $(".note-input");
  console.log(input);

  // var currTime = moment(currTime[i], "h a");
  if (getCurrentTime.isSame(testBlock) === true) {
    input.addClass("present");
  } else if (getCurrentTime.isBefore(testBlock) === true) {
    input.addClass("future");
  } else if (getCurrentTime.isafter(testBlock) === false) {
    input.addClass("past");
  }
}
updateTaskColor();
setInterval(updateTaskColor, 10000);
