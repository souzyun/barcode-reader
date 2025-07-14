let entryAudio;

function startQrScanner(pavilionName, scannerPage) {
  entryAudio = new Audio(`sounds/${scannerPage.replace(".html", ".mp3")}`);
  entryAudio.preload = "auto";

  // iOS対策: 音声事前再生（無音）で許可を取る
  entryAudio.muted = true;
  entryAudio.play().then(() => {
    entryAudio.pause();
    entryAudio.currentTime = 0;
    entryAudio.muted = false;
    console.log("音声事前準備成功");
  }).catch(err => console.log("音声事前準備エラー", err));

  const qrScanner = new Html5Qrcode("reader", { facingMode: "user" });
  qrScanner.start(
    { facingMode: "user" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      entryAudio.play().then(() => {
        console.log("読み取り後 音再生成功");
      }).catch((err) => {
        console.log("読み取り後 音再生エラー", err);
      });

      window.location.href = `view.html?id=${decodedText}&pavilion=${pavilionName}&from=${scannerPage}`;
      qrScanner.stop();
    },
    (error) => {}
  );
}
