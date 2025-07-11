function startQrScanner(pavilionName, scannerPage) {
  const qrScanner = new Html5Qrcode("reader", { facingMode: "user" });
  qrScanner.start(
    { facingMode: "user" },
    {
      fps: 10,
      qrbox: 250
    },
    (decodedText) => {
      window.location.href = `view.html?id=${decodedText}&pavilion=${pavilionName}&from=${scannerPage}`;
      qrScanner.stop();
    },
    (error) => {
      // ignore
    }
  );
}
