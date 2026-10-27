// Programs, shared layout and helpers. Each page sets <body data-base="./"> or "../".
var BASE = document.body ? document.body.dataset.base : './';

var COACH = {
  name: 'Jordan Vale',
  title: 'Strength & Conditioning Coach',
  city: 'Brooklyn, NY',
  email: 'hello@example.com',
  phone: '+1-555-010-2040'
};

// All programs are monthly subscriptions; annual billing = 10x monthly (2 months free).
var PROGRAMS = [
  {
    id: 'app', name: 'Training App', unit: 'per month', price: 39,
    tag: 'Self-guided', short: 'My programs in the app, with demo videos and auto-progression.',
    details: 'Get the same strength blocks my clients run, delivered in the app. Every movement has a demo video and the weights progress automatically from your logs.',
    includes: ['New 4-week block every month', 'Video demos for every exercise', 'Auto-progressing weights', 'Cancel anytime'],
    best: 'Experienced gym-goers who just want a smart plan to follow.'
  },
  {
    id: 'online', name: 'Online Coaching', unit: 'per month', price: 149,
    tag: 'Train anywhere', short: 'A program built for you, adjusted weekly from your logs and videos.',
    details: 'Your plan lives in the app with demo videos for every movement. Log your sessions, send form videos, and I adjust the next week based on how you actually trained.',
    includes: ['Personalized 4-week blocks', 'Form video reviews', 'Nutrition targets & habits', 'Message support on weekdays'],
    best: 'Self-motivated people who travel or train at their own gym.'
  },
  {
    id: 'small-group', name: 'Small Group Strength', unit: 'per month', price: 199,
    tag: 'Max 6 people', short: 'Unlimited coached barbell and conditioning classes with a crew that shows up.',
    details: 'Groups of up to six, three times a week. Every class has a strength block and a conditioning finisher, scaled for each person in the room.',
    includes: ['Unlimited classes', 'Individual weight targets', 'Monthly strength testing', 'Members-only community chat'],
    best: 'People who like company and accountability without the 1:1 price.'
  },
  {
    id: 'one-on-one', name: '1:1 Personal Training', unit: 'per month', price: 560,
    tag: 'Most popular', short: 'Eight in-person sessions a month, built around your body and goals.',
    details: 'Two 60-minute sessions a week at the studio or your building gym. We start with a movement screen and strength baseline, then progress your program every week.',
    includes: ['8 sessions per month', 'Movement & posture assessment', 'Custom training plan', 'Weekly check-ins between sessions'],
    best: 'Beginners, lifters returning from injury, anyone who wants hands-on coaching.'
  }
];

function findProgram(id) { return PROGRAMS.filter(function (p) { return p.id === id; })[0]; }
function money(n) { return '$' + n.toFixed(0); }

function planPrice(p, billing) { return billing === 'annual' ? p.price * 10 : p.price; }

// Pixel payload for one plan. billing: 'monthly' (default) or 'annual'.
function pixelContents(p, billing) {
  var price = planPrice(p, billing);
  return {
    contents: [{ content_id: p.id + (billing === 'annual' ? '-annual' : '-monthly'), content_type: 'product', content_name: p.name, quantity: 1, price: price }],
    content_type: 'product',
    value: price,
    currency: 'USD'
  };
}

// ---- layout ----
function renderLayout() {
  var header = document.getElementById('site-header');
  if (header) {
    header.innerHTML =
      '<div class="nav container">' +
      '  <a class="logo" href="' + BASE + '">' + COACH.name.split(' ')[0].toUpperCase() + '<span>.</span>' + COACH.name.split(' ')[1].toUpperCase() + '</a>' +
      '  <nav class="links">' +
      '    <a href="' + BASE + '#programs">Programs</a>' +
      '    <a href="' + BASE + '#about">About</a>' +
      '    <a href="' + BASE + '#results">Results</a>' +
      '    <a href="' + BASE + 'subscribe/" id="nav-subscribe">Membership</a>' +
      '  </nav>' +
      '  <a class="btn small" id="nav-consult" href="' + BASE + '#consult">Free consult</a>' +
      '</div>';
  }
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML =
      '<div class="container footer-grid">' +
      '  <div><div class="logo">' + COACH.name.split(' ')[0].toUpperCase() + '<span>.</span>' + COACH.name.split(' ')[1].toUpperCase() + '</div>' +
      '    <p>' + COACH.title + ' · ' + COACH.city + '</p></div>' +
      '  <div><h4>Train</h4>' + PROGRAMS.map(function (p) { return '<a href="' + BASE + 'program/?id=' + p.id + '">' + p.name + '</a>'; }).join('') + '</div>' +
      '  <div><h4>Contact</h4>' +
      '    <a href="mailto:' + COACH.email + '" class="contact-link" data-method="email" id="contact-email">Email</a>' +
      '    <a href="tel:' + COACH.phone + '" class="contact-link" data-method="phone" id="contact-phone">Call / text</a>' +
      '    <a href="https://www.tiktok.com/" target="_blank" rel="noopener" class="contact-link" data-method="tiktok" id="contact-tiktok">TikTok</a>' +
      '    <a href="https://www.instagram.com/" target="_blank" rel="noopener" class="contact-link" data-method="instagram" id="contact-instagram">Instagram</a>' +
      '  </div>' +
      '</div>' +
      '<div class="container fine">© ' + new Date().getFullYear() + ' ' + COACH.name + ' Training. Demo site — no real subscriptions or payments.</div>';
  }
  Array.prototype.forEach.call(document.querySelectorAll('.contact-link'), function (a) {
    a.addEventListener('click', function () { track('Contact', { description: a.dataset.method }); });
  });
}

function toast(html) {
  var t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = html;
  document.body.appendChild(t);
  setTimeout(function () { t.classList.add('show'); }, 10);
  setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 3200);
}

renderLayout();
