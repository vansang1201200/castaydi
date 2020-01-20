var student = {} || student;

student.drawTable = function(){
    $.ajax({
        url : "http://localhost:3000/Students",
        method : "GET",
        dataType : "json",
        success : function(data){
            $('#tbStudent').empty();
            var i = 0;
            $.each(data, function(i, v){
                $('#tbStudent').append(
                    "<tr>"+
                        "<td>"+ v.id +"</td>"+
                        "<td>"+ (i+1) +"</td>"+
                        "<td>" + v.FullName + "</td>"+
                        "<td><img src='"+ v.Avatar +"' width='50px' height='60px' /></td>"+
                        "<td>"+ v.DOB +"</td>"+
                        "<td>"+ v.Class.Name +"</td>"+
                        "<td>"+ v.Phone +"</td>"+
                        "<td>"+
                            "<a href='javascript:;' title='edit student' onclick='student.get("+ v.id +")'><i class='fa fa-edit'></i></a> " +
                            "<a href='javascript:;' title='remove student' onclick='student.delete("+ v.id +")' ><i class='fa fa-trash' style='color:red;'></i></a>" +
                        "</td>"+
                    "</tr>"
                );
            });
            // gọi sắp xếp
            $('#myTable').DataTable({
                destroy: true,
                columnDefs : [
                    {
                        "targets": [3,7],
                        "orderable" : false
                    }
                    
                ]
            });
        }
    });
};

student.openModal = function(){
    student.reset();
    $('#addEditStudent').modal('show');
};

student.save = function(){
    if($('#formAddEditStudent').valid()){
        if($('#id').val() == 0){
            var studentObj = {};
            studentObj.FullName = $('#FullName').val();
            studentObj.Avatar = $('#Avatar').val();
            studentObj.DOB = $('#DOB').val();
            studentObj.Phone = $('#Phone').val();
            var classObj = {};
            classObj.id = $("#ClassId").val();
            classObj.Name = $("#ClassId option:selected").html();
            studentObj.Class = classObj;
    
            $.ajax({
                url : "http://localhost:3000/Students",
                method : "POST",
                dataType : "json",
                contentType : "application/json",
                data : JSON.stringify(studentObj),
                success : function(data){
                    $('#addEditStudent').modal('hide');
                    student.drawTable();
                }
            });
        }
        else{
            var studentObj = {};
            studentObj.FullName = $('#FullName').val();
            studentObj.Avatar = $('#Avatar').val();
            studentObj.DOB = $('#DOB').val();
            studentObj.Phone = $('#Phone').val();
            studentObj.id = $('#id').val();
            var classObj = {};
            classObj.id = $("#ClassId").val();
            classObj.Name = $("#ClassId option:selected").html();
            studentObj.Class = classObj;
    
            $.ajax({
                url : "http://localhost:3000/Students/" + studentObj.id,
                method : "PUT",
                dataType : "json",
                contentType : "application/json",
                data : JSON.stringify(studentObj),
                success : function(data){
                    $('#addEditStudent').modal('hide');
                    student.drawTable();
                }
            });
        }
        
    }
};

student.delete = function(id){
    bootbox.confirm({
        title: "Remove Student",
        message: "Do you want to remove this student?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        callback: function (result) {
            if(result){
                $.ajax({
                    url : "http://localhost:3000/Students/" + id,
                    method: "DELETE",
                    dataType : "json",
                    success : function(data){
                        student.drawTable();
                    }
                });
            }
        }
    });
};

student.get = function(id){
    $.ajax({
        url : "http://localhost:3000/Students/" + id,
        method : "GET",
        dataType : "json",
        success : function(data){
            $('#FullName').val(data.FullName);
            $('#Avatar').val(data.Avatar);
            $('#DOB').val(data.DOB);
            $('#Phone').val(data.Phone);
            $('#id').val(data.id);
            
            var validator = $( "#formAddEditStudent" ).validate();
            validator.resetForm();
            $('#addEditStudent').modal('show');
        }
    });
};

student.reset = function(){
    $('#FullName').val('');
    $('#Avatar').val('');
    $('#DOB').val('');
    $('#Phone').val('');
    $('#id').val('0');
    var validator = $( "#formAddEditStudent" ).validate();
    validator.resetForm();
};


student.initClass = function(){
    $.ajax({
        url : "http://localhost:3000/Classes",
        method : "GET",
        dataType : "json",
        success : function(data){
            $('#ClassId').empty();
            $.each(data, function(i, v){
                $('#ClassId').append(
                    "<option value='"+ v.id +"'>"+ v.Name +"</option>"
                );
            });
        }
    });
}

student.uploadAvatar = function(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#falseinput').attr('src', e.target.result);
            $('#base').val(e.target.result);
            $('#showAvatar').attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
};
student.init = function(){
    student.drawTable();
    student.initClass();
};

$(document).ready(function(){
    student.init();
});