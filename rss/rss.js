let feed = require('rss-to-json')

feed.load('https://www.devotaku.com/podcast?format=RSS', function(err, rss){
    for(item of rss.items){
        console.log(item.title)
    }
})