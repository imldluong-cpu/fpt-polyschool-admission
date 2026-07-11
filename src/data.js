export const highSchools = [
  { id: 1, name: "THPT Hà Huy Giáp", score: 13.00 },
  { id: 2, name: "THPT Trung An", score: 13.75 },
  { id: 3, name: "THCS và THPT Trần Ngọc Hoằng", score: 8.50 },
  { id: 4, name: "THPT Phan Văn Trị", score: 10.60 },
  { id: 5, name: "THPT Giai Xuân", score: 10.50 },
  { id: 6, name: "THPT Thới Lai", score: 10.00 },
  { id: 7, name: "THCS và THPT Trường Xuân", score: 6.80 },
  { id: 8, name: "THCS và THPT Thới Thạnh", score: 7.10 },
  { id: 9, name: "THPT Thạnh An", score: 7.00 },
  { id: 10, name: "THPT Vĩnh Thạnh", score: 7.25 },
  { id: 11, name: "THCS và THPT Thạnh Thắng", score: 6.50 },
  { id: 12, name: "THPT Bùi Hữu Nghĩa", score: 15.05 },
  { id: 13, name: "THPT Bình Thủy", score: 14.00 },
  { id: 14, name: "THPT Nguyễn Việt Dũng", score: 12.40 },
  { id: 15, name: "THPT Trần Đại Nghĩa", score: 11.85 },
  { id: 16, name: "THPT Thực hành sư phạm - ĐHCT", score: 20.35 },
  { id: 17, name: "THPT Châu Văn Liêm", score: 21.30 },
  { id: 18, name: "THPT Nguyễn Việt Hồng", score: 17.75 },
  { id: 19, name: "THPT Phan Ngọc Hiển", score: 16.25 },
  { id: 20, name: "THPT An Khánh", score: 16.50 },
  { id: 21, name: "THPT Lưu Hữu Phước", score: 13.40 },
  { id: 22, name: "THPT Lương Định Của", score: 9.60 },
  { id: 23, name: "THPT Thới Long", score: 9.00 },
  { id: 24, name: "THPT Thốt Nốt", score: 14.05 },
  { id: 25, name: "THPT Thuận Hưng", score: 13.25 },
  { id: 26, name: "THCS và THPT Thới Thuận", score: 13.05 },
  { id: 27, name: "THCS và THPT Tân Lộc", score: 10.10 },
  { id: 28, name: "Trường THPT chuyên Lý Tự Trọng", score: 31.95 }
].sort((a, b) => a.name.localeCompare(b.name));

export const quizQuestions = [
  {
    id: 1,
    question: "Bạn thích làm việc với công cụ nào nhất?",
    options: [
      { text: "Bút vẽ, màu sắc, phần mềm thiết kế sáng tạo", type: "TKDH" },
      { text: "Máy tính, mã lệnh, ứng dụng di động", type: "UDPM" },
      { text: "Mạng xã hội, nội dung, chiến dịch quảng cáo", type: "DM" }
    ]
  },
  {
    id: 2,
    question: "Hoạt động nào khiến bạn cảm thấy hứng thú?",
    options: [
      { text: "Lên ý tưởng hình ảnh, thiết kế logo, banner", type: "TKDH" },
      { text: "Lập trình web, phát triển phần mềm, tìm lỗi sai", type: "UDPM" },
      { text: "Viết bài, quay video TikTok/YouTube, chạy quảng cáo", type: "DM" }
    ]
  },
  {
    id: 3,
    question: "Môi trường làm việc mơ ước của bạn là gì?",
    options: [
      { text: "Xưởng vẽ, studio, công ty thiết kế", type: "TKDH" },
      { text: "Công ty công nghệ, làm việc từ xa với máy tính", type: "UDPM" },
      { text: "Phòng marketing năng động, cập nhật xu hướng liên tục", type: "DM" }
    ]
  }
];

export const resultMapping = {
  TKDH: {
    name: "Thiết kế đồ họa",
    description: "Bạn có tính sáng tạo cao và con mắt thẩm mỹ tuyệt vời. Ngành Thiết kế đồ họa tại FPT PolySchool là lựa chọn hoàn hảo để bạn phát triển đam mê nghệ thuật."
  },
  UDPM: {
    name: "Ứng dụng phần mềm",
    description: "Bạn thích tư duy logic và công nghệ. Ngành Ứng dụng phần mềm sẽ giúp bạn trở thành chuyên gia lập trình, bắt kịp xu thế thời đại số."
  },
  DM: {
    name: "Digital Marketing",
    description: "Bạn nhạy bén với xu hướng, thích giao tiếp và lan tỏa thông điệp. Digital Marketing sẽ trang bị cho bạn kỹ năng thực chiến để trở thành marketer xuất sắc."
  }
};
