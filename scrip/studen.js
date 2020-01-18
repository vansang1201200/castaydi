var studen = {} || studen;

studen.drawTable = function(){
    $.ajax({
        "url" : "http://localhost:3000/studen",
        method : "GET",
        dataType :"json",
        success : function(data){
            $.each(data,function(i,v){
                $('#tbstudent').append(
                    "<tr>"+
                    "<td>"+ v.ID +"</td>"+
                    "<td>"+ v.Fullnema +"</td>"+
                    "<td>"+ v.Phone +"</td>"+
                    "<td><img scr='"+ v.avatar +"'width='50px' height = '60px'/></td>"+
                    "<td>"+ v.Classes +"</td>"+
                    "<td>"+ v.Dob +"</td>"+
                    "<td></td>"+
                    "</tr>"
                );
            });
        }
    });
};
studen.openModal = function(){
    $('#addeditstuden').modal('show');
};
studen.save = function(){
    if($('#formstudenaddedit').valid()){
        var studenObj = {};
        studenObj.Fullnema = $('#Fullnema').val();
        studenObj.avatar = $('#avatar').val();
        studenObj.Phone = $('#Phone').val();
        studenObj.Classes = $('#Classes').val();
        studenObj.Dob = $('#Dob').val();
        $.ajax({
            url : "http://localhost:3000/studen",
            method : "POST",
            dataType : "Json",
            contentType : "application/Json",
            data : JSON.stringify(studenObj),
            success : function(data){
                $('#addeditstuden').modal('hide');
                studen.drawTable();
            }
        })
    }
};


studen.init = function(){
    studen.drawTable();
};

$(document).ready(function(){
    studen.init();
});