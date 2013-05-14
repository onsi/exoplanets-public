$(document).ready(function () {
    $.getJSON('/columns/counts', function(counts) {
      $('.count.exoplanets').html(counts['exoplanets']);
      $('.count.other').html(counts['other']);
      $('.count.total').html(counts['total']);
      $('.count.kepler').html(counts['kepler']);
      $('.count.total_with_kepler').html(counts['total_with_kepler']);
      $('.count.loading').removeClass('loading');
    });

    (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
    })();
});