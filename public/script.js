$('#scrape-now').on('click', () => {
    $.get('/scrape/all', (response) => {
        console.log(location.pathname);
        location.pathname === '/saved' ?
            location.reload() : location.replace(location.href + response);
    });
});

$('.delete-button').on('click', function () {
    console.log(this);
    console.log($(this).attr('data-id'));

    $.ajax({
        url:`${$(this).attr('data-id')}`,
        type: 'DELETE',
        success: (response) => {
            console.log(`Deleted ${$(this).attr('data-id')}`);

            console.log(location.pathname);
            location.pathname === '/saved' ?
                location.reload() : location.replace(location.href + response);
        }
    });
});

//initialize all modals
$('.modal').modal();
// trigger modals as needed
$('.modal-trigger').modal();

$('.create-note').on('click', function () {
    let thisArticle = $(this).attr('data-id');
    let newText = $(`#${thisArticle}-note-text`).val().trim();

    $.post(`/notes/${thisArticle}`,
        {
            body: newText
        })
        .done( () => location.reload() );
});

$('.delete-note').on('click', function () {
    console.log(this);
    console.log($(this).attr('data-id'));

    $.ajax({
        url:`/notes/${$(this).attr('data-id')}`,
        type: 'DELETE',
        success: (response) => {
            console.log(`Deleted ${$(this).attr('data-id')}`);

            console.log(location.pathname);
            location.pathname === '/saved' ?
                location.reload() : location.replace(location.href + response);
        }
    });
});