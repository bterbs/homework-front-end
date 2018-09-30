function getGifs(){
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/search?q=silicon+valley&api_key=M2YPfZZz3lcvmxGykVK0ezr9ovXmQXzp&limit=5",
    dataType: 'json'
  })
  .done(function(results) {
    console.log('here comes the gifs: ', results.data)
    const gifNodes = [];
    results.data.forEach(gif => {
      const gifUrl = gif.images.fixed_height.url
      gifNodes.push(
            $(`
              <div class="list-item">
              <img src=${gifUrl}>
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
