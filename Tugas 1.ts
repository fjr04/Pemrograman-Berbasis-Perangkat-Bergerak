// // Jawaban Soal 1
// // Menyimpan NIM ke dalam variabel bertipe string
const nim: string = "051327942";

// Mengambil 1 karakter paling belakang (slice(-1)) yaitu "2", lalu diubah ke tipe angka (parseInt)
const digitTerakhir: number = parseInt(nim.slice(-1));

console.log("=== Soal 1: Pola Segitiga ===");

// Looping pertama (i) untuk menentukan jumlah baris vertikal. Berjalan dari 1 sampai batas digitTerakhir (yaitu 2)
for (let i = 1; i <= digitTerakhir; i++) {
    
    // Variabel penampung string sementara untuk menyusun angka menyamping
    let baris: string = "";
    
    // Looping kedua (j) untuk mencetak angka menyamping (horizontal) pada setiap baris
    // Looping ini akan berhenti jika j sudah sama dengan i (nomor baris saat ini)
    for (let j = 1; j <= i; j++) {
        // Menambahkan angka ke dalam variabel 'baris' beserta satu spasi
        baris += j + " ";
    }
    
    // Menampilkan baris yang sudah disusun ke layar (trim digunakan untuk menghapus spasi lebih di ujung)
    console.log(baris.trim());
}
console.log("\n");



// Jawaban Soal 2

// Mengambil 2 karakter dari belakang (slice(-2)) yaitu "42", lalu diubah ke tipe angka
const duaDigitTerakhir: number = parseInt(nim.slice(-2));

// Mengambil karakter ke-3 dari belakang. Panjang string dikurangi 3 (indeks ke-6), yaitu angka "9"
const digitKetigaDariBelakang: number = parseInt(nim.charAt(nim.length - 3));

// Menentukan beda/step deret dengan menambahkan 1 pada digit ke-3 dari belakang (9 + 1 = 10)
const step: number = digitKetigaDariBelakang + 1;

console.log("=== Soal 2: Deret Aritmatika ===");

// Membuat array kosong untuk menampung deret angka yang terbentuk
let deret: number[] = [];

// Menetapkan angka pertama deret menggunakan dua digit terakhir NIM (yaitu 42)
let nilaiSaatIni: number = duaDigitTerakhir;

// Looping berjalan tepat 10 kali (dari 0 sampai 9) untuk menghasilkan 10 angka pertama
for (let i = 0; i < 10; i++) {
    // Memasukkan angka saat ini ke dalam array 'deret'
    deret.push(nilaiSaatIni);
    
    // Menambahkan nilai saat ini dengan step (10) untuk putaran berikutnya
    nilaiSaatIni += step; 
}

// Mencetak isi array ke layar, dipisahkan dengan koma dan spasi
console.log(deret.join(", "));
console.log("\n");




// // Jawaban Soal 3
// Menentukan batas pencarian dengan menambahkan angka 10 pada dua digit terakhir NIM (42 + 10 = 52)
const batasAkhir: number = duaDigitTerakhir + 10;

console.log("=== Soal 3: Bilangan Prima ===");

// Membuat fungsi khusus (method) untuk mengecek apakah sebuah angka termasuk bilangan prima atau bukan
function isPrima(angka: number): boolean {
    // Angka 1 atau kurang dari 1 bukan bilangan prima, kembalikan nilai false
    if (angka <= 1) return false;
    
    // Looping dari angka 2 sampai batas akar kuadrat angka tersebut (cara efisien mengecek pembagi)
    for (let i = 2; i <= Math.sqrt(angka); i++) {
        // Jika angka habis dibagi (sisa baginya 0) oleh nilai i, berarti bukan prima
        if (angka % i === 0) {
            return false;
        }
    }
    // Jika lolos dari semua pengecekan, berarti angka tersebut prima
    return true;
}

// Membuat array kosong untuk menampung hasil bilangan prima
let bilanganPrima: number[] = [];

// Looping dari angka 1 sampai batas akhir (52)
for (let i = 1; i <= batasAkhir; i++) {
    // Memanggil fungsi isPrima(). Jika mengembalikan true, masukkan ke array
    if (isPrima(i)) {
        bilanganPrima.push(i);
    }
}

// Mencetak deret bilangan prima ke layar
console.log(bilanganPrima.join(", "));