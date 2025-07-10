function startQrScanner(pavilionName, scannerPage) {
  const qrScanner = new Html5Qrcode("reader");

  // カメラ設定
  const config = {
    fps: 15,
    qrbox: { width: 280, height: 280 },
    aspectRatio: 1.0,
    useBarCodeDetectorIfSupported: true
  };

  // 旧インスタンス停止（念のため）
  Html5Qrcode.getCameras().then(cameras => {
    qrScanner.stop().catch(() => {});
    
    qrScanner.start(
      { facingMode: "user" },
      config,
      (decodedText) => {
        qrScanner.stop().then(() => {
          window.location.href = `view.html?id=${decodedText}&pavilion=${pavilionName}&from=${scannerPage}`;
        }).catch(() => {
          window.location.href = `view.html?id=${decodedText}&pavilion=${pavilionName}&from=${scannerPage}`;
        });
      },
      (errorMessage) => {
        // 読み取り失敗（無視でOK）
      }
    );
  });
}
