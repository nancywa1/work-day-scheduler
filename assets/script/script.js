const now = moment().format("MMMM Do YYYY, h:mm:ss a");
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

var tasks = [];

$(".row").innerHTML = "";
for (i = 0; i < timeBlocks.length; i++) {
  var RowHour = timeBlocks[i];

  $(`<div class="col-2  hour" id="hour-${i}"></div>`)
    .text(RowHour)
    .appendTo(".row");
  $(
    `<textarea class="${timeBlocks[i].replace(
      " ",
      "-"
    )} col-8 note-input textarea description pr-3 pt-3 mb-1" id="input-${
      RowHour.split(":")[0]
    }"></textarea>`
  ).appendTo(".row");
  $(
    `<button class="col-2 btn btn-primary saveBtn mb-1" id="button-${
      RowHour.split(":")[0]
    }"></button>`
  )
    .text("SAVE")
    .appendTo(".row");
}

var saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

$(".saveBtn").click(function (e) {
  let i = this.id.split("-")[1];
  var newTask = $("#input-" + i).val();
  tasks.push({
    text: newTask,
    time: i,
  });

  console.log(tasks);
  saveTasks();
});

var loadTasks = function () {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  for (var i = 0; i < tasks.length; i++) {
    if (tasks.length == 0) {
      return;
    }
    var storeTime = tasks[i].time;
    var storeText = tasks[i].text;
    $("#input-" + storeTime).val(storeText);
  }
};

function updateTaskColor() {
  var getCurrentTime = moment(moment().format("H A"), "H A");
  var input = $(".note-input");
  for (var i = 0; i < input.length; i++) {
    var time = input[i].id.split("-")[1];
    if (time < 9) {
      time += 12;
    }
    time = moment(time, "HH");
    if (getCurrentTime.isSame(time)) {
      $(input[i]).addClass("present");
    } else if (getCurrentTime.isAfter(time)) {
      $(input[i]).addClass("past");
    } else {
      $(input[i]).addClass("future");
    }
  }
}
updateTaskColor();
setInterval(updateTaskColor, 10000);
loadTasks();
