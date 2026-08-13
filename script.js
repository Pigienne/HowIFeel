(function () {
  var DOTS = 16;
  var METERS = ['care', 'ins', 'tri', 'pes', 'mia', 'tua', 'val', 'con', 'pau', 'sta'];
  var bars = {};

  METERS.forEach(function (key) {
    var el = document.getElementById('b_' + key);
    if (!el) return;
    for (var i = 0; i < DOTS; i++) {
      var d = document.createElement('span');
      d.className = 'dot';
      el.appendChild(d);
    }
    bars[key] = el;
  });

  function paint(key, value) {
    var el = bars[key];
    if (!el) return;
    var filled = Math.round(value / 100 * DOTS);
    for (var i = 0; i < DOTS; i++) {
      el.children[i].classList.toggle('on', i < filled);
    }
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = Math.round(value);
  }

  function clamp(x) {
    return Math.max(0, Math.min(100, x));
  }

  var s1 = document.getElementById('s1');
  var s2 = document.getElementById('s2');
  var s3 = document.getElementById('s3');
  var s4 = document.getElementById('s4');

  function update() {
    var yourFreedom = +s1.value;
    var myFreedom = +s4.value;
    var baseInsecurity = +s2.value;
    var talk = +s3.value;

    setText('v1', yourFreedom);
    setText('v4', myFreedom);
    setText('v2', baseInsecurity);
    setText('v3', talk);

    var insecurity = clamp(baseInsecurity * (1 - 0.5 * talk / 100));
    var pain = clamp(insecurity * (1 - 0.35 * talk / 100));
    var weight = clamp(0.45 * pain);
    var me = clamp(clamp(0.5 * myFreedom + 0.5 * (100 - pain)) * (yourFreedom / 100));
    var you = clamp(yourFreedom - 0.75 * weight);
    var together = Math.min(me, you);

    var shared = clamp(Math.sqrt(together * talk));
    var fear = pain;
    var limbo = clamp((1 - talk / 100) * (100 - together));

    paint('care', 100);
    paint('ins', insecurity);
    paint('tri', pain);
    paint('pes', weight);
    paint('mia', me);
    paint('tua', you);
    paint('val', together);
    paint('con', shared);
    paint('pau', fear);
    paint('sta', limbo);

    setText('n_ins', insecurity);
    setText('n_tri', pain);
    setText('n_pes', weight);
    setText('n_mia', me);
    setText('n_tua', you);
    setText('n_val', together);
    setText('n_con', shared);
    setText('n_pau', fear);
    setText('n_sta', limbo);
  }

  [s1, s2, s3, s4].forEach(function (input) {
    input.addEventListener('input', update);
  });

  var screens = ['landing', 'model', 'feedback'];

  function show(name) {
    screens.forEach(function (id) {
      document.getElementById(id).hidden = (id !== name);
    });
    window.scrollTo(0, 0);
    if (history.replaceState) history.replaceState(null, '', '#' + name);
  }

  var landing = document.getElementById('landing');
  landing.addEventListener('click', function () { show('model'); });
  landing.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show('model'); }
  });

  document.querySelectorAll('[data-go]').forEach(function (btn) {
    btn.addEventListener('click', function () { show(btn.dataset.go); });
  });

  var f1 = document.getElementById('f1');
  f1.addEventListener('input', function () { setText('fv1', f1.value); });

  var form = document.getElementById('fb-form');
  var err = document.getElementById('f-err');
  var note = document.getElementById('f-note');

  form.addEventListener('input', function () { err.hidden = true; });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var tags = [].slice.call(form.querySelectorAll('input[name="tag"]:checked')).map(function (i) { return i.value; });
    var rec = form.querySelector('input[name="rec"]:checked');
    var text = note.value.trim();

    if (!tags.length && !rec && !text) {
      err.hidden = false;
      return;
    }

    var body = [
      'Rating: ' + f1.value + '/100',
      'Tags: ' + (tags.join(', ') || 'none'),
      'Recommend: ' + (rec ? rec.value : 'no answer'),
      'Note: ' + (text || 'none')
    ].join('\n');

    window.location.href = 'mailto:pgn.mrc@gmail.com?subject=' +
      encodeURIComponent('Feedback for Marco') + '&body=' + encodeURIComponent(body);

    form.hidden = true;
    document.getElementById('fb-done').hidden = false;
  });

  var start = window.location.hash.replace('#', '');
  update();
  show(screens.indexOf(start) > -1 ? start : 'landing');
})();
