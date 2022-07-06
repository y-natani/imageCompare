// @ts-check
exports.makeFileName = (url) => {
  return url.replace('/index.html', '').replace(/\//g, '_') + '.png'
}

exports.delay = (time) =>  {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

exports.autoScroll = async (page) => {
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight - window.innerHeight){
                  clearInterval(timer);
                  resolve(true);
              }
          }, 10);
      });
  });
}
