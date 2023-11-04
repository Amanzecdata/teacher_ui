var quick_read_count = 0;
var title_text_count = 0;
var question_choices_count = 0;
var user_tour_count = 0;
var video_file_count = 0;
var audio_file_count = 0;
var image_file_count = 0;
var iframe_link_count = 0;
var verify_phone_count = 0;
var title_textarea_count = 0;
var title_input_count = 0;
var braintree_count = 0;
var stripe_payment_count = 0;
var question_checkboxes_count = 0;
var question_text_count = 0;
var name_type_count = 0;
var user_video_upload_count = 0;
var user_image_upload_count = 0;
var user_audio_upload_count = 0;
var user_gps_count = 0;
var sign_count = 0;
var sortArray = [];
var MODE;
var CURRENT_IMAGE_FLASHCARD_TYPE = 0;
var CURRENT_IMAGE_TYPE;
var CURRENT_VIDEO_FLASHCARD_TYPE = 0;
var CURRENT_VIDEO_TYPE;
var pos = 0;
var image_type = "";
var video_type = "";
var data_id_value = "";
var video_data_id_value = "";
var img_tour = 0;
var img_tour_value = "";
var map_latitude = 0;
var map_longitude = 0;
var lat_dataid = "";
var lng_dataid = "";
var qr_url_count = 0;
var qr_data_count = 0;
var email_verify_count = 0;
var contact_form_count = 0;
var classList = [];

window.addEventListener("DOMContentLoaded", init, false);
var lesson_id = getParam("lesson_id");

var imported = document.createElement("script");
imported.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyCEYIL86ek3icvHx6F-55qSFCfhe2fynfg&libraries=places";
document.head.appendChild(imported);


function getTotalFlashcardsNumber() {
  return $("#sortable").children().length;
}
function selectLesson() {
  var thelesson_id = $("#select_lesson :selected").val();
  window.location.href = "/lesson2.html?lesson_id=" + thelesson_id;
}

function getAllLessons() {
  $.ajax({
    url: SERVER + "courses_api/lesson/all",
    async: true,
    crossDomain: true,
    crossOrigin: true,
    type: "GET",
    headers: { "Authorization": "Bearer " + localStorage.getItem("user-token") },
  }).done((response2) => {
    console.log("-----", response2);
    for (let i = 0; i < response2.length; i++) {
      $("#select_lesson").append(
        `<option value="${response2[i].id}"> ${response2[i].lesson_name} </option>`
      );
      console.log(response2[i]?.flashcards[0]?.question);
      document.getElementById("question").value = response2[i]?.flashcards[0]?.question;
    }
  });
}

function addChoices(id, value) {
  if (!value) {
    value = "";
  }
  var next_id =
    $("#choices_" + id)
      .children()
      .last()
      .data("id") + 1;
  $("#choices_" + id).append(
    '<div><input type="text" id="choices" class="form-control" data-id="' +
    next_id +
    '"rows="7" placeholder="Choices" value="' +
    value +
    '"><button onclick="$(this).parent().remove()" class="btn btn-danger">Remove Choice</button></div>'
  );
}

function addCheckboxes(id, value) {
  if (!value) {
    value = "";
  }
  var next_id =
    $("#checkboxes_" + id)
      .children()
      .last()
      .data("id") + 1;

  $("#checkboxes_" + id).append(
    '<div><input type="text" class="form-control" data-id="' +
    next_id +
    '"rows="7" placeholder="Choices" value="' +
    value +
    '"><button onclick="$(this).parent().remove()" class="btn btn-danger">Remove Choice</button></div>'
  );
}

function getParam(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

function sortablePositionFunction(isNew, posU) {
  if (!posU) {
    posU = $("#sortable").children().length;
  }
  if (!isNew) {
    $("#sortable").children().last().attr("data-position", posU);
  } else {
    $("#sortable").children().last().attr("data-position", pos);
    pos++;
  }
  $("#sortable").sortable();
}

function addSpeedRead(isNew, id, value, posU) {
  if (!isNew) {
    $("#speed_read").find("textarea").html(value);
    $("#speed_read").find("textarea").attr("data-id", id);
  } else {
    $("#speed_read").find("textarea").html("");
  }
  $("#speed_read")
    .find("textarea")
    .attr("name", "speed_read_" + quick_read_count);
  $("#sortable").append($("#speed_read").html());
  $("#sortable").children().last().attr("id", null);
  sortablePositionFunction(isNew, posU);
  quick_read_count++;
}

function addChiroFront(isNew, id, value, posU) {
  $("#sortable").append($("#chiro_front").html());
  sortablePositionFunction(isNew, posU);
}

function addChiroSide(isNew, id, value, posU) {
  $("#sortable").append($("#chiro_side").html());
  sortablePositionFunction(isNew, posU);
}

function addTitleText(isNew, id, title, text, posU) {
  if (!isNew) {
    $("#title_text").find("input[type=text]").attr("value", title);
    $("#title_text").find("textarea").html(text);
    $("#title_text").find("input[type=text]").attr("data-id", id);
    $("#title_text").find("textarea").attr("data-id", id);
  } else {
    $("#title_text").find("input[type=text]").attr("value", "");
    $("#title_text").find("textarea").html("");
  }
  $("#title_text")
    .find("textarea")
    .attr("name", "text_" + title_text_count);
  $("#title_text")
    .find("input[type=text]")
    .attr("name", "title_" + title_text_count);
  $("#sortable").append($("#title_text").html());
  sortablePositionFunction(isNew, posU);

  title_text_count++;
}

function addRecordWebCam(isNew, id, title, text, posU) {
  console.log(isNew, id, title, posU);
  $("#sortable").append($("#record_webcam").html());
  sortablePositionFunction(isNew, posU);

  title_text_count++;
}

function addRecordScreen(isNew, id, title, text, posU) {
  console.log(isNew, id, title, posU);
  $("#sortable").append($("#record_screen").html());
  sortablePositionFunction(isNew, posU);

  title_text_count++;
}

function addJitsiMeet(isNew, id, title, text, posU) {
  console.log(isNew, id, title, posU);
  if (!isNew) {
    $("#jitsi_meet").find("input[type=text]").attr("value", title);
    $("#jitsi_meet").find("textarea").html(text);
    $("#jitsi_meet").find("input[type=text]").attr("data-id", id);
    $("#jitsi_meet").find("textarea").attr("data-id", id);
  } else {
    $("#jitsi_meet").find("input[type=text]").attr("value", "");
    $("#jitsi_meet").find("textarea").html("");
  }
  $("#jitsi_meet")
    .find("textarea")
    .attr("name", "text_" + title_text_count);
  $("#jitsi_meet")
    .find("input[type=text]")
    .attr("name", "title_" + title_text_count);
  $("#sortable").append($("#jitsi_meet").html());
  sortablePositionFunction(isNew, posU);

  title_text_count++;
}

function addTitleInput(isNew, id, title, text, posU) {
  if (!isNew) {
    $("#title_input").find("textarea").html(title);
    $("#title_input").find("teaxtarea").attr("data-id", id);
  } else {
    $("#title_input").find("textarea").html("");
  }
  $("#title_input")
    .find("textarea")
    .attr("name", "title_input_textarea_" + title_input_count);
  $("#sortable").append($("#title_input").html());
  sortablePositionFunction(isNew, posU);

  title_input_count++;
}

function addNameType(isNew, id, title, text, posU) {
  if (!isNew) {
    $("#name_type").find("textarea").html(title);
    $("#name_type").find("teaxtarea").attr("data-id", id);
  } else {
    $("#name_type").find("textarea").html("");
  }
  $("#name_type")
    .find("textarea")
    .attr("name", "name_type_textarea_" + title_input_count);
  $("#sortable").append($("#name_type").html());
  sortablePositionFunction(isNew, posU);

  name_type_count++;
}

function addQuestionChoices(isNew, id, question, choices, image, posU) {
  $("#question_choices")
    .find("input")
    .first()
    .attr("name", "question_" + question_choices_count);
  if (question_choices_count == 0) {
    $("#question_choices")
      .find("#choices")
      .attr("id", "choices_" + question_choices_count);
  } else {
    $("#question_choices")
      .find("#choices_" + (question_choices_count - 1))
      .attr("id", "choices_" + question_choices_count);
  }

  $("#question_choices")
    .find("input")
    .last()
    .attr("name", "image_" + question_choices_count);
  $("#question_choices")
    .find("button")
    .last()
    .attr("onclick", "addChoices(" + question_choices_count + ")");
  let tempQC = $("#question_choices").html();

  if (!isNew) {
    $("#question_choices").find("input").first().attr("value", question);
    $("#question_choices").find("input").last().attr("value", image);

    $("#question_choices").find("input").first().attr("data-id", id);
    $("#question_choices").find("input").last().attr("data-id", id);
    $("#choices_" + question_choices_count)
      .find("input")
      .remove();

    choices.map((choice) => {
      addChoices(question_choices_count, choice);
    });
    image_type = "questionChoices";
    // Display image
    displayImage(image, "");
  } else {
    $("#question_choices").find("input").first().attr("value", "");
    $("#question_choices").find("text").html("");
    $("#question_choices").find("input").last().attr("value", "");
  }
  $("#sortable").append($("#question_choices").html());
  sortablePositionFunction(isNew, posU);
  question_choices_count++;
  $("#question_choices").html(tempQC);
}

function addQuestionCheckboxes(isNew, id, question, options, image, posU) {
  $("#question_checkboxes")
    .find("input")
    .first()
    .attr("name", "question_checkboxes_question_" + question_checkboxes_count);
  if (question_checkboxes_count == 0) {
    $("#question_checkboxes")
      .find("#checkboxes")
      .attr("id", "checkboxes_" + question_checkboxes_count);
  } else {
    $("#question_checkboxes")
      .find("#checkboxes_" + (question_checkboxes_count - 1))
      .attr("id", "checkboxes_" + question_checkboxes_count);
  }

  $("#question_checkboxes")
    .find("input")
    .last()
    .attr("name", "image_" + question_checkboxes_count);
  $("#question_checkboxes")
    .find("button")
    .last()
    .attr("onclick", "addCheckboxes(" + question_checkboxes_count + ")");
  let tempQ = $("#question_checkboxes").html();

  if (!isNew) {
    $("#question_checkboxes").find("input").first().attr("value", question);
    $("#question_checkboxes").find("input").last().attr("value", image);

    $("#question_checkboxes").find("input").first().attr("data-id", id);
    $("#question_checkboxes").find("input").last().attr("data-id", id);
    $("#checkboxes_" + question_checkboxes_count)
      .find("input")
      .remove();
    options.map((choice) => {
      addCheckboxes(question_checkboxes_count, choice);
    });
    image_type = "questionCheckboxes";
    // Display image
    displayImage(image, "");
  } else {
    $("#question_checkboxes").find("input").first().attr("value", "");
    $("#question_checkboxes").find("text").html("");
    $("#question_checkboxes").find("input").last().attr("value", "");
  }
  $("#sortable").append($("#question_checkboxes").html());
  sortablePositionFunction(isNew, posU);
  question_checkboxes_count++;
  $("#question_checkboxes").html(tempQ);
}

function handleImageUpload(key) {
  image_type = key; //imageFile, questionChoices, questionCheckboxes
  $("#imageUpload").click();
}

//handleImageSelect(this.value)
function handleImageSelect(e) {
  console.log("image upload2--------");
  var file = e.files[0];

  var imgPath = file.name;
  var extn = imgPath.substring(imgPath.lastIndexOf(".") + 1).toLowerCase();

  console.log(file);

  if (file) {
    if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
      GLOBAL_FILE = file;
      uploadFile("image");
    } else {
      swal({
        title: "Error!",
        text: "Please Select Image to Upload !!!",
        icon: "warning",
      });
    }
  }
}

function handleVideoUpload(key) {
  video_type = key; //user_video_upload
  // prompt for video upload
  $("#videoUpload").click();
}

//handleVideoSelect(this.value)
function handleVideoSelect(e) {
  var file = e.files[0];
  if (file) {
    GLOBAL_FILE = file;
    //        $("#imageUploadForm").submit();
    uploadFile("video");
  }
}

function handleAudioUpload(key) {
  audio_type = key; //user_video_upload
  // prompt for video upload
  $("#audioUpload").click();
}

//handleVideoSelect(this.value)
function handleAudioSelect(e) {
  var file = e.files[0];
  if (file) {
    GLOBAL_FILE = file;
    //        $("#imageUploadForm").submit();
    uploadFile("audio");
  }
}

function uploadFile(fileType) {
  swal({
    title: "0%",
    text: "File uploading please wait.",
    icon: "info",
    buttons: false,
    closeOnEsc: false,
    closeOnClickOutside: false,
  });

  var form = new FormData();
  form.append("file", GLOBAL_FILE);

  var settings = {
    async: true,
    //            "crossDomain": true,
    url: SERVER + "profile/upload",
    method: "POST",
    type: "POST",
    processData: false,
    contentType: false,
    mimeType: "multipart/form-data",
    data: form,
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  };

  $.ajax(settings).done(function (response) {
    swal({
      title: "Good job!",
      text: "File uploaded successfully!",
      icon: "success",
    });

    var form = new FormData();
    form.append("file", GLOBAL_FILE);

    var settings = {
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener(
          "progress",
          function (evt) {
            if (evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total;
              $(".swal-title").text(parseInt(percentComplete * 100) + "%");
            }
          },
          false
        );
        return xhr;
      },
      async: true,
      crossDomain: true,
      url: SERVER + "profile/upload",
      method: "POST",
      type: "POST",
      processData: false,
      contentType: false,
      mimeType: "multipart/form-data",
      data: form,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    };

    $.ajax(settings)
      .done(function (response) {
        swal({
          title: "Good job!",
          text: "File uploaded successfully!",
          icon: "success",
        });

        response = JSON.parse(response);
        const file_url = response["file_url"];

        if (fileType == "image") {
          displayImage(file_url, data_id_value);

          if (image_type == "questionChoices") {
            $("#image-question-choices").attr("value", file_url);
          } else if (image_type == "questionCheckboxes") {
            $("#image-question-checkboxes").attr("value", file_url);
          } else if (image_type == "imageFileTour") {
            $("input[data-id='" + data_id_value + "']").attr("value", file_url);
            $("img[data-id='" + img_tour_value + "']").attr("src", file_url);
          } else if (image_type == "imageFile") {
            if (data_id_value != undefined) {
              $("input[data-id='" + data_id_value + "']").attr(
                "value",
                file_url
              );
            } else {
              $("#image-file").attr("value", file_url);
            }
          }
        } else if (fileType == "video") {
          displayVideo(file_url, video_data_id_value);

          if (video_type == "user_video_upload") {
            // $('#txt-user-video').attr('value', file_url);
          } else {
            if (video_data_id_value != undefined) {
              $("input[data-id='" + video_data_id_value + "']").attr(
                "value",
                file_url
              );
            } else {
              $("#video").attr("value", file_url);
            }
          }
        } else if (fileType == "audio") {
          displayVideo(file_url, audio_data_id_value);

          if (audio_type == "user_audio_upload") {
            // $('#txt-user-video').attr('value', file_url);
          } else {
            if (audio_data_id_value != undefined) {
              $("input[data-id='" + audio_data_id_value + "']").attr(
                "value",
                file_url
              );
            } else {
              $("#audio").attr("value", file_url);
            }
          }
        }
      })
      .fail(function (response) {
        swal({
          title: "Error!",
          text: "File upload failed!",
          icon: "warning",
        });
      });
  });
}

function displayVideo(file_url, video_data_id) {
  var strTYPE = "video/mp4";
  if (video_type == "user_video_upload") {
    /* $('#userVideoplayer').html('<source src="' + file_url + '#t=0.1' + '" type="' + strTYPE + '"></source>');
     $('#user-video-output').css('display', 'block');
     $('#userVideoplayer')[0].load();
     
     $('#user_video_upload').find('#txt-user-video').first().attr('value',file_url);*/
    // Change button text
    // $('#upload-vid-btn').attr('value', 'Upload new Video');
  } else {
    /* $('#videoplayer').html('<source src="' + file_url + '#t=0.5'+ '" type="' + strTYPE + '"></source>');
     $('#video-output').css('display', 'block');
     $('#videoplayer')[0].load();
     $('#upload-vid-btn').attr('value', 'Upload new Video');*/
    //
    if (!file_url) {
    } else {
      // $("input[data-id='"+video_data_id+"']").parent().siblings('.video-output').html('')
      // var parent = $("input[data-id='"+video_data_id+"']").parent().siblings('.video-output');
      if (!video_data_id) {
        $(".videoplayer").css("display", "block");
        $(".videoplayer").html(
          '<source src="' +
          file_url +
          "#t=0.1" +
          '" type="' +
          strTYPE +
          '"></source>'
        );
        $(".video-output").css("display", "block");
        $(".videoplayer")[0].load();
        $(".upload_vid_btn").attr("value", "Upload new Video");
      } else {
        $("input[data-id='" + video_data_id + "']")
          .parent()
          .siblings(".video-output")
          .html(
            ' <video class="videoplayer" controls height="360" style="width: 100%;" preload="metadata"><source src="' +
            file_url +
            "#t=0.1" +
            '" type="' +
            strTYPE +
            '" id="' +
            video_data_id +
            '"></source></video>'
          );
        $(".video-output").css("display", "block");
        $(".videoplayer")[0].load();
        $(".upload_vid_btn").attr("value", "Upload new Video");
      }
    }
    //
  }
}

function displayAudio(file_url, audio_data_id) {
  var strTYPE = "audio/mp4";
  if (audio_type == "user_audio_upload") {
    /* $('#userVideoplayer').html('<source src="' + file_url + '#t=0.1' + '" type="' + strTYPE + '"></source>');
     $('#user-video-output').css('display', 'block');
     $('#userVideoplayer')[0].load();
     
     $('#user_video_upload').find('#txt-user-video').first().attr('value',file_url);*/
    // Change button text
    // $('#upload-vid-btn').attr('value', 'Upload new Video');
  } else {
    /* $('#videoplayer').html('<source src="' + file_url + '#t=0.5'+ '" type="' + strTYPE + '"></source>');
     $('#video-output').css('display', 'block');
     $('#videoplayer')[0].load();
     $('#upload-vid-btn').attr('value', 'Upload new Video');*/
    //
    if (!file_url) {
    } else {
      // $("input[data-id='"+video_data_id+"']").parent().siblings('.video-output').html('')
      // var parent = $("input[data-id='"+video_data_id+"']").parent().siblings('.video-output');
      if (!audio_data_id) {
        $(".audioplayer").css("display", "block");
        $(".audioplayer").html(
          '<source src="' +
          file_url +
          "#t=0.1" +
          '" type="' +
          strTYPE +
          '"></source>'
        );
        $(".audio-output").css("display", "block");
        $(".audioplayer")[0].load();
        $(".audio_upload_button").attr("value", "Upload new Audio");
      } else {
        $("input[data-id='" + audio_data_id + "']")
          .parent()
          .siblings(".audio-output")
          .html(
            ' <audio class="audioplayer" controls height="360" style="width: 100%;" preload="metadata"><source src="' +
            file_url +
            "#t=0.1" +
            '" type="' +
            strTYPE +
            '" id="' +
            audio_data_id +
            '"></source></audio>'
          );
        $(".audio-output").css("display", "block");
        $(".audioplayer")[0].load();
        $(".audio_upload_button").attr("value", "Upload new Audio");
      }
    }
    //
  }
}

function displayImage(file_url, data_id, image_id) {
  // Clear existing image
  // $('#output').html('');

  if (file_url != "") {
    if (image_type == "questionChoices") {
      $("#output-question-choices").html("");
      var img = $('<img style="width:400px">');
      img.attr("src", file_url);
      img.appendTo("#output-question-choices");
      $("#upload-img-btn-question-choices").attr("value", "Upload new Image");
    } else if (image_type == "questionCheckboxes") {
      $("#output-question-checkboxes").html("");
      var img = $('<img style="width:400px">');
      img.attr("src", file_url);
      img.appendTo("#output-question-checkboxes");
      $("#upload-img-btn-question-checkboxes").attr(
        "value",
        "Upload new Image"
      );
    } else if (image_type == "tour-image-file") {
      var img = $('<img style="width:400px">');
      img.attr("src", file_url);
      img.attr("data-id", data_id);
      img.attr("id", data_id);
      console.log(
        "'.output-image-tour-'+image_id=>",
        ".output-image-tour-" + image_id
      );

      // img.appendTo('.output-image-tour-'+image_id);
      img.appendTo(".output-image-tour");
    } else if (image_type == "imageFile") {
      // $('#output-image-file').html('');
      var img = $('<img style="width:400px">');
      img.attr("src", file_url);
      img.attr("data-id", data_id);
      img.attr("id", data_id);
      if (!data_id) {
        img.appendTo(".output-image-file");
      } else if (image_type == "questionCheckboxes") {
        $("#output-question-checkboxes").html("");
        var img = $('<img style="width:400px">');
        img.attr("src", file_url);
        img.appendTo("#output-question-checkboxes");
        $("#upload-img-btn-question-checkboxes").attr(
          "value",
          "Upload new Image"
        );
      } else if (image_type == "imageFile") {
        // $('#output-image-file').html('');
        var img = $('<img style="width:400px">');
        img.attr("src", file_url);
        img.attr("data-id", data_id);
        img.attr("id", data_id);
        if (!data_id) {
          img.appendTo(".output-image-file");
        } else {
          $("input[data-id='" + data_id + "']")
            .parent()
            .siblings(".output-image-file")
            .html("");
          var parent = $("input[data-id='" + data_id + "']")
            .parent()
            .siblings(".output-image-file");
          img.appendTo(parent);
        }
        //
        // $('.output-image-file').each(function(i, e){
        //   $('<img style="width:400px">')
        //       .attr("id", "id_" + i)
        //       .attr('src', file_url)
        //       .attr('data-id', data_id)
        //       .appendTo(this);
        // });
        //
      }
    }
    //
    /*$('#output-image-file').html('');
  var img = $('<img style="height:100%;width:100%">');
  img.attr('src', file_url);*/
    // img.appendTo('#output');
    /*img.appendTo('#output-image-file');
    // Change button text
   $('#upload-img-btn').attr('value', 'Upload new Image');*/
  }
}

function addIframeLink(isNew, id, question, choices, image, posU) {
  if (!isNew) {
    $("#iframe_link").find("input").first().attr("value", question);
    $("#iframe_link").find("input").last().attr("value", image);

    $("#iframe_link").find("input").first().attr("data-id", id);
    $("#iframe_link").find("input").last().attr("data-id", id);
  } else {
    $("#iframe_link").find("input").first().attr("value", "");
    $("#iframe_link").find("input").last().attr("value", "");
  }

  $("#iframe_link")
    .find("input")
    .first()
    .attr("name", "question_" + iframe_link_count);
  $("#iframe_link")
    .find("input")
    .last()
    .attr("name", "link_" + iframe_link_count);

  $("#sortable").append($("#iframe_link").html());
  iframe_link_count++;
  sortablePositionFunction(isNew, posU);
}

function addTitleTextarea(isNew, id, question, posU) {
  console.log("Question Text Added");

  if (!isNew) {
    $("#title_textarea").find("textarea").first().html(question);

    $("#title_textarea").find("textarea").last().attr("data-id", id);
  } else {
    $("#title_textarea").find("textarea").first().html("");
  }

  $("#title_textarea")
    .find("textarea")
    .first()
    .attr("name", "title_textarea_" + title_textarea_count);
  $("#sortable").append($("#title_textarea").html());

  title_textarea_count++;
  sortablePositionFunction(isNew, posU);
}

function addSignaturePad(isNew, id, sign_data, posU) {
  if (!isNew) {
    $("#signature").find("input").first().val(sign_data);
    $("#signature").find("input").last().attr("data-id", id);
    // $("#signature").find("button").last().html("Redraw Signature")
    $("#signature").find("img").last().attr("src", sign_data);
    $("#signature").find("img").last().attr("hidden", false);
  } else {
  }

  $("#signature")
    .find("input")
    .first()
    .attr("name", "input_signature_" + sign_count);

  $("#sortable").append($("#signature").html());

  sign_count++;
  sortablePositionFunction(isNew, posU);
}
function addUserVideoUpload(isNew, id, question, choices, image, posU) {
  if (!isNew) {
    video_type = "user_video_upload";
    $("#user_video_upload").find("input").first().attr("value", question);
    $("#user_video_upload").find("input").first().attr("data-id", id);
    // Display Video
    displayVideo(image, "");
  } else {
    $("#user_video_upload").find("txt-user-video").html("");
  }
  $("#user_video_upload")
    .find("myFile")
    .attr("name", "user_video_upload_myFile_" + title_input_count);

  $("#sortable").append($("#user_video_upload").html());
  sortablePositionFunction(isNew, posU);
  user_video_upload_count++;
}

function addUserAudioUpload(isNew, id, question, choices, image, posU) {
  if (!isNew) {
    video_type = "user_audio_upload";
    $("#user_audio_upload").find("input").first().attr("value", question);
    $("#user_audio_upload").find("input").first().attr("data-id", id);
    // Display Video
    displayAudio(image, "");
  } else {
    $("#user_audio_upload").find("txt-user-audio").html("");
  }
  $("#user_audio_upload")
    .find("myFile")
    .attr("name", "user_audio_upload_myFile_" + title_input_count);

  $("#sortable").append($("#user_audio_upload").html());
  sortablePositionFunction(isNew, posU);
  user_audio_upload_count++;
}

function addUserImageUpload(isNew, id, question, choices, image, posU) {
  if (!isNew) {
    image_type = "user_image_upload";
    console.log(question);
    $("#user_image_upload").find("input").first().attr("value", question);
    $("#user_image_upload").find("input").first().attr("data-id", id);
    displayImage(image, "");
  } else {
    $("#user_image_upload").find("user-image-question").html("");
  }
  $("#user_image_upload")
    .find("myFile")
    .attr("name", "user_video_upload_myFile_" + title_input_count);

  $("#sortable").append($("#user_image_upload").html());
  sortablePositionFunction(isNew, posU);
  user_image_upload_count++;
}

function addVideoFile(isNew, id, question, choices, image, posU) {
  video_type = "";
  if (!isNew) {
    $("#video_file").find("input").first().attr("value", question);
    $("#video_file").find("input").last().attr("value", image);

    $("#video_file").find("input").first().attr("data-id", id);
    $("#video_file").find("input").last().attr("data-id", id);

    $("#video_file").find(".video-output").attr("data-id", id);
    // Display Video
    // displayVideo(image);
    displayVideo(image, id);
  } else {
    $("#video_file").find("input").first().attr("value", "");
    $("#video_file").find("input").last().attr("value", "");
    //
    // $('.video-output').children('video').children('source').attr('src','');
    displayVideo("", "");
    //
  }

  $("#video_file")
    .find("input")
    .first()
    .attr("name", "video_question_" + video_file_count);
  $("#video_file")
    .find("input")
    .last()
    .attr("name", "video_" + video_file_count)
    .attr(
      "data-id",
      $("#video_file").find("input").first().attr("data-id") +
      "_" +
      video_file_count
    );

  /*if(video_file_count > 0)
  {
    $('#sortable').append($('#video_file').html()).find('video').last().remove();
  }
  else{
    $('#sortable').append($('#video_file').html());
  }*/

  if (posU == undefined) {
    $("#sortable")
      .append($("#video_file").html())
      .find("video")
      .last()
      .remove();
  } else {
    $("#sortable").append($("#video_file").html());
  }

  // $('#sortable').append($('#video_file').html());
  video_file_count++;
  sortablePositionFunction(isNew, posU);
}

function addImageFile(isNew, id, question, image, posU) {
  console.log("addImageFile ==> ");
  console.log("isNew, id, question, image, posU ");
  console.log(isNew, " , ", id, " , ", question, " , ", image, " , ", posU);
  if (!isNew) {
    $("#image_file").find("input").first().attr("value", question);
    $("#image_file").find("input").last().attr("value", image);

    $("#image_file").find("input").first().attr("data-id", id);
    $("#image_file").find("input").last().attr("data-id", id);

    $("#image_file").find("output-image-file").attr("data-id", id);
    image_type = "imageFile";
    // displayImage(image,$('#image_file').find('output-image-file').attr('data-id'));
    displayImage(image, id);
  } else {
    $("#image_file").find("input").first().attr("value", "");
    $("#image_file").find("input").last().attr("value", "");
    // $('#image_file').find('#output-image-file').find('img').attr('src','');
    $("#image_file").find(".output-image-file").find("img").attr("src", "");
    image_type = "imageFile";
    displayImage("", "");
  }

  $("#image_file")
    .find("input")
    .first()
    .attr("name", "image_question" + image_file_count);

  $("#image_file")
    .find("input")
    .last()
    .attr("name", "image_" + image_file_count)
    .attr(
      "data-id",
      $("#image_file").find("input").first().attr("data-id") +
      "_" +
      image_file_count
    );

  $("#sortable").append($("#image_file").html());
  image_file_count++;
  sortablePositionFunction(isNew, posU);
}

function addAudioFile(isNew, id, question, choices, image, posU) {
  console.log("addAudioFile ==> ");
  console.log("isNew, id, question, image, posU ");
  console.log(isNew, " , ", id, " , ", question, " , ", image, " , ", posU);
  audio_type = "";
  if (!isNew) {
    $("#audio_file").find("input").first().attr("value", question);
    $("#audio_file").find("input").last().attr("value", image);

    $("#audio_file").find("input").first().attr("data-id", id);
    $("#audio_file").find("input").last().attr("data-id", id);

    $("#audio_file").find(".audio-output").attr("data-id", id);
    // Display Video
    // displayVideo(image);
    displayAudio(image, id);
  } else {
    $("#audio_file").find("input").first().attr("value", "");
    $("#audio_file").find("input").last().attr("value", "");
    //
    // $('.video-output').children('video').children('source').attr('src','');
    displayAudio("", "");
    //
  }

  $("#audio_file")
    .find("input")
    .first()
    .attr("name", "audio_question" + audio_file_count);
  $("#audio_file")
    .find("input")
    .last()
    .attr("name", "audio_" + audio_file_count)
    .attr(
      "data-id",
      $("#audio_file").find("input").first().attr("data-id") +
      "_" +
      audio_file_count
    );

  /*if(video_file_count > 0)
  {
    $('#sortable').append($('#video_file').html()).find('video').last().remove();
  }
  else{
    $('#sortable').append($('#video_file').html());
  }*/

  if (posU == undefined) {
    $("#sortable")
      .append($("#audio_file").html())
      .find("audio")
      .last()
      .remove();
  } else {
    $("#sortable").append($("#audio_file").html());
  }

  // $('#sortable').append($('#video_file').html());
  audio_file_count++;
  sortablePositionFunction(isNew, posU);
}

function addContactForm(isNew, id, question, posU) {
  console.log("addContactForm ==> ");
  console.log("isNew, id, question, posU ");
  console.log(isNew, " , ", id, " , ", question, posU);
  if (!isNew) {
    $("#contact_form").find("input").first().attr("value", question);
    $("#contact_form").find("input").last().attr("value", question);

    $("#contact_form").find("input").first().attr("data-id", id);
    $("#contact_form").find("input").last().attr("data-id", id);
  } else {
    $("#contact_form").find("input").first().attr("value", "");
    $("#contact_form").find("input").last().attr("value", "");
  }

  $("#contact_form")
    .find("input")
    .first()
    .attr("name", "contact_form_question" + contact_form_count);

  $("#sortable").append($("#contact_form").html());
  audio_file_count++;
  sortablePositionFunction(isNew, posU);
}

function addUserTour(
  isNew,
  id,
  options,
  question,
  text,
  latitude,
  longitude,
  image,
  posU
) {
  console.log("addUserTour ==> ");
  console.log("isNew, id, question, image, posU ");
  console.log(isNew, " , ", id, " , ", question, " , ", image, " , ", posU);

  if (user_tour_count == 0) {
    $("#user_tour")
      .find("#tourinfo")
      .attr("id", "tourinfo_" + user_tour_count);
  } else {
    $("#user_tour")
      .find("#tourinfo_" + (user_tour_count - 1))
      .attr("id", "tourinfo_" + user_tour_count);
  }

  $("#user_tour")
    .find("button")
    .first()
    .attr("onclick", "addTour(" + user_tour_count + ")");
  let tempTour = $("#user_tour").html();

  if (!isNew) {
    $("#user_tour").find("input").first().attr("value", question);
    $("#user_tour").find("input").last().attr("value", image);

    $("#user_tour").find("input").first().attr("data-id", id);
    $("#user_tour").find("input").last().attr("data-id", id);

    $("#user_tour").find("#latitude").attr("value", latitude);
    $("#user_tour").find("#longitude").attr("value", longitude);

    $("#user_tour").find("output-image-file").attr("data-id", id);

    $("#user_tour").find("textarea").html(text);
    $("#user_tour").find("textarea").attr("data-id", id);

    options.map((option) => {
      // image_type = "imageFile";
      addTour(user_tour_count, option);
    });

    // image_type = "imageFile";
    // displayImage(image,$('#image_file').find('output-image-file').attr('data-id'));
    // displayImage(image,id);
  } else {
    $("#user_tour").find("input").first().attr("value", "");
    $("#user_tour").find("input").last().attr("value", "");

    $("#user_tour").find("#latitude").attr("value", "");
    $("#user_tour").find("#longitude").attr("value", "");

    $("#user_tour").find("textarea").html("");

    // $('#image_file').find('#output-image-file').find('img').attr('src','');
    // $('#user_tour').find('.output-image-file').find('img').attr('src','');
    // image_type = "imageFile";
    // displayImage("","");
  }

  $("#user_tour")
    .find("input")
    .first()
    .attr("name", "image_question" + image_file_count);

  $("#user_tour")
    .find("textarea")
    .first()
    .attr("name", "image_answer" + image_file_count);

  $("#user_tour")
    .find("#latitude")
    .attr("name", "latitude" + latitude);

  $("#user_tour")
    .find("#longitude")
    .attr("name", "longitude" + longitude);

  $("#user_tour")
    .find("input")
    .last()
    .attr("name", "image_" + image_file_count)
    .attr(
      "data-id",
      $("#image_file").find("input").first().attr("data-id") +
      "_" +
      image_file_count
    );

  $("#sortable").append($("#user_tour").html());
  sortablePositionFunction(isNew, posU);
  user_tour_count++;
  $("#user_tour").html(tempTour);
}

function addTour(id, value) {
  if (!value) {
    value = "";
  }

  var title = value.title != undefined ? value.title : "";
  var description = value.description != undefined ? value.description : "";
  var latitude = value.latitude != undefined ? value.latitude : "";
  var longitude = value.longitude != undefined ? value.longitude : "";
  var image_url = value.image != undefined ? value.image : "";

  var image_id = Math.random();
  img_tour++;

  $("#tourinfo_" + id).append(
    '<div>  <div class="form-group">' +
    '<input type="text" class="form-control" placeholder="Place Title" name="place-title-' +
    img_tour +
    '" data-id="' +
    Math.random() +
    '"value="' +
    title +
    '"></div>' +
    '<div class="form-group"><textarea class="form-control" alt="speed_read_textarea" data-id="' +
    Math.random() +
    '"rows="7"' +
    'placeholder="Place Description">' +
    description +
    "</textarea></div>" +
    '<div class="form-group">' +
    '<button type="button" class="btn btn-info map-place-cls" id="btn-map-place-' +
    img_tour +
    '" data-toggle="modal"' +
    'data-target="#exampleModalCenter">' +
    "Map Location</button>" +
    '<input type="text" class="form-control input-cls" id="latitude-' +
    image_id +
    '"' +
    ' placeholder="Latitude" value="' +
    latitude +
    '">' +
    '<input type="text" class="form-control input-cls" id="longitude-' +
    image_id +
    '"' +
    ' placeholder="Longitude" value="' +
    longitude +
    '"> </div>' +
    '<div class="form-group"> <input type="button" class="image_upload_tour_button btn btn-info"' +
    'value="Upload Image" /> <input type="text" class="form-control" data-id="image-file-' +
    image_id +
    '"placeholder="Image Link" />' +
    '<img data-id="image-tour-' +
    image_id +
    '" src="' +
    image_url +
    '" style="width:400px"/>' +
    "</div>" +
    '<button onclick="$(this).parent().remove()" class="btn btn-danger">Remove Tour</button>' +
    "</div> <br/><br/>"
  );

  image_type = "tour-image-file";
  $("input[data-id='" + "image-file-" + image_id + "']").attr(
    "value",
    value.image
  );
}

function setLatLng() {
  $("input[id='" + lat_dataid).attr("value", map_latitude);
  $("input[id='" + lng_dataid).attr("value", map_longitude);
}

$(document).on("click", ".map-place-cls", function (e) {
  console.log("places map--------");
  lat_dataid = $(this).siblings("input[type=text]").first().attr("id");
  lng_dataid = $(this).siblings("input[type=text]").last().attr("id");

  initMap();
});

function initMap(image_id) {
  $("#map").html(
    `<div id='gps-view-tour' style='width:100%;height:450px;'></div>
        `
  );

  const myLatlng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(document.getElementById("gps-view-tour"), {
    zoom: 4,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng,
  });
  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      `${JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)}`
    );

    map_latitude = mapsMouseEvent.latLng.toJSON().lat;
    map_longitude = mapsMouseEvent.latLng.toJSON().lng;

    infoWindow.open(map);
  });
}

function addVerifyPhone(isNew, id, question, image, posU) {
  if (!isNew) {
  } else {
  }

  $("#sortable").append($("#verify_phone").html());
  sortablePositionFunction(isNew, posU);
  verify_phone_count++;
}

function addUserGps(isNew, id, question, image, posU) {
  if (!isNew) {
  } else {
  }
  $("#sortable").append($("#user_gps").html());
  user_gps_count++;
  sortablePositionFunction(isNew, posU);
}

function addUserQRUrl(isNew, id, question, posU) {
  if (!isNew) {
    $("#user_qr_url").find("input[type=url_text]").attr("value", question);
    $("#user_qr_url").find("input").attr("data-id", id);
  } else {
    $("#user_qr_url").find("input[type=url_text]").attr("value", "");
  }
  $("#user_qr_url")
    .find("input[type=url_text]")
    .attr("name", "url_title_" + qr_url_count);
  $("#sortable").append($("#user_qr_url").html());
  sortablePositionFunction(isNew, posU);
  qr_url_count++;
}

function addUserQRData(isNew, id, question, image, posU) {
  if (!isNew) {
    $("#user_qr_data").find("textarea").html(question);
    $("#user_qr_data").find("teaxtarea").attr("data-id", id);
  } else {
    $("#user_qr_data").find("textarea").html("");
  }
  $("#user_qr_data")
    .find("textarea")
    .attr("name", "data_textarea_" + qr_data_count);

  $("#sortable").append($("#user_qr_data").html());
  sortablePositionFunction(isNew, posU);
  qr_data_count++;
}

function addVerifyEmail(isNew, id, question, image, posU) {
  if (!isNew) {
  } else {
  }

  $("#sortable").append($("#email_verify").html());
  sortablePositionFunction(isNew, posU);
  email_verify_count++;
}

function addGpsSession(isNew, id, question, image, posU) {
  $("#sortable").append($("#gps_session").html());
  sortablePositionFunction(isNew, posU);
}

function addDatePicker(isNew, id, question, image, posU) {
  $("#sortable").append($("#datepicker").html());
  sortablePositionFunction(isNew, posU);
}

function addBrainTree(
  isNew,
  id,
  merchant_ID,
  braintree_public_key,
  braintree_private_key,
  braintree_item_name,
  braintree_item_price,
  posU
) {
  if (!isNew) {
    console.log(
      id,
      merchant_ID,
      braintree_public_key,
      braintree_private_key,
      braintree_item_name,
      braintree_item_price,
      posU
    );
    $("#brain_tree").find("#braintree_merchant_ID").attr("value", merchant_ID);
    $("#brain_tree")
      .find("#braintree_public_key")
      .attr("value", braintree_public_key);
    $("#brain_tree")
      .find("#braintree_private_key")
      .attr("value", braintree_private_key);
    $("#brain_tree")
      .find("#braintree_item_name")
      .attr("value", braintree_item_name);
    $("#brain_tree")
      .find("#braintree_item_price")
      .attr("value", braintree_item_price);
    //// flash card ID
    $("#brain_tree").find("#braintree_merchant_ID").attr("data-id", id);
    $("#brain_tree").find("#braintree_public_key").attr("data-id", id);
    $("#brain_tree").find("#braintree_private_key").attr("data-id", id);
    $("#brain_tree").find("#braintree_item_name").attr("data-id", id);
    $("#brain_tree").find("#braintree_item_price").attr("data-id", id);
  } else {
    console.log("empty values");
    $("#brain_tree").find("#braintree_merchant_ID").attr("value", "");
    $("#brain_tree").find("#braintree_public_key").attr("value", "");
    $("#brain_tree").find("#braintree_private_key").attr("value", "");
    $("#brain_tree").find("#braintree_item_name").attr("value", "");
    $("#brain_tree").find("#braintree_item_price").attr("value", "");
  }

  $("#brain_tree")
    .find("#braintree_merchant_ID")
    .attr("name", "braintree_merchant_ID_" + braintree_count);
  $("#brain_tree")
    .find("#braintree_public_key")
    .attr("name", "braintree_public_key_" + braintree_count);
  $("#brain_tree")
    .find("#braintree_private_key")
    .attr("name", "braintree_private_key_" + braintree_count);
  $("#brain_tree")
    .find("#braintree_item_name")
    .attr("name", "braintree_item_name_" + braintree_count);
  $("#brain_tree")
    .find("#braintree_item_price")
    .attr("name", "braintree_item_price_" + braintree_count);

  $("#sortable").append($("#brain_tree").html());
  braintree_count++;
  sortablePositionFunction(isNew, posU);
}

function addStripePayment(isNew, id, price, checked, posU) {
  if (!isNew) {
    console.log(isNew, id, price, checked, posU);

    $("#stripe_payment").find("#stripe_price").attr("value", price);
    $("#stripe_payment")
      .find("#stripe_recurring_price")
      .attr("checked", checked);
  } else {
    console.log("empty values");
    $("#stripe_payment").find("#stripe_price").attr("value", "");
    $("#stripe_payment").find("#stripe_recurring_price").attr("checked", false);
  }

  $("#stripe_payment")
    .find("#stripe_price")
    .attr("name", "stripe_price_" + stripe_payment_count);

  $("#stripe_payment")
    .find("#stripe_recurring_price")
    .attr("name", "stripe_price_" + stripe_payment_count);
  // $("#stripe_payment")
  //   .find("#braintree_public_key")
  //   .attr("name", "braintree_public_key_" + stripe_payment_count);
  // $("#stripe_payment")
  //   .find("#braintree_private_key")
  //   .attr("name", "braintree_private_key_" + stripe_payment_count);
  // $("#stripe_payment")
  //   .find("#braintree_item_name")
  //   .attr("name", "braintree_item_name_" + stripe_payment_count);
  // $("#stripe_payment")
  //   .find("#braintree_item_price")
  //   .attr("name", "braintree_item_price_" + stripe_payment_count);

  // This is a connect to stripe button visibility logic
  $("#form-stripe-connect").hide();

  $.ajax({
    url: SERVER + "store_stripe/check_connection/",
    type: "GET",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("user-token"),
    },
    success: function (res) {
      $("#form-stripe-connect").hide();
    },
    error: function (err) {
      $("#form-stripe-connect").show();
    },
  });

  $("#sortable").append($("#stripe_payment").html());
  stripe_payment_count++;
  sortablePositionFunction(isNew, posU);
}

function sendUpdates() {
  console.log("send updates---");
  var lesson_name = $("#lesson-name").val();
  console.log({lesson_name});
  var lesson_visiblity = $("#lesson_is_public").prop("checked");
  var meta_attributes = [];
  var isValid = true;
  data_ = {
    lesson_name: lesson_name,
    lesson_is_public: lesson_visiblity,
  };
  var flashcards = [];
  var position_me = 0;
  // Saving Quick Reads
  flashcards_div = [];
  flashcard_body = [];
  current_flashcard_elements = [];
  var attr_array = [];
  position_me = 0;

  if (document.querySelector("#name:checked")) {
    meta_attributes.push("name");
  }

  if (document.querySelector("#email:checked")) {
    meta_attributes.push("email");
  }

  if (document.querySelector("#phone:checked")) {
    meta_attributes.push("phone");
  }

  sortable_div = document.getElementById("sortable").childNodes;
  sortable_div.forEach((flashcard_div) => {
    console.log();
    try {
      if (
        flashcard_div.getAttribute &&
        flashcard_div.getAttribute("data-position")
      ) {
        console.log("PUSH NEW FLASCARD_DIV");
        console.log(flashcard_div);
        flashcards_div.push(flashcard_div);
      }
    } catch (e) {
      console.log(e);
    }
  });

  flashcards_div.forEach((flashcard) => {
    // Prepare the data
    current_flashcard_elements = [];
    flashcard.childNodes.forEach((flashcard_element) => {
      if (flashcard_element.attributes) {
        current_flashcard_elements.push(flashcard_element);
      }
    });

    current_flashcard_elements.shift();
    // console.log("currrent....");
    console.log({ current_flashcard_elements });
    flashcard_type = flashcard.getAttribute("data-type");
    position_me += 1;
    let choices_array = [];
    let tour_array = [];

    if (
      current_flashcard_elements.length < 4 &&
      flashcard_type != "user_tour"
    ) {
      console.log("user tour length");
      current_flashcard_elements.forEach((current_flashcard) => {
        this_element = current_flashcard.firstElementChild;
        if (this_element) {
          if (this_element.type == "textarea" || this_element.type == "text") {
            attr_value = current_flashcard.firstElementChild.value;
            attr_array.push(attr_value);
          } else {
            this_element = current_flashcard.lastElementChild;
            if (
              this_element.type == "textarea" ||
              this_element.type == "text"
            ) {
              attr_value = current_flashcard.lastElementChild.value;
              attr_array.push(attr_value);
            }
          }
        }
      });
    } else if (flashcard_type == "braintree_Config") {
      console.log("braintree_Config");
      current_flashcard_elements.forEach((current_flashcard) => {
        this_element = current_flashcard.firstElementChild;
        if (this_element) {
          console.log("this_element=", this_element);
          if (this_element.type == "text") {
            attr_value = current_flashcard.firstElementChild.value;
            attr_array.push(attr_value);
          } else {
            this_element = current_flashcard.lastElementChild;
            console.log("this_element last=", this_element);
            if (this_element.type == "text") {
              attr_value = current_flashcard.lastElementChild.value;
              attr_array.push(attr_value);
            }
          }
        }
      });
    } else if (flashcard_type == "stripe_Config") {
      console.log("stripe_Config");
      current_flashcard_elements.forEach((current_flashcard) => {
        console.log({ current_flashcard });
        this_element = current_flashcard.firstElementChild;
        if (this_element) {
          console.log("this_element=", this_element);
          if (this_element.type == "text") {
            attr_value = current_flashcard.firstElementChild.value;

            if (!attr_value) {
              isValid = false;
              swal({
                title: "Error Stripe payment",
                text: "Please fill all fields",
                icon: "error",
              });
            }
            attr_array.push(attr_value);
          }

          if (element.type === "checkbox") {
            return element.checked;
          }

          return null;
        }

        let curr_el = current_flashcard.firstElementChild;

        while (curr_el) {
          if (curr_el.localName == "input") {
            let value = getValueFromElement(curr_el);
            if (value) {
              attr_array.push(value);
            }
          }
          curr_el = curr_el.nextElementSibling;
        }
      });
    } else if (flashcard_type == "user_tour") {
      real_flashcard_elements = [];
      current_flashcard_elements.forEach((current_flashcard_element) => {
        if (current_flashcard_element.attributes) {
          real_flashcard_elements.push(current_flashcard_element);
        }
      });

      real_flashcard_elements[0].childNodes.forEach((choice_tour) => {
        var singleTour = {};
        var i = 1;
        choice_tour.childNodes.forEach((choice) => {
          choice.childNodes.forEach((choice_unit) => {
            if (choice_unit.type == "text" || choice_unit.type == "textarea") {
              switch (i) {
                case 1:
                  singleTour.title = choice_unit.value;
                  break;
                case 2:
                  singleTour.description = choice_unit.value;
                  break;
                case 3:
                  singleTour.latitude = choice_unit.value;
                  break;
                case 4:
                  singleTour.longitude = choice_unit.value;
                  break;
                case 5:
                  real_flashcard_elements[
                    current_flashcard_elements.length - 1
                  ].childNodes.forEach((image_upload_element) => {
                    if (image_upload_element.type == "text") {
                      attr_array[1] = image_upload_element.value;
                    }
                  });
                  singleTour.image = choice_unit.value;
                  break;
                default:
              }
              i++;
            }
          });
        });

        if (singleTour.title != undefined) tour_array.push(singleTour);
      });
    } else {
      real_flashcard_elements = [];
      current_flashcard_elements.forEach((current_flashcard_element) => {
        if (current_flashcard_element.attributes) {
          real_flashcard_elements.push(current_flashcard_element);
        }
      });
      console.log("real_flashcard_elements=", real_flashcard_elements);
      attr_array[0] = real_flashcard_elements[0].firstElementChild.value;

      //working on choices
      console.log(real_flashcard_elements);
      real_flashcard_elements[0].childNodes.forEach((choice) => {
        choice.childNodes.forEach((choice_unit) => {
          if (choice_unit.type == "text") {
            choices_array.push(choice_unit.value);
          }
        });
      });
      // Selecting the value of image
      real_flashcard_elements[
        current_flashcard_elements.length - 1
      ].childNodes.forEach((image_upload_element) => {
        if (image_upload_element.type == "text") {
          attr_array[1] = image_upload_element.value;
        }
      });
    }

    console.log("attr_array=>", attr_array);

    switch (flashcard_type) {
      case "jitsi_meet":
        temp = {
          lesson_type: "jitsi_meet",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_jitsi_meet").checked,
        };
        flashcards.push(temp);
        break;
      case "record_webcam":
        temp = {
          lesson_type: "record_webcam",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_record_webcam")
            .checked,
        };
        flashcards.push(temp);
        break;
      case "record_screen":
        temp = {
          lesson_type: "record_screen",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_record_screen")
            .checked,
        };
        flashcards.push(temp);
        break;
      case "chiro_front":
        temp = {
          lesson_type: "chiro_front",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_chiro_front").checked,
        };
        flashcards.push(temp);
        break;

      case "chiro_side":
        temp = {
          lesson_type: "chiro_side",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_chiro_side").checked,
        };
        flashcards.push(temp);
        break;
      case "speed_read":
        temp = {
          lesson_type: "quick_read",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_quick_read").checked,
        };
        flashcards.push(temp);
        break;

      case "title_text":
        temp = {
          lesson_type: "title_text",
          question: attr_array[0],
          answer: attr_array[1],
          position: position_me,
          is_required: document.getElementById("required_title_text").checked,
        };
        flashcards.push(temp);
        break;

      case "title_input":
        temp = {
          lesson_type: "title_input",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_title_input").checked,
        };
        flashcards.push(temp);
        break;

      case "iframe_link":
        temp = {
          lesson_type: "iframe_link",
          question: attr_array[0],
          image: attr_array[1],
          position: position_me,
          is_required: document.getElementById("required_iframe_link").checked,
        };
        flashcards.push(temp);
        break;

      case "title_textarea":
        temp = {
          lesson_type: "title_textarea",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_title_textarea")
            .checked,
        };
        flashcards.push(temp);
        break;

      case "image_file":
        temp = {
          lesson_type: "image_file",
          question: attr_array[0],
          image: attr_array[1],
          position: position_me,
          is_required: document.getElementById("required_image_file").checked,
        };
        flashcards.push(temp);
        break;

      case "user_tour":
        temp = {
          lesson_type: "user_tour",
          options: tour_array,
          position: position_me,
          latitude: 0,
          longitude: 0,
          is_required: document.getElementById("required_user_tour").checked,
        };
        flashcards.push(temp);
        break;

      case "video_file":
        temp = {
          lesson_type: "video_file",
          question: attr_array[0],
          image: attr_array[1],
          position: position_me,
          is_required: document.getElementById("required_video_file").checked,
        };
        flashcards.push(temp);
        break;

      case "audio_file":
        temp = {
          lesson_type: "audio_file",
          question: attr_array[0],
          image: attr_array[1],
          position: position_me,
          is_required: document.getElementById("required_audio_file").checked,
        };
        flashcards.push(temp);
        break;

      case "question_choices":
        temp = {
          lesson_type: "question_choices",
          question: attr_array[0],
          options: choices_array,
          image: attr_array[1],
          position: position_me,
          is_required: document.getElementById("required_question_choices")
            .checked,
        };
        flashcards.push(temp);
        break;

      case "question_checkboxes":
        temp = {
          lesson_type: "question_checkboxes",
          question: attr_array[0],
          options: choices_array,
          image: attr_array[1],
          position: position_me,
          is_required: document.getElementById("required_question_checkboxes")
            .checked,
        };
        flashcards.push(temp);
        break;
      case "signature":
        temp = {
          lesson_type: "signature",
          position: position_me,
          is_required: document.getElementById("required_signature").checked,
        };
        flashcards.push(temp);
        break;
      case "name_type":
        console.log("HERE IS PARSING NAME TYPE");
        console.log(attr_array);
        temp = {
          lesson_type: "name_type",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_name_type").checked,
        };
        flashcards.push(temp);
        break;

      case "user_video_upload":
        temp = {
          lesson_type: "user_video_upload",
          question: attr_array[0],
          // image: attr_array[0],
          image: "",
          position: position_me,
          is_required: document.getElementById("required_user_video_upload")
            .checked,
        };
        flashcards.push(temp);
        break;

      case "user_audio_upload":
        temp = {
          lesson_type: "user_audio_upload",
          question: attr_array[0],
          // image: attr_array[0],
          image: "",
          position: position_me,
          is_required: document.getElementById("required_user_audio_upload")
            .checked,
        };
        flashcards.push(temp);
        break;

      case "user_image_upload":
        temp = {
          lesson_type: "user_image_upload",
          question: attr_array[0],
          image: "",
          position: position_me,
          is_required: document.getElementById("required_user_image_upload")
            .checked,
        };
        flashcards.push(temp);
        break;
      case "braintree_Config":
        temp = {
          lesson_type: "braintree_Config",
          position: position_me,
          braintree_merchant_ID: attr_array[0],
          braintree_public_key: attr_array[1],
          braintree_private_key: attr_array[2],
          braintree_item_name: attr_array[3],
          braintree_item_price: attr_array[4],
          is_required: document.getElementById("required_braintree_Config")
            .checked,
        };
        flashcards.push(temp);
        break;
      case "stripe_Config":
        temp = {
          lesson_type: "stripe_Config",
          position: position_me,
          stripe_product_price: attr_array[0],
          stripe_recurring_price: attr_array[1],
          is_required: document.getElementById("required_stripe_Config")
            .checked,
        };
        console.log("received");
        flashcards.push(temp);
        break;
      case "user_gps":
        temp = {
          lesson_type: "user_gps",
          question: "User GPS",
          position: position_me,
          is_required: document.getElementById("required_user_gps").checked,
        };
        flashcards.push(temp);
        break;

      case "user_qr_url":
        temp = {
          lesson_type: "user_qr_url",
          question: SERVER + "courses_api/QRcodeData=" + lesson_id,
          position: position_me,
          is_required: document.getElementById("required_qr_url").checked,
        };
        flashcards.push(temp);
        break;

      case "user_qr_data":
        temp = {
          lesson_type: "user_qr_data",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_user_qr_data").checked,
        };
        flashcards.push(temp);
        break;

      case "email_verify":
        temp = {
          lesson_type: "email_verify",
          question: "Verified Email",
          position: position_me,
          is_required: document.getElementById("required_email_verify").checked,
        };
        flashcards.push(temp);
        break;

      case "verify_phone":
        temp = {
          lesson_type: "verify_phone",
          question: "Verified Phone",
          position: position_me,
          is_required: document.getElementById("required_verify_phone").checked,
        };
        flashcards.push(temp);
        break;

      case "gps_session":
        temp = {
          lesson_type: "gps_session",
          question: "GPS Session",
          answer: attr_array[1],
          position: position_me,
          is_required: document.getElementById("required_gps_session").checked,
        };
        flashcards.push(temp);
        break;

      case "datepicker":
        temp = {
          lesson_type: "datepicker",
          question: "Date",
          position: position_me,
          is_required: document.getElementById("required_datepicker").checked,
        };
        flashcards.push(temp);
        break;

      case "contact_form":
        console.log(attr_array);
        temp = {
          lesson_type: "contact_form",
          question: attr_array[0],
          position: position_me,
          is_required: document.getElementById("required_contact_form").checked,
        };
        flashcards.push(temp);
        break;
    }
    console.log("====== flashcards", flashcards);
    attr_array = [];
  });

  data_.flashcards = flashcards;
  for (let i = 0; i < flashcards.length; i++) {
    if (flashcards[i].lesson_type == "user_tour") {
      let arr = data_.flashcards[i].options;
      for (let j = 0; j < arr.length; j++) {
        if (
          arr[j]["title"] == "" ||
          arr[j]["description"] == "" ||
          arr[j]["latitude"] == "" ||
          arr[j]["longitude"] == "" ||
          arr[j]["image"] == ""
        ) {
          swal({
            title: "Error Creating Lesson",
            text: "Please fill all fields to save/update lesson",
            icon: "error",
          });
          return;
        }

        var latlngVal = /^-?((1?[0-7]?|[0-9]?)[0-9]|180)\.[0-9]{1,6}$/;
        var latitude = arr[j]["latitude"];
        var longitude = arr[j]["longitude"];
        var invalid_latlng = "Latitude and Longitude are not correctly typed";

        // Validate Latitude and Longitude
        if (!latlngVal.test(latitude) && !latlngVal.test(longitude)) {
          swal({
            title: "Error Creating Lesson",
            text: invalid_latlng,
            icon: "error",
          });
          return;
        }
      }
      console.log("arr==>", arr);
    }
  }

  data_.meta_attributes = meta_attributes.join(",");
  console.log("data before....");
  console.log(data_);

  //Added by SYed AShrfaa

  // get all inputs from question_choices
  var question_choices = [];
  document.querySelectorAll("#choices").forEach((element) => {
    question_choices.push(element.value);
  });

  // data_.flashcards[1].options = question_choices;
  
  data_.flashcards.forEach((flashcard, index) => {
    flashcard.options = question_choices;
  });

  console.log("data after....");
  console.log(data_);

  // End by Syed AShraf

  if (isValid) {
    if (MODE == "CREATE") {
      $.ajax({
        url: SERVER + "courses_api/lesson/create",
        data: JSON.stringify(data_),
        type: "POST",
        contentType: "application/json",
        headers: { "Authorization": "Bearer " + localStorage.getItem("user-token") },
        success: function (data) {
          var currentPathName = window.location.pathname;
          window.location.replace(currentPathName + "?lesson_id=" + data.id);
          swal({
            title: "Lesson Created",
            text: "You have successfully created a lesson",
            icon: "success",
            timer: 2000,
          });
        },
        error: (err) => {
          swal({
            title: "Error Creating Lesson",
            text: err,
            icon: "error",
          });
        },
      });
    } else {
      let btn = $("#lesson_submit_btn").first();
      btn.attr("disabled", true);
      console.log(btn);
      btn.text("Saving...");
      $.ajax({
        url: SERVER + "courses_api/lesson/update/" + lesson_id + "/",
        data: JSON.stringify(data_),
        type: "POST",
        headers: { "Authorization": "Bearer " + localStorage.getItem("user-token") },
        contentType: "application/json",
        success: function (data) {
          btn.attr("disabled", false);
          btn.text("Save");
          swal({
            title: "Lesson Updated",
            text: "You have updated created a lesson",
            icon: "success",
            // timer: 2000,
          });
          // location.reload();
        },
        error: function (err) {
          console.log(
            "🚀 ~ file: lesson.js ~ line 1739 ~ sendUpdates ~ err",
            err
          );
          btn.attr("disabled", false);
          btn.text("Save");
          swal({
            title: "Error Updating Lesson",
            text: err.responseJSON,
            icon: "error",
          });
        },
      });
    }
  }
}

function toggleCheckedWhenMarkIsRequired(flashCardType, isRequired) {
  document.getElementById("required_" + flashCardType).checked = isRequired;
}

$(document).ready(function () {
  $("#left-sidebar").load("sidebar.html");
  $("#page-header").load("header.html");
  if (!localStorage.getItem("user-token")) {
    $("#is_public_contanier").hide();
    $("button").hide();
  }
  if (lesson_id) {
    MODE = "UPDATE";
  } else {
    MODE = "CREATE";
  }
  const param = new URL(window.location.href);
  const params = param.searchParams.get("params");
  if (MODE == "UPDATE") {
    $.ajax({
      url: SERVER + "courses_api/lesson/read/" + lesson_id,
      type: "GET",
      crossDomain: true,
      contentType: "application/json",
      headers: { "Authorization": "Bearer " + localStorage.getItem("user-token") },
      success: function (response) {
        console.log(response);
        if (params) {

          $("#lesson_page").attr(
            "href",
            `/page.html?lesson_id=${lesson_id}&params=${params}`
          );
          $("#lesson_slide").attr(
            "href",
            `/slide.html?lesson_id=${lesson_id}&params=${params}`
          );
        } else {

          $("#lesson_page").attr("href", "/page.html?lesson_id=" + lesson_id);
          $("#lesson_slide").attr("href", "/slide.html?lesson_id=" + lesson_id);
          $("#lesson_page_2").attr("href", "/page.html?lesson_id=" + lesson_id);
          $("#lesson_slide_2").attr("href", "/slide.html?lesson_id=" + lesson_id);
        }
        $("#lesson_responses").attr(
          "href",
          "/lesson_responses.html?lesson_id=" + lesson_id
        );
        $("#lesson_responses_2").attr(
          "href",
          "/lesson_responses.html?lesson_id=" + lesson_id
        );
        $("#lesson_responses_v2").attr(
          "href",
          "/lesson_responses_v2.html?lesson_id=" + lesson_id
        );
        $("#payments").attr("href", "/payments.html?lesson_id=" + lesson_id);

        $("#lesson-name").val(response.lesson_name);
        $("#lesson_is_public").prop("checked", response.lesson_is_public);
        $("title").text(response.lesson_name + " - edit..");

        var flashcards = response.flashcards;
        //Updating meta
        var recieved_meta = response.meta_attributes;

        if (recieved_meta.includes("name")) {
          document.getElementById("name").checked = true;
        }

        if (recieved_meta.includes("email")) {
          document.getElementById("email").checked = true;
        }

        if (recieved_meta.includes("phone")) {
          document.getElementById("phone").checked = true;
        }

        flashcards.sort(function (a, b) {
          keyA = a.position;
          keyB = b.position;
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });

        flashcards.forEach((flashcard) => {
          if (pos < flashcard.position) {
            pos = flashcard.position + 1;
          }

          if (flashcard.lesson_type == "quick_read") {
            addSpeedRead(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "title_text") {
            addTitleText(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.answer,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "braintree_Config") {
            addBrainTree(
              false,
              flashcard.id,
              flashcard.braintree_merchant_ID,
              flashcard.braintree_public_key,
              flashcard.braintree_private_key,
              flashcard.braintree_item_name,
              flashcard.braintree_item_price,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "stripe_Config") {
            addStripePayment(
              false,
              flashcard.id,
              flashcard?.stripe_item?.price,
              flashcard?.stripe_item?.stripe_recurring_price
            );
          }

          if (flashcard.lesson_type == "jitsi_meet") {
            addJitsiMeet(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.answer,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "record_webcam") {
            addRecordWebCam(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.answer,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "record_screen") {
            addRecordScreen(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.answer,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "title_input") {
            addTitleInput(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.answer,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "question_choices") {
            addQuestionChoices(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.image,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "name_type") {
            addNameType(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "question_checkboxes") {
            addQuestionCheckboxes(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.image,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "video_file") {
            addVideoFile(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.image,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "image_file") {
            addImageFile(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.image,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "audio_file") {
            addAudioFile(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.image,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "user_tour") {
            addUserTour(
              false,
              flashcard.id,
              flashcard.options,
              flashcard.question,
              flashcard.answer,
              flashcard.latitude,
              flashcard.longitude,
              flashcard.image,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "iframe_link") {
            addIframeLink(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.image,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "title_textarea") {
            addTitleTextarea(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.position
            );
          }

          if (flashcard.lesson_type == "signature") {
            addSignaturePad(false, flashcard.id, null, flashcard.position + 1);
          }

          if (flashcard.lesson_type == "verify_phone") {
            addVerifyPhone(false, flashcard.id, null, flashcard.position + 1);
          }
          if (flashcard.lesson_type == "user_video_upload") {
            addUserVideoUpload(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.image,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "user_image_upload") {
            addUserImageUpload(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.image,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "user_audio_upload") {
            addUserAudioUpload(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.image,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "user_gps") {
            addUserGps(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "chiro_front") {
            addChiroFront(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "chiro_side") {
            addChiroSide(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "user_qr_url") {
            addUserQRUrl(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "user_qr_data") {
            addUserQRData(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "gps_session") {
            addGpsSession(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "datepicker") {
            addDatePicker(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.options,
              flashcard.position
            );
          }
          if (flashcard.lesson_type == "email_verify") {
            addVerifyEmail(false, flashcard.id, null, flashcard.position + 1);
          }
          if (flashcard.lesson_type == "contact_form") {
            addContactForm(
              false,
              flashcard.id,
              flashcard.question,
              flashcard.position + 1
            );
          }
          toggleCheckedWhenMarkIsRequired(
            flashcard.lesson_type,
            flashcard.is_required
          );
        });

        getAllLessons();
      },
      error: (error) => {
        console.log('error.responseJSON', error.responseJSON);
        swal({
          title: "Access Denied!",
          text: error.responseJSON.msg,
          icon: "error",
        });
      },
    });
  } else {
    getAllLessons();
  }

  console.log({lesson_name});
  $("#lesson_form").submit((e) => {
    $('#create-new-lesson-modal').addClass('hide');
    e.preventDefault();
    sendUpdates();
    var lesson_name = $("#lesson-name").val();
    var lesson_type = $("#selectsegment").val();
    const param = new URL(window.location.href);
    const params = param.searchParams.get("params");
    const lesson_id = param.searchParams.get("lesson_id");
    var answer = $("#answer").val();

    if (params) {
      $.ajax({
        async: true,
        crossDomain: true,
        crossOrigin: true,
        url: SERVER + "/courses_api/invite/response",
        type: "POST",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("user-token"),
        },
        data: {
          params: params,
          lesson_id: lesson_id,
          lesson_name: lesson_name,
          lesson_type: lesson_type,
          answer: answer,
        },
        success: () => {
          swal({
            title: "data saved",
            text: "You have save data successfully ",
            icon: "success",
          });
        },
        error: (err) => {
          swal({
            title: "Not Exist",
            text: err.responseJSON.msg,
            icon: "error",
          });
        },
      });
    }
  });

  $(document).on("click", ".remove_flashcard", function (e) {
    swal(
      {
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      },
      function (isConfirm) {
        if (isConfirm) {
          var lesson_element_type = $(e.target)
            .parent()
            .parent()
            .children()
            .last()
            .children()
            .attr("name");
          pos--;
          // if (lesson_element_type.startsWith("speed_read")) {
          //     quick_read_count--;
          // } else if (lesson_element_type.startsWith("text")) {
          //     title_text_count--;
          // } else if (lesson_element_type.startsWith("question")) {
          //     question_choices_count--
          // } else if (lesson_element_type.startsWith("link")) {
          //     iframe_link_count--
          // } else if (lesson_element_type.startsWith("video")) {
          //     video_file_count--
          // } else if (lesson_element_type.startsWith("image")) {
          //     image_file_count--
          // }else if (lesson_element_type.startsWith("title_textarea")) {
          //     title_textarea_count--
          // }else if (lesson_element_type.startsWith("title_input")) {
          //     title_input_count--
          // } else if (lesson_element_type.startsWith("sign_b64")) {
          //     sign_count--
          // } else if (lesson_element_type.startsWith("brain_tree")) {
          //     braintree_count--
          // }else if (lesson_element_type.startsWith("question_checkboxes")) {
          //     question_checkboxes_count--
          // }else if (lesson_element_type.startsWith("name_type")) {
          //     name_type_count--
          // }
          //console.log(lesson_element_type)
          $(e.target).parent().parent().remove();
          sortablePositionFunction();
        } else {
          swal("Cancelled", "error");
        }
      }
    );
  });

  $("#add").click(function (e) {
    if ($("#selectsegment").val() == "jitsi_meet") {
      addJitsiMeet(true);
    }
    if ($("#selectsegment").val() == "record_webcam") {
      addRecordWebCam(true);
    }
    if ($("#selectsegment").val() == "record_screen") {
      addRecordScreen(true);
    }
    if ($("#selectsegment").val() == "speed_read") {
      addSpeedRead(true);
    }
    if ($("#selectsegment").val() == "title_text") {
      addTitleText(true);
    }

    if ($("#selectsegment").val() == "title_input") {
      addTitleInput(true);
    }

    if ($("#selectsegment").val() == "question_choices") {
      addQuestionChoices(true);
    }

    if ($("#selectsegment").val() == "name_type") {
      addNameType(true);
    }

    if ($("#selectsegment").val() == "question_checkboxes") {
      addQuestionCheckboxes(true);
    }

    if ($("#selectsegment").val() == "video_file") {
      addVideoFile(true);
    }

    if ($("#selectsegment").val() == "image_file") {
      addImageFile(true);
    }

    if ($("#selectsegment").val() == "audio_file") {
      addAudioFile(true);
    }
    if ($("#selectsegment").val() == "user_tour") {
      addUserTour(true);
    }

    if ($("#selectsegment").val() == "iframe_link") {
      addIframeLink(true);
    }

    if ($("#selectsegment").val() == "title_textarea") {
      addTitleTextarea(true);
    }

    if ($("#selectsegment").val() == "signature") {
      addSignaturePad(true);
    }

    if ($("#selectsegment").val() == "brain_tree") {
      addBrainTree(true);
    }

    if ($("#selectsegment").val() == "stripe_payment") {
      addStripePayment(true);
    }

    if ($("#selectsegment").val() == "verify_phone") {
      addVerifyPhone(true);
    }

    if ($("#selectsegment").val() == "user_video_upload") {
      addUserVideoUpload(true);
    }

    if ($("#selectsegment").val() == "user_image_upload") {
      addUserImageUpload(true);
    }

    if ($("#selectsegment").val() == "user_audio_upload") {
      addUserAudioUpload(true);
    }

    if ($("#selectsegment").val() == "user_gps") {
      addUserGps(true);
    }

    if ($("#selectsegment").val() == "chiro_front") {
      console.log("Chiro Front Added");
      addChiroFront(true);
    }

    if ($("#selectsegment").val() == "chiro_side") {
      console.log("Chiro Side Added");
      addChiroSide(true);
    }

    if ($("#selectsegment").val() == "select_type") {
      swal({
        title: "Please select a type",
        text: "Select a flashcard type to add to the lesson.",
        icon: "error",
        timer: 2000,
      });
      
    }
    if ($("#selectsegment").val() == "user_qr_url") {
      addUserQRUrl(true);
    }

    if ($("#selectsegment").val() == "user_qr_data") {
      addUserQRData(true);
    }

    if ($("#selectsegment").val() == "gps_session") {
      addGpsSession(true);
    }

    if ($("#selectsegment").val() == "datepicker") {
      addDatePicker(true);
    }

    if ($("#selectsegment").val() == "email_verify") {
      addVerifyEmail(true);
    }

    if ($("#selectsegment").val() == "contact_form") {
      addContactForm(true);
    }
  });
});

function openAddToClassModal() {
  var sgPageURL = window.location.search.substring(1);
  var sParameterName = sgPageURL.split("=");

  $.ajax({
    async: true,
    crossDomain: true,
    crossOrigin: true,
    url: SERVER + "students_list/get/class/",
    type: "GET",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("user-token"),
    },
  })
    .done((cls) => {
      classList = cls;
      for (let cls of [...classList]) {
        $("#add-to-class-modal #classlist-select").append(
          `<option value="${cls.id}">${cls.class_name}</option>`
        );
      }
    })
    .fail((fail) => {
      console.log(fail);
      alert("ERROR2");
    });

  $("#add-to-class-modal #add_class_id").val(sParameterName[1]);
  $("#add-to-class-modal #classlist-select").empty();
  $("#add-to-class-modal #classlist-select").append(
    `<option value=false>Select Class</option>`
  );
  $("#add-to-class-modal").modal();
  $("#add-to-class-modal #classlist-select").on("change", (e) => {
    if (e.target.value != "false") {
      $("#AddLessonToClassBtn").attr("disabled", false);
    } else {
      $("#AddLessonToClassBtn").attr("disabled", true);
    }
  });
}

function addToSelectedClass() {
  if ($("#add-to-class-modal #classlist-select").val() == "false") return;
  let data = {
    class_id: $("#add-to-class-modal #classlist-select").val(),
    lesson_id: $("#add-to-class-modal #add_class_id").val(),
  };
  const value = $("#add-to-class-modal #classlist-select").val();
  console.log(value);
  // window.location.href = `/id=${value}`;
  $.ajax({
    async: true,
    crossDomain: true,
    crossOrigin: true,
    url: SERVER + "courses_api/lesson/add_to_class",
    data: data,
    type: "POST",
    headers: { "Authorization": "Bearer " + localStorage.getItem("user-token") },
  })
    .done((res) => {
      swal({
        title: "Lesson Updated",
        text: "You have successfully added lesson to class",
        icon: "success",
        timer: 2000,
      });
      location.reload();
    })
    .fail((err) => {
      alert(err | "Something went wrong");
    });
}

$(document).on("click", "#settingshtml", function (e) {
  $("#settingshtml").attr("href", "/settings.html?lesson_id=" + lesson_id);
});

$(document).on("click", ".image_upload_tour_button", function (e) {
  console.log("image upload--------");
  $("#imageUpload").click();
  data_id_value = $(this).siblings("input[type=text]").attr("data-id");
  img_tour_value = $(this).siblings("img").attr("data-id");
  image_type = "imageFileTour";
});

$(document).on("click", ".image_upload_button", function (e) {
  console.log("image upload--------");
  $("#imageUpload").click();
  data_id_value = $(this).siblings("input[type=text]").attr("data-id");
  image_type = "imageFile";
});

$(document).on("click", ".upload_vid_btn", function (e) {
  $("#videoUpload").click();
  video_data_id_value = $(this).siblings("input[type=text]").attr("data-id");
  video_type = "video_file";
});

$(document).on("click", ".audio_upload_button", function (e) {
  console.log("image upload--------");
  $("#audioUpload").click();
  audio_data_id_value = $(this).siblings("input[type=text]").attr("data-id");
  audio_type = "audio_file";
});

// sidebar functions
$(document).ready(function () {
  $("#left-sidebar").load("sidebar.html");
  $("#page-header").load("header.html");
  $("#profileDiv").show();
});
("#body-row .collapse").collapse("hide");

// Collapse click
function left_sidebar() {
  SidebarCollapse();
  $('.logoimg').toggleClass("d-none");
  $('#cross').toggleClass("d-none");
}
function SidebarCollapse() {
  $(".menu-collapsed").toggleClass("d-none");
  $(".sidebar-submenu").toggleClass("d-none");
  $(".submenu-icon").toggleClass("d-none");
  $('#bar').toggleClass("d-block");
  $("#sidebar-container").toggleClass(
    "sidebar-expanded sidebar-collapsed"
  );
  // Treating d-flex/d-none on separators with title
  var SeparatorTitle = $(".sidebar-separator-title");
  if (SeparatorTitle.hasClass("d-flex")) {
    SeparatorTitle.removeClass("d-flex");
  } else {
    SeparatorTitle.addClass("d-flex");
  }
}