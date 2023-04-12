import { svgToBase64 } from "./helper";

export const dowloadSVGAsText = (svg) => {
  var svgData = svgToBase64(svg)
  var a = document.createElement("a");
  a.download = "dowload.svg";
  a.type = "image/svg+xml";
  // Chuyển đổi đoạn mã base64 sang định dạng ArrayBuffer
  var binary = atob(svgData.split(",")[1]);
  var len = binary.length;
  var buffer = new ArrayBuffer(len);
  var view = new Uint8Array(buffer);

  for (var i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }
  // Tạo một đối tượng Blob từ ArrayBuffer
  var blob = new Blob([view], { type: "image/svg+xml" });
  // Thiết lập URL của liên kết tải xuống bằng URL của đối tượng Blob
  a.href = window.URL.createObjectURL(blob);
  // Nhúng đối tượng a vào trang web của bạn
  document.body.appendChild(a);
  // Khi người dùng nhấn vào liên kết tải xuống, tệp tin sẽ được tải xuống
  a.click();
  // Xóa đối tượng a khỏi trang web của bạn để tránh gây rối
  document.body.removeChild(a);
};

export const dowloadSVGAsImage = async (svg, {width, height}) => {
    const canvas = document.createElement('canvas');
    const img_to_download = document.createElement('img');
    img_to_download.src = svgToBase64(svg)
    img_to_download.onload = ()=>{
        canvas.setAttribute("width", width)
        canvas.setAttribute("height", height)
        const context = canvas.getContext("2d");
        context.drawImage(img_to_download, 0,0, width, height);
        const dataUrl = canvas.toDataURL("image/png");
        if(window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(canvas.msToBlob(), "download.png")
        }else{
            var a = document.createElement("a");
            const my_evt = new MouseEvent("click")
            a.download = "download.png"
            a.type = "image/png";
            a.href = dataUrl;
            a.dispatchEvent(my_evt)
        }
    }
};
