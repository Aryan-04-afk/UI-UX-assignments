
// ==================== PACKAGES ====================
const packages = [
  { id: 1, destination: "Goa", durationDays: 4, basePrice: 15000, season: "peak" },
  { id: 2, destination: "Paris", durationDays: 6, basePrice: 85000, season: "off" },
  { id: 3, destination: "Maldives", durationDays: 5, basePrice: 65000, season: "peak" },
  { id: 4, destination: "New York", durationDays: 7, basePrice: 120000, season: "peak" },
  { id: 5, destination: "Jaipur", durationDays: 3, basePrice: 10000, season: "normal" }
];

function calcFinalPrice(pkg) {
  let multiplier = 1;
  switch (pkg.season) {
    case "peak": multiplier = 1.3; break;
    case "off": multiplier = 0.8; break;
    default: multiplier = 1;
  }
  return pkg.basePrice * multiplier;
}

function renderPackages() {
  const table = document.querySelector("#packagesTable tbody");
  if (!table) return;
  table.innerHTML = "";
  for (let pkg of packages) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays - 1} Nights / ${pkg.durationDays} Days</td>
      <td>₹${pkg.basePrice.toLocaleString()}</td>
      <td>₹${calcFinalPrice(pkg).toLocaleString()}</td>
    `;
    table.appendChild(row);
  }
}
renderPackages();

// ==================== BOOKING ====================
const bookingForm = document.querySelector("form");
const totalDisplay = document.createElement("p");
if (bookingForm) bookingForm.appendChild(totalDisplay);

function estimatePrice() {
  if (!bookingForm) return;
  const dateIn = new Date(bookingForm.checkIn?.value);
  const dateOut = new Date(bookingForm.checkOut?.value);
  const guests = parseInt(bookingForm.guests?.value) || 1;
  const pkgName = bookingForm.package?.value;
  const promo = bookingForm.promo?.value;

  if (!(dateIn instanceof Date) || !(dateOut instanceof Date) || isNaN(dateIn) || isNaN(dateOut)) return;

  let nights = (dateOut - dateIn) / (1000 * 3600 * 24);
  if (nights <= 0) { totalDisplay.textContent = "Invalid dates"; bookingForm.querySelector("button").disabled = true; return; }

  const pkg = packages.find(p => p.destination === pkgName) || packages[0];
  let total = calcFinalPrice(pkg) * nights;

  if (guests > 2) total *= 1.2;

  switch (promo) {
    case "EARLYBIRD": total *= 0.9; break;
    case "FAMILY": total *= 0.85; break;
  }

  totalDisplay.textContent = "Estimated Price: ₹" + total.toLocaleString();
  bookingForm.querySelector("button").disabled = false;
}

if (bookingForm) {
  bookingForm.addEventListener("input", estimatePrice);
}

// ==================== GALLERY MODAL ====================
const modal = document.createElement("div");
modal.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.8);";
modal.innerHTML = `<img id="modalImg" style="max-width:90%;max-height:90%;border:5px solid white;border-radius:10px;"><span style="position:absolute;top:20px;right:40px;font-size:30px;color:white;cursor:pointer;">✖</span>`;
document.body.appendChild(modal);

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    const large = img.dataset.large || img.src;
    const modalImg = document.querySelector("#modalImg");
    modalImg.src = large;
    modalImg.alt = img.alt;
    modalImg.title = img.alt;
    modal.style.display = "flex";
  });
});
modal.addEventListener("click", () => modal.style.display = "none");

// ==================== NAV HIGHLIGHT ====================
document.querySelectorAll("nav a").forEach(link => {
  if (link.href.includes(location.pathname.split("/").pop())) {
    link.classList.add("active");
    link.style.color = "yellow";
  }
});

