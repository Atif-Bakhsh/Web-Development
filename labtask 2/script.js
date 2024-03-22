function loadAndShowStories() {
    $.ajax({
        url: "https://usmanlive.com/wp-json/api/stories",
        method: "GET",
        dataType: "json",
        success: (response) => {
            let storyContainer = $("#storyContainer");
            storyContainer.empty();
            
            $.each(response, (i, storyItem) => {
                storyContainer.append(
                    `<div class="story-item mb-3">
                        <h3>${storyItem.title}</h3>
                        <p>${storyItem.content}</p>
                        <div>
                            <button class="btn btn-primary btn-sm mr-2 edit-story" data-story-id="${storyItem.id}">Edit</button>
                            <button class="btn btn-warning btn-sm delete-story" data-story-id="${storyItem.id}">Delete</button>
                        </div>
                        <hr />
                    </div>`
                );
            });
        },
        error: (err) => {
            console.error("Could not load stories:", err);
        }
    });
}

function removeStory() {
    let id = $(this).data("story-id");
    $.ajax({
        url: `https://usmanlive.com/wp-json/api/stories/${id}`,
        method: "DELETE",
        success: () => loadAndShowStories(),
        error: (err) => console.error("Could not delete story:", err)
    });
}

function onSubmitStoryForm(e) {
    e.preventDefault();
    let id = $("#submitButton").data("story-id");
    let title = $("#storyTitle").val();
    let content = $("#storyContent").val();

    let ajaxOptions = {
        url: `https://usmanlive.com/wp-json/api/stories${id ? '/' + id : ''}`,
        method: id ? "PUT" : "POST",
        data: { title, content },
        success: () => loadAndShowStories(),
        error: (err) => console.error("Could not submit story:", err)
    };
    $.ajax(ajaxOptions);
}

function onEditStoryClick(e) {
    e.preventDefault();
    let id = $(this).data("story-id");
    $.ajax({
        url: `https://usmanlive.com/wp-json/api/stories/${id}`,
        method: "GET",
        success: (data) => {
            $("#cancelButton").show();
            $("#storyTitle").val(data.title);
            $("#storyContent").val(data.content);
            $("#submitButton").text("Update Story").data("story-id", data.id);
        },
        error: (err) => console.error("Could not fetch story for edit:", err)
    });
}

$(function () {
    loadAndShowStories();
    $(document).on("click", ".delete-story", removeStory);
    $(document).on("click", ".edit-story", onEditStoryClick);
    $("#storyForm").submit(onSubmitStoryForm);
    $("#cancelButton").click((e) => {
        e.preventDefault();
        $("#cancelButton").hide();
        $("#submitButton").removeData("story-id").text("Create Story");
        $("#storyTitle").val("");
        $("#storyContent").val("");
    });
});
