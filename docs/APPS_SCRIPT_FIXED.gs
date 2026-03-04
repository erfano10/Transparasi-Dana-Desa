// ===== GOOGLE APPS SCRIPT - COPY SEMUA KODE INI =====
// Paste ke Apps Script Editor, hapus semua kode lama

// Web App untuk GET request
function doGet(e) {
  // Log untuk debugging
  Logger.log('doGet called with params: ' + JSON.stringify(e.parameter));
  
  const action = e.parameter.action;
  
  try {
    let result;
    
    switch(action) {
      case 'getDesa':
        result = getDesa();
        break;
      case 'getPrograms':
        result = getPrograms();
        break;
      case 'getProgram':
        result = getProgram(e.parameter.id);
        break;
      default:
        return createResponse(false, 'Action tidak valid: ' + action);
    }
    
    return createResponse(true, 'Success', result);
  } catch(error) {
    Logger.log('Error in doGet: ' + error.toString());
    return createResponse(false, error.toString());
  }
}

// POST untuk Create, Update, Delete
function doPost(e) {
  Logger.log('doPost called');
  
  try {
    const params = JSON.parse(e.postData.contents);
    const action = params.action;
    
    let result;
    
    switch(action) {
      case 'addProgram':
        result = addProgram(params.data);
        break;
      case 'updateProgram':
        result = updateProgram(params.data);
        break;
      case 'deleteProgram':
        result = deleteProgram(params.id);
        break;
      default:
        return createResponse(false, 'Action tidak valid');
    }
    
    return createResponse(true, 'Success', result);
  } catch(error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, error.toString());
  }
}

// Helper function untuk response JSON
function createResponse(success, message, data = null) {
  const response = {
    status: success ? 'success' : 'error',
    message: message,
    data: data
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Get data desa
function getDesa() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('DATA_DESA');
    
    if (!sheet) {
      throw new Error('Sheet DATA_DESA tidak ditemukan. Pastikan nama sheet persis: DATA_DESA');
    }
    
    const lastRow = sheet.getLastRow();
    
    if (lastRow < 2) {
      throw new Error('Tidak ada data di sheet DATA_DESA. Pastikan ada data di baris 2');
    }
    
    // Ambil data dari baris 2 (baris pertama setelah header)
    const data = sheet.getRange(2, 1, 1, 6).getValues()[0];
    
    return {
      id_desa: data[0],
      nama_desa: data[1],
      kecamatan: data[2],
      kabupaten: data[3],
      tahun: data[4],
      total_anggaran: Number(data[5])
    };
  } catch(error) {
    Logger.log('Error in getDesa: ' + error.toString());
    throw error;
  }
}

// Get all programs
function getPrograms() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
    
    if (!sheet) {
      throw new Error('Sheet PROGRAM_DANA_DESA tidak ditemukan. Pastikan nama sheet persis: PROGRAM_DANA_DESA');
    }
    
    const lastRow = sheet.getLastRow();
    
    // Jika tidak ada data, return array kosong
    if (lastRow < 2) {
      Logger.log('Tidak ada data program');
      return [];
    }
    
    // Ambil semua data mulai dari baris 2
    const data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
    
    Logger.log('Found ' + data.length + ' programs');
    
    // Convert ke format object
    const programs = data.map(row => {
      return {
        id_program: row[0],
        id_desa: row[1],
        nama_program: row[2],
        kategori: row[3],
        anggaran: Number(row[4]),
        realisasi: Number(row[5]),
        tanggal_mulai: formatDate(row[6]),
        tanggal_selesai: formatDate(row[7]),
        status: row[8],
        keterangan: row[9]
      };
    });
    
    return programs;
  } catch(error) {
    Logger.log('Error in getPrograms: ' + error.toString());
    throw error;
  }
}

// Get single program by ID
function getProgram(id) {
  try {
    const programs = getPrograms();
    const program = programs.find(p => p.id_program == id);
    
    if (!program) {
      throw new Error('Program dengan ID ' + id + ' tidak ditemukan');
    }
    
    return program;
  } catch(error) {
    Logger.log('Error in getProgram: ' + error.toString());
    throw error;
  }
}

// Add new program
function addProgram(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
    
    if (!sheet) {
      throw new Error('Sheet PROGRAM_DANA_DESA tidak ditemukan');
    }
    
    const lastRow = sheet.getLastRow();
    
    // Generate ID baru
    let newId = 1;
    if (lastRow > 1) {
      const lastId = sheet.getRange(lastRow, 1).getValue();
      newId = Number(lastId) + 1;
    }
    
    // Tambah data baru
    sheet.appendRow([
      newId,
      data.id_desa || 1,
      data.nama_program,
      data.kategori,
      Number(data.anggaran),
      Number(data.realisasi),
      data.tanggal_mulai,
      data.tanggal_selesai,
      data.status,
      data.keterangan || ''
    ]);
    
    Logger.log('Program added with ID: ' + newId);
    
    return { 
      id: newId, 
      message: 'Program berhasil ditambahkan' 
    };
  } catch(error) {
    Logger.log('Error in addProgram: ' + error.toString());
    throw error;
  }
}

// Update program
function updateProgram(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
    
    if (!sheet) {
      throw new Error('Sheet PROGRAM_DANA_DESA tidak ditemukan');
    }
    
    const lastRow = sheet.getLastRow();
    
    // Cari baris dengan ID yang sesuai
    for (let i = 2; i <= lastRow; i++) {
      const id = sheet.getRange(i, 1).getValue();
      
      if (id == data.id_program) {
        // Update data (kolom 3-10)
        sheet.getRange(i, 3, 1, 8).setValues([[
          data.nama_program,
          data.kategori,
          Number(data.anggaran),
          Number(data.realisasi),
          data.tanggal_mulai,
          data.tanggal_selesai,
          data.status,
          data.keterangan || ''
        ]]);
        
        Logger.log('Program updated: ' + data.id_program);
        
        return { message: 'Program berhasil diupdate' };
      }
    }
    
    throw new Error('Program dengan ID ' + data.id_program + ' tidak ditemukan');
  } catch(error) {
    Logger.log('Error in updateProgram: ' + error.toString());
    throw error;
  }
}

// Delete program
function deleteProgram(id) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
    
    if (!sheet) {
      throw new Error('Sheet PROGRAM_DANA_DESA tidak ditemukan');
    }
    
    const lastRow = sheet.getLastRow();
    
    // Cari dan hapus baris dengan ID yang sesuai
    for (let i = 2; i <= lastRow; i++) {
      const rowId = sheet.getRange(i, 1).getValue();
      
      if (rowId == id) {
        sheet.deleteRow(i);
        Logger.log('Program deleted: ' + id);
        return { message: 'Program berhasil dihapus' };
      }
    }
    
    throw new Error('Program dengan ID ' + id + ' tidak ditemukan');
  } catch(error) {
    Logger.log('Error in deleteProgram: ' + error.toString());
    throw error;
  }
}

// Helper: Format date untuk output
function formatDate(date) {
  if (!date) return '';
  
  if (date instanceof Date) {
    return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  
  return date;
}

// Function untuk testing (opsional)
function testGetDesa() {
  const result = getDesa();
  Logger.log(JSON.stringify(result));
}

function testGetPrograms() {
  const result = getPrograms();
  Logger.log(JSON.stringify(result));
}
