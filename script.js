let hours = 0;
let minutes = 0;
let seconds = 0;
let clock;

function playBeep() {
  const beep = new Audio("https://www.soundjay.com/button/beep-07.wav");
  beep.play().catch((error) => console.log("Audio playback failed:", error));
}

$(".start-btn").click(function () {
  let hours = parseInt($("#hours-input").val()) || 0;
  let minutes = parseInt($("#minutes-input").val()) || 0;
  let seconds = parseInt($("#seconds-input").val()) || 0;
  if (hours < 0 || minutes < 0 || seconds < 0 || minutes > 59 || seconds > 59) {
    alert("Invalid value! Add valid time.");

    return;
  }

  if (hours === 0 && minutes === 0 && seconds === 0) {
    playBeep();
    return;
  }

  $("#hours-input, #minutes-input, #seconds-input").val("");

  $(this).attr("disabled", "disabled");
  $(this).removeClass("active");
  $(".reset-btn").removeAttr("disabled");

  clock = setInterval(() => {
    if (seconds === 0 && minutes === 0 && hours === 0) {
      clearInterval(clock);
      $(".start-btn").removeAttr("disabled");
      playBeep();
      return;
    }
    if (seconds === 0) {
      if (minutes === 0) {
        if (hours > 0) {
          hours--;
          minutes = 59;
        }
      } else {
        minutes--;
      }
      seconds = 59;
    } else {
      seconds--;
    }
    $("#hours").text(hours < 10 ? "0" + hours : hours);
    $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
    $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
  }, 1000);
});
$(".reset-btn").click(function () {
  $(".start-btn").addClass("active");

  clearInterval(clock);

  $(".time-input").val("");
  $("#hours").text("00");
  $("#minutes").text("00");
  $("#seconds").text("00");
  $(".start-btn").removeAttr("disabled");
  $(".reset-btn").attr("disabled", "disabled");
});
