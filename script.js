const $ = (id) => document.getElementById(id);

/* NAVBAR */
$("burgerBtn").onclick = () => {
  $("navMenu").classList.toggle("show");
};

/* FILTER MENU */
$("tabBar").onclick = (e) => {
  const tab = e.target.closest(".tabs button");
  if (!tab) return;

  document.querySelectorAll(".tabs button").forEach(b =>
    b.classList.remove("active")
  );

  tab.classList.add("active");

  const kategori = tab.dataset.kategori;

  document.querySelectorAll(".menu-row").forEach(row => {
    row.classList.toggle(
      "hidden",
      kategori !== "semua" &&
      row.dataset.kategori !== kategori
    );
  });
};

/* KERANJANG */
let keranjang = [];

function ubahJumlah(nama, harga, delta) {
  let item = keranjang.find(i => i.nama === nama);

  if (!item) {
    if (delta < 0) return;
    item = { nama, harga, jumlah: 0 };
    keranjang.push(item);
  }

  item.jumlah += delta;

  if (item.jumlah <= 0) {
    keranjang = keranjang.filter(i => i.nama !== nama);
  }

  render();
}

function render() {
  $("cartList").innerHTML = keranjang.map(i => `
    <div class="cart-item">
      <div>
        <h4>${i.nama}</h4>
        <small>Rp ${i.harga.toLocaleString("id-ID")}</small>
      </div>
      <div>
        <button class="cart-btn" data-nama="${i.nama}" data-harga="${i.harga}" data-delta="-1">−</button>
        ${i.jumlah}
        <button class="cart-btn" data-nama="${i.nama}" data-harga="${i.harga}" data-delta="1">+</button>
      </div>
    </div>
  `).join("");

  const total = keranjang.reduce((t, i) => t + i.harga * i.jumlah, 0);
  const jumlah = keranjang.reduce((t, i) => t + i.jumlah, 0);

  $("cartTotal").textContent = "Rp " + total.toLocaleString("id-ID");
  $("cartCount").textContent = jumlah + " item";
  $("cartDrawer").classList.toggle("hidden", jumlah === 0);
}

/* TAMBAH MENU */
$("menuList").onclick = (e) => {
  const btn = e.target.closest(".plus");
  if (!btn) return;

  ubahJumlah(btn.dataset.nama, +btn.dataset.harga, 1);
};

/* TAMBAH / KURANG KERANJANG */
$("cartList").onclick = (e) => {
  const btn = e.target.closest(".cart-btn");
  if (!btn) return;

  ubahJumlah(
    btn.dataset.nama,
    +btn.dataset.harga,
    +btn.dataset.delta
  );
};

/* BUKA KERANJANG */
$("cartToggle").onclick = () => {
  $("cartDrawer").classList.toggle("open");
};

/* PESAN */
$("pesanBtn").onclick = () => {
  if (!keranjang.length) return alert("Keranjang masih kosong!");

  alert("Pesanan berhasil dikirim! Terima kasih.");
  keranjang = [];
  $("cartDrawer").classList.remove("open");
  render();
};

/* TAHUN */
$("tahun").textContent = new Date().getFullYear();

render();