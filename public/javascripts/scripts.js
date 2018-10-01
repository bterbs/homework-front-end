function getGifs(){
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/search?q=silicon+valley&api_key=M2YPfZZz3lcvmxGykVK0ezr9ovXmQXzp&limit=25",
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
                  <img src=${gifUrl} class="desktop-third mobile-full">
                </div>
              </div>`)
          );
        });

        gifNodes.forEach(node => {
          $('.section-gif-display').append(node);
        });
  })
}

$(function(){
  console.log('Document ready - scripts are firing!')
  getGifs();
})

// When the user scrolls the page to the bottom, load new GIFs automatically. //
$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
      console.log('Getting more gifs!');
      getGifs()
    }
});
