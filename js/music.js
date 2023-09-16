let spanIdArray = ['Empty_Streets', 
                   'PDNLTT', 
                   'Synechdoche',
                   'Singles'];

let spotifyArray = [`<iframe src="https://open.spotify.com/embed/album/7pLvJgMVgTYf8HfPJ54tyx" width="100%" height="350" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
                    `<iframe src="https://open.spotify.com/embed/album/5EDd5d9SjUMK9cjgJIfQFl" width="100%" height="350" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
                    `<iframe src="https://open.spotify.com/embed/album/4jWT0wYGCOgDPVfb6God5y" width="100%" height="390" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
                    `<iframe src="https://open.spotify.com/embed/playlist/4mkWlQgBllCbi5YcKqtxvQ" width="100%" height="350" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`]

let youtubeArray = [`<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=OLAK5uy_kreCELrYHqiCWjataY-uLHArtqg4egF6o" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                    `<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=OLAK5uy_kZKtLU8311GVIn-5JynU4u-W6mlEAM1Ig" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                    `<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=OLAK5uy_nMXMX_lw8aFn8bIseLYJ5OotBhwocZ-WE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                    `<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLqVnWGUogm7y2YIy3VNARK3dixgWmpFJZ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`]

let soundcloudArray = [`<iframe width="100%" height="350" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1122669649&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`,
                       `<iframe width="100%" height="350" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/819426393&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`,
                       `<iframe width="100%" height="350" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/240774079&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`,
                       `<iframe width="100%" height="350" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1222343680&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>`]

let bandcampArray = [`<iframe style="border: 0; width: 100%; height: 100%;" src="https://bandcamp.com/EmbeddedPlayer/album=1277133147/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/transparent=true/" seamless><a href="https://sqrtofneg1.bandcamp.com/album/empty-streets">Empty Streets by Sqrtofneg1</a></iframe>`,
                     `<iframe style="border: 0; width: 100%; height: 100%;" src="https://bandcamp.com/EmbeddedPlayer/album=1048516245/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/transparent=true/" seamless><a href="https://sqrtofneg1.bandcamp.com/album/please-do-not-listen-to-this">Please Do Not Listen To This by Sqrtofneg1</a></iframe>`,
                     `<iframe style="border: 0; width: 100%; height: 100%;" src="https://bandcamp.com/EmbeddedPlayer/album=3403142029/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/transparent=true/" seamless><a href="https://sqrtofneg1.bandcamp.com/album/synecdoche">Synecdoche by Sqrtofneg1</a></iframe>`,
                     `<p>Latest Single:</p><iframe style="border: 0; width: 350px; height: 442px;" src="https://bandcamp.com/EmbeddedPlayer/track=3187478864/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/transparent=true/" seamless><a href="https://sqrtofneg1.bandcamp.com/track/did-you-lie">Did You Lie by Sqrtofneg1</a></iframe>`]

$(document).ready(function () {
  $(".btn-primary").click(function() {
    if (spanIdArray.length == spotifyArray.length){
      for (x = 0; x < spanIdArray.length; x++){
        $("#" + spanIdArray[x]).html(spotifyArray[x]);
      };
    };
    $(".btn-secondary").removeClass("active");
    $(".btn-secondary").prop("checked", false);
    $(".btn-info").removeClass("active");
    $(".btn-info").prop("checked", false);
    $(".btn-warning").removeClass("active");
    $(".btn-warning").prop("checked", false);
  });

  $(".btn-secondary").click(function() {
    if (spanIdArray.length == youtubeArray.length){
      for (x = 0; x < spanIdArray.length; x++){
        $("#" + spanIdArray[x]).html(youtubeArray[x]);
      };
    };
    $(".btn-primary").removeClass("active");
    $(".btn-primary").prop("checked", false);
    $(".btn-info").removeClass("active");
    $(".btn-info").prop("checked", false);
    $(".btn-warning").removeClass("active");
    $(".btn-warning").prop("checked", false);
  });

  $(".btn-info").click(function() {
    if (spanIdArray.length == soundcloudArray.length){
      for (x = 0; x < spanIdArray.length; x++){
        $("#" + spanIdArray[x]).html(soundcloudArray[x]);
      };
    };
    $(".btn-primary").removeClass("active");
    $(".btn-primary").prop("checked", false);
    $(".btn-secondary").removeClass("active");
    $(".btn-secondary").prop("checked", false);
    $(".btn-warning").removeClass("active");
    $(".btn-warning").prop("checked", false);
  });

  $(".btn-warning").click(function() {
    if (spanIdArray.length == bandcampArray.length){
      for (x = 0; x < spanIdArray.length; x++){
        $("#" + spanIdArray[x]).html(bandcampArray[x]);
      };
    };
    $(".btn-primary").removeClass("active");
    $(".btn-primary").prop("checked", false);
    $(".btn-secondary").removeClass("active");
    $(".btn-secondary").prop("checked", false);
    $(".btn-info").removeClass("active");
    $(".btn-info").prop("checked", false);
  });
});