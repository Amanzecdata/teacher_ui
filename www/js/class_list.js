var passwordResetToken = getParam("token");
var userToken = localStorage.getItem("user-token");

console.log("MODE: PASSWORD_RESET, Token - " + passwordResetToken);

if (userToken == null) {
    window.location.replace("student_login.html");
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



$(document).ready(function() {

    $("#left-sidebar").load("sidebar.html");
    $("#page-header").load("header.html");

    //                        $("#page-container").load('dashboard.html');
});
$("#body-row .collapse").collapse("hide");

// Collapse/Expand icon
//$('#collapse-icon').addClass('fa-angle-double-left');

// Collapse click
function left_sidebar() {
    SidebarCollapse();
}

function SidebarCollapse() {
    $(".menu-collapsed").toggleClass("d-none");
    $(".sidebar-submenu").toggleClass("d-none");
    $(".submenu-icon").toggleClass("d-none");
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

    // Collapse/Expand icon
    //$('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
}
//   var system_users = [
//     {
//       class_id: "CLS1",
//       class_name: "Class A",
//       // student_name: "John",
//     },
//     {
//       class_id: "CLS2",
//       class_name: "Class B",
//       // student_name: "Moe",
//     },
//     {
//       class_id: "CLS3",
//       class_name: "Class C",
//       // student_name: "Dooley",
//     },
//   ];

//   var system_students = [
//     {
//       student_name: "John",
//       student_email: "john@gmail.com",
//       student_phone: "+123252522",
//     },
//     {
//       student_name: "Moe",
//       student_email: "mary@example.com",
//       student_phone: "+18741271367",
//     },
//     {
//       student_name: "Dooley",
//       student_email: "july@example.com",
//       student_phone: "+18741279437",
//     },
//   ];

var group_data = [
    { class_id: "CLS1", group_name: "group1" },
    { class_id: "CLS2", group_name: "group2" },
    { class_id: "CLS3", group_name: "group3" },
];
var system_users;
var system_students;
var all_students;

$(document).ready(function() {
    $("#tabDiv").show();
    $("#systemUserDetail").hide();
    $.ajax({
        async: true,
        crossDomain: true,
        crossOrigin: true,
        url: SERVER + "students_list/get/class",
        type: "GET",
        headers: { "Authorization": `${localStorage.getItem('user-token')}` }
    }).done((classess) => {
        $('#classLoader').remove();
        system_users = classess
        system_users.forEach((item, i) => {
            $("#users-data").append(`<tr>
                    <td>${item.id}</td>
                    <td>${item.class_name}</td>
                    <td><button onclick="editSystemUser('${i}')" class="btn btn-primary btn-edit"><i class="fa fa-pencil-square-o"></i></button>
                    &nbsp
                    <button onclick="editSystemStudent('${i}','${item.id}')" class="btn btn-primary btn-edit"><i class="fa fa-list"></i></button>
                    &nbsp
                    <button class="btn btn-primary btn-edit" onclick="showEmail('${i}')"><i class="fa fa-envelope"></i></button>
                    &nbsp
                    <button class="btn btn-primary btn-edit" onclick="showText('${i}')"><i class="fa fa-comment"></i></button>
                    </td>
                    </tr>`);
        })
        $.get(SERVER + "students_list/get/classenrolled").done((enroll) => {
            system_students = enroll

            $.ajax({
                async: true,
                crossDomain: true,
                crossOrigin: true,
                url: SERVER + "students_list/get/students",
                type: "GET",
                headers: { "Authorization": `${localStorage.getItem('user-token')}` }
            }).done((students) => {
                all_students = students

            }).fail(function(err) { alert(err) })

        }).fail(function(err) { alert(err) })
    }).fail(function(err) {
        alert(err);
        $('#classLoader').remove();
    })



    group_data.forEach((item, i) => {
        $("#group-data").append(`<tr>
                        <td>${item.created_at}</td>
                        <td>${item.group_name}</td>
                        <td><button onclick="openModal('${i}')" class="btn btn-primary btn-edit"><i class="fa fa-pencil-square-o"></i></button></td>
                        </tr>`);
    });
});


function addUser() {
    console.log("Add User");
}

function addPhone() {
    console.log("Add Phone");
}

function addGroup() {
    console.log("Add Group ", $("#grouplist").val());
}

function showEmail(i) {
    $("#show-email").show()
    $("#list-class").hide()
    $("#class-email-id").val(system_users[i].id)

}

function showText(i) {
    $("#show-text").show()
    $("#list-class").hide()
    $("#text-msg").val('')
    $("#class-text-id").val(system_users[i].id)
}


function showClass() {
    $("#show-email").hide()
    $("#show-text").hide()
    $("#list-class").show()
}

$("#addClass").submit((event) => {
    event.preventDefault()
    $.ajax({
        type: 'POST',
        url: SERVER + 'students_list/get/class',
        headers: { "Authorization": `${localStorage.getItem('user-token')}` },
        data: {
            "class_name": $("#class_name").val()
        },
        success: () => {
            location.reload()
        }
    })
})

$("#showDelete").on('click', () => {
    $.ajax({
        type: 'DELETE',
        url: SERVER + 'students_list/get/class' + '?' + $.param({ 'id': $('#classid').val() }),
        headers: { "Authorization": `${localStorage.getItem('user-token')}` },
        success: () => {
            location.reload();
        }
    })
})

$("#updateClass").on('click', () => {
    $.ajax({
        type: 'PUT',
        url: SERVER + 'students_list/get/class',
        headers: { "Authorization": `${localStorage.getItem('user-token')}` },
        data: {
            "id": $("#classid").val(),
            "class_name": $("#classname").val()
        },
        success: () => {
            location.reload()
        }
    })
})

function editSystemUser(i) {
    $("#tabDiv").hide();
    $("#systemUserDetail").show();

    $("#classid").val(system_users[i].id);
    $("#classname").val(system_users[i].class_name);
    $("#cid").val(system_users[i].id)
}

function editSystemStudent(i, id) {
    $("#student-data").empty()
    $("#AddStudent").val(id)
    $("#studentModal").modal();
    system_students.forEach((item, i) => {
        if (String(id) === String(item.class_enrolled.id)) {
            $("#student-data").append(`<tr>
                    <td>${item.student.name}</td>
                    <td>${item.student.email}</td>
                    <td>${item.student.phone}</td>
                    <td><button onclick="deleteStudent('${item.student.id}','${item.class_enrolled.id}')" class="btn btn-primary btn-edit"><i class="fa fa-trash"></i></button>
                    </tr>`);
        }
    })
}

function goBack() {
    $("#tabDiv").show();
    $("#systemUserDetail").hide();
}

function openModal(i) {
    if (i != -1) {
        $("#groupTitle").text("Update Group");
        $("#grouplist").val(group_data[i].group_name);
    } else {
        $("#groupTitle").text("Add Group");
        $("#grouplist").val("group1");
    }
    $("#groupModal").modal();
}

function openStudentModal() {
    $('#studentModal').modal('toggle');
    $("#add-student-Modal").modal();
    $('#add_classid').val($("#AddStudent").val())
}

$("#AddStudent").click(() => {
    let class_student = []
    student = $("#studentlist option:selected").val()
    class_ = $("#add_classid").val()

    var filteredStudent = system_students.filter((el) => {
        return String(el.class_enrolled.id) === String($("#AddStudent").val())
    })
    filteredStudent.forEach((item, i) => {
        class_student.push(item.student.name)
    })
    if (class_student.indexOf(student) === -1) {
        $.ajax({
            type: 'POST',
            url: SERVER + 'students_list/get/classenrolled',
            data: {
                "student": student,
                "class": class_,
            },
            success: () => {
                location.reload()
            }
        })
    } else {
        swal({
            title: "Warning",
            text: `${student} is already in your class`,
            icon: "warning",
            timer: 1500
        });
    }
})

$("#studentlist").click(() => {
    option_length = ($("#studentlist option").length)
    if ($("#studentlist option:selected").val() != "Select Student") {
        $("#AddStudent").attr("disabled", false)
    } else {
        $("#AddStudent").attr("disabled", true)
    }

    if (option_length === 1) {
        all_students.forEach((item, i) => {
            $("#studentlist").append($('<option>').val(item.name).text(item.name))
        })
    }
})

function deleteStudent(sid, cid) {
    $.ajax({
        type: 'DELETE',
        url: SERVER + 'students_list/get/classenrolled' + '?' + $.param({ 'sid': sid, 'cid': cid }),
        success: () => {
            location.reload();
        }
    })
}

$("#emailForm").submit((event) => {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: SERVER + 'students_list/send/mail/class',
        data: {
            "message": $("#email-subject").val() + "\n" + $("#email-body").val(),
            "class_enrolled_id": $("#class-email-id").val()
        },
        success: () => {
            location.reload()
        }
    })
})
$("#textForm").submit((event) => {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: SERVER + 'students_list/send/text/class',
        data: {
            "message": $("#text-msg").val(),
            "class_enrolled_id": $("#class-text-id").val()
        },
        success: () => {
            location.reload()
        }
    })
})