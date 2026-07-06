(function(){
  "use strict";

  var CARDS = [];
  var BY_CODE = {};
  var app = document.getElementById("app");

  var SUIT_TITLES = {
    wands: "Wands", cups: "Cups", swords: "Swords", pentacles: "Pentacles"
  };

  var MAJOR_ASTRO = {
    0:"Uranus", 1:"Mercury", 2:"Moon", 3:"Venus",
    4:"Aries", 5:"Taurus", 6:"Gemini", 7:"Cancer",
    8:"Leo", 9:"Virgo", 10:"Jupiter", 11:"Libra",
    12:"Neptune", 13:"Scorpio", 14:"Sagittarius", 15:"Capricorn",
    16:"Mars", 17:"Aquarius", 18:"Pisces", 19:"Sun",
    20:"Pluto", 21:"Saturn"
  };

  var SUIT_ASTRO = {
    wands:"Fire — Aries, Leo, Sagittarius",
    cups:"Water — Cancer, Scorpio, Pisces",
    swords:"Air — Gemini, Libra, Aquarius",
    pentacles:"Earth — Taurus, Virgo, Capricorn"
  };

  var IOW = {
    // Major Arcana
    "ar00": "Leave your troubles at the door, only \"why not\" energy in here! More foolish fools have made it this far. You can do it. Do you have a plan? No. Is childlike wonder a good substitute? Let\u2019s see! At least your dog is trying to help.",
    "ar01": "You can do all things because you have all the tools! It\u2019s giving stocked up! Check my table, I have a sword, a wand, a cup, and a huge coin the size of a plate! Infinity brain!",
    "ar02": "Pause, get mysterious. Just because you have all the tools doesn\u2019t mean you have to go wand city! Chill and get spooky! (The pillars are these two gems that represent mystery and light, so it\u2019s, as always, about balance.)",
    "ar03": "Oh, you wanted divine feminine? You wanted fertility in all facets? You wanted a nurturing Earth mother?!",
    "ar04": "Authority, structure, appearing in 4\u2019s, very square which is heavy on the stability. Divine masculine! It exists!",
    "ar05": "It\u2019s sort of tradition, it\u2019s sort of established systems of belief\u2026 heavy on the marriage references. Are we rejecting tradition, are we making our own, are we embracing her? You get it.",
    "ar06": "I mean yes, lovers, but also giving deep connection in general, lowercase L love. Alignment more than ooh la la, but if it\u2019s giving ooh la la, ooh your la then!",
    "ar07": "Go, go, go! Vamos! We\u2019re heading out. It\u2019s time for our journey to begin now that we have all of our little selves set up. Imagine our little Inside Out style chariot is full and now we\u2019re zooming.",
    "ar08": "Peace through strength though. Look at her, she\u2019s not whipping that lion into shape, she\u2019s giving calm, assertive energy!",
    "ar09": "This one sort of speaks for itself. Not needing to be like weird intel hermit though, sometimes we need to sit and reflect, be introspective, cultivate that inner wisdom.",
    "ar10": "Babe, the possibility is literal endless. You can spin the wheel and land on anything. Even the Angel Gabriel, who I\u2019m pretty sure is that bust.",
    "ar11": "Actions have consequences, sweetie. Rules are enforced, my love. Ethics exist and are meant to be debated and challenged, miss girl. With liberty and justice for all.",
    "ar12": "Be patient, even if it means you\u2019re hanging upside down. I like flipping him upside down and seeing his hair all tall.",
    "ar13": "We knowwwww, we knowwww!",
    "ar14": "Chill out, girl scout.",
    "ar15": "Notice the chains are loose. You can take those off whenever you want, FYI. The devil isn\u2019t in control, YOU ARE!",
    "ar16": "Uh oh, it\u2019s all ending.",
    "ar17": "Born again from that sweet little water (right after the Tower, for what it\u2019s worth). Limitless potential, serenity, life, breath, yummy.",
    "ar18": "Spooky!!!",
    "ar19": "It\u2019s a new dawn, it\u2019s a new day, it\u2019s a new, wonderful, vibrant life for me. And my little sister is riding that horse.",
    "ar20": "We\u2019re all gonna face it!",
    "ar21": "You like being complete?! And with love and light to spare! It\u2019s the end of the journey! Time to be a Fool again!",
    // Cups
    "cuac": "New emotional connection, new love, new heart, new journey with those little tear ducts, new new new sweet sweet sweet.",
    "cu02": "We\u2019re connecting, we\u2019re low key flirting, it\u2019s sweet.",
    "cu03": "The friends are out, community is everything! So sweet how we love our friends, truly, wow.",
    "cu04": "Missed opportunity, which I get, but why are you being sad? You\u2019re good! Pick up a cup and let\u2019s rock!",
    "cu05": "See why would you look at those cups that are tipped over when you could look at the ones that are perfectly sat right up?",
    "cu06": "Nostalgia! Remember playing in the yard? Like\u2026 we used to do that!",
    "cu07": "Imagine! Get weird! Which cup do you want? Health? Jewels? Weird little head?",
    "cu08": "Time to walk away from those cups that aren\u2019t serving you, sis.",
    "cu09": "Look at how fulfilled and contented he looks!",
    "cu10": "You have a family, a dog, happiness, you are emotionally full and living in domestic bliss.",
    "cupa": "You\u2019re so imaginative and creatively expressing your emotions that there\u2019s a fish in your cup.",
    "cukn": "Knight in shining armor much?",
    "cuqu": "High EQ! High intuition! High compassion!",
    "cuki": "Mostly like compassionate leadership, balance in your emotions, restraint (lol)",
    // Pentacles
    "peac": "New financial journey, material manifestation station.",
    "pe02": "He\u2019s juggling his coins, that\u2019s how balanced he is and feeling good about the future in terms of being grounded and set, good for that little elf.",
    "pe03": "Teamwork makes the dream work.",
    "pe04": "Steady Freddy with the wallet.",
    "pe05": "You were left out in the cold, but it\u2019s probably worth knocking on the door, there are people who can help in there maybe!",
    "pe06": "Oh, wow, remember when you were a five of pentacles and you felt left out? Well now there are generous sweeties giving you what you need.",
    "pe07": "Patience, my son. That coin bush is going to grow in time.",
    "pe08": "If you want to build a little coin house, you have to put in the work!",
    "pe09": "Okay! You made it! You retired! Pick the money tree!",
    "pe10": "Generational wealth but the good kind cuz it\u2019s tarot!",
    "pepa": "Little boy, go back to school!",
    "pekn": "The slowest knight! Because he knows he has to be methodical\u2026",
    "pequ": "Abundance of spirit and energy! Earth mother touches grass!",
    "peki": "It\u2019s giving ultimate success because yes these cards are patriarchal and a boy made this website.",
    // Swords
    "swac": "Mental breakthrough! You did it!",
    "sw02": "Trust your gut. Wear a blindfold! Ride a cowboy!",
    "sw03": "Heartbreak(er)!",
    "sw04": "Rest up, the swords are protecting you\u2026 It\u2019s not 8 of swords yet.",
    "sw05": "Are we fighting?",
    "sw06": "Let\u2019s heal. Get on the boat, let the water hit the floor, you\u2019re going to be ok",
    "sw07": "Stealthy, stealing those ideas, but maybe escaping a bad situation? idk.",
    "sw08": "You are a prisoner to your thoughts. You don\u2019t want to see nine and ten unless you turn this around. Thoughts can be scary!",
    "sw09": "Oyyy, there\u2019s a sword in your brain.",
    "sw10": "Rock bottom. These thoughts are killing you. Unstick those swords before bedtime.",
    "swpa": "Stay curious! We stop investigating when we\u2019re 30. Don\u2019t let that be you!",
    "swkn": "Raw intellect, quick wits, can\u2019t lose.",
    "swqu": "Intellect, sharp communication, all the things women be giving but wanting from men.",
    "swki": "You can\u2019t HANDLE the truth!",
    // Wands
    "waac": "Burst of raw, creative energy. Very start of a creative journey, it\u2019s an ace, and it\u2019s a big old stick. Go!",
    "wa02": "Bold choices, let\u2019s plan the vacation. I\u2019m looking out on this water and I think I want to DO! So, do!",
    "wa03": "It\u2019s time to explore the new horizons. Let\u2019s get on this boat and take some action, set some sail, do some yo-ho, yo-ho!",
    "wa04": "Homecoming! You did your journey, and remember you\u2019re going to have that stable, 4 on the floor energy in your community!",
    "wa05": "The girls are fighting. Conflict isn\u2019t bad but it\u2019s happening, within, without, with.",
    "wa06": "Don\u2019t rain on my parade because I\u2019m that girl. Success! I did it! That\u2019s why I\u2019m riding a little horse!",
    "wa07": "I\u2019m defending my boundaries. Do not come into my little cage of wands. It\u2019s seriously not okay and I\u2019m enforcing that.",
    "wa08": "We\u2019re going up, up, up it\u2019s our moment! Rushing, surging, bam bam bam!",
    "wa09": "Last star standing, you\u2019ve done a lot of action and wanding, it\u2019s time to wand down a little\u2026",
    "wa10": "You\u2019re doing too much. Put those wands down, pick up a cup, you\u2019re neglecting yourself.",
    "wapa": "Fearless! You\u2019re young and acting on impulse! Enjoy!",
    "wakn": "It\u2019s the boldest you can be. Charging Knight, plus Wand suit which is fire, action, go go go?! You\u2019re giving forward motion.",
    "waqu": "Charisma, Uniqueness, Nerve and Talent. Google THAT!",
    "waki": "Passionate, protective, career, it\u2019s the divine masculine but for that fire stuff."
  };

  function astroLabel(card){
    return card.arcana === "major" ? MAJOR_ASTRO[card.num] || "" : SUIT_ASTRO[card.suit] || "";
  }

  function filePath(filename, width){
    var base = "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(filename);
    return width ? base + "?width=" + width : base;
  }

  function withFallback(imgEl, card){
    imgEl.addEventListener("error", function(){
      var frame = imgEl.closest(".card-tile-frame, .feature-frame, .plate-frame, .modal-frame, .pull-card-frame");
      if(!frame) return;
      imgEl.remove();
      frame.classList.add("no-image");
      frame.style.aspectRatio = "5/8";
      frame.style.display = "flex";
      frame.style.alignItems = "center";
      frame.style.justifyContent = "center";
      frame.style.textAlign = "center";
      frame.style.fontFamily = "var(--serif)";
      frame.style.color = "var(--text-dim)";
      frame.style.fontSize = "14px";
      frame.style.padding = "18px";
      frame.textContent = card.name;
    }, { once:true });
  }

  // ---------- deterministic card of the day ----------
  function dayIndex(){
    var d = new Date();
    var key = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
    var h = 0;
    for(var i=0;i<key.length;i++){ h = (h*31 + key.charCodeAt(i)) >>> 0; }
    return h % CARDS.length;
  }

  // ---------- rendering: home ----------
  function renderHome(){
    document.querySelector(".site-head").style.display = "none";
    var el = document.createElement("div");
    el.className = "home-hero";
    el.innerHTML =
      '<h1 class="home-hero-title">Allie Learns Tarot<br>with Her Big, Smart Brain</h1>' +
      '<p class="home-hero-sub">Easier than the LSAT, Just as Fun</p>' +
      '<div class="home-buttons">' +
        '<a class="btn btn-lg" href="#/directory">Full Card List</a>' +
        '<button class="btn btn-lg" id="btn-random">Pull a Random Card</button>' +
        '<a class="btn btn-lg btn-dim" href="#/pull">Want to do a full pull?</a>' +
      '</div>';
    app.innerHTML = "";
    app.appendChild(el);
    document.getElementById("btn-random").addEventListener("click", function(){
      showCardModal(CARDS[Math.floor(Math.random() * CARDS.length)]);
    });
  }

  function todayLabel(){
    return new Date().toLocaleDateString(undefined, { weekday:"long", month:"long", day:"numeric" });
  }

  function catalogTag(card){
    return card.arcana === "major" ? "Major " + card.rankLabel : "Minor · " + card.rankLabel;
  }
  function subLabel(card){
    return card.arcana === "major"
      ? "Major Arcana, " + card.rankLabel + " of 21"
      : card.rankLabel + " of " + SUIT_TITLES[card.suit];
  }
  function firstSentences(text, n){
    var parts = text.split(/(?<=[.!?])\s+/).slice(0, n);
    return parts.join(" ");
  }

  // ---------- rendering: directory ----------
  function renderDirectory(){
    var majors = CARDS.filter(function(c){ return c.arcana === "major"; });
    var suits = ["wands","cups","swords","pentacles"];

    var html = '<p class="eyebrow">The full deck</p>';
    html += section("Major Arcana", "22 cards", majors);
    suits.forEach(function(s){
      var group = CARDS.filter(function(c){ return c.suit === s; });
      html += section(SUIT_TITLES[s], "14 cards", group);
    });

    app.innerHTML = '<div class="arcana-wrap">' + html + '</div>';
    CARDS.forEach(function(card){
      var img = app.querySelector('img[data-code="'+card.code+'"]');
      if(img) withFallback(img, card);
    });
  }

  function section(title, count, cards){
    var tiles = cards.map(function(c){
      return '<a class="card-tile" href="#/card/' + c.code + '">' +
        '<div class="card-tile-frame">' +
          '<span class="card-tile-num">' + c.rankLabel + '</span>' +
          '<img data-code="' + c.code + '" src="' + filePath(c.img, 220) + '" alt="' + c.name + '">' +
        '</div>' +
        '<div class="card-tile-label">' + c.name + '</div>' +
      '</a>';
    }).join("");
    return '<section class="arcana-section">' +
      '<div class="arcana-head"><h2>' + title + '</h2><span class="arcana-count">' + count + '</span></div>' +
      '<div class="card-grid">' + tiles + '</div>' +
    '</section>';
  }

  // ---------- rendering: card detail ----------
  function renderCard(code){
    var card = BY_CODE[code];
    if(!card){ renderNotFound(); return; }

    var siblings = card.arcana === "major"
      ? CARDS.filter(function(c){return c.arcana==="major";})
      : CARDS.filter(function(c){return c.suit===card.suit;});
    var idx = siblings.findIndex(function(c){return c.code===card.code;});
    var prev = siblings[(idx - 1 + siblings.length) % siblings.length];
    var next = siblings[(idx + 1) % siblings.length];

    var el = document.createElement("div");
    el.innerHTML =
      '<a class="back-link" href="#/directory">&larr; back to directory</a>' +
      '<div class="plate-head">' +
        '<div class="plate-frame">' +
          '<img src="' + filePath(card.img, 480) + '" alt="' + card.name + '">' +
        '</div>' +
        '<div class="plate-copy">' +
          '<p class="plate-catalog">' + subLabel(card) + '</p>' +
          '<h1 class="plate-title">' + card.name + '</h1>' +
          '<div class="meaning-pair">' +
            '<div><h3>Upright</h3><p>' + card.up + '</p></div>' +
            '<div><h3>Reversed</h3><p>' + card.rev + '</p></div>' +
          '</div>' +
          '<div class="astro-row">' +
            '<h3>Astrological Sign</h3>' +
            '<p>' + astroLabel(card) + '</p>' +
          '</div>' +
          '<h3 class="in-other-words-head">In Other Words</h3>' +
          '<p class="plate-desc">' + (IOW[card.code] || card.desc) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="other-renderings" id="renderings">' +
        '<h3>Other renderings of this card</h3>' +
        '<div class="rendering-strip" id="rendering-strip"><p class="home-note">Looking for other decks&rsquo; takes on this plate&hellip;</p></div>' +
      '</div>' +
      '<div class="deck-nav">' +
        '<a href="#/card/' + prev.code + '">&larr; ' + prev.name + '</a>' +
        '<a href="#/card/' + next.code + '">' + next.name + ' &rarr;</a>' +
      '</div>';
    app.innerHTML = "";
    app.appendChild(el);
    withFallback(el.querySelector(".plate-frame img"), card);
    loadOtherRenderings(card);
  }

  function renderNotFound(){
    app.innerHTML = '<p class="eyebrow">Not found</p><p>That card doesn&rsquo;t exist. <a class="btn" href="#/directory">Back to the directory</a></p>';
  }

  // best-effort: pull a few alternate depictions of this card from Wikimedia Commons
  function loadOtherRenderings(card){
    var strip = document.getElementById("rendering-strip");
    var query = card.name + " tarot card";
    var url = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch="
      + encodeURIComponent(query) + "&gsrlimit=8&gsrnamespace=6&prop=imageinfo&iiprop=url|extmetadata"
      + "&iiurlwidth=340&format=json&origin=*";

    fetch(url).then(function(r){ return r.json(); }).then(function(data){
      if(!data.query || !data.query.pages){ strip.innerHTML = ""; return; }
      var pages = Object.values(data.query.pages);
      var seen = {};
      var items = [];
      pages.forEach(function(p){
        var info = p.imageinfo && p.imageinfo[0];
        if(!info || !info.thumburl) return;
        if(info.thumburl === filePath(card.img, 340)) return;
        if(p.title === "File:" + card.img) return;
        var mime = info.mime || "";
        if(mime.indexOf("image/") !== 0) return;
        if(seen[p.title]) return;
        seen[p.title] = true;
        items.push({ title: p.title.replace(/^File:/, ""), thumb: info.thumburl });
      });
      items = items.slice(0, 4);
      if(items.length === 0){ strip.parentElement.style.display = "none"; return; }
      strip.innerHTML = items.map(function(it){
        return '<figure><img src="' + it.thumb + '" alt="' + it.title + '" loading="lazy">' +
          '<figcaption>' + it.title + '</figcaption></figure>';
      }).join("");
    }).catch(function(){
      strip.parentElement.style.display = "none";
    });
  }

  // ---------- modal ----------
  function showCardModal(card){
    var overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML =
      '<div class="modal-box">' +
        '<button class="modal-close" aria-label="Close">&times;</button>' +
        '<div class="modal-inner">' +
          '<div class="modal-frame">' +
            '<img src="' + filePath(card.img, 340) + '" alt="' + card.name + '">' +
          '</div>' +
          '<div class="modal-body">' +
            '<p class="plate-catalog">' + subLabel(card) + '</p>' +
            '<h2 class="modal-title">' + card.name + '</h2>' +
            '<div class="meaning-pair">' +
              '<div><h3>Upright</h3><p>' + card.up + '</p></div>' +
              '<div><h3>Reversed</h3><p>' + card.rev + '</p></div>' +
            '</div>' +
            '<div class="astro-row">' +
              '<h3>Astrological Sign</h3>' +
              '<p>' + astroLabel(card) + '</p>' +
            '</div>' +
            '<h3 class="in-other-words-head">In Other Words</h3>' +
            '<p class="plate-desc">' + (IOW[card.code] || card.desc) + '</p>' +
            '<div class="modal-actions">' +
              '<a class="btn" href="#/card/' + card.code + '">Visit Card Page &rarr;</a>' +
              '<button class="btn btn-dim modal-dismiss">Close</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    withFallback(overlay.querySelector(".modal-frame img"), card);

    function close(){ overlay.remove(); }
    overlay.addEventListener("click", function(e){ if(e.target === overlay) close(); });
    overlay.querySelector(".modal-close").addEventListener("click", close);
    overlay.querySelector(".modal-dismiss").addEventListener("click", close);
    overlay.querySelector(".modal-actions a").addEventListener("click", close);

    document.addEventListener("keydown", function onKey(e){
      if(e.key === "Escape"){ close(); document.removeEventListener("keydown", onKey); }
    });
  }

  // ---------- rendering: pull page ----------
  function renderPull(){
    var drawnCodes = {};
    var el = document.createElement("div");
    el.className = "pull-page";
    el.innerHTML =
      '<h1 class="pull-title"><span class="pull-prompt">&gt;&nbsp;</span>Digital Tarot Pull<span class="pull-cursor">_</span></h1>' +
      '<div class="pull-controls">' +
        '<button class="add-card-btn" id="add-card-btn">' +
          '<span class="add-icon">+</span>Add Card' +
        '</button>' +
        '<span class="pull-count" id="pull-count"></span>' +
      '</div>' +
      '<div class="pull-grid" id="pull-grid"></div>';
    app.innerHTML = "";
    app.appendChild(el);

    document.getElementById("add-card-btn").addEventListener("click", function(){
      var available = CARDS.filter(function(c){ return !drawnCodes[c.code]; });
      if(!available.length){
        document.getElementById("pull-count").textContent = "— full deck drawn";
        return;
      }
      var card = available[Math.floor(Math.random() * available.length)];
      drawnCodes[card.code] = true;
      var drawn = Object.keys(drawnCodes).length;
      document.getElementById("pull-count").textContent = drawn + " of 78 drawn";
      addPullCard(card, document.getElementById("pull-grid"));
    });
  }

  function addPullCard(card, grid){
    var tile = document.createElement("button");
    tile.className = "pull-card";
    tile.setAttribute("aria-label", card.name);
    tile.innerHTML =
      '<div class="pull-card-frame">' +
        '<img src="' + filePath(card.img, 220) + '" alt="' + card.name + '">' +
      '</div>' +
      '<div class="pull-card-label">' + card.name + '</div>';
    tile.addEventListener("click", function(){ showCardModal(card); });
    grid.appendChild(tile);
    withFallback(tile.querySelector(".pull-card-frame img"), card);
    // brief entrance animation
    tile.style.opacity = "0";
    tile.style.transform = "translateY(10px)";
    requestAnimationFrame(function(){
      tile.style.transition = "opacity .3s, transform .3s";
      tile.style.opacity = "1";
      tile.style.transform = "translateY(0)";
    });
  }

  // ---------- router ----------
  function route(){
    // dismiss any open modal when navigating
    document.querySelectorAll(".modal-overlay").forEach(function(m){ m.remove(); });
    document.querySelector(".site-head").style.display = "";

    var hash = location.hash || "#/";
    var navLinks = document.querySelectorAll(".site-nav a");
    navLinks.forEach(function(a){ a.classList.remove("active"); });

    if(hash === "#/" || hash === ""){
      renderHome();
      var t = document.querySelector('[data-route="home"]'); if(t) t.classList.add("active");
    } else if(hash === "#/directory"){
      renderDirectory();
      var t2 = document.querySelector('[data-route="directory"]'); if(t2) t2.classList.add("active");
    } else if(hash === "#/pull"){
      renderPull();
    } else if(hash.indexOf("#/card/") === 0){
      renderCard(hash.replace("#/card/", ""));
    } else {
      renderNotFound();
    }
    window.scrollTo(0,0);
  }

  // ---------- boot ----------
  fetch("cards.json").then(function(r){ return r.json(); }).then(function(data){
    CARDS = data;
    CARDS.forEach(function(c){ BY_CODE[c.code] = c; });
    window.addEventListener("hashchange", route);
    route();
  }).catch(function(err){
    app.innerHTML = '<p class="eyebrow">Could not load the deck</p><p>' + err + '</p>';
  });

})();
