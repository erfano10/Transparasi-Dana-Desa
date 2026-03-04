// GOOGLE APPS SCRIPT - COPY SEMUA KODE INI
// Paste ke Apps Script Editor

// Handle CORS untuk Vercel
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function doGet(e) {
  Logger.log('doGet called with params: ' + JSON.stringify(e.parameter));
  
  var action = e.parameter.action;
  
  try {
    var result;
    
    if (action === 'getDesa') {
      result = getDesa();
    } else if (action === 'getPrograms') {
      result = getPrograms();
    } else if (action === 'getProgram') {
      result = getProgram(e.parameter.id);
    } else {
      return createResponse(false, 'Action tidak valid: ' + action);
    }
    
    return createResponse(true, 'Success', result);
  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return createResponse(false, error.toString());
  }
}

function doPost(e) {
  Logger.log('doPost called');
  
  try {
    var params = JSON.parse(e.postData.contents);
    var action = params.action;
    var result;
    
    if (action === 'addProgram') {
      result = addProgram(params.data);
    } else if (action === 'updateProgram') {
      result = updateProgram(params.data);
    } else if (action === 'deleteProgram') {
      result = deleteProgram(params.id);
    } else {
      return createResponse(false, 'Action tidak valid');
    }
    
    return createResponse(true, 'Success', result);
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, error.toString());
  }
}

function createResponse(success, message, data) {
  var response = {
    status: success ? 'success' : 'error',
    message: message,
    data: data || null
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function getDesa() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('DATA_DESA');
    
    if (!sheet) {
      throw new Error('Sheet DATA_DESA tidak ditemukan. Pastikan nama sheet persis: DATA_DESA');
    }
    
    var lastRow = sheet.getLastRow();
    
    if (lastRow < 2) {
      throw new Error('Tidak ada data di sheet DATA_DESA. Pastikan ada data di baris 2');
    }
    
    var data = sheet.getRange(2, 1, 1, 6).getValues()[0];
    
    return {
      id_desa: data[0],
      nama_desa: data[1],
      kecamatan: data[2],
      kabupaten: data[3],
      tahun: data[4],
      total_anggaran: Number(data[5])
    };
  } catch (error) {
    Logger.log('Error in getDesa: ' + error.toString());
    throw error;
  }
}

function getPrograms() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
    
    if (!sheet) {
      throw new Error('Sheet PROGRAM_DANA_DESA tidak ditemukan. Pastikan nama sheet persis: PROGRAM_DANA_DESA');
    }
    
    var lastRow = sheet.getLastRow();
    
    if (lastRow < 2) {
      Logger.log('Tidak ada data program');
      return [];
    }
    
    var data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
    
    Logger.log('Found ' + data.length + ' programs');
    
    var programs = [];
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      programs.push({
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
      });
    }
    
    return programs;
  } catch (error) {
    Logger.log('Error in getPrograms: ' + error.toString());
    throw error;
  }
}

function getProgram(id) {
  try {
    var programs = getPrograms();
    
    for (var i = 0; i < programs.length; i++) {
      if (programs[i].id_program == id) {
        return programs[i];
      }
    }
    
    throw new Error('Program dengan ID ' + id + ' tidak ditemukan');
  } catch (error) {
    Logger.log('Error in getProgram: ' + error.toString());
    throw error;
  }
}

function addProgram(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
    
    if (!sheet) {
      throw new Error('Sheet PROGRAM_DANA_DESA tidak ditemukan');
    }
    
    var lastRow = sheet.getLastRow();
    var newId = 1;
    
    if (lastRow > 1) {
      var lastId = sheet.getRange(lastRow, 1).getValue();
      newId = Number(lastId) + 1;
    }
    
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
  } catch (error) {
    Logger.log('Error in addProgram: ' + error.toString());
    throw error;
  }
}

function updateProgram(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
    
    if (!sheet) {
      throw new Error('Sheet PROGRAM_DANA_DESA tidak ditemukan');
    }
    
    var lastRow = sheet.getLastRow();
    
    for (var i = 2; i <= lastRow; i++) {
      var id = sheet.getRange(i, 1).getValue();
      
      if (id == data.id_program) {
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
  } catch (error) {
    Logger.log('Error in updateProgram: ' + error.toString());
    throw error;
  }
}

function deleteProgram(id) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
    
    if (!sheet) {
      throw new Error('Sheet PROGRAM_DANA_DESA tidak ditemukan');
    }
    
    var lastRow = sheet.getLastRow();
    
    for (var i = 2; i <= lastRow; i++) {
      var rowId = sheet.getRange(i, 1).getValue();
      
      if (rowId == id) {
        sheet.deleteRow(i);
        Logger.log('Program deleted: ' + id);
        return { message: 'Program berhasil dihapus' };
      }
    }
    
    throw new Error('Program dengan ID ' + id + ' tidak ditemukan');
  } catch (error) {
    Logger.log('Error in deleteProgram: ' + error.toString());
    throw error;
  }
}

function formatDate(date) {
  if (!date) return '';
  
  if (date instanceof Date) {
    return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  
  return date;
}

function testGetDesa() {
  var result = getDesa();
  Logger.log(JSON.stringify(result));
}

function testGetPrograms() {
  var result = getPrograms();
  Logger.log(JSON.stringify(result));
}
