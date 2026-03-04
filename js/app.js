// Configuration
const CONFIG = {
    SPREADSHEET_URL: 'https://script.google.com/macros/s/AKfycbxbdQVyD6UiI4nMe6eHoZTPcFib3MYRQtysDAwMv0qG4LEQVOBUSZ3VTwC4KRybU_rH/exec',
    // Ganti dengan URL Web App dari Google Apps Script
};

// Global data storage
let desaData = null;
let programData = [];

// Format currency
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Get status badge color
function getStatusColor(status) {
    const colors = {
        'Perencanaan': 'bg-yellow-100 text-yellow-800',
        'Proses': 'bg-blue-100 text-blue-800',
        'Selesai': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

// Get category icon
function getCategoryIcon(kategori) {
    const icons = {
        'Infrastruktur': 'fa-road',
        'Sosial': 'fa-users',
        'Pendidikan': 'fa-graduation-cap',
        'Kesehatan': 'fa-heartbeat'
    };
    return icons[kategori] || 'fa-folder';
}

// Fetch data from Google Apps Script
async function fetchData(action, params = {}) {
    try {
        const url = new URL(CONFIG.SPREADSHEET_URL);
        url.searchParams.append('action', action);
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });

        console.log('Fetching data from:', url.toString());

        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.status === 'success') {
            console.log('✅ Data berhasil diambil dari spreadsheet');
            return data.data;
        } else {
            console.error('❌ Error dari Apps Script:', data.message);
            throw new Error(data.message || 'Gagal mengambil data');
        }
    } catch (error) {
        console.error('❌ Error fetching data:', error);
        console.log('⚠️ Menggunakan dummy data sebagai fallback');
        // Return dummy data for development
        return getDummyData(action);
    }
}

// Dummy data for development/testing
function getDummyData(action) {
    if (action === 'getDesa') {
        return {
            id_desa: 1,
            nama_desa: 'Desa Sukamaju',
            kecamatan: 'Kecamatan Makmur',
            kabupaten: 'Kabupaten Sejahtera',
            tahun: 2024,
            total_anggaran: 1500000000
        };
    } else if (action === 'getPrograms') {
        return [
            {
                id_program: 1,
                nama_program: 'Pembangunan Jalan Desa',
                kategori: 'Infrastruktur',
                anggaran: 500000000,
                realisasi: 450000000,
                tanggal_mulai: '2024-01-15',
                tanggal_selesai: '2024-06-30',
                status: 'Proses',
                keterangan: 'Pembangunan jalan sepanjang 2 km'
            },
            {
                id_program: 2,
                nama_program: 'Bantuan Sosial Lansia',
                kategori: 'Sosial',
                anggaran: 200000000,
                realisasi: 200000000,
                tanggal_mulai: '2024-01-01',
                tanggal_selesai: '2024-12-31',
                status: 'Selesai',
                keterangan: 'Bantuan bulanan untuk 100 lansia'
            },
            {
                id_program: 3,
                nama_program: 'Renovasi Sekolah Dasar',
                kategori: 'Pendidikan',
                anggaran: 300000000,
                realisasi: 150000000,
                tanggal_mulai: '2024-03-01',
                tanggal_selesai: '2024-09-30',
                status: 'Proses',
                keterangan: 'Renovasi 3 ruang kelas'
            },
            {
                id_program: 4,
                nama_program: 'Posyandu Balita',
                kategori: 'Kesehatan',
                anggaran: 150000000,
                realisasi: 100000000,
                tanggal_mulai: '2024-02-01',
                tanggal_selesai: '2024-12-31',
                status: 'Proses',
                keterangan: 'Operasional 5 posyandu'
            },
            {
                id_program: 5,
                nama_program: 'Pembangunan Balai Desa',
                kategori: 'Infrastruktur',
                anggaran: 350000000,
                realisasi: 0,
                tanggal_mulai: '2024-07-01',
                tanggal_selesai: '2024-12-31',
                status: 'Perencanaan',
                keterangan: 'Pembangunan balai desa baru'
            }
        ];
    }
    return null;
}

// Load desa info
async function loadDesaInfo() {
    desaData = await fetchData('getDesa');
    const infoElement = document.getElementById('desaInfo');
    if (infoElement && desaData) {
        infoElement.textContent = `${desaData.nama_desa}, ${desaData.kecamatan}, ${desaData.kabupaten} - Tahun ${desaData.tahun}`;
    }
}

// Load dashboard data
async function loadDashboardData() {
    programData = await fetchData('getPrograms');
    
    // Calculate totals
    const totalAnggaran = programData.reduce((sum, p) => sum + p.anggaran, 0);
    const totalRealisasi = programData.reduce((sum, p) => sum + p.realisasi, 0);
    const sisaAnggaran = totalAnggaran - totalRealisasi;
    
    // Update summary cards
    document.getElementById('totalAnggaran').textContent = formatRupiah(totalAnggaran);
    document.getElementById('totalRealisasi').textContent = formatRupiah(totalRealisasi);
    document.getElementById('sisaAnggaran').textContent = formatRupiah(sisaAnggaran);
    
    // Display recent programs
    const programTerbaru = document.getElementById('programTerbaru');
    const recentPrograms = programData.slice(0, 5);
    
    programTerbaru.innerHTML = recentPrograms.map(program => {
        const progress = (program.realisasi / program.anggaran * 100).toFixed(1);
        return `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div class="flex items-start justify-between mb-2">
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-800 mb-1">${program.nama_program}</h3>
                        <div class="flex items-center space-x-4 text-sm text-gray-600">
                            <span><i class="fas ${getCategoryIcon(program.kategori)} mr-1"></i>${program.kategori}</span>
                            <span class="px-2 py-1 rounded text-xs ${getStatusColor(program.status)}">${program.status}</span>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 text-sm mb-2">
                    <div>
                        <p class="text-gray-600">Anggaran</p>
                        <p class="font-semibold text-gray-800">${formatRupiah(program.anggaran)}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">Realisasi</p>
                        <p class="font-semibold text-gray-800">${formatRupiah(program.realisasi)}</p>
                    </div>
                </div>
                <div class="mb-2">
                    <div class="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>${progress}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-primary rounded-full h-2" style="width: ${progress}%"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load program table
async function loadProgramTable() {
    programData = await fetchData('getPrograms');
    renderProgramTable(programData);
}

// Render program table
function renderProgramTable(data) {
    const tableBody = document.getElementById('programTable');
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                    Tidak ada data program
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = data.map((program, index) => {
        const progress = (program.realisasi / program.anggaran * 100).toFixed(1);
        return `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-3">${index + 1}</td>
                <td class="px-4 py-3">
                    <div class="font-semibold text-gray-800">${program.nama_program}</div>
                    <div class="text-sm text-gray-600">${program.keterangan || '-'}</div>
                </td>
                <td class="px-4 py-3">
                    <span class="inline-flex items-center">
                        <i class="fas ${getCategoryIcon(program.kategori)} mr-2 text-primary"></i>
                        ${program.kategori}
                    </span>
                </td>
                <td class="px-4 py-3 text-right">${formatRupiah(program.anggaran)}</td>
                <td class="px-4 py-3 text-right">
                    <div>${formatRupiah(program.realisasi)}</div>
                    <div class="text-xs text-gray-600">${progress}%</div>
                </td>
                <td class="px-4 py-3 text-center">
                    <span class="px-3 py-1 rounded-full text-xs ${getStatusColor(program.status)}">
                        ${program.status}
                    </span>
                </td>
                <td class="px-4 py-3 text-center">
                    <a href="detail.html?id=${program.id_program}" 
                       class="text-primary hover:text-secondary">
                        <i class="fas fa-eye"></i> Detail
                    </a>
                </td>
            </tr>
        `;
    }).join('');
}

// Filter programs
function filterPrograms() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const kategori = document.getElementById('filterKategori').value;
    const status = document.getElementById('filterStatus').value;
    
    const filtered = programData.filter(program => {
        const matchSearch = program.nama_program.toLowerCase().includes(searchTerm) ||
                          (program.keterangan && program.keterangan.toLowerCase().includes(searchTerm));
        const matchKategori = !kategori || program.kategori === kategori;
        const matchStatus = !status || program.status === status;
        
        return matchSearch && matchKategori && matchStatus;
    });
    
    renderProgramTable(filtered);
}

// Load program detail
async function loadProgramDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const programId = urlParams.get('id');
    
    if (!programId) {
        document.getElementById('detailContent').innerHTML = `
            <div class="text-center py-8 text-red-500">
                <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
                <p>ID Program tidak ditemukan</p>
            </div>
        `;
        return;
    }
    
    programData = await fetchData('getPrograms');
    const program = programData.find(p => p.id_program == programId);
    
    if (!program) {
        document.getElementById('detailContent').innerHTML = `
            <div class="text-center py-8 text-red-500">
                <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
                <p>Program tidak ditemukan</p>
            </div>
        `;
        return;
    }
    
    const progress = (program.realisasi / program.anggaran * 100).toFixed(1);
    const sisa = program.anggaran - program.realisasi;
    
    document.getElementById('detailContent').innerHTML = `
        <div class="mb-6">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">${program.nama_program}</h2>
            <div class="flex items-center space-x-4">
                <span class="inline-flex items-center text-gray-600">
                    <i class="fas ${getCategoryIcon(program.kategori)} mr-2"></i>
                    ${program.kategori}
                </span>
                <span class="px-3 py-1 rounded-full text-sm ${getStatusColor(program.status)}">
                    ${program.status}
                </span>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-blue-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 mb-1">Total Anggaran</p>
                <p class="text-2xl font-bold text-blue-600">${formatRupiah(program.anggaran)}</p>
            </div>
            <div class="bg-green-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 mb-1">Realisasi</p>
                <p class="text-2xl font-bold text-green-600">${formatRupiah(program.realisasi)}</p>
            </div>
            <div class="bg-orange-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 mb-1">Sisa Anggaran</p>
                <p class="text-2xl font-bold text-orange-600">${formatRupiah(sisa)}</p>
            </div>
        </div>
        
        <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Progress Realisasi</h3>
            <div class="flex items-center space-x-4">
                <div class="flex-1">
                    <div class="w-full bg-gray-200 rounded-full h-4">
                        <div class="bg-primary rounded-full h-4 flex items-center justify-end pr-2" 
                             style="width: ${progress}%">
                            <span class="text-xs text-white font-semibold">${progress}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-3">Informasi Program</h3>
                <div class="space-y-2">
                    <div class="flex justify-between py-2 border-b">
                        <span class="text-gray-600">Tanggal Mulai</span>
                        <span class="font-semibold">${formatDate(program.tanggal_mulai)}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b">
                        <span class="text-gray-600">Tanggal Selesai</span>
                        <span class="font-semibold">${formatDate(program.tanggal_selesai)}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b">
                        <span class="text-gray-600">Status</span>
                        <span class="px-3 py-1 rounded-full text-xs ${getStatusColor(program.status)}">
                            ${program.status}
                        </span>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-3">Keterangan</h3>
                <p class="text-gray-700">${program.keterangan || 'Tidak ada keterangan'}</p>
            </div>
        </div>
    `;
}

// Load charts
async function loadCharts() {
    programData = await fetchData('getPrograms');
    
    // Pie Chart - Distribusi Anggaran per Kategori
    const kategoriData = {};
    programData.forEach(p => {
        kategoriData[p.kategori] = (kategoriData[p.kategori] || 0) + p.anggaran;
    });
    
    new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(kategoriData),
            datasets: [{
                data: Object.values(kategoriData),
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return context.label + ': ' + formatRupiah(context.parsed);
                        }
                    }
                }
            }
        }
    });
    
    // Bar Chart - Anggaran vs Realisasi
    new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(kategoriData),
            datasets: [
                {
                    label: 'Anggaran',
                    data: Object.keys(kategoriData).map(k => {
                        return programData.filter(p => p.kategori === k)
                            .reduce((sum, p) => sum + p.anggaran, 0);
                    }),
                    backgroundColor: '#3b82f6'
                },
                {
                    label: 'Realisasi',
                    data: Object.keys(kategoriData).map(k => {
                        return programData.filter(p => p.kategori === k)
                            .reduce((sum, p) => sum + p.realisasi, 0);
                    }),
                    backgroundColor: '#10b981'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return context.dataset.label + ': ' + formatRupiah(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => formatRupiah(value)
                    }
                }
            }
        }
    });
    
    // Status Chart
    const statusData = {};
    programData.forEach(p => {
        statusData[p.status] = (statusData[p.status] || 0) + 1;
    });
    
    new Chart(document.getElementById('statusChart'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(statusData),
            datasets: [{
                data: Object.values(statusData),
                backgroundColor: ['#f59e0b', '#3b82f6', '#10b981']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
    
    // Progress Chart
    const progressData = Object.keys(kategoriData).map(k => {
        const programs = programData.filter(p => p.kategori === k);
        const totalAnggaran = programs.reduce((sum, p) => sum + p.anggaran, 0);
        const totalRealisasi = programs.reduce((sum, p) => sum + p.realisasi, 0);
        return (totalRealisasi / totalAnggaran * 100).toFixed(1);
    });
    
    new Chart(document.getElementById('progressChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(kategoriData),
            datasets: [{
                label: 'Persentase Realisasi (%)',
                data: progressData,
                backgroundColor: '#10b981'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: (value) => value + '%'
                    }
                }
            }
        }
    });
}

// Load admin programs
async function loadAdminPrograms() {
    programData = await fetchData('getPrograms');
    const tableBody = document.getElementById('adminProgramTable');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = programData.map(program => `
        <tr class="hover:bg-gray-50">
            <td class="px-4 py-3">${program.nama_program}</td>
            <td class="px-4 py-3">${program.kategori}</td>
            <td class="px-4 py-3 text-center">
                <span class="px-3 py-1 rounded-full text-xs ${getStatusColor(program.status)}">
                    ${program.status}
                </span>
            </td>
            <td class="px-4 py-3 text-center">
                <button onclick="editProgram(${program.id_program})" 
                        class="text-blue-600 hover:text-blue-800 mr-2">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="confirmDeleteProgram(${program.id_program})" 
                        class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Add program via API
async function addProgramToSpreadsheet(formData) {
    try {
        const url = CONFIG.SPREADSHEET_URL;
        
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'addProgram',
                data: formData
            })
        });
        
        // Note: no-cors mode tidak bisa baca response, tapi request tetap terkirim
        console.log('Program berhasil ditambahkan');
        return { success: true };
    } catch (error) {
        console.error('Error adding program:', error);
        throw error;
    }
}

// Handle add program form
async function handleAddProgram(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        id_desa: 1,
        nama_program: form.nama_program.value,
        kategori: form.kategori.value,
        anggaran: parseInt(form.anggaran.value),
        realisasi: parseInt(form.realisasi.value),
        tanggal_mulai: form.tanggal_mulai.value,
        tanggal_selesai: form.tanggal_selesai.value,
        status: form.status.value,
        keterangan: form.keterangan.value
    };
    
    try {
        // Show loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Menyimpan...';
        submitBtn.disabled = true;
        
        await addProgramToSpreadsheet(formData);
        
        // Success
        alert('✅ Program berhasil ditambahkan!\n\nSilakan refresh halaman untuk melihat data terbaru.');
        form.reset();
        
        // Reload table after 1 second
        setTimeout(() => {
            loadAdminPrograms();
        }, 1000);
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    } catch (error) {
        alert('❌ Gagal menambahkan program: ' + error.message);
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-plus mr-2"></i>Tambah Program';
        submitBtn.disabled = false;
    }
}

// Edit program
function editProgram(id) {
    const program = programData.find(p => p.id_program === id);
    if (!program) return;
    
    // Fill form with program data
    const form = document.getElementById('addProgramForm');
    form.nama_program.value = program.nama_program;
    form.kategori.value = program.kategori;
    form.anggaran.value = program.anggaran;
    form.realisasi.value = program.realisasi;
    form.tanggal_mulai.value = program.tanggal_mulai;
    form.tanggal_selesai.value = program.tanggal_selesai;
    form.status.value = program.status;
    form.keterangan.value = program.keterangan || '';
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
    
    alert('Fitur edit sedang dalam pengembangan. Untuk sementara, edit langsung di Google Spreadsheet.');
}

// Confirm delete program
async function confirmDeleteProgram(id) {
    const program = programData.find(p => p.id_program === id);
    if (!program) return;
    
    const confirmed = confirm(
        `Yakin ingin menghapus program ini?\n\n` +
        `Nama: ${program.nama_program}\n` +
        `Kategori: ${program.kategori}\n` +
        `Anggaran: ${formatRupiah(program.anggaran)}`
    );
    
    if (confirmed) {
        await deleteProgramFromSpreadsheet(id);
    }
}

// Delete program via API
async function deleteProgramFromSpreadsheet(id) {
    try {
        const url = CONFIG.SPREADSHEET_URL;
        
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'deleteProgram',
                id: id
            })
        });
        
        console.log('Program berhasil dihapus');
        alert('✅ Program berhasil dihapus!\n\nSilakan refresh halaman untuk melihat perubahan.');
        
        // Reload table after 1 second
        setTimeout(() => {
            loadAdminPrograms();
        }, 1000);
        
        return { success: true };
    } catch (error) {
        console.error('Error deleting program:', error);
        alert('❌ Gagal menghapus program: ' + error.message);
        throw error;
    }
}
