/* eslint-disable */
$.getJSON("data.json", function (buildInfo) {
    console.log(buildInfo, 'buildInfo');
    $('#build_no').html('<a href="' + buildInfo.build_url  + '">' + buildInfo.build_no + '</a>');
    $('#branch').html(buildInfo.branch);
    $('#version').html(buildInfo.version);
    $('#nextgen_version').html(buildInfo.nextgen_version);
    $('#current_commit').html(buildInfo.current_commit);
    if (buildInfo.commits && buildInfo.commits.length > 0) {
        $.each(buildInfo.commits, function (i, commit) {
            var row = "<tr>";
            row += "<td>" + commit.message + "</td>";
            row += "<td>" + commit.author_name + "</td>";
            row += "<td>" + commit.date + "</td>";
            $('#commits tbody').append(row);
        });
    } else {
        $('#commits').remove();
    }
});