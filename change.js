const fs = require("fs");
const path = require("path");

// Đường dẫn tới file input và output
const inputFilePath = path.join(__dirname, "input.txt");
const outputFilePath = path.join(__dirname, "output.txt");

// Hàm chuyển đổi định dạng "ip:port:user:pass" thành "http://user:pass@ip:port"
function convertLine(line) {
  const parts = line.split(":");
  if (parts.length === 4) {
    const [ip, port, user, pass] = parts;
    return `http://${user}:${pass}@${ip}:${port}`;
  }
  return null; // Trả về null nếu định dạng không đúng
}

// Đọc file input.txt
fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Lỗi đọc file input:", err);
    return;
  }

  // Tách từng dòng, chuyển đổi và lọc những dòng hợp lệ
  const lines = data.split("\n").filter((line) => line.trim() !== ""); // Loại bỏ dòng trống
  const convertedLines = lines.map(convertLine).filter((line) => line !== null); // Chuyển đổi và lọc những dòng hợp lệ

  // Ghi kết quả ra file output.txt
  fs.writeFile(outputFilePath, convertedLines.join("\n"), "utf8", (err) => {
    if (err) {
      console.error("Lỗi ghi file output:", err);
    } else {
      console.log("Chuyển đổi hoàn tất và ghi vào output.txt");
    }
  });
});
