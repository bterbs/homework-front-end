// DOCUMENT LOAD //
$(function(){
  console.log('Document ready - scripts are firing!')
  getGifs();

  $('#button-search').on('click', () => {
    console.log('clicked the search button!')
    let formData = $('#search-input').val();
    searchGifs(formData);
  });
})

// FUNCTION TO RETRIEVE GIFS //
function getGifs(){
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/trending?api_key=M2YPfZZz3lcvmxGykVK0ezr9ovXmQXzp",
    dataType: 'json'
  })
  .done(function(results) {
    console.log('here comes the gifs: ', results.data)
    const gifNodes = [];
    results.data.forEach(gif => {
      const gifUrl = gif.images.fixed_height.url
      gifNodes.push(
            $(`
              <div class="desktop-third tablet-half">
                <div class="list-item">
                  <img src=${gifUrl} class="desktop-third tablet-half mobile-full">
                </div>
              </div>`)
          );
        });

        gifNodes.forEach(node => {
          $('.section-gif-display').append(node);
        });
  })
}

// When the user scrolls the page to the bottom, load new GIFs automatically. //
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document).height()) {
      console.log('Getting more gifs!');
      getGifs()
    }
});

// SEARCH FUNCTIONALITY //
function searchGifs(formTerm) {
  console.log('search term is', formTerm)
  $.ajax({
    url: `http://api.giphy.com/v1/gifs/search?q=${formTerm}&api_key=M2YPfZZz3lcvmxGykVK0ezr9ovXmQXzp&limit=25`,
    dataType: 'json'
  })
  .done(function(results) {
    const gifNodes = [];
    results.data.forEach(gif => {
      const gifUrl = gif.images.fixed_height.url
      gifNodes.push(
            $(`
              <div class="desktop-third tablet-half">
                <div class="list-item">
                  <img src=${gifUrl} class="desktop-third tablet-half mobile-full">
                </div>
              </div>`)
          );
        });

        $('.section-gif-display').empty();

        gifNodes.forEach(node => {
          $('.section-gif-display').append(node);
        });
  })
}
