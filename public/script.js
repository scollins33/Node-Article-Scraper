$('#scrape-now').on('click', () => {
    $.get('/scrape/all', (response) => {
        console.log(response);

        produceArticles();
    });
});

function produceArticles() {
    $.get('/retrieve', (data, status) => {

    });
}