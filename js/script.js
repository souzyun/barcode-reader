let entryAudio;

function startQrScanner(pavilionName, scannerPage) {
  entryAudio = new Audio(`sounds/${scannerPage.replace(".html", ".mp3")}`);
  entryAudio.preload = "auto";

  entryAudio.muted = true;
  entryAudio.play().then(() => {
    entryAudio.pause();
    entryAudio.currentTime = 0;
    entryAudio.muted = false;
    console.log("音声準備成功");
  }).catch(err => console.log("音声準備エラー", err));

  const qrScanner = new Html5Qrcode("reader", { facingMode: "user" });
  qrScanner.start(
    { facingMode: "user" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      entryAudio.play().then(() => {
        console.log("読み取り直後 音再生成功");
      }).catch(err => console.log("読み取り直後 音再生エラー", err));

      setTimeout(() => {
        window.location.href = `view.html?id=${decodedText}&pavilion=${pavilionName}&from=${scannerPage}`;
        qrScanner.stop();
      }, 1200);
    },
    (error) => {}
  );
}
