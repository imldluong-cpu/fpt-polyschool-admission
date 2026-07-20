const fs = require('fs');

const rawQuotas = {
  "Lý Tự Trọng": 455,
  "PTDTNT THCS và THPT Cần Thơ": 105,
  "Tân Lộc": 280,
  "Thới Thuận": 225,
  "Trường Xuân": 225,
  "An Khánh": 480,
  "Bình Thủy": 675,
  "Bùi Hữu Nghĩa": 546,
  "Châu Văn Liêm": 588,
  "Giai Xuân": 405,
  "Hà Huy Giáp": 520,
  "Ô Môn": 450,
  "Lưu Hữu Phước": 460,
  "Nguyễn Việt Dũng": 420,
  "Nguyễn Việt Hồng": 400,
  "Phan Ngọc Hiển": 429,
  "Phan Văn Trị": 630,
  "Thốt Nốt": 630,
  "Thới Lai": 630,
  "Thới Long": 420,
  "Thuận Hưng": 390,
  "Trần Đại Nghĩa": 540,
  "Trung An": 504,
  "Thực hành Sư phạm": 216,
  "chuyên Vị Thanh": 315,
  "PTDTNT THPT Hậu Giang": 105,
  "Chiêm Thành Tấn": 315,
  "Lê Quý Đôn": 336,
  "Long Mỹ": 765,
  "Lương Tâm": 240,
  "Ngã Sáu": 360,
  "Tân Phú": 270,
  "Tây Đô": 240,
  "Vị Thanh": 495,
  "Vị Thủy": 450,
  "Nguyễn Thị Minh Khai": 350,
  "Huỳnh Cương": 210,
  "Thạnh Phú": 70,
  "Vĩnh Châu": 70,
  "Khánh Hòa": 230,
  "Tân Thạnh": 320,
  "Trần Đề": 270, 
  "An Lạc Thôn": 349,
  "An Thạnh 3": 220,
  "Mỹ Hương": 160,
  "Phan Văn Hùng": 310,
  "Đoàn Văn Tố": 400,
  "Hoàng Diệu": 630,
  "Huỳnh Hữu Nghĩa": 330,
  "Kế Sách": 630,
  "Lịch Hội Thượng": 360,
  "Mai Thanh Thế": 495,
  "Mỹ Xuyên": 520,
  "Nguyễn Khuyến": 440,
  "Phú Tâm": 290,
  "Sóc Trăng": 600, 
  "Thiều Văn Chỏi": 450,
  "Trần Văn Bảy": 602,
  "Văn Ngọc Chính": 300,
  "Thạnh Thắng": 180,
  "Thới Thạnh": 270,
  "Trần Ngọc Hoằng": 225,
  "Thạnh An": 450,
  "Vĩnh Thạnh": 450,
  "Cái Tắc": 450,
  "Cây Dương": 405, 
  "Châu Thành A": 405,
  "Hoà An": 180,
  "Hòa An": 180,
  "Lê Hồng Phong": 270,
  "Vĩnh Tường": 180,
  "Lương Thế Vinh": 315,
  "Nguyễn Minh Quang": 405,
  "Phú Hữu": 315,
  "Tầm Vu": 400,
  "Tân Long": 270,
  "Trường Long Tây": 180,
  "Dương Kỳ Hiệp": 180,
  "Hưng Lợi": 160,
  "Lai Hoà": 240,
  "Lai Hòa": 240,
  "Long Hưng": 164,
  "Mỹ Thuận": 210,
  "Lê Văn Tám": 240,
  "An Ninh": 240,
  "Đại Ngãi": 405,
  "Hoà Tú": 280,
  "Hòa Tú": 280,
  "Lương Định Của": 315,
  "Ngã Năm": 220,
  "Ngọc Tố": 240,
  "Thạnh Tân": 250,
  "Thuận Hoà": 420,
  "Thuận Hòa": 420,
  "Vĩnh Hải": 270,
};

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Keep spaces!
    return str.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

const dataContent = fs.readFileSync('src/data.js', 'utf8');
const match = dataContent.match(/export const highSchools = (\[[\s\S]*?\])\.sort/);

if (match) {
  let schools = eval(match[1]);
  
  schools = schools.map(s => {
    let q = 0;
    const sNameNorm = removeVietnameseTones(s.name);
    
    if (s.name.includes("Lương Định Của (Sóc Trăng)")) {
        q = 315;
    } else if (s.name === "THPT Lương Định Của") {
        q = 315; 
    } 

    if (q === 0) {
      let longestMatchLen = 0;
      for (const [key, value] of Object.entries(rawQuotas)) {
        const normKey = removeVietnameseTones(key);
        if (sNameNorm.includes(normKey)) {
          if (normKey.length > longestMatchLen) {
            q = value;
            longestMatchLen = normKey.length;
          }
        }
      }
    }
    
    if (q === 0) {
      console.log(`Unmatched school: ${s.name}`);
    }
    
    // For testing schools
    if (s.name.includes("(Test)")) {
      q = 100;
    }
    
    return {
      ...s,
      quota: q || 400 
    };
  });
  
  const newArrayStr = JSON.stringify(schools, null, 2).replace(/"([^"]+)":/g, '$1:');
  const newFileContent = dataContent.replace(match[1], newArrayStr);
  
  fs.writeFileSync('src/data.js', newFileContent, 'utf8');
  console.log("Updated data.js with exact space matching");
}
