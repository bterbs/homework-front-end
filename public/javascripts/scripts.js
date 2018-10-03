// DOCUMENT LOAD //
$(function(){
  console.log('Document ready!')
  getGifs(0);

  $('#button-search').on('click', () => {
    console.log('clicked the search button!')
    let formData = $('#search-input').val();
    searchGifs(formData);
  });

})

// FUNCTION TO RETRIEVE TRENDING GIFS //
function getGifs(offset){
  $.ajax({
    url: `http://api.giphy.com/v1/gifs/trending?api_key=M2YPfZZz3lcvmxGykVK0ezr9ovXmQXzp&offset=${offset}`,
    dataType: 'json'
  })
  .done(function(results) {
    console.log('here comes the gifs: ', results.data)
    const gifNodes = [];
    results.data.forEach(gif => {
      const gifUrl = gif.images.fixed_height.url;
      const gifSource = gif.url;
      const gifId= gif.id;
      const gifUser = gif.username;
      const gifRating = gif.rating;
      gifNodes.push(
            $(`
              <div class="desktop-third tablet-half">
                <div class="list-item" style="background: url(${gifUrl}); background-size: cover;" class="desktop-third tablet-half mobile-full">
                  <div class="d-none gif-info">
                    <p>Gif ID: ${gifId} </p>
                    <p>Rating: ${gifRating} </p>
                    <p>Link: ${gifSource} </p>
                    <p>Uploaded By: ${gifUser} </p>
                  </div>
                </div>
              </div>`)
          );
        });
      // Add eventHandlers for dynamically added elements //
        gifNodes.forEach(node => {
          $('.section-gif-display').append(node);
          $(node).on('click', () => {
            console.log('clicked a div!')
            var $thisdNone = $( event.target ).find('.d-none');
            var $thisGifInfo = $( event.target ).find('.gif-info')

            if ( $($thisdNone).css('visibility') == 'hidden' ) {
              $($thisdNone).css('visibility','visible');
            } else {
              $('.d-none').css('visibility','hidden');
            }

            if ( $($thisGifInfo).css('background') == 'rgb(0, 170, 231, .8)') {
              $($thisGifInfo).css('background', 'rgb(0, 170, 231, 0)')
            } else {
              $($thisGifInfo).css('background', 'rgb(0, 170, 231, .8)')
            }
          })
        });

  })
}

// FUNCTION TO EXECUTE SEARCH //
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
      const gifSource = gif.url;
      const gifId= gif.id;
      const gifUser = gif.username;
      const gifRating = gif.rating;
      gifNodes.push(
            $(`
              <div class="desktop-third tablet-half">
                <div class="list-item" style="background: url(${gifUrl}); background-size: cover;" class="desktop-third tablet-half mobile-full">
                  <div class="d-none gif-info">
                    <p>Gif ID: ${gifId} </p>
                    <p>Rating: ${gifRating} </p>
                    <p>Link: ${gifSource} </p>
                    <p>Uploaded By: ${gifUser} </p>
                  </div>
                </div>
              </div>`)
          );
        });

        $('.section-gif-display').empty();

      // Add eventHandlers for dynamically added elements //
        gifNodes.forEach(node => {
          $('.section-gif-display').append(node);
          $('.section-gif-display').append(node);
          $(node).on('click', () => {
            console.log('clicked a div!')
            var $thisdNone = $( event.target ).find('.d-none');
            var $thisGifInfo = $( event.target ).find('.gif-info')

            if ( $($thisdNone).css('visibility') == 'hidden' ) {
              $($thisdNone).css('visibility','visible');
            } else {
              $('.d-none').css('visibility','hidden');
            }

            if ( $($thisGifInfo).css('background') == 'rgb(0, 170, 231, .8)') {
              $($thisGifInfo).css('background', 'rgb(0, 170, 231, 0)')
            } else {
              $($thisGifInfo).css('background', 'rgb(0, 170, 231, .8)')
            }
          })
        });
  })
}

// When the user scrolls the page to the bottom, load new trending GIFs automatically. //
var counter = 0
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document).height()) {
      counter += 1;
      getGifs((25*counter))
      console.log('counter equals', counter)
    }
});

module.exports = {
  getGifs,
  searchGifs
}
